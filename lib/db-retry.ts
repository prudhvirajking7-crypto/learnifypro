import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "./prisma";

const RETRYABLE_CODES = new Set(["P1001", "P1002", "P1008", "P1017"]);
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

export async function withDbRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      const isInitError = err instanceof PrismaClientInitializationError;
      const isRetryableRequest =
        err instanceof PrismaClientKnownRequestError && RETRYABLE_CODES.has(err.code);

      if (!isInitError && !isRetryableRequest) throw err;

      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * attempt;
        console.warn(`[db-retry] DB unreachable (attempt ${attempt}/${MAX_RETRIES}), retrying in ${delay}ms…`);
        await new Promise((r) => setTimeout(r, delay));

        // Force Prisma to reconnect on next query
        try { await prisma.$disconnect(); } catch {}
      }
    }
  }

  throw lastError;
}
