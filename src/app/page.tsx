// ==========================================
// FILE: src/app/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Responsive UI Landing Page, Interaction Elements, Navigation Redirects
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Showcase platform highlights: Skill-Based Auto-Assignment, Sandbox Execution,
//    Second-Brain Git Doc-Sync agent, and Agency Portfolio metrics dashboard.
// 2. Styled with vibrant glassmorphic gradients matching modern premium design schemes.
// 3. Provide call-to-action buttons redirecting users to login (/login) and workspaces selector (/workspaces).
// ==========================================

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Background radial highlight */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_50%)]" />

      <div className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
          Orchestrate Team Work <br />
          <span className="bg-gradient-to-r from-sky-400 via-teal-200 to-indigo-400 bg-clip-text text-transparent">
            Autonomously
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Cadence handles parsing large datasets, routing items to team members matching their exact skill profile scores, monitoring completion velocity, and executing code validation sandboxes in real time.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-sky-500 font-semibold text-white shadow-lg hover:bg-sky-400 hover:shadow-sky-500/20 active:scale-95 transition-all"
            id="btn-login-cta"
          >
            Access Platform
          </Link>
          <Link
            href="/workspaces"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-700 bg-slate-900/80 font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            id="btn-workspaces-cta"
          >
            View Workspaces
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-left backdrop-blur-sm">
            <div className="text-sky-400 font-semibold text-lg mb-2">Skill-Based Auto Assignment</div>
            <p className="text-sm text-slate-400">
              Matches unassigned rows dynamically based on team member capacity, completion speed, and category scores.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-left backdrop-blur-sm">
            <div className="text-teal-300 font-semibold text-lg mb-2">Embedded Test Sandboxes</div>
            <p className="text-sm text-slate-400">
              Runs submitted code snippets in containerized sandboxes automatically reporting test assertions logs.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-left backdrop-blur-sm">
            <div className="text-indigo-400 font-semibold text-lg mb-2">Second-Brain Doc Sync</div>
            <p className="text-sm text-slate-400">
              Agentic documentation tracker analyzing Git changes to detect architectural drifts and file doc updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
