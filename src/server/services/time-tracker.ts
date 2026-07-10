// ==========================================
// FILE: src/server/services/time-tracker.ts
// PRIMARY DEVELOPER: Vijesh (Database & Storage Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (tRPC/Zod), Santosh (Middleware & Security)
// FOCUS: Time tracking active log intervals, export sheets, capacity checking
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Maintain active timesheets track records linked to tasks lifecycle.
// 2. Export weekly hours reports per user and category types.
// ==========================================

import { db } from "@/server/db";

export class TimeTracker {
  // Record time spent on a task
  async logInterval(taskId: string, memberId: string, durationMinutes: number) {
    console.log(`[TimeTracker] Logging ${durationMinutes} mins on task ${taskId} for member ${memberId}...`);
    
    // Store timesheet details inside Task update logs
    return db.task.update({
      where: { id: taskId },
      data: {
        description: `Logged time: ${durationMinutes} mins.`,
      },
    });
  }
}
