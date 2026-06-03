import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  contactMessages,
  leads,
  activities,
  tasks,
  type ContactMessage,
  type InsertContactMessage,
  type Lead,
  type Activity,
  type Task,
  type LeadStatus,
  type ActivityType,
} from "@shared/schema";

export type UpsertLeadData = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  websiteUrl?: string;
  businessType: string;
  // currentTools maps to currentPlatform column
  currentTools?: string;
  // monthlyRevenueRange maps to revenueRange column
  monthlyRevenueRange: string;
  // serviceInterests maps to implementedFeatures column
  serviceInterests?: string[];
  // biggestBottleneck maps to painPoints column
  biggestBottleneck: string;
  marketingConsent?: boolean;
  monthlyLeadVolume?: string;
  currentAiUsage?: string;
  timeline?: string;
  budgetRange?: string;
  offerRequested?: string;
  leadSource?: string;
};

export type CreateActivityData = {
  leadId: number;
  type: ActivityType;
  note?: string | null;
  meta?: Record<string, unknown> | null;
};

export type CreateTaskData = {
  leadId: number;
  title: string;
  dueDate?: string | null;
};

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  upsertLead(data: UpsertLeadData): Promise<{ lead: Lead; isNew: boolean }>;
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  updateLead(id: number, data: { status?: LeadStatus; nextFollowUpDate?: string; notes?: string }): Promise<Lead | undefined>;
  createActivity(data: CreateActivityData): Promise<Activity>;
  getActivitiesForLead(leadId: number): Promise<Activity[]>;
  createTask(data: CreateTaskData): Promise<Task>;
  getTasksForLead(leadId: number): Promise<Task[]>;
  completeTask(id: number): Promise<Task | undefined>;
  deleteLead(id: number): Promise<Lead | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message as any).returning();
    return newMessage;
  }

  async upsertLead(data: UpsertLeadData): Promise<{ lead: Lead; isNew: boolean }> {
    const normalizedEmail = data.email.trim().toLowerCase();
    const serviceInterests = data.serviceInterests ?? [];

    const existing = await db
      .select()
      .from(leads)
      .where(eq(leads.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(leads)
        .set({
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          websiteUrl: data.websiteUrl ?? null,
          businessType: data.businessType,
          currentPlatform: data.currentTools ?? null,
          revenueRange: data.monthlyRevenueRange,
          implementedFeatures: serviceInterests as any,
          painPoints: data.biggestBottleneck,
          marketingOptIn: data.marketingConsent ?? false,
          monthlyLeadVolume: data.monthlyLeadVolume ?? null,
          currentAiUsage: data.currentAiUsage ?? null,
          timeline: data.timeline ?? null,
          budgetRange: data.budgetRange ?? null,
          offerRequested: data.offerRequested ?? "Free Marketing Engine Audit",
          updatedAt: new Date(),
        })
        .where(eq(leads.email, normalizedEmail))
        .returning();
      return { lead: updated, isNew: false };
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const [created] = await db
      .insert(leads)
      .values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: normalizedEmail,
        companyName: data.companyName,
        websiteUrl: data.websiteUrl ?? null,
        businessType: data.businessType,
        currentPlatform: data.currentTools ?? null,
        revenueRange: data.monthlyRevenueRange,
        implementedFeatures: serviceInterests as any,
        painPoints: data.biggestBottleneck,
        marketingOptIn: data.marketingConsent ?? false,
        monthlyLeadVolume: data.monthlyLeadVolume ?? null,
        currentAiUsage: data.currentAiUsage ?? null,
        timeline: data.timeline ?? null,
        budgetRange: data.budgetRange ?? null,
        offerRequested: data.offerRequested ?? "Free Marketing Engine Audit",
        leadSource: data.leadSource ?? "Website",
        nextFollowUpDate: tomorrowStr,
        status: "new",
        lifecycle: "lead",
      })
      .returning();
    return { lead: created, isNew: true };
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return lead;
  }

  async updateLead(id: number, data: { status?: LeadStatus; nextFollowUpDate?: string; notes?: string }): Promise<Lead | undefined> {
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (data.status !== undefined) updateData.status = data.status;
    if (data.nextFollowUpDate !== undefined) updateData.nextFollowUpDate = data.nextFollowUpDate;

    const [updated] = await db
      .update(leads)
      .set(updateData as Parameters<typeof db.update>[0] extends infer T ? any : never)
      .where(eq(leads.id, id))
      .returning();
    return updated;
  }

  async createActivity(data: CreateActivityData): Promise<Activity> {
    const [activity] = await db
      .insert(activities)
      .values({
        leadId: data.leadId,
        type: data.type,
        note: data.note ?? null,
        meta: data.meta ?? null,
      })
      .returning();
    return activity;
  }

  async getActivitiesForLead(leadId: number): Promise<Activity[]> {
    return db
      .select()
      .from(activities)
      .where(eq(activities.leadId, leadId))
      .orderBy(desc(activities.createdAt));
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    const [task] = await db
      .insert(tasks)
      .values({
        leadId: data.leadId,
        title: data.title,
        dueDate: data.dueDate ?? null,
      })
      .returning();
    return task;
  }

  async getTasksForLead(leadId: number): Promise<Task[]> {
    return db
      .select()
      .from(tasks)
      .where(eq(tasks.leadId, leadId))
      .orderBy(desc(tasks.createdAt));
  }

  async completeTask(id: number): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set({ completedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning();
    return task;
  }

  async deleteLead(id: number): Promise<Lead | undefined> {
    const [deleted] = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();
    return deleted;
  }
}

export const storage = new DatabaseStorage();
