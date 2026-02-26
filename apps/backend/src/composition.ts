//composition root

import pino from 'pino'

import { createRedisCache } from './redis/createRedisCache.js'
import { createRedisClient } from './redis/createRedisClient.js'
import { createBetterAuthSingleton } from './server/auth.js'
import { createTRPCRouter } from './server/routers/trpc.js'
import { createStrategyRouter } from './services/strategy/strategy.router.js'
import { createKyselyClient } from './storage/kysely-client.js'
import { createPostgresStorage } from './storage/storage.js'
import { parseEnv } from './utils/envConfig.js'

export async function setupApp() {
  //instantiate logger
  const logger = pino({ level: 'info' })
  //parse env variables
  const envVars = parseEnv({ logger })
  //instantiate router
  const t = createTRPCRouter()
  //database client
  const { db } = await createKyselyClient({
    connectionString: envVars.DATABASE_URL,
  })
  //redis client
  const redisClient = createRedisClient({
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
  })
  //redis cache interface
  const redisCache = createRedisCache({ redis: redisClient })
  //declare better-auth singleton
  const auth = createBetterAuthSingleton({
    db: db,
    baseURL: envVars.BETTERAUTH_URL,
    trustedOrigin: envVars.FRONTEND_URL,
  })
  //storage object initialized
  const storage = await createPostgresStorage(db)
  //use-case executor, to be used by all use-cases for consistent error handling

  //strategy router
  const strategyRouter = createStrategyRouter({
    t,
  })

  const appRouter = t.router({
    strategy: strategyRouter,
  })
  return {
    t,
    logger,
    storage,
    cache: redisCache,
    appRouter,
    auth,
  }
}

type SetupAppReturn = Awaited<ReturnType<typeof setupApp>>
export type AppRouter = SetupAppReturn['appRouter']
