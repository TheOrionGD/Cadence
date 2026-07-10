// ==========================================
// FILE: src/utils/trpc.ts
// PRIMARY DEVELOPER: Godfrey (Lead Full-Stack Architect)
// CO-DEVELOPERS / COLLABORATORS: Vijesh (DB Sync), Santosh (Sandboxing)
// FOCUS: tRPC client utilities, React hooks binding, TanStack Query integration
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Generate client React hooks (e.g. `trpc.useQuery`, `trpc.useMutation`) from the backend AppRouter type.
// 2. Configure request link transport headers pointing to the correct API endpoint `/api/trpc`.
// 3. Coordinate with TanStack Query clients to orchestrate state updates and caches.
// ==========================================

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/routers/_app";

export const trpc = createTRPCReact<AppRouter>();

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL; // production config
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev fallback
};
