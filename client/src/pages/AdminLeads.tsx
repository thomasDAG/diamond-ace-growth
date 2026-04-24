import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { adminApi } from "@/lib/admin-api";
import type { Lead } from "@shared/schema";
import { LEAD_STATUSES, STATUS_LABELS } from "@shared/schema";
import { LogOut, Users, ChevronRight } from "lucide-react";

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

function InlineStatusSelect({ lead, onUpdate }: { lead: Lead; onUpdate: (id: number, status: string) => void }) {
  const [saving, setSaving] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    setSaving(true);
    try {
      await adminApi.updateLead(lead.id, { status: newStatus });
      onUpdate(lead.id, newStatus);
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      value={lead.status}
      onChange={handleChange}
      onClick={e => e.stopPropagation()}
      disabled={saving}
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full border bg-transparent outline-none cursor-pointer transition-opacity ${saving ? "opacity-50" : ""} ${STATUS_COLORS[lead.status] ?? STATUS_COLORS.new}`}
      data-testid={`select-status-inline-${lead.id}`}
    >
      {LEAD_STATUSES.map(s => (
        <option key={s} value={s} className="bg-background text-white">
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}

export default function AdminLeads() {
  const [, setLocation] = useLocation();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    adminApi.me().then(({ authenticated }) => {
      if (!authenticated) setLocation("/admin/login");
      else {
        adminApi.getLeads()
          .then(setLeads)
          .catch(e => setError(e.message))
          .finally(() => setLoading(false));
      }
    }).catch(() => setLocation("/admin/login"));
  }, []);

  const handleLogout = async () => {
    await adminApi.logout();
    setLocation("/admin/login");
  };

  const handleStatusUpdate = (id: number, status: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const filtered = filterStatus === "all"
    ? leads
    : leads.filter(l => l.status === filterStatus);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/30 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <h1 className="font-display font-bold text-white">CRM — Leads</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", ...LEAD_STATUSES].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filterStatus === s
                  ? "bg-primary text-white border-primary"
                  : "border-border/50 text-muted-foreground hover:text-white hover:border-border"
              }`}
              data-testid={`filter-${s}`}
            >
              {s === "all" ? "All" : STATUS_LABELS[s as keyof typeof STATUS_LABELS] ?? s}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "lead" : "leads"}
        </div>

        {loading && (
          <div className="text-center py-20 text-muted-foreground">Loading leads...</div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No leads yet.</div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="bg-card border border-border/30 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30 text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left px-6 py-3 font-medium">Name</th>
                  <th className="text-left px-6 py-3 font-medium hidden sm:table-cell">Company</th>
                  <th className="text-left px-6 py-3 font-medium hidden md:table-cell">Revenue</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium hidden lg:table-cell">Last Active</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-border/20 last:border-0 hover:bg-background/50 transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-background/20"}`}
                    data-testid={`row-lead-${lead.id}`}
                    onClick={() => setLocation(`/admin/leads/${lead.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white text-sm">{lead.firstName} {lead.lastName}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell text-sm text-foreground/80">{lead.companyName}</td>
                    <td className="px-6 py-4 hidden md:table-cell text-sm text-foreground/80">{lead.revenueRange}</td>
                    <td className="px-6 py-4">
                      <InlineStatusSelect lead={lead} onUpdate={handleStatusUpdate} />
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-xs text-muted-foreground">
                      {lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <ChevronRight className="w-4 h-4 text-primary" data-testid={`link-lead-${lead.id}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
