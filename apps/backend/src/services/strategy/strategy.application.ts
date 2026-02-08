import type { Logger } from 'pino'

import type { IdInput } from '../../common/schemas'
import { Storage } from '../../storage/storage'
import type { AddStrategyInput } from './schemas'
import { createStrategyService } from './strategy.service'

type Deps = {
  storage: Storage
  logger: Logger
}

export function createStrategyUseCases({ logger, storage }: Deps) {
  return {
    createStrategy: async (data: AddStrategyInput) => {
      logger.info('Use case: Creating strategy with data: %o', data)
      const strategyService = createStrategyService({ logger, storage })
      return strategyService.createStrategy(data)
    },
    softDeleteStrategy: async (data: IdInput) => {
      logger.info('Use case: Soft deleting strategy with id: %o', data)
      const strategyService = createStrategyService({ logger, storage })

      return strategyService.softDeleteStrategy(data)
    },
    deleteStrategy: async (data: IdInput) => {
      logger.info('Use case: Deleting strategy with id: %o', data)
      const strategyService = createStrategyService({ logger, storage })

      return strategyService.deleteStrategy(data)
    },
  }
}
