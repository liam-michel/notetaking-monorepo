import { Strategy } from '@prisma/client'

import { IdInput } from '../../common/schemas'
import type { DbClient } from '../../storage/types'
import { AddStrategyInput } from './schemas'

export type StrategyMethods = {
  createStrategy: (data: AddStrategyInput) => Promise<Strategy>
  softDeleteStrategy: (data: IdInput) => Promise<string>
  deleteStrategy: (data: IdInput) => Promise<string>
}

export type StrategyStorage = Readonly<{
  strategy: StrategyMethods
  transaction: <T>(callback: (repo: Readonly<Omit<StrategyStorage, 'transaction'>>) => Promise<T>) => Promise<T>
}>

function createStrategy(db: DbClient) {
  return async function (data: AddStrategyInput): Promise<Strategy> {
    return db.strategy.create({
      data: {
        name: data.name,
        description: data.description,
        mapId: data.map,
        side: data.side,
        difficulty: data.difficulty,
        economies: {
          create: data.economy.map((economy) => ({
            economy: economy, // Changed from type: economy.type
          })),
        },
      },
      include: {
        economies: true,
        map: true,
      },
    })
  }
}

function softDeleteStrategy(db: DbClient) {
  return async function (data: IdInput): Promise<string> {
    await db.strategy.update({
      where: { id: data.id },
      data: { deletedAt: new Date() },
    })
    return data.id
  }
}

function deleteStrategy(db: DbClient) {
  return async function (data: IdInput): Promise<string> {
    await db.strategy.delete({
      where: { id: data.id },
    })
    return data.id
  }
}

export function createStrategyStorage(db: DbClient): StrategyMethods {
  return {
    createStrategy: createStrategy(db),
    softDeleteStrategy: softDeleteStrategy(db),
    deleteStrategy: deleteStrategy(db),
  }
}
