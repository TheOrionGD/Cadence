// ==========================================
// FILE: src/server/routers/_app.ts
// PRIMARY DEVELOPER: Godfrey (Lead Full-Stack Architect)
// CO-DEVELOPERS / COLLABORATORS: Vijesh (DB Sync), Santosh (Sandboxing)
// FOCUS: Core API Router, Schema Merging, Next.js API Integration
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Act as the root of the tRPC API structure.
// 2. Merge sub-routers (`workspaces`, `tasks`, `ai`) to form a single schema entry point.
// 3. Export the AppRouter type for full client-side type-safety in Next.js Server Components.
// ==========================================

import { router } from "../trpc";
import { workspacesRouter } from "./workspaces";
import { tasksRouter } from "./tasks";
import { aiRouter } from "./ai";

export const appRouter = router({
  workspaces: workspacesRouter,
  tasks: tasksRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
