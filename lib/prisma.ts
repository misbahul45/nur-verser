import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

if (!connectionString.startsWith('postgresql://') && !connectionString.startsWith('postgres://')) {
  throw new Error('DATABASE_URL must start with postgresql:// or postgres://');
}

const prisma = global.prisma || new PrismaClient({
  datasourceUrl: connectionString,
});

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;