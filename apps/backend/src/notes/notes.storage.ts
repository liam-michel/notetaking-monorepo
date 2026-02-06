import { Note } from '@prisma/client'

import { IdInput, NoteCreateInput, PaginationInput } from '../common/schemas.js'
import type { DbClient } from '../storage/types.js'

export type NotesMethods = {
  getAllNotes: () => Promise<Note[]>
  createNote: (data: NoteCreateInput) => Promise<Note>
  softDeleteNote: (data: IdInput) => Promise<string>
  deleteNote: (data: IdInput) => Promise<string>
  getNotesPaginated: (data: PaginationInput) => Promise<Note[]>
}

export type NotesStorage = Readonly<{
  notes: NotesMethods
  transaction: <T>(callback: (repo: Readonly<Omit<NotesStorage, 'transaction'>>) => Promise<T>) => Promise<T>
}>

function getAllNotes(db: DbClient) {
  return async function (): Promise<Note[]> {
    return db.note.findMany()
  }
}

function createNote(db: DbClient) {
  return async function (data: NoteCreateInput): Promise<Note> {
    return db.note.create({
      data,
    })
  }
}

function softDeleteNote(db: DbClient) {
  return async function (data: IdInput): Promise<string> {
    await db.note.update({
      where: { id: data.id },
      data: { deletedAt: new Date() },
    })
    return data.id
  }
}

function deleteNote(db: DbClient) {
  return async function (data: IdInput): Promise<string> {
    await db.note.delete({
      where: { id: data.id },
    })
    return data.id
  }
}

function getNotesPaginated(db: DbClient) {
  return async function (data: PaginationInput): Promise<Note[]> {
    const skip = (data.page - 1) * data.limit
    const take = data.limit

    return db.note.findMany({
      skip,
      take,
    })
  }
}

export function createNotesStorage(db: DbClient): NotesMethods {
  return {
    getAllNotes: getAllNotes(db),
    createNote: createNote(db),
    softDeleteNote: softDeleteNote(db),
    deleteNote: deleteNote(db),
    getNotesPaginated: getNotesPaginated(db),
  }
}
