// ==========================================
// FILE: src/app/login/page.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Authentication Container, Clerk UI embedding, Redirect routes
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Center a glassmorphic authentication container on the screen.
// 2. Embed the Clerk `<SignIn />` routing component, enabling passkeys and SSO.
// 3. Configure sign-in redirect paths pointing to `/workspaces` upon success.
// 4. Formulate fallbacks for guest/anonymous bypass for localized sandboxing.
// ==========================================

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to Cadence</h2>
          <p className="mt-2 text-sm text-slate-400">Sign in to manage your workspaces and auto-assignments</p>
        </div>

        {/* 
          CLERK EMBED SKELETON:
          In production, we render Clerk's SignIn component:
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/signup" 
            forceRedirectUrl="/workspaces" 
          />
        */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4 text-center">
            <span className="text-xs text-slate-400 block mb-2 font-mono">[Clerk Sign-In Component Area]</span>
            <div className="py-8 border border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-500 text-sm">
              Social Auth, Passkey, & SSO Login Panel
            </div>
          </div>

          <Link
            href="/workspaces"
            className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-semibold text-center block transition-all"
            id="btn-bypass-auth"
          >
            Bypass & View Workspaces (Demo Mode)
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
