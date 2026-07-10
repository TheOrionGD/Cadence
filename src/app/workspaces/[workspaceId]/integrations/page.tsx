// ==========================================
// FILE: src/app/workspaces/[workspaceId]/integrations/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Integrations Marketplace, Slack/GitHub connections, Webhook sync triggers
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Render OAuth integration cards mapping connection status parameters.
// 2. Interface to connect workspaces to GitHub repositories.
// 3. Connect webhook status monitoring for the Second-Brain doc-sync engine.
// 4. Action click buttons triggering manual docs drift audits (calling `ai.auditCodeDocDrift`).
// ==========================================

import Link from "next/link";

// Mock list of integrations
const mockIntegrations = [
  { id: "github", name: "GitHub Connector", description: "Links repositories to tasks and triggers the Second-Brain agent documentation sync.", connected: true, details: "Connected to TheOrionGD/Cadence" },
  { id: "slack", name: "Slack Notifications", description: "Stream task reassignment activity logs and sandbox alerts to Slack channels.", connected: false, details: "OAuth Auth Required" },
  { id: "teams", name: "Microsoft Teams", description: "Deliver daily summaries and scheduling alerts to Microsoft Teams channels.", connected: false, details: "OAuth Auth Required" },
];

export default function WorkspaceIntegrationsPage({
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
          <a href={`/workspaces/${params.workspaceId}`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            Tasks Dashboard
          </a>
          <a href={`/workspaces/${params.workspaceId}/integrations`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400">
            Integrations Settings
          </a>
          <a href={`/workspaces/${params.workspaceId}/skills`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            Skill Profiles
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-8">
        <div className="border-b border-slate-800 pb-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Integrations Marketplace</h2>
          <p className="mt-1 text-sm text-slate-400">Link third-party platforms to automate notification updates and code sync workflows</p>
        </div>

        {/* List of active connectors */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockIntegrations.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    item.connected
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : "bg-slate-800 text-slate-500"
                  }`}>
                    {item.connected ? "Active" : "Disconnected"}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-mono">{item.details}</span>
                {item.connected ? (
                  <button className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold">
                    Run Second-Brain Audit
                  </button>
                ) : (
                  <button className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold">
                    Authorize Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
