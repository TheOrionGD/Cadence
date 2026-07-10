// ==========================================
// FILE: src/server/trpc.ts
// PRIMARY DEVELOPER: Godfrey (Lead Full-Stack Architect)
// CO-DEVELOPERS / COLLABORATORS: Vijesh (DB Sync), Santosh (Sandboxing)
// FOCUS: System Architecture, tRPC Base, RBAC middlewares, Auth Context
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Establish the tRPC connection context, resolving Clerk sessions (userId, roles).
// 2. Export publicProcedure for unauthenticated actions (e.g. login).
// 3. Export protectedProcedure which halts request handling if auth credentials are missing.
// 4. Implement custom middleware procedures for RBAC roles (e.g. requireRole(WorkspaceRole.MANAGER)).
// ==========================================

import { initTRPC, TRPCError } from "@trpc/server";
import { db } from "./db";

// Simulated type for Clerk Auth Context
export interface CreateContextOptions {
  userId: string | null;
  email: string | null;
}

export const createTRPCContext = async (opts: CreateContextOptions) => {
  return {
    userId: opts.userId,
    email: opts.email,
    db,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to enforce login
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User session is invalid or missing" });
  }
  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

// Helper factory to verify workspace membership role (RBAC)
export const createWorkspaceProcedure = (requiredRoles: string[]) => {
  return protectedProcedure.use(async ({ ctx, input, next }) => {
    // Assuming workspaceId is passed as input.workspaceId
    const { workspaceId } = (input as any) || {};
    
    if (!workspaceId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Procedure input requires workspaceId to enforce RBAC",
      });
    }

    const member = await ctx.db.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: ctx.userId,
        },
      },
    });

    if (!member || !requiredRoles.includes(member.role)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "User lacks the required role to execute this workspace action",
      });
    }

    return next({
      ctx: {
        ...ctx,
        workspaceRole: member.role,
        workspaceMemberId: member.id,
      },
    });
  });
};
