// ==========================================
// FILE: src/app/workspaces/[workspaceId]/timeline/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Gantt Chart View, Timeline scheduling, Task dependencies UI
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Render a clean horizontal timeline showing tasks mapped to start/end dates.
// 2. Highlight dependency paths (e.g. OCR Review must finish before Claims Processing starts).
// 3. Display milestone nodes and allow managers to view scheduling drift forecasts.
// ==========================================

import Link from "next/link";

// Mock task timelines data
const mockTimelines = [
  { id: "t-1", title: "Setup Database Schemas", start: "July 10", end: "July 12", status: "COMPLETED", dependency: "None" },
  { id: "t-2", title: "Build tRPC API Middleware", start: "July 11", end: "July 14", status: "COMPLETED", dependency: "Setup Database Schemas" },
  { id: "t-3", title: "Create Frontend layouts", start: "July 13", end: "July 17", status: "IN_PROGRESS", dependency: "Build tRPC API Middleware" },
  { id: "t-4", title: "Auto-Assignment Integration", start: "July 15", end: "July 18", status: "TODO", dependency: "Build tRPC API Middleware" },
];

export default function WorkspaceTimelinePage({
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
          <a href={`/workspaces/${params.workspaceId}/timeline`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400">
            Gantt Timeline
          </a>
          <a href={`/workspaces/${params.workspaceId}/skills`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            Skill Profiles
          </a>
        </nav>
      </aside>

      {/* Main Gantt Content Area */}
      <section className="flex-1 p-6 md:p-8">
        <div className="border-b border-slate-800 pb-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Gantt Timeline View</h2>
          <p className="mt-1 text-sm text-slate-400">Trace project schedules, critical paths, and task dependencies</p>
        </div>

        {/* Gantt List Header */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
          <div className="grid grid-cols-4 gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-3 mb-4">
            <div>Task Name</div>
            <div>Timeline Bounds</div>
            <div>Prerequisite Dependency</div>
            <div>Completion Path Status</div>
          </div>

          <div className="space-y-4">
            {mockTimelines.map((item) => (
              <div key={item.id} className="grid grid-cols-4 gap-4 items-center text-sm border-b border-slate-800/40 pb-3 last:border-b-0">
                <div className="font-bold text-white">{item.title}</div>
                <div className="text-slate-300 font-mono">{item.start} &rarr; {item.end}</div>
                <div className="text-xs font-mono text-slate-400">{item.dependency}</div>
                <div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                    item.status === "COMPLETED"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : item.status === "IN_PROGRESS"
                      ? "bg-sky-500/10 text-sky-400"
                      : "bg-slate-800 text-slate-400"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
