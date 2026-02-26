import { IdInput } from '@cs2monorepo/shared'

import { SafeUser } from '../../common/schemas/user'
import type { KyselyDB } from '../../storage/types/types'
export type UserStorageMethods = {
  findById: (data: IdInput) => Promise<SafeUser | null>
}

function findById(db: KyselyDB) {
  return async function (data: IdInput): Promise<SafeUser | null> {
    const result = await db.selectFrom('User').where('id', '=', data.id).selectAll().executeTakeFirst()
    if (!result) {
      return null
    }
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
    }
  }
}

export function createUserStorage(db: KyselyDB): UserStorageMethods {
  return {
    findById: findById(db),
  }
}
