// ==========================================
// FILE: src/app/workspaces/[workspaceId]/portfolio/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Agency Portfolio Mode, System Admin Dashboard, Multi-Client Metrics
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Fetch cross-workspace utilization and tasks metrics using tRPC
//    `workspaces.getPortfolioMetrics` procedures.
// 2. Render SLA health indicators, active workspace stats, and budget/capacity scores.
// 3. Formulate provisioning options to easily deploy new isolated client workspaces.
// 4. Implement secure workspace boundaries validation preventing cross-workspace content leaks.
// ==========================================

import Link from "next/link";

// Mock portfolio listings
const mockPortfolio = [
  { id: "client-a", clientName: "Acme Corp Logistics", health: "98% SLA", status: "HEALTHY", activeTasks: 18, utilization: 84 },
  { id: "client-b", clientName: "Global Healthcare Inc", health: "92% SLA", status: "STABLE", activeTasks: 22, utilization: 72 },
  { id: "client-c", clientName: "Standard Insurance Co", health: "74% SLA", status: "AT RISK", activeTasks: 45, utilization: 96 },
];

export default function WorkspacePortfolioPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  return (
    <div className="flex-1 flex max-w-7xl mx-auto w-full">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 p-6 hidden md:block">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Workspace Links</h3>
        <nav className="space-y-2">
          <a
            href={`/workspaces/${params.workspaceId}`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            Tasks Dashboard
          </a>
          <a
            href={`/workspaces/${params.workspaceId}/skills`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            Skill Profiles
          </a>
          <a
            href={`/workspaces/${params.workspaceId}/portfolio`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400"
          >
            Agency Portfolio
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Agency Portfolio Dashboard</h2>
            <p className="mt-1 text-sm text-slate-400">System Admin access: Overseeing multiple isolated client workspaces</p>
          </div>
          <button
            className="mt-4 sm:mt-0 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg text-sm transition-all"
            id="btn-provision-workspace"
          >
            Provision Client Workspace
          </button>
        </div>

        {/* Aggregated Agency Health Metrics */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
            <span className="text-slate-500 text-xs block">Active Organizations</span>
            <span className="text-3xl font-extrabold text-white mt-2 block">3 Client Orgs</span>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
            <span className="text-slate-500 text-xs block">Overall SLA Compliance</span>
            <span className="text-3xl font-extrabold text-emerald-400 mt-2 block">94.2% Average</span>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
            <span className="text-slate-500 text-xs block">Avg Resource Utilization</span>
            <span className="text-3xl font-extrabold text-white mt-2 block">84% Capacity</span>
          </div>
        </div>

        {/* Client Workspace Portfolio Details */}
        <h3 className="text-lg font-bold text-white mb-4">Client Spaces Management</h3>
        <div className="space-y-4">
          {mockPortfolio.map((client) => (
            <div
              key={client.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-white">{client.clientName}</h4>
                <p className="text-xs text-slate-500 font-mono">Workspace ID: {client.id}</p>
              </div>

              <div className="flex items-center space-x-8 text-sm">
                <div>
                  <span className="text-slate-500 text-xs block">SLA Compliance</span>
                  <span className="font-bold text-slate-300 block">{client.health}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Active Tasks</span>
                  <span className="font-bold text-slate-300 block">{client.activeTasks} Tasks</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Utilization</span>
                  <span className="font-bold text-slate-300 block">{client.utilization}%</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Health Status</span>
                  <span
                    className={`font-semibold text-xs px-2.5 py-0.5 rounded-full mt-1 block uppercase tracking-wider ${
                      client.status === "HEALTHY"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : client.status === "STABLE"
                        ? "bg-sky-500/10 text-sky-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {client.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
