import type { Logger } from 'pino'

import { IdInput } from '../../common/schemas'
import { Storage } from '../../storage/storage'
import { AddStrategyInput } from './schemas'

export type StrategyServiceDeps = {
  storage: Storage
  logger: Logger
}

export type StrategyService = {
  createStrategy: (data: AddStrategyInput) => ReturnType<Storage['strategy']['createStrategy']>
  softDeleteStrategy: (data: IdInput) => ReturnType<Storage['strategy']['softDeleteStrategy']>
  deleteStrategy: (data: IdInput) => ReturnType<Storage['strategy']['deleteStrategy']>
}

function createStrategy({ storage, logger }: StrategyServiceDeps) {
  return async function (data: AddStrategyInput) {
    logger.info('Creating a new strategy with data: %o', data)
    const strategy = await storage.strategy.createStrategy(data)
    // future business logic here
    return strategy
  }
}

function softDeleteStrategy({ storage, logger }: StrategyServiceDeps) {
  return async function (data: IdInput) {
    logger.info('Soft deleting a strategy with id: %o', data)
    return await storage.strategy.softDeleteStrategy(data)
  }
}

function deleteStrategy({ storage, logger }: StrategyServiceDeps) {
  return async function (data: IdInput) {
    logger.info('Deleting a strategy with id: %o', data)
    return await storage.strategy.deleteStrategy(data)
  }
}

export function createStrategyService(deps: StrategyServiceDeps): StrategyService {
  return {
    createStrategy: createStrategy(deps),
    softDeleteStrategy: softDeleteStrategy(deps),
    deleteStrategy: deleteStrategy(deps),
  }
}
