// ==========================================
// FILE: src/server/routers/workspaces.ts
// PRIMARY DEVELOPER: Vijesh (Backend & Database Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (tRPC/Zod), Santosh (Middleware & Security)
// FOCUS: Row-Level Security, Workspace CRUD, Member Role Operations
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. workspace CRUD: create, list, and delete workspaces.
// 2. Automatically assign WorkspaceRole.OWNER to the creator during workspace creation.
// 3. Enforce that only workspace Owners or Admins can invite/manage workspace members.
// 4. Client-workspace portfolio listing: provision metrics for System Admin overview.
// ==========================================

import { z } from "zod";
import { router, protectedProcedure, createWorkspaceProcedure } from "../trpc";
import { WorkspaceRole } from "@prisma/client";

export const workspacesRouter = router({
  // Create a new workspace
  create: protectedProcedure
    .input(z.object({ name: z.string().min(2), slug: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.db.workspace.create({
        data: {
          name: input.name,
          slug: input.slug,
          members: {
            create: {
              userId: ctx.userId,
              role: WorkspaceRole.OWNER,
            },
          },
        },
      });
      return workspace;
    }),

  // List user's active workspaces
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.workspace.findMany({
      where: {
        members: {
          some: {
            userId: ctx.userId,
          },
        },
      },
      include: {
        members: true,
      },
    });
  }),

  // Add member to workspace (requires Admin/Owner)
  addMember: createWorkspaceProcedure([WorkspaceRole.OWNER, WorkspaceRole.ADMIN])
    .input(z.object({ workspaceId: z.string(), targetUserEmail: z.string().email(), role: z.nativeEnum(WorkspaceRole) }))
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.db.user.findUnique({
        where: { email: input.targetUserEmail },
      });

      // Simple mock user provisioning if they do not exist
      if (!user) {
        user = await ctx.db.user.create({
          data: {
            email: input.targetUserEmail,
            name: input.targetUserEmail.split("@")[0],
          },
        });
      }

      return ctx.db.workspaceMember.create({
        data: {
          workspaceId: input.workspaceId,
          userId: user.id,
          role: input.role,
        },
      });
    }),

  // Get portfolio stats for System Admin cross-workspace overview
  getPortfolioMetrics: protectedProcedure
    .input(z.object({ clientWorkspaceIds: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      // Mock portfolio fetch: aggregate workspace tasks and member count
      const metrics = await ctx.db.workspace.findMany({
        where: {
          id: { in: input.clientWorkspaceIds },
        },
        include: {
          _count: {
            select: {
              members: true,
              tasks: true,
            },
          },
        },
      });
      return metrics;
    }),
});
