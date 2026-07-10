// ==========================================
// FILE: src/app/layout.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Shell providers, Clerk authentication wrapper, Query client context
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Wrap the entire React tree in ClerkProvider to enforce authentication.
// 2. Wrap components in tRPCReactProvider and TanStack QueryProvider to handle server-state management.
// 3. Inject global style sheets (globals.css) and configure Inter typography.
// 4. Implement SEO best practices: descriptive metadata, title tags, and PWA tags.
// ==========================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cadence - Autonomous Work Orchestration",
  description: "Continuous self-balancing task allocation for teams working on datasets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-950 text-slate-100">
      <body className={`${inter.className} h-full antialiased`}>
        {/*
          MOCK PROVIDER SKELETON WRAPPERS:
          In full production, this children tree will be enclosed by:
          <ClerkProvider>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </trpc.Provider>
          </ClerkProvider>
        */}
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <span className="text-xl font-bold tracking-tight text-white">Cadence Platform</span>
              <nav className="flex space-x-4 text-sm text-slate-400">
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <a href="/workspaces" className="hover:text-white transition-colors">Workspaces</a>
              </nav>
            </div>
          </header>
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
