import type { Lead, Activity, Task } from "@shared/schema";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export const adminApi = {
  login: (password: string) =>
    request<{ success: boolean }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),

  logout: () =>
    request<{ success: boolean }>("/api/admin/logout", { method: "POST" }),

  me: () => request<{ authenticated: boolean }>("/api/admin/me"),

  getLeads: () => request<Lead[]>("/api/admin/leads"),

  getLead: (id: number) =>
    request<{ lead: Lead; activities: Activity[]; tasks: Task[] }>(
      `/api/admin/leads/${id}`
    ),

  updateLead: (id: number, data: { status?: string; nextFollowUpDate?: string }) =>
    request<Lead>(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  createActivity: (leadId: number, data: { type: string; note: string }) =>
    request<Activity>(`/api/admin/leads/${leadId}/activities`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  createTask: (leadId: number, data: { title: string; dueDate?: string | null }) =>
    request<Task>(`/api/admin/leads/${leadId}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  completeTask: (taskId: number) =>
    request<Task>(`/api/admin/tasks/${taskId}/complete`, { method: "PATCH" }),

  deleteLead: (id: number) =>
    request<{ success: boolean }>(`/api/admin/leads/${id}`, { method: "DELETE" }),
};
