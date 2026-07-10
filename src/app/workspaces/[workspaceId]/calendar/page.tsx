// ==========================================
// FILE: src/app/workspaces/[workspaceId]/calendar/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Calendar Grid Interface, Due date milestones, Task deadlines listing
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Render a clean monthly calendar block grid displaying days of the week.
// 2. Map due tasks onto calendar date grids as interactive links/badges.
// 3. Render quick filters separating overdue milestones from incoming deadlines.
// ==========================================

import Link from "next/link";

// Mock calendar deadlines
const mockDeadlines = [
  { id: "d-1", day: 12, title: "Database schema migrations", category: "DATABASE" },
  { id: "d-2", day: 15, title: "Integration check tests Vitest", category: "TESTING" },
  { id: "d-3", day: 22, title: "Auditing compliance logging", category: "SECURITY" },
];

export default function WorkspaceCalendarPage({
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
          <a href={`/workspaces/${params.workspaceId}/calendar`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400">
            Calendar View
          </a>
          <a href={`/workspaces/${params.workspaceId}/timeline`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            Gantt Timeline
          </a>
        </nav>
      </aside>

      {/* Main Calendar Content Area */}
      <section className="flex-1 p-6 md:p-8">
        <div className="border-b border-slate-800 pb-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Milestones Calendar</h2>
          <p className="mt-1 text-sm text-slate-400">Track deadlines, due dates, and sprint deliverables</p>
        </div>

        {/* Mock Calendar Grid */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
          <div className="grid grid-cols-7 gap-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-4 aspect-[7/5]">
            {/* Pad initial days */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={`pad-${idx}`} className="border border-slate-900 bg-slate-950/20 rounded-xl" />
            ))}

            {/* Render 28 days mock month */}
            {Array.from({ length: 28 }).map((_, idx) => {
              const day = idx + 1;
              const matches = mockDeadlines.filter((item) => item.day === day);

              return (
                <div key={day} className="border border-slate-800/80 hover:border-slate-700 bg-slate-900/40 rounded-xl p-2 min-h-[80px] flex flex-col justify-between transition-all">
                  <span className="text-xs font-semibold text-slate-400">{day}</span>
                  <div className="space-y-1">
                    {matches.map((item) => (
                      <span key={item.id} className="block text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.title}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
