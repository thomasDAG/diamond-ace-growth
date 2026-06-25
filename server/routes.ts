import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { contactFormSchema, LEAD_STATUSES } from "@shared/schema";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendNewLeadNotification, sendAuditConfirmation, sendContactMessage } from "./mailer";

const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const sess = req.session as any;
  if (sess?.adminAuthenticated) return next();
  return res.status(401).json({ message: "Unauthorized" });
};

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts. Try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ── Public contact form ────────────────────────────────────────────────────
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = contactFormSchema.parse(req.body);

      const { lead, isNew } = await storage.upsertLead({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        companyName: input.companyName,
        websiteUrl: input.websiteUrl,
        businessType: input.businessType,
        currentTools: input.currentTools,
        monthlyRevenueRange: input.monthlyRevenueRange,
        serviceInterests: input.serviceInterests,
        biggestBottleneck: input.biggestBottleneck,
        marketingConsent: input.marketingConsent,
        monthlyLeadVolume: input.monthlyLeadVolume,
        currentAiUsage: input.currentAiUsage,
        timeline: input.timeline,
        budgetRange: input.budgetRange,
        offerRequested: "AI Workflow Leak Scorecard",
        leadSource: "Website",
      });

      await storage.createActivity({
        leadId: lead.id,
        type: "form_submitted",
        note: isNew
          ? "Lead submitted AI Workflow Leak Scorecard request"
          : "Lead re-submitted AI Workflow Leak Scorecard request",
        meta: { isNew },
      });

      try {
        await sendNewLeadNotification(lead);
      } catch (emailErr) {
        console.error("Failed to send lead notification email:", emailErr);
      }

      try {
        await sendAuditConfirmation(lead);
      } catch (emailErr) {
        console.error("Failed to send audit confirmation email:", emailErr);
      }

      res.status(201).json({ success: true, leadId: lead.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // ── Simple contact message ─────────────────────────────────────────────────
  app.post("/api/contact-message", async (req, res) => {
    const schema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Please enter a valid email address"),
      message: z.string().min(1, "Message is required"),
    });

    try {
      const { name, email, message } = schema.parse(req.body);
      await sendContactMessage(name, email.trim().toLowerCase(), message);
      res.status(200).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // ── Admin auth ─────────────────────────────────────────────────────────────
  app.post("/api/admin/login", loginRateLimit, (req: Request, res: Response) => {
    const { password } = req.body;
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const sess = req.session as any;
    sess.adminAuthenticated = true;
    res.json({ success: true });
  });

  app.post("/api/admin/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req: Request, res: Response) => {
    const sess = req.session as any;
    if (sess?.adminAuthenticated) {
      return res.json({ authenticated: true });
    }
    res.json({ authenticated: false });
  });

  // ── Admin leads ────────────────────────────────────────────────────────────
  app.get("/api/admin/leads", adminAuthMiddleware, async (_req, res) => {
    const allLeads = await storage.getLeads();
    res.json(allLeads);
  });

  app.get("/api/admin/leads/:id", adminAuthMiddleware, async (req, res) => {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const lead = await storage.getLead(id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    const [leadActivities, leadTasks] = await Promise.all([
      storage.getActivitiesForLead(id),
      storage.getTasksForLead(id),
    ]);

    res.json({ lead, activities: leadActivities, tasks: leadTasks });
  });

  app.patch("/api/admin/leads/:id", adminAuthMiddleware, async (req, res) => {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const schema = z.object({
      status: z.enum(LEAD_STATUSES).optional(),
      nextFollowUpDate: z.string().optional(),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ message: parsed.error.errors[0].message });

    const updated = await storage.updateLead(id, parsed.data);
    if (!updated) return res.status(404).json({ message: "Lead not found" });

    res.json(updated);
  });

  app.delete("/api/admin/leads/:id", adminAuthMiddleware, async (req, res) => {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const deleted = await storage.deleteLead(id);
    if (!deleted) return res.status(404).json({ message: "Lead not found" });

    res.json({ success: true });
  });

  // ── Admin activities ───────────────────────────────────────────────────────
  app.post("/api/admin/leads/:id/activities", adminAuthMiddleware, async (req, res) => {
    const leadId = parseInt(String(req.params.id), 10);
    if (isNaN(leadId)) return res.status(400).json({ message: "Invalid ID" });

    const schema = z.object({
      type: z.enum(["note", "email_sent", "email_received", "call", "meeting"]),
      note: z.string().min(1, "Note is required"),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ message: parsed.error.errors[0].message });

    const activity = await storage.createActivity({
      leadId,
      type: parsed.data.type,
      note: parsed.data.note,
    });

    res.status(201).json(activity);
  });

  // ── Admin tasks ────────────────────────────────────────────────────────────
  app.post("/api/admin/leads/:id/tasks", adminAuthMiddleware, async (req, res) => {
    const leadId = parseInt(String(req.params.id), 10);
    if (isNaN(leadId)) return res.status(400).json({ message: "Invalid ID" });

    const schema = z.object({
      title: z.string().min(1, "Title is required"),
      dueDate: z.string().optional().nullable(),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ message: parsed.error.errors[0].message });

    const task = await storage.createTask({
      leadId,
      title: parsed.data.title,
      dueDate: parsed.data.dueDate ?? null,
    });

    res.status(201).json(task);
  });

  app.patch("/api/admin/tasks/:id/complete", adminAuthMiddleware, async (req, res) => {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const task = await storage.completeTask(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  });

  return httpServer;
}
