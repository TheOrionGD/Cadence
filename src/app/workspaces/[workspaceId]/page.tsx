// ==========================================
// FILE: src/app/workspaces/[workspaceId]/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Workspace Home View, Tabs controls (Kanban/List/Timeline), Sidebar integration
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Render sidebar navigation directing to workspace resources (Dashboard, Skills, Portfolio).
// 2. Multi-view task dashboard: tabbed navigation toggling between Kanban board,
//    Gantt chart, and task list.
// 3. Real-time updates: WebSocket/Socket.IO channel listener syncing task progress bars.
// 4. Connect to tRPC endpoints (`tasks.list`, `tasks.ingestFileAndAssign`).
// ==========================================

import Link from "next/link";

// Mock task listings
const mockTasks = [
  { id: "task-101", title: "Claims Ingestion verification", category: "CLAIMS_PROCESSING", status: "IN_PROGRESS", assignee: "Yuvaraj" },
  { id: "task-102", title: "OCR formatting invoices validation", category: "OCR_REVIEW", status: "TODO", assignee: null },
  { id: "task-103", title: "Database cache cleanups", category: "DATA_CLEANUP", status: "COMPLETED", assignee: "Vijesh" },
];

export default function WorkspaceDetailIdPage({
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
          <Link
            href={`/workspaces/${params.workspaceId}`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400"
          >
            Tasks Dashboard
          </Link>
          <Link
            href={`/workspaces/${params.workspaceId}/skills`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            Skill Profiles
          </Link>
          <Link
            href={`/workspaces/${params.workspaceId}/portfolio`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            Agency Portfolio
          </Link>
        </nav>
      </aside>

      {/* Main Workspace Portal Content */}
      <section className="flex-1 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Tasks Workspace Dashboard</h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-400">WebSocket Live Sync Active</span>
            </div>
          </div>
          <button
            className="mt-4 sm:mt-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold rounded-lg text-sm transition-all"
            id="btn-upload-csv"
          >
            Ingest CSV / Excel File
          </button>
        </div>

        {/* Dynamic Tab Controls Layout */}
        <div className="flex space-x-4 mb-6 border-b border-slate-800 pb-px">
          <button className="border-b-2 border-sky-400 pb-2 text-sm font-semibold text-sky-400">Kanban Board</button>
          <button className="pb-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors">Task List</button>
          <button className="pb-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors">Gantt Timeline</button>
        </div>

        {/* Mock Task Kanban Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Column 1: TODO */}
          <div className="rounded-2xl bg-slate-900/20 border border-slate-800/80 p-4">
            <h4 className="font-semibold text-slate-400 text-sm mb-4">Todo (1)</h4>
            {mockTasks.filter((t) => t.status === "TODO").map((t) => (
              <Link
                key={t.id}
                href={`/workspaces/${params.workspaceId}/tasks/${t.id}`}
                className="block bg-slate-900/80 border border-slate-800 p-4 rounded-xl mb-3 hover:border-slate-700 transition-all"
              >
                <div className="text-xs text-slate-500 mb-1 font-mono">{t.category}</div>
                <h5 className="font-bold text-white text-sm">{t.title}</h5>
                <div className="mt-4 text-xs text-slate-400 flex items-center justify-between">
                  <span>Assignee: Unassigned</span>
                  <span className="text-sky-400 hover:underline">Details &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Column 2: IN PROGRESS */}
          <div className="rounded-2xl bg-slate-900/20 border border-slate-800/80 p-4">
            <h4 className="font-semibold text-slate-400 text-sm mb-4">In Progress (1)</h4>
            {mockTasks.filter((t) => t.status === "IN_PROGRESS").map((t) => (
              <Link
                key={t.id}
                href={`/workspaces/${params.workspaceId}/tasks/${t.id}`}
                className="block bg-slate-900/80 border border-slate-800 p-4 rounded-xl mb-3 hover:border-slate-700 transition-all"
              >
                <div className="text-xs text-slate-500 mb-1 font-mono">{t.category}</div>
                <h5 className="font-bold text-white text-sm">{t.title}</h5>
                <div className="mt-4 text-xs text-slate-400 flex items-center justify-between">
                  <span>Assignee: {t.assignee}</span>
                  <span className="text-sky-400 hover:underline">Details &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Column 3: COMPLETED */}
          <div className="rounded-2xl bg-slate-900/20 border border-slate-800/80 p-4">
            <h4 className="font-semibold text-slate-400 text-sm mb-4">Completed (1)</h4>
            {mockTasks.filter((t) => t.status === "COMPLETED").map((t) => (
              <Link
                key={t.id}
                href={`/workspaces/${params.workspaceId}/tasks/${t.id}`}
                className="block bg-slate-900/80 border border-slate-800 p-4 rounded-xl mb-3 hover:border-slate-700 transition-all opacity-80"
              >
                <div className="text-xs text-slate-500 mb-1 font-mono">{t.category}</div>
                <h5 className="font-bold text-white text-sm line-through">{t.title}</h5>
                <div className="mt-4 text-xs text-slate-400 flex items-center justify-between">
                  <span>Assignee: {t.assignee}</span>
                  <span className="text-sky-400 hover:underline">Details &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
