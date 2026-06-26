import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "wouter";
import { adminApi } from "@/lib/admin-api";
import type { Lead, Activity, Task } from "@shared/schema";
import { LEAD_STATUSES, STATUS_LABELS } from "@shared/schema";
import {
  ArrowLeft, Mail, FileText, Phone, MessageSquare, Users,
  CheckCircle2, Circle, Plus, Loader2, CalendarDays, Trash2
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  audit_in_progress: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  audit_sent: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  conversation: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  qualified: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  proposal_sent: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  won: "bg-green-500/20 text-green-400 border-green-500/30",
  lost: "bg-red-500/20 text-red-400 border-red-500/30",
  nurture: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const ACTIVITY_ICONS: Record<string, JSX.Element> = {
  form_submitted: <FileText className="w-4 h-4 text-blue-400" />,
  email_sent: <Mail className="w-4 h-4 text-green-400" />,
  email_received: <Mail className="w-4 h-4 text-purple-400" />,
  note: <MessageSquare className="w-4 h-4 text-yellow-400" />,
  call: <Phone className="w-4 h-4 text-orange-400" />,
  meeting: <Users className="w-4 h-4 text-primary" />,
};

type Tab = "overview" | "timeline" | "tasks";

export default function AdminLeadDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const leadId = parseInt(id, 10);

  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);

  const [activityType, setActivityType] = useState("note");
  const [activityNote, setActivityNote] = useState("");
  const [activitySaving, setActivitySaving] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [taskSaving, setTaskSaving] = useState(false);

  const loadData = () =>
    adminApi.getLead(leadId).then(d => {
      setLead(d.lead);
      setActivities(d.activities);
      setTasks(d.tasks);
    });

  useEffect(() => {
    adminApi.me().then(({ authenticated }) => {
      if (!authenticated) { setLocation("/admin/login"); return; }
      loadData().catch(() => setLocation("/admin/leads")).finally(() => setLoading(false));
    }).catch(() => setLocation("/admin/login"));
  }, [leadId]);

  const handleStatusChange = async (status: string) => {
    if (!lead) return;
    const updated = await adminApi.updateLead(leadId, { status });
    setLead(updated);
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityNote.trim()) return;
    setActivitySaving(true);
    try {
      const act = await adminApi.createActivity(leadId, { type: activityType, note: activityNote });
      setActivities(prev => [act, ...prev]);
      setActivityNote("");
    } finally {
      setActivitySaving(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setTaskSaving(true);
    try {
      const task = await adminApi.createTask(leadId, {
        title: taskTitle,
        dueDate: taskDue || null,
      });
      setTasks(prev => [task, ...prev]);
      setTaskTitle("");
      setTaskDue("");
    } finally {
      setTaskSaving(false);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    const updated = await adminApi.completeTask(taskId);
    setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
  };

  const handleDeleteLead = async () => {
    if (!confirm(`Delete ${lead?.firstName} ${lead?.lastName}? This will also remove all their activities and tasks.`)) return;
    try {
      await adminApi.deleteLead(leadId);
      setLocation("/admin/leads");
    } catch {
      alert("Failed to delete lead");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!lead) return null;

  const features = Array.isArray(lead.implementedFeatures) ? lead.implementedFeatures : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/30">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Link href="/admin/leads">
            <a className="text-muted-foreground hover:text-white transition-colors" data-testid="link-back">
              <ArrowLeft className="w-5 h-5" />
            </a>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-white truncate">{lead.firstName} {lead.lastName}</h1>
            <p className="text-sm text-muted-foreground truncate">{lead.companyName} · {lead.email}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={lead.status}
              onChange={e => handleStatusChange(e.target.value)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border bg-transparent outline-none cursor-pointer ${STATUS_COLORS[lead.status]}`}
              data-testid="select-status"
            >
              {LEAD_STATUSES.map(s => (
                <option key={s} value={s} className="bg-background text-white">
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <button
              onClick={handleDeleteLead}
              className="px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium hover:bg-red-500/30 transition-colors flex items-center gap-1.5"
              data-testid="button-delete-lead"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-1 mb-6 bg-card border border-border/30 rounded-xl p-1 w-fit">
          {(["overview", "timeline", "tasks"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                tab === t ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
              }`}
              data-testid={`tab-${t}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Lead Info</h3>
              {[
                ["Email", lead.email],
                ["Company", lead.companyName],
                ["Website", lead.websiteUrl ?? "—"],
                ["Business Type", lead.businessType],
                ["Revenue Range", lead.revenueRange],
                ["Monthly Lead Volume", lead.monthlyLeadVolume ?? "—"],
                ["Current AI Usage", lead.currentAiUsage ?? "—"],
                ["Timeline", lead.timeline ?? "—"],
                ["Budget Range", lead.budgetRange ?? "—"],
                ["Offer Requested", lead.offerRequested ?? "—"],
                ["Lead Source", lead.leadSource ?? "—"],
                ["Marketing Opt-In", lead.marketingOptIn ? "Yes" : "No"],
                ["Lifecycle", lead.lifecycle],
                ["Follow-up Date", lead.nextFollowUpDate ?? "—"],
                ["First submitted", lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "—"],
                ...(lead.updatedAt && lead.createdAt && new Date(lead.updatedAt).getTime() !== new Date(lead.createdAt).getTime()
                  ? [["Last submitted", new Date(lead.updatedAt).toLocaleString()]]
                  : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm gap-4">
                  <span className="text-muted-foreground shrink-0">{label}</span>
                  <span className="text-foreground/90 text-right break-all">{value as string}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border/30 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Marketing Bottleneck</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{lead.painPoints}</p>
              </div>

              {features.length > 0 && (
                <div className="bg-card border border-border/30 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">What They Need Help With</h3>
                  <div className="flex flex-wrap gap-2">
                    {features.map(f => (
                      <span key={f} className="text-xs bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {lead.currentPlatform && lead.currentPlatform !== "—" && (
                <div className="bg-card border border-border/30 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Current Tools / Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {lead.currentPlatform.split(", ").filter(Boolean).map(tool => (
                      <span key={tool} className="text-xs bg-accent/10 text-accent border border-accent/30 px-2 py-0.5 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "timeline" && (
          <div className="space-y-6">
            <div className="bg-card border border-border/30 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Log Activity</h3>
              <form onSubmit={handleAddActivity} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={activityType}
                    onChange={e => setActivityType(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-background border border-border text-white text-sm outline-none focus:border-primary"
                    data-testid="select-activity-type"
                  >
                    <option value="note">Note</option>
                    <option value="email_sent">Email Sent</option>
                    <option value="email_received">Email Received</option>
                    <option value="call">Call</option>
                    <option value="meeting">Meeting</option>
                  </select>
                  <input
                    value={activityNote}
                    onChange={e => setActivityNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-4 py-2 rounded-xl bg-background border border-border text-white text-sm outline-none focus:border-primary placeholder:text-muted-foreground/50"
                    data-testid="input-activity-note"
                  />
                  <button
                    type="submit"
                    disabled={activitySaving || !activityNote.trim()}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2 justify-center"
                    data-testid="button-add-activity"
                  >
                    {activitySaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                    Log
                  </button>
                </div>
              </form>
            </div>

            {activities.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-8">No activities yet.</p>
            )}
            <div className="space-y-3">
              {activities.map(act => (
                <div key={act.id} className="flex gap-4 bg-card border border-border/30 rounded-xl p-4" data-testid={`activity-${act.id}`}>
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shrink-0 mt-0.5">
                    {ACTIVITY_ICONS[act.type] ?? <MessageSquare className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-medium text-foreground/60 capitalize">{act.type.replace("_", " ")}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {act.createdAt ? new Date(act.createdAt).toLocaleString() : ""}
                      </span>
                    </div>
                    {act.note && <p className="text-sm text-foreground/90 mt-1">{act.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "tasks" && (
          <div className="space-y-6">
            <div className="bg-card border border-border/30 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">New Task</h3>
              <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
                <input
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  placeholder="Task description..."
                  className="flex-1 px-4 py-2 rounded-xl bg-background border border-border text-white text-sm outline-none focus:border-primary placeholder:text-muted-foreground/50"
                  data-testid="input-task-title"
                />
                <input
                  type="date"
                  value={taskDue}
                  onChange={e => setTaskDue(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-background border border-border text-white text-sm outline-none focus:border-primary"
                  data-testid="input-task-due"
                />
                <button
                  type="submit"
                  disabled={taskSaving || !taskTitle.trim()}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2 justify-center"
                  data-testid="button-add-task"
                >
                  {taskSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                  Add
                </button>
              </form>
            </div>

            {tasks.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-8">No tasks yet.</p>
            )}

            <div className="space-y-2">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 bg-card border rounded-xl px-4 py-3 transition-opacity ${task.completedAt ? "opacity-50 border-border/20" : "border-border/30"}`}
                  data-testid={`task-${task.id}`}
                >
                  <button
                    onClick={() => !task.completedAt && handleCompleteTask(task.id)}
                    disabled={!!task.completedAt}
                    className="shrink-0 text-muted-foreground hover:text-green-400 disabled:cursor-default transition-colors"
                    data-testid={`button-complete-task-${task.id}`}
                  >
                    {task.completedAt
                      ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                      : <Circle className="w-5 h-5" />
                    }
                  </button>
                  <span className={`flex-1 text-sm ${task.completedAt ? "line-through text-muted-foreground" : "text-foreground/90"}`}>
                    {task.title}
                  </span>
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                      <CalendarDays className="w-3 h-3" />
                      {task.dueDate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
