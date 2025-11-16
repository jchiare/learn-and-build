import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma Client with proper configuration for PgBouncer/Supabase
const createPrismaClient = () => {
  // Get the database URL and ensure it has proper PgBouncer parameters
  let databaseUrl = process.env.DATABASE_URL || '';

  // If using PgBouncer (Supabase pooler), ensure connection_limit and pool_timeout are set
  // This prevents "prepared statement 's0' already exists" errors
  if (databaseUrl.includes('pgbouncer=true')) {
    const url = new URL(databaseUrl);

    // Add connection_limit if not present (limits connections per instance)
    if (!url.searchParams.has('connection_limit')) {
      url.searchParams.set('connection_limit', '1');
    }

    // Add pool_timeout if not present (prevents connection pooling issues)
    if (!url.searchParams.has('pool_timeout')) {
      url.searchParams.set('pool_timeout', '0');
    }

    databaseUrl = url.toString();
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
};

// Use singleton pattern to prevent multiple instances
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Store in global to prevent hot-reload issues in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
