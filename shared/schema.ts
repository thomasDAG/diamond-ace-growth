import { pgTable, text, serial, timestamp, jsonb, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ── Legacy contact messages (kept for backward compat) ──────────────────────
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  companyName: text("company_name").notNull(),
  businessType: text("business_type").notNull(),
  currentPlatform: text("current_platform").notNull(),
  revenueRange: text("revenue_range").notNull(),
  implementedFeatures: jsonb("implemented_features").$type<string[]>().default([]),
  painPoints: text("pain_points").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// ── Leads ───────────────────────────────────────────────────────────────────
export const LEAD_STATUSES = ["new", "contacted", "qualified", "proposal_sent", "won", "lost", "nurture"] as const;
export type LeadStatus = typeof LEAD_STATUSES[number];

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  companyName: text("company_name").notNull(),
  businessType: text("business_type").notNull(),
  currentPlatform: text("current_platform").notNull(),
  revenueRange: text("revenue_range").notNull(),
  implementedFeatures: jsonb("implemented_features").$type<string[]>().default([]),
  painPoints: text("pain_points").notNull(),
  marketingOptIn: boolean("marketing_opt_in").default(false),
  status: text("status").$type<LeadStatus>().default("new").notNull(),
  lifecycle: text("lifecycle").default("lead").notNull(),
  leadSource: text("lead_source"),
  nextFollowUpDate: date("next_follow_up_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  email: z.string().email().transform(v => v.trim().toLowerCase()),
  marketingOptIn: z.boolean().optional().default(false),
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// ── Activities ───────────────────────────────────────────────────────────────
export const ACTIVITY_TYPES = ["form_submitted", "email_sent", "email_received", "note", "call", "meeting"] as const;
export type ActivityType = typeof ACTIVITY_TYPES[number];

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  leadId: serial("lead_id").references(() => leads.id, { onDelete: "cascade" }),
  type: text("type").$type<ActivityType>().notNull(),
  note: text("note"),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

// ── Tasks ────────────────────────────────────────────────────────────────────
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  leadId: serial("lead_id").references(() => leads.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  dueDate: date("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

// ── Contact form submission schema (used by the public form) ─────────────────
export const contactFormSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email").transform(v => v.trim().toLowerCase()),
  companyName: z.string().min(1, "Required"),
  businessType: z.string().min(1, "Required"),
  currentPlatform: z.string().min(1, "Required"),
  revenueRange: z.string().min(1, "Required"),
  implementedFeatures: z.array(z.string()).default([]),
  painPoints: z.string().min(1, "Required"),
  marketingOptIn: z.boolean().default(false),
});
export type ContactFormData = z.infer<typeof contactFormSchema>;
