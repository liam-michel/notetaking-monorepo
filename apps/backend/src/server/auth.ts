import { betterAuth } from 'better-auth'

import type { KyselyDB } from '../storage/types/types'

type BetterAuthDeps = {
  db: KyselyDB
  baseURL: string
  trustedOrigin: string
}

export type BetterAuth = ReturnType<typeof createBetterAuthSingleton>
export function createBetterAuthSingleton(deps: BetterAuthDeps) {
  const { db, baseURL, trustedOrigin } = deps
  return betterAuth({
    baseURL,
    trustedOrigins: [trustedOrigin],
    database: {
      db: db,
      type: 'postgres',
    },
    user: {
      modelName: 'User',
      additionalFields: {
        role: {
          type: 'string',
          required: false,
          defaultValue: 'USER',
        },
      },
    },
    session: { modelName: 'Session' },
    account: { modelName: 'Account' },
    verification: { modelName: 'Verification' },
    emailAndPassword: {
      enabled: true,
    },
  })
}
