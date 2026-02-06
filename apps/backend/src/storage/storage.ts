import type { PrismaClient } from '@prisma/client'

import { createNotesStorage, type NotesMethods } from '../notes/notes.storage'
import type { DbClient } from './types'
export type Storage = Readonly<{
  notes: NotesMethods
  transaction: <T>(callback: (repo: Readonly<Omit<Storage, 'transaction'>>) => Promise<T>) => Promise<T>
}>

function wrapDb(db: DbClient): Omit<Storage, 'transaction'> {
  return {
    notes: createNotesStorage(db),
  }
}

export function createStorage(db: PrismaClient): Storage {
  return {
    ...wrapDb(db),
    async transaction(callback) {
      return db.$transaction(async (tx) => {
        const repo = wrapDb(tx)
        return callback(repo)
      })
    },
  }
}
