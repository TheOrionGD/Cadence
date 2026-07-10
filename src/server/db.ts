// ==========================================
// FILE: src/server/db.ts
// PRIMARY DEVELOPER: Vijesh (Database & Storage Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (tRPC/Zod), Santosh (Middleware & Security)
// FOCUS: PostgreSQL Schema Architecture, Client Initialization, Connection Pooling
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Maintain a single PrismaClient connection pool to avoid exhaustively opening
//    connections during hot module replacement (HMR) in Next.js development.
// 2. Attach the client to the Node.js global object in non-production environments.
// 3. Export a clean client instance for database queries across the API and agent scripts.
// ==========================================

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
