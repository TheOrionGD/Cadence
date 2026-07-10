// ==========================================
// FILE: src/app/workspaces/[workspaceId]/kanban/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Kanban Board drag-and-drop layout, Columns status routing
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Render column zones for all TaskStatus categories (Todo, In Progress, In Review, Completed).
// 2. Format individual task cards showing title, assignee username, and workload category tags.
// 3. Setup client interaction slots ready to trigger status mutations upon item move actions.
// ==========================================

import Link from "next/link";

// Mock board elements
const mockKanbanColumns = [
  {
    title: "Todo",
    tasks: [
      { id: "k-1", title: "Slack Webhook Notifications configuration", category: "OCR_REVIEW", assignee: "Unassigned" },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      { id: "k-2", title: "Gantt scheduler intervals logic build", category: "DEVELOPMENT", assignee: "Yuvaraj" },
      { id: "k-3", title: "ActivityLog schema migrations test", category: "QA_REVIEW", assignee: "Santosh" },
    ],
  },
  {
    title: "Completed",
    tasks: [
      { id: "k-4", title: "Clerk auth redirects mapping", category: "DEVELOPMENT", assignee: "Godfrey" },
    ],
  },
];

export default function WorkspaceKanbanPage({
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
          <a href={`/workspaces/${params.workspaceId}/kanban`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400">
            Kanban Board
          </a>
          <a href={`/workspaces/${params.workspaceId}/timeline`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            Gantt Timeline
          </a>
        </nav>
      </aside>

      {/* Main Kanban Content Area */}
      <section className="flex-1 p-6 md:p-8">
        <div className="border-b border-slate-800 pb-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Kanban Task Board</h2>
          <p className="mt-1 text-sm text-slate-400">Drag and drop tasks between columns to update status lifecycle</p>
        </div>

        {/* Board Columns Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {mockKanbanColumns.map((col) => (
            <div key={col.title} className="rounded-2xl bg-slate-900/20 border border-slate-800/80 p-4">
              <h4 className="font-semibold text-slate-400 text-sm mb-4">{col.title} ({col.tasks.length})</h4>
              
              <div className="space-y-3">
                {col.tasks.map((task) => (
                  <div key={task.id} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl hover:border-slate-700 transition-all cursor-grab active:cursor-grabbing">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 uppercase font-mono block w-fit mb-2">
                      {task.category}
                    </span>
                    <h5 className="font-bold text-white text-sm leading-snug">{task.title}</h5>
                    
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <span>{task.assignee}</span>
                      <span className="text-[10px] font-mono">{task.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
