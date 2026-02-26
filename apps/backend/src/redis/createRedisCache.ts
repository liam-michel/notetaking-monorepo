import type { Redis } from 'ioredis'
export interface Cache {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>
  del(key: string): Promise<void>
}

export type CreateRedisCacheParams = {
  redis: Redis
}

export function createRedisCache({ redis }: CreateRedisCacheParams): Cache {
  return {
    async get<T>(key: string) {
      const value = await redis.get(key)
      return value ? (JSON.parse(value) as T) : null
    },
    async set<T>(key: string, value: T, ttlSeconds?: number) {
      const str = JSON.stringify(value)
      if (ttlSeconds) await redis.set(key, str, 'EX', ttlSeconds)
      else await redis.set(key, str)
    },
    async del(key: string) {
      await redis.del(key)
    },
  }
}
