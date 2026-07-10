// ==========================================
// FILE: src/app/workspaces/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Workspace Selection Portal, Creation trigger UI, Dynamic grids
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Fetch user's registered workspaces calling tRPC `workspaces.list` query.
// 2. Render workspaces in a clean responsive grid showing name, role, and details.
// 3. Provide workspace creation modal linking to the `workspaces.create` mutation.
// 4. Ensure workspace redirect routing to `/workspaces/[workspaceId]`.
// ==========================================

import Link from "next/link";

// Mock list of workspace entries
const mockWorkspaces = [
  { id: "ws-1", name: "Alpha Dev Pod", slug: "alpha-dev-pod", role: "OWNER", members: 4, tasks: 12 },
  { id: "ws-2", name: "QA claims Batch", slug: "qa-claims-batch", role: "MEMBER", members: 6, tasks: 25 },
  { id: "ws-3", name: "Cross-Client Portfolio", slug: "cross-client-portfolio", role: "OWNER", members: 2, tasks: 8 },
];

export default function WorkspacesPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Your Workspaces</h1>
          <p className="mt-2 text-sm text-slate-400">Select a workspace to manage projects, workloads, and team assignments</p>
        </div>
        <button
          className="mt-4 sm:mt-0 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg text-sm transition-all"
          id="btn-create-workspace"
        >
          Create Workspace
        </button>
      </div>

      {/* Grid of Workspaces */}
      <div className="grid gap-6 md:grid-cols-3">
        {mockWorkspaces.map((ws) => (
          <Link
            key={ws.id}
            href={`/workspaces/${ws.id}`}
            className="group block rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-slate-700 hover:bg-slate-900/60 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 uppercase tracking-wider">
                {ws.role}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
              {ws.name}
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-1">/{ws.slug}</p>

            <div className="mt-8 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
              <span>{ws.members} Team Members</span>
              <span>{ws.tasks} Assigned Tasks</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
