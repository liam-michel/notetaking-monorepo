import type { FastifyRequest } from 'fastify'
import { Logger } from 'pino'

import { createUseCaseExecutor, UseCaseExecutor } from '../common/error/useCaseExecutor'
import type { SafeUser } from '../common/schemas/user'
import { createServices } from '../services/create-services.ts'
import { createStrategyUseCases } from '../services/strategy/strategy.application'
import { createUserUseCases } from '../services/user/user.application'
import { createUtilityUseCases } from '../services/utility/utility.application'
import { Storage } from '../storage/storage'
export type AppContext = {
  user: SafeUser | null
  logger: Logger
  executor: UseCaseExecutor
  useCases: {
    strategy: ReturnType<typeof createStrategyUseCases>
    utility: ReturnType<typeof createUtilityUseCases>
    user: ReturnType<typeof createUserUseCases>
  }
}

export async function createContext({
  request,
  storage,
}: {
  request: FastifyRequest
  storage: Storage
}): Promise<AppContext> {
  const logger = request.requestLogger
  const user = request.authUser || null
  //create services
  const services = createServices({ storage, logger })
  //create all use cases and add to context
  const useCases = {
    strategy: createStrategyUseCases({ logger, services }),
    user: createUserUseCases({ logger, services }),
    utility: createUtilityUseCases({ logger, services }),
  }
  const executor = createUseCaseExecutor({ logger })
  return {
    user,
    logger,
    executor,
    useCases,
  }
}
