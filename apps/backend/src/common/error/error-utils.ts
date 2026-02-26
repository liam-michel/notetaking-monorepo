import type { Logger } from 'pino'

import { InternalServerError } from './errors'
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

        throw new InternalServerError('An unexpected error occurred')
      }
    },
  }
}
