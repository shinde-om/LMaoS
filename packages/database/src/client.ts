import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  const error = new Error("DATABASE_URL environment variable is missing or empty.");
  console.error(`[DATABASE ERROR] ${error.message}`);
  if (typeof process !== "undefined" && typeof process.exit === "function") {
    process.exit(1);
  }
  throw error;
}

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000,
});

pool.on("error", (err: Error) => {
  console.error("[DATABASE ERROR] Unexpected error on idle client:", err);
});

export const connectionPromise = (async () => {
  try {
    const client = await pool.connect();
    client.release();
  } catch (err) {
    console.error(`[DATABASE ERROR] Failed to connect to database at ${connectionString}:`, err);
    if (typeof process !== "undefined" && typeof process.exit === "function") {
      process.exit(1);
    }
    throw err;
  }
})();

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;