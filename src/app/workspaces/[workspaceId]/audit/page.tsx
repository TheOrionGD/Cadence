// ==========================================
// FILE: src/app/workspaces/[workspaceId]/audit/page.tsx
// PRIMARY DEVELOPER: Godfrey (Lead Architect) & Santosh (Security Lead)
// CO-DEVELOPERS / COLLABORATORS: All Members (Unit & E2E Testing, Security Reviews)
// FOCUS: Immutable Compliance Logging, ActivityLog mapping, Export pipelines
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Load activity history calling database queries from the `ActivityLog` table.
// 2. Render details chronologically showing actor name, action parameters, and metadata.
// 3. Prevent edit/deletion of records (audit trail is strictly read-only).
// 4. Connect a button trigger exporting logs to a downloadable compliance CSV file.
// ==========================================

import Link from "next/link";

// Mock compliance audit activity log records
const mockAuditTrail = [
  { id: "log-1", actor: "Godfrey (Owner)", action: "Task Ingestion", target: "Claims Ingestion", date: "July 10, 18:38" },
  { id: "log-2", actor: "Auto-Assignment Engine", action: "Task Allocation", target: "Claims Ingestion &rarr; Vijesh", date: "July 10, 18:39" },
  { id: "log-3", actor: "Vijesh (Developer)", action: "Sandbox Code Submission", target: "Claims Ingestion", date: "July 10, 18:41" },
  { id: "log-4", actor: "Santosh (Manager)", action: "Approval sign-off complete", target: "Claims Ingestion", date: "July 10, 18:42" },
];

export default function WorkspaceAuditPage({
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
          <a href={`/workspaces/${params.workspaceId}/audit`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400">
            Compliance Audit Logs
          </a>
          <a href={`/workspaces/${params.workspaceId}/skills`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            Skill Profiles
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Compliance Audit Trail</h2>
            <p className="mt-1 text-sm text-slate-400">Immutable chronological record of workspace activities and agent actions</p>
          </div>
          <button
            className="mt-4 sm:mt-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold rounded-lg text-sm transition-all"
            id="btn-export-audit"
          >
            Export Logs (CSV)
          </button>
        </div>

        {/* Audit Log Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400 border-collapse">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-3">
                <th className="pb-3 pr-4">Timestamp</th>
                <th className="pb-3 px-4">Actor</th>
                <th className="pb-3 px-4">Action Type</th>
                <th className="pb-3 pl-4">Target Details</th>
              </tr>
            </thead>
            <tbody>
              {mockAuditTrail.map((log) => (
                <tr key={log.id} className="border-b border-slate-800/40 last:border-0 hover:bg-slate-900/10">
                  <td className="py-4 pr-4 font-mono text-xs text-slate-500">{log.date}</td>
                  <td className="py-4 px-4 font-semibold text-slate-200">{log.actor}</td>
                  <td className="py-4 px-4">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 pl-4 text-xs font-mono text-slate-300" dangerouslySetInnerHTML={{ __html: log.target }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
