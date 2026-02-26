import { ColumnType, Kysely } from 'kysely'

import * as generated from '../../__generated__/database'

export type KyselyDB = Kysely<generated.DB>

export type MaybeArray<T> = T | T[]

//eslint-disable-next-line
type SelectType<T> = T extends ColumnType<infer S, any, any> ? S : T extends null | undefined ? T : T

export type Select<T> = {
  [K in keyof T]: SelectType<T[K]>
}
