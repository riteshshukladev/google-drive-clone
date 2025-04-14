import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { createPool, type Pool } from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
  conn: Pool | undefined;
};

const conn = globalForDb.conn ?? createPool({

  user: env.SINGLESTORE_USER,
  password: env.SINGLESTORE_PASS,
  port: Number(env.SINGLESTORE_PORT),
  host: env.SINGLESTORE_HOST,
  database: env.SINGLESTORE_DB, // Added database connection
  ssl: {},
  maxIdle: 0,
  waitForConnections: true,
  connectionLimit: 10,
})
export const client =
  globalForDb.client ?? createClient({ url: env.DATABASE_URL });
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
