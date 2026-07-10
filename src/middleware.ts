// ==========================================
// FILE: src/middleware.ts
// PRIMARY DEVELOPER: Santosh (DevSecOps & QA Lead)
// CO-DEVELOPERS / COLLABORATORS: All Members (Unit & E2E Testing, Security Reviews)
// FOCUS: Authentication Gating, Security middleware, Clerk routing rules
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Enforce global authentication gating on all `/workspaces/:path*` sub-routes.
// 2. Allow public bypass for the home route (`/`), static assets, and login endpoint `/login`.
// 3. Configure Clerk route authorization checks redirecting to sign-in page if session is missing.
// ==========================================

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define matched paths requiring credentials
const isProtectedRoute = createRouteMatcher([
  "/workspaces(.*)",
  "/api/trpc(.*)", // Enforce auth on standard procedure requests
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html|css|js|gif|svg|png|jpg|jpeg|webp|ico|csv|txt)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
