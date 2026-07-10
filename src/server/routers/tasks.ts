// ==========================================
// FILE: src/server/routers/tasks.ts
// PRIMARY DEVELOPER: Vijesh (Backend & Database Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (tRPC/Zod), Santosh (Middleware & Security)
// FOCUS: Task Engine, Ingestion Pipelines, Auto-Assignment algorithm
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Task Lifecycle: operations to create, allocate, process, and complete tasks.
// 2. Skill-Based Auto-Assignment Engine: match work units to members based on active
//    workloads, historical speeds, and skill profile scores (1-100 index).
// 3. User Leveling System: calculate XP increments upon completions and adjust member
//    levels (specialist/expert) along with collaboration metrics.
// 4. Record developer code sandbox details and update statuses (e.g. IN_SANDBOX).
// ==========================================

import { z } from "zod";
import { router, protectedProcedure, createWorkspaceProcedure } from "../trpc";
import { TaskStatus, TaskCategory, WorkspaceRole } from "@prisma/client";

export const tasksRouter = router({
  // Create task manually
  create: createWorkspaceProcedure([WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MANAGER])
    .input(
      z.object({
        workspaceId: z.string(),
        projectId: z.string(),
        title: z.string(),
        description: z.string().optional(),
        category: z.nativeEnum(TaskCategory),
        dueDate: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          category: input.category,
          projectId: input.projectId,
          workspaceId: input.workspaceId,
          dueDate: input.dueDate ? new Date(input.dueDate) : null,
        },
      });
    }),

  // List workspace tasks
  list: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.task.findMany({
        where: { workspaceId: input.workspaceId },
        include: {
          submissions: true,
          fileWorkUnits: true,
        },
      });
    }),

  // File Ingestion Pipeline & Auto-Assignment Algorithm trigger
  ingestFileAndAssign: createWorkspaceProcedure([WorkspaceRole.OWNER, WorkspaceRole.MANAGER])
    .input(
      z.object({
        workspaceId: z.string(),
        taskId: z.string(),
        rowCount: z.number(),
        category: z.nativeEnum(TaskCategory),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // 1. Parse and create file work units
      const workUnitsData = Array.from({ length: input.rowCount }).map((_, idx) => ({
        taskId: input.taskId,
        rowNumber: idx + 1,
        rawData: { info: `Mock parsed excel row ${idx + 1}` },
      }));

      await ctx.db.fileWorkUnit.createMany({
        data: workUnitsData,
      });

      // 2. Core Auto-Assignment Algorithm
      // Fetch all workspace members
      const members = await ctx.db.workspaceMember.findMany({
        where: { workspaceId: input.workspaceId },
        include: {
          user: {
            include: {
              skillProfiles: {
                where: { category: input.category },
              },
            },
          },
        },
      });

      if (members.length === 0) return { success: false, reason: "No members available for auto-assignment" };

      // Calculate candidate scores based on:
      // - Skill Score (50%)
      // - Collaboration rating (25%)
      // - Current task load / workload capacity (25% - inverse loading)
      const memberScores = await Promise.all(
        members.map(async (member) => {
          const activeTasks = await ctx.db.task.count({
            where: {
              workspaceId: input.workspaceId,
              assignedTo: member.id,
              status: { notIn: [TaskStatus.COMPLETED, TaskStatus.BLOCKED] },
            },
          });

          const skillProfile = member.user.skillProfiles[0];
          const skillScore = skillProfile ? skillProfile.score : 50;

          // Inverse task loading: fewer active tasks gives a higher score modifier
          const loadScore = Math.max(0, 100 - activeTasks * 15);
          const finalScore = skillScore * 0.5 + member.collaborationScore * 0.25 + loadScore * 0.25;

          return { memberId: member.id, finalScore };
        })
      );

      // Sort members by score descending
      memberScores.sort((a, b) => b.finalScore - a.finalScore);
      const bestCandidate = memberScores[0]?.memberId;

      if (bestCandidate) {
        await ctx.db.task.update({
          where: { id: input.taskId },
          data: {
            assignedTo: bestCandidate,
            status: TaskStatus.IN_PROGRESS,
          },
        });
      }

      return { success: true, assignedTo: bestCandidate };
    }),

  // Complete task & trigger leveling system increments
  completeTask: protectedProcedure
    .input(z.object({ workspaceId: z.string(), taskId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.findUnique({
        where: { id: input.taskId },
      });

      if (!task || !task.assignedTo) {
        throw new Error("Task does not exist or has no active assignee to credit");
      }

      // Mark task as completed
      const updatedTask = await ctx.db.task.update({
        where: { id: input.taskId },
        data: { status: TaskStatus.COMPLETED },
      });

      // Update XP, Level, and Collaboration metrics of the assignee
      const member = await ctx.db.workspaceMember.findUnique({
        where: { id: task.assignedTo },
      });

      if (member) {
        const newXp = member.xp + task.points;
        const newLevel = Math.floor(newXp / 100) + 1; // 100 XP per level
        const levelDrift = newLevel > member.level;

        await ctx.db.workspaceMember.update({
          where: { id: member.id },
          data: {
            xp: newXp,
            level: newLevel,
            collaborationScore: Math.min(100.0, member.collaborationScore + 2.5),
          },
        });
      }

      return updatedTask;
    }),
});
