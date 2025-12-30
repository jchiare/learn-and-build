import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const globalForDb = global as unknown as { db: ReturnType<typeof drizzle> };

function createDrizzleClient() {
  const connectionString = process.env.DATABASE_URL!;
  const client = postgres(connectionString, { prepare: false });
  return drizzle(client, { schema });
}

export const db = globalForDb.db || createDrizzleClient();

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;
