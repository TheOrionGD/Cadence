// ==========================================
// FILE: src/app/workspaces/[workspaceId]/skills/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Skill Profile Charts, Interactive modifier dashboards, Team progress
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Fetch team member profiles via tRPC queries including skill categories.
// 2. Render beautiful bar/radar chart representations of skill ratings (1-100 score).
// 3. Provide managers with slide controls adjusting default routing weighting ratios.
// 4. Connect toggle buttons enabling/disabling the Auto-Assignment Engine.
// ==========================================

// Mock data for skill profiles
const mockTeamSkills = [
  { name: "Godfrey", level: 4, skills: { DATA_CLEANUP: 90, QA_REVIEW: 85, CONTENT_TAGGING: 70, CLAIMS_PROCESSING: 60, OCR_REVIEW: 95 } },
  { name: "Yuvaraj", level: 3, skills: { DATA_CLEANUP: 60, QA_REVIEW: 80, CONTENT_TAGGING: 95, CLAIMS_PROCESSING: 50, OCR_REVIEW: 70 } },
  { name: "Vijesh", level: 4, skills: { DATA_CLEANUP: 95, QA_REVIEW: 70, CONTENT_TAGGING: 60, CLAIMS_PROCESSING: 90, OCR_REVIEW: 85 } },
  { name: "Santosh", level: 3, skills: { DATA_CLEANUP: 80, QA_REVIEW: 95, CONTENT_TAGGING: 80, CLAIMS_PROCESSING: 75, OCR_REVIEW: 80 } },
];

export default function WorkspaceSkillsPage({
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
          <a
            href={`/workspaces/${params.workspaceId}`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            Tasks Dashboard
          </a>
          <a
            href={`/workspaces/${params.workspaceId}/skills`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400"
          >
            Skill Profiles
          </a>
          <a
            href={`/workspaces/${params.workspaceId}/portfolio`}
            className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            Agency Portfolio
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Team Skill Profiles</h2>
            <p className="mt-1 text-sm text-slate-400">Review team competencies driving the automatic work routing engine</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <span className="text-xs text-slate-400">Auto-Assignment Engine:</span>
            <button className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
              ENABLED
            </button>
          </div>
        </div>

        {/* Skill Profile Details */}
        <div className="space-y-8">
          {mockTeamSkills.map((member) => (
            <div key={member.name} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">Productivity Level: {member.level}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-800 rounded-lg text-slate-400">
                  XP Sync Verified
                </span>
              </div>

              {/* Skills Visualization Grid */}
              <div className="space-y-4">
                {Object.entries(member.skills).map(([category, rating]) => (
                  <div key={category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span className="font-mono">{category.replace("_", " ")}</span>
                      <span>{rating}%</span>
                    </div>
                    {/* Visual Bar representation */}
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                        style={{ width: `${rating}%` }}
                      />
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
