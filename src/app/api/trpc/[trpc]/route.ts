// ==========================================
// FILE: src/app/api/trpc/[trpc]/route.ts
// PRIMARY DEVELOPER: Godfrey (Lead Full-Stack Architect)
// CO-DEVELOPERS / COLLABORATORS: Vijesh (DB Sync), Santosh (Sandboxing)
// FOCUS: Next.js API Route Handler, tRPC HTTP Server boundary, Context resolvers
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Expose tRPC routers through the standard Next.js App Router API directory.
// 2. Fetch context parameters extracting headers and cookies (Resolves Clerk session details).
// 3. Mount handlers for GET and POST HTTP requests mapping to `fetchRequestHandler`.
// ==========================================

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers/_app";
import { createTRPCContext } from "@/server/trpc";
import { NextRequest } from "next/server";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        // Extract session headers in production
        userId: req.headers.get("x-user-id"), 
        email: req.headers.get("x-user-email"),
      }),
  });

export { handler as GET, handler as POST };
