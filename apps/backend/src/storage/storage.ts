import { createStrategyStorage, StrategyStorageMethods } from '../services/strategy/strategy.storage'
import { createUserStorage, UserStorageMethods } from '../services/user/user.storage'
import { createUtilityStorage, UtilityStorageMethods } from '../services/utility/utility.storage'
import type { KyselyDB } from './types/types'

export type Storage = Readonly<{
  strategy: StrategyStorageMethods
  user: UserStorageMethods
  utility: UtilityStorageMethods
  transaction: <T>(callback: (repo: Readonly<Omit<Storage, 'transaction'>>) => Promise<T>) => Promise<T>
}>

export type Repo = Readonly<Omit<Storage, 'transaction'>>

function wrapKyselyDb(db: KyselyDB): Omit<Storage, 'transaction'> {
  return {
    strategy: createStrategyStorage(db),
    user: createUserStorage(db),
    utility: createUtilityStorage(db),
  }
}

export async function createPostgresStorage(db: KyselyDB): Promise<Storage> {
  return {
    ...wrapKyselyDb(db),
    transaction: async <T>(callback: (repo: Omit<Storage, 'transaction'>) => Promise<T>): Promise<T> => {
      return db.transaction().execute(async (trx) => {
        const trxRepo = wrapKyselyDb(trx)
        return callback(trxRepo)
      })
    },
  }
}
