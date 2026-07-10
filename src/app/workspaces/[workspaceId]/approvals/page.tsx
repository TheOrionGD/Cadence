// ==========================================
// FILE: src/app/workspaces/[workspaceId]/approvals/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Deliverables Approvals Queue, Manager/Client Sign-off actions
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Gated access checks: only Managers, Owners, and Clients can approve work.
// 2. Render code delivery logs alongside sandbox validation test pass/fail results.
// 3. Provide managers with active "Approve Task" and "Reject Deliverable" action links.
// 4. Record status changes directly to the database via API transitions.
// ==========================================

import Link from "next/link";

// Mock approvals requests list
const mockApprovals = [
  {
    id: "app-1",
    taskId: "task-101",
    taskTitle: "Claims Ingestion verification",
    submittedBy: "Vijesh",
    sandboxResult: "Vitest: 3 passed, 0 failed (0.42s)",
    codeReference: "https://github.com/Orion/cadence-claims/8a4f9d2b",
  },
];

export default function WorkspaceApprovalsPage({
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
          <a href={`/workspaces/${params.workspaceId}/approvals`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400">
            Approvals Queue
          </a>
          <a href={`/workspaces/${params.workspaceId}/skills`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            Skill Profiles
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-8">
        <div className="border-b border-slate-800 pb-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Approvals Queue</h2>
          <p className="mt-1 text-sm text-slate-400">Sign-off completed deliverables or request reworks</p>
        </div>

        {/* Deliverables List */}
        <div className="space-y-6">
          {mockApprovals.map((req) => (
            <div key={req.id} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-4 mb-4 gap-4">
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-semibold uppercase tracking-wider">
                    Pending Sign-Off
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{req.taskTitle}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Task ID: {req.taskId}</p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <span>Submitted by: </span>
                  <span className="font-bold text-slate-200">{req.submittedBy}</span>
                </div>
              </div>

              {/* Artifact details */}
              <div className="space-y-4 text-sm mb-6">
                <div>
                  <span className="text-slate-500 text-xs block">Submitted Code Repository</span>
                  <a href={req.codeReference} className="text-sky-400 hover:underline font-mono text-xs block mt-0.5">
                    {req.codeReference}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block font-semibold mb-1">Sandbox Execution Log Preview</span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-400">
                    {req.sandboxResult}
                  </div>
                </div>
              </div>

              {/* Decisions Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-center text-sm transition-all active:scale-95">
                  Approve & Close Task
                </button>
                <button className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-semibold text-center text-sm transition-all">
                  Request Revision / Rework
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
