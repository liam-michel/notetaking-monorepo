import type {
  AddStrategyApplicationInput,
  EditStrategyApplicationInput,
  IdInput,
  PaginationInput,
} from '@cs2monorepo/shared'
import type { Logger } from 'pino'

import { NotFoundError, UnauthorizedError } from '../../common/error/errors'
import { Repo } from '../../storage/storage'
export type StrategyServiceDeps = {
  storage: Repo
  logger: Logger
}

export type StrategyService = {
  getUsersStrategies: (data: IdInput) => ReturnType<Repo['strategy']['getUsersStrategies']>
  getUsersStrategiesPaginated: (
    data: IdInput & PaginationInput,
  ) => ReturnType<Repo['strategy']['getUsersStrategiesPaginated']>
  createStrategy: (data: AddStrategyApplicationInput) => ReturnType<Repo['strategy']['createStrategy']>
  editStrategy: (data: AddStrategyApplicationInput & IdInput) => ReturnType<Repo['strategy']['editStrategy']>
  softDeleteStrategy: (data: IdInput & { userId: string }) => ReturnType<Repo['strategy']['softDeleteStrategy']>
  deleteStrategy: (data: IdInput & { userId: string }) => ReturnType<Repo['strategy']['deleteStrategy']>
}

function getUsersStrategies({ storage }: StrategyServiceDeps) {
  return async function (data: IdInput) {
    return storage.strategy.getUsersStrategies(data)
  }
}

function getUsersStrategiesPaginated({ storage }: StrategyServiceDeps) {
  return async function (data: IdInput & PaginationInput) {
    return storage.strategy.getUsersStrategiesPaginated(data)
  }
}

function createStrategy({ storage }: StrategyServiceDeps) {
  return async function (data: AddStrategyApplicationInput) {
    return storage.strategy.createStrategy(data)
  }
}

function editStrategy({ storage, logger }: StrategyServiceDeps) {
  return async function (data: EditStrategyApplicationInput & { userId: string }) {
    const strategy = await storage.strategy.getStrategyRaw({ id: data.id })
    if (!strategy) {
      logger.warn({ strategyId: data.id }, 'Strategy not found')
      throw new NotFoundError('Strategy not found')
    }
    if (strategy.userId !== data.userId) {
      logger.warn({ userId: data.userId, strategyId: data.id }, 'Unauthorized edit attempt')
      throw new UnauthorizedError('You are not authorized to edit this strategy')
    }
    return storage.strategy.editStrategy(data)
  }
}

function softDeleteStrategy({ storage, logger }: StrategyServiceDeps) {
  return async function (data: IdInput & { userId: string }) {
    const strategy = await storage.strategy.getStrategyRaw({ id: data.id })
    if (!strategy) {
      logger.warn({ strategyId: data.id }, 'Strategy not found')
      throw new NotFoundError('Strategy not found')
    }
    if (strategy.userId !== data.userId) {
      logger.warn({ userId: data.userId, strategyId: data.id }, 'Unauthorized soft delete attempt')
      throw new UnauthorizedError('You are not authorized to delete this strategy')
    }
    return storage.strategy.softDeleteStrategy(data)
  }
}

function deleteStrategy({ storage, logger }: StrategyServiceDeps) {
  return async function (data: IdInput & { userId: string }) {
    const strategy = await storage.strategy.getStrategyRaw({ id: data.id })
    if (!strategy) {
      logger.warn({ strategyId: data.id }, 'Strategy not found')
      throw new NotFoundError('Strategy not found')
    }
    if (strategy.userId !== data.userId) {
      logger.warn({ userId: data.userId, strategyId: data.id }, 'Unauthorized delete attempt')
      throw new UnauthorizedError('You are not authorized to delete this strategy')
    }
    return storage.strategy.deleteStrategy(data)
  }
}

export function createStrategyService(deps: StrategyServiceDeps): StrategyService {
  const { logger, storage } = deps
  const log = logger.child({ layer: 'service', domain: 'strategy' })
  return {
    getUsersStrategies: getUsersStrategies({ storage, logger: log }),
    getUsersStrategiesPaginated: getUsersStrategiesPaginated({ storage, logger: log }),
    createStrategy: createStrategy({ storage, logger: log }),
    editStrategy: editStrategy({ storage, logger: log }),
    softDeleteStrategy: softDeleteStrategy({ storage, logger: log }),
    deleteStrategy: deleteStrategy({ storage, logger: log }),
  }
}
