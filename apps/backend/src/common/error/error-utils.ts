import { Prisma } from '@prisma/client'
import type { Logger } from 'pino'

import { ConflictError, DatabaseError, InternalServerError, NotFoundError } from './errors'
import { DomainError } from './errors'
type UseCaseExecutorDeps = {
  logger: Logger
}

export type UseCaseExecutor = ReturnType<typeof createUseCaseExecutor>

export function createUseCaseExecutor({ logger }: UseCaseExecutorDeps) {
  return {
    execute: async function <TOutput>(name: string, useCasePromise: Promise<TOutput>): Promise<TOutput> {
      const startTime = Date.now()
      try {
        logger.info({ msg: 'Executing use case', name })
        const result = await useCasePromise
        const duration = Date.now() - startTime
        logger.info({ msg: 'Use case executed successfully', name, duration })
        return result
      } catch (error) {
        logger.error({ msg: `Error executing use case: ${name}`, error }) // Already a domain error - let it bubble up untouched
        if (error instanceof DomainError) throw error
        //check for prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2002': {
              const fields = (error.meta?.target as string[]) ?? []
              throw new ConflictError(`A record with this ${fields.join(', ')} already exists`, fields)
            }
            case 'P2003':
              throw new NotFoundError(`Related record not found for ${error.meta?.field_name || 'unknown field'}`)
            case 'P2025':
              throw new NotFoundError('Record not found')
            default:
              throw new DatabaseError('A database error occurred')
          }
        }
        throw new InternalServerError('An unexpected error occurred')
      }
    },
  }
}
