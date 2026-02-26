import { assert } from 'node:console'

import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import pg from 'pg'

import type { DB } from '../__generated__/database'

export type KyselyClientParams = {
  connectionString: string
}
async function checkPostgresConnection(pool: pg.Pool): Promise<boolean> {
  return pool
    .query('SELECT 1 AS one')
    .then(() => true)
    .catch(() => false)
}

export const createKyselyClient = async (params: KyselyClientParams) => {
  const { connectionString } = params
  const pool = new Pool({
    connectionString: connectionString,
    max: 10,
  })

  const dialect = new PostgresDialect({
    pool,
  })

  const db = new Kysely<DB>({
    dialect,
  })
  const isConnected = await checkPostgresConnection(pool)
  assert(isConnected, 'Failed to connect to Postgres database')
  return {
    db,
    dialect,
    pool,
  }
}
