// ==========================================
// FILE: prisma/seed.ts
// PRIMARY DEVELOPER: Vijesh (Database & Storage Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (tRPC/Zod), Santosh (Middleware & Security)
// FOCUS: Seed datasets deploy, Workspace structure setup, Migration verification
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Transactionally purge database tables before running imports to prevent primary key conflicts.
// 2. Generate standard workspace roles (Owner, Admin, Member, Contributor) inside mock environments.
// 3. Seed active skill profiles for team members (Godfrey, Yuvaraj, Vijesh, Santosh).
// 4. Create projects and mock tasks lists to populate dashboards.
// ==========================================

import { PrismaClient, WorkspaceRole, TaskCategory, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Clean existing records
  await prisma.activityLog.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.fileWorkUnit.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.skillProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database tables purged.");

  // 2. Create Users
  const user1 = await prisma.user.create({ data: { email: "godfrey@cadence.sh", name: "Godfrey" } });
  const user2 = await prisma.user.create({ data: { email: "yuvaraj@cadence.sh", name: "Yuvaraj" } });
  const user3 = await prisma.user.create({ data: { email: "vijesh@cadence.sh", name: "Vijesh" } });
  const user4 = await prisma.user.create({ data: { email: "santosh@cadence.sh", name: "Santosh" } });

  // 3. Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: "Acme Team Workspace",
      slug: "acme-team",
    },
  });

  // 4. Add Members & Roles
  const mem1 = await prisma.workspaceMember.create({
    data: { workspaceId: workspace.id, userId: user1.id, role: WorkspaceRole.OWNER, xp: 250, level: 3, collaborationScore: 98.0 },
  });
  const mem2 = await prisma.workspaceMember.create({
    data: { workspaceId: workspace.id, userId: user2.id, role: WorkspaceRole.ADMIN, xp: 120, level: 2, collaborationScore: 95.0 },
  });
  const mem3 = await prisma.workspaceMember.create({
    data: { workspaceId: workspace.id, userId: user3.id, role: WorkspaceRole.MEMBER, xp: 90, level: 1, collaborationScore: 88.0 },
  });
  const mem4 = await prisma.workspaceMember.create({
    data: { workspaceId: workspace.id, userId: user4.id, role: WorkspaceRole.MANAGER, xp: 180, level: 2, collaborationScore: 92.0 },
  });

  // 5. Seed Skill Profiles
  await prisma.skillProfile.createMany({
    data: [
      { userId: user1.id, category: TaskCategory.DEVELOPMENT, score: 95 },
      { userId: user2.id, category: TaskCategory.CONTENT_TAGGING, score: 90 },
      { userId: user3.id, category: TaskCategory.DATA_CLEANUP, score: 95 },
      { userId: user4.id, category: TaskCategory.QA_REVIEW, score: 95 },
    ],
  });

  // 6. Create Projects & Tasks
  const project = await prisma.project.create({
    data: {
      workspaceId: workspace.id,
      name: "Core Ingestion Engine",
      description: "Build file processing pipelines and auto allocation hooks.",
    },
  });

  await prisma.task.create({
    data: {
      workspaceId: workspace.id,
      projectId: project.id,
      title: "OCR Verification invoice parser",
      description: "Implement invoice row OCR mapping and validation suites.",
      category: TaskCategory.OCR_REVIEW,
      status: TaskStatus.TODO,
      points: 40,
    },
  });

  await prisma.task.create({
    data: {
      workspaceId: workspace.id,
      projectId: project.id,
      title: "Setup API routing schema",
      description: "Create tRPC routers and next.js handler boundaries.",
      category: TaskCategory.DEVELOPMENT,
      status: TaskStatus.COMPLETED,
      assignedTo: mem1.id,
      points: 50,
    },
  });

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error occurred during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
