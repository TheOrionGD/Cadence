// ==========================================
// FILE: src/server/agents/reassignment-agent.ts
// PRIMARY DEVELOPER: Godfrey (Lead Full-Stack Architect)
// CO-DEVELOPERS / COLLABORATORS: Vijesh (DB Sync), Santosh (Sandboxing)
// FOCUS: Workloads balancing, Auto-reallocations trigger, Google ADK logic
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Embody a specialized Google ADK agent: implement `perceive`, `reason`, `act` hooks.
// 2. Capacity Balancer: monitor active task quantities assigned to workspace members.
// 3. Trigger workload transfers if member capacities exceed allocation thresholds.
// ==========================================

import { db } from "@/server/db";
import { TaskStatus } from "@prisma/client";

export class ReassignmentAgent {
  name = "ADKReassignmentAgent";

  // 1. Perceive: Scan workloads capacity states
  async perceive(workspaceId: string) {
    console.log(`[${this.name}] Auditing workload capacities in workspace ${workspaceId}...`);
    
    const members = await db.workspaceMember.findMany({
      where: { workspaceId },
      include: {
        user: true,
      },
    });

    return Promise.all(
      members.map(async (member) => {
        const load = await db.task.count({
          where: {
            workspaceId,
            assignedTo: member.id,
            status: { notIn: [TaskStatus.COMPLETED, TaskStatus.BLOCKED] },
          },
        });
        return { memberId: member.id, load };
      })
    );
  }

  // 2. Reason: Identify overloaded members (e.g. active tasks >= 5)
  async reason(workloads: Array<{ memberId: string; load: number }>) {
    const overloaded = workloads.filter((w) => w.load >= 5);
    const underloaded = workloads.filter((w) => w.load <= 1);

    if (overloaded.length > 0 && underloaded.length > 0) {
      console.log(`[${this.name}] Reason: Identified load imbalances. Rebalancing required.`);
      return {
        rebalance: true,
        source: overloaded[0].memberId,
        target: underloaded[0].memberId,
      };
    }

    return { rebalance: false };
  }

  // 3. Act: execute transfer mutations and write audit logs
  async act(workspaceId: string, instruction: { rebalance: boolean; source?: string; target?: string }) {
    if (!instruction.rebalance || !instruction.source || !instruction.target) {
      return { success: false, action: "NONE" };
    }

    // Find one active task to transfer
    const taskToTransfer = await db.task.findFirst({
      where: {
        workspaceId,
        assignedTo: instruction.source,
        status: { notIn: [TaskStatus.COMPLETED, TaskStatus.BLOCKED] },
      },
    });

    if (taskToTransfer) {
      await db.task.update({
        where: { id: taskToTransfer.id },
        data: { assignedTo: instruction.target },
      });

      await db.activityLog.create({
        data: {
          workspaceId,
          userId: "SYSTEM_ADK_AGENT",
          action: "AUTO_REASSIGN_WORKLOAD",
          details: `ReassignmentAgent: Transfered task ${taskToTransfer.id} from ${instruction.source} to ${instruction.target} due to overloading limits.`,
        },
      });
      return { success: true, taskTransferred: taskToTransfer.id };
    }

    return { success: false, action: "NO_TRANSFERS_EXECUTED" };
  }
}
