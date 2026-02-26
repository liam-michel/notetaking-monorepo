import redis from 'ioredis'

export type RedisFactoryParams = {
  host: string
  port: number
  password?: string
}

export const createRedisClient = (params: RedisFactoryParams) => {
  const { host, port, password } = params
  return new redis({
    host,
    port,
    password: password ?? undefined,
  })
}
