import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

const PRISMA_CONNECTION_ERROR_CODES = new Set(["P1001", "P1002", "P1017", "P2024"]);

export function isPrismaConnectionError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return PRISMA_CONNECTION_ERROR_CODES.has(error.code);
  }

  if (error instanceof Error) {
    return /can't reach database server|connection|timed out|ECONNREFUSED/i.test(error.message);
  }

  return false;
}

export async function withPrismaFallback<T>(
  query: () => Promise<T>,
  fallback: T,
  scope: string
) {
  try {
    return await query();
  } catch (error) {
    if (!isPrismaConnectionError(error)) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[prisma-fallback] ${scope}: ${message}`);
    return fallback;
  }
}
