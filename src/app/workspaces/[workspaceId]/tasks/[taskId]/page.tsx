// ==========================================
// FILE: src/app/workspaces/[workspaceId]/tasks/[taskId]/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Task Details, Code Upload UI, Sandbox Execution Trigger
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Show task details: metadata, assignee info, category type, and completion points.
// 2. Build code submission client forms allowing paste syntax snippets or repository links.
// 3. Mount the isolated code runner console (`<SandboxTerminal />`) executing tests.
// 4. Connect to tRPC endpoints (`tasks.completeTask` and compatibility check listings).
// ==========================================

import SandboxTerminal from "@/components/sandbox-terminal";

export default function TaskDetailPage({
  params,
}: {
  params: { workspaceId: string; taskId: string };
}) {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
      <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
        <a href={`/workspaces/${params.workspaceId}`} className="hover:text-slate-300">Dashboard</a>
        <span>&rarr;</span>
        <span className="text-slate-400">Task Detail</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Columns: Task details & Code Submission form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 uppercase tracking-wider font-mono">
                DEVELOPMENT
              </span>
              <span className="text-sm font-semibold text-emerald-400">100 Completion Points</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Claims Ingestion verification</h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Write a validation parser for raw claims items. The parser must check formatting, identify duplicates, and assert schema correctness. Validate against local test fixtures.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 text-xs border-t border-slate-800/80 pt-6">
              <div>
                <span className="text-slate-500 block">Current Status</span>
                <span className="font-semibold text-amber-400 mt-1 block">IN SANDBOX</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned Developer</span>
                <span className="font-semibold text-slate-300 mt-1 block">Vijesh</span>
              </div>
            </div>
          </div>

          {/* Submission Panel */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8">
            <h3 className="text-xl font-bold text-white mb-4">Submit Code Artifact</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 block">Git Repository URL</label>
                <input
                  type="text"
                  placeholder="https://github.com/user/project-branch"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 block">Code Snippet (Paste Verification)</label>
                <textarea
                  rows={6}
                  placeholder="// Paste claim parser function here..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-semibold text-center block transition-all"
              >
                Send to Test Sandbox
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: In-Platform Sandbox Terminal Console */}
        <div className="lg:col-span-1">
          <div className="h-full flex flex-col rounded-3xl border border-slate-800 bg-slate-900/30 p-6">
            <h3 className="text-lg font-bold text-white mb-2">Sandbox Test Console</h3>
            <p className="text-xs text-slate-400 mb-6">Runs submitted assets inside isolated containers</p>

            <div className="flex-1 flex flex-col">
              <SandboxTerminal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
