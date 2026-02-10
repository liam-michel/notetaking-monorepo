import type { AddStrategyInput, IdInput } from '@cs2monorepo/shared'
import type { Logger } from 'pino'

import { Services } from '../create-strategies'

type StrategyUseCaseDeps = {
  logger: Logger
  services: Services
}

export type StrategyUseCases = ReturnType<typeof createStrategyUseCases>

export function createStrategyUseCases({ logger, services }: StrategyUseCaseDeps) {
  return {
    createStrategy: async (data: AddStrategyInput) => {
      logger.info('Use case: Creating strategy with data: %o', data)
      return services.strategy.createStrategy(data)
    },
    softDeleteStrategy: async (data: IdInput) => {
      logger.info('Use case: Soft deleting strategy with id: %o', data)
      return services.strategy.softDeleteStrategy(data)
    },
    deleteStrategy: async (data: IdInput) => {
      logger.info('Use case: Deleting strategy with id: %o', data)
      return services.strategy.deleteStrategy(data)
    },
  }
}
