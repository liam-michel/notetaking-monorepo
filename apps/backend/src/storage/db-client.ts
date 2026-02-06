import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export function createPrismaClient(connectionString: string): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: { url: connectionString },
    } as Prisma.PrismaClientOptions['datasources'],
  })
}
