// ==========================================
// FILE: src/app/workspaces/[workspaceId]/settings/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Brand Customizer, Member Role Configuration, Custom Fields builders
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. White-label customizer: fields configuring hex brand colors, custom domain slugs, and logo upload slots.
// 2. Role permission builders toggles allowing custom workspace role authorization mappings.
// 3. Custom Metadata Fields schemas generator for task tracking.
// 4. Save actions saving configs to Database settings endpoints.
// ==========================================

import Link from "next/link";

export default function WorkspaceSettingsPage({
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
          <a href={`/workspaces/${params.workspaceId}/settings`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-400">
            Settings & Branding
          </a>
          <a href={`/workspaces/${params.workspaceId}/skills`} className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            Skill Profiles
          </a>
        </nav>
      </aside>

      {/* Main Settings Page Content */}
      <section className="flex-1 p-6 md:p-8 space-y-10">
        {/* Title */}
        <div className="border-b border-slate-800 pb-6">
          <h2 className="text-2xl font-bold text-white">Branding & Workspace Settings</h2>
          <p className="mt-1 text-sm text-slate-400">Manage member role permissions, custom fields, and workspace branding</p>
        </div>

        {/* Section 1: White-Label Branding Customizer */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">White-Label Customizer</h3>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">Workspace Logo URL</label>
              <input
                type="text"
                placeholder="https://example.com/logo.png"
                className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">Custom Domain Slug</label>
              <input
                type="text"
                placeholder="company-workspace.cadence.sh"
                className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">Hex Brand Primary Color</label>
              <div className="flex space-x-3 items-center">
                <input
                  type="text"
                  placeholder="#0284c7"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all"
                />
                <div className="h-10 w-10 rounded-xl border border-slate-800" style={{ backgroundColor: "#0284c7" }} />
              </div>
            </div>
          </form>
        </div>

        {/* Section 2: Custom Role Mappings & Permissions */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Member Role Permissions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-800/40">
              <div>
                <span className="text-sm font-bold text-slate-200 block">Allow managers to reassign tasks</span>
                <span className="text-xs text-slate-500">Enable/disable task routing shifts override bounds</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 bg-slate-950 border border-slate-800 text-sky-500 rounded" />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-800/40">
              <div>
                <span className="text-sm font-bold text-slate-200 block">Require client approvals for COMPLETED state</span>
                <span className="text-xs text-slate-500">Force sign-off gating before task closure</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 bg-slate-950 border border-slate-800 text-sky-500 rounded" />
            </div>
          </div>
        </div>

        {/* Section 3: Custom Fields schema builder */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Task Custom Metadata Fields</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-500 pb-2 border-b border-slate-800">
              <div>Field Name</div>
              <div>Field Type</div>
              <div>Action</div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center text-sm">
              <div className="text-white font-semibold">Priority Level</div>
              <div className="text-slate-400 font-mono text-xs">Dropdown (High/Med/Low)</div>
              <button className="text-rose-400 hover:text-rose-300 text-xs font-semibold text-left">Remove Field</button>
            </div>
          </div>
          <button className="px-4 py-2 border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold rounded-lg text-xs transition-all">
            Add Custom Metadata Field
          </button>
        </div>
      </section>
    </div>
  );
}
