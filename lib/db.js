import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// If you want to export the 'db' variable as well, you can do this:
export const db = prisma;
