import { Note } from '@prisma/client'
import type { Logger } from 'pino'

import type { IdInput, NoteCreateInput, PaginationInput } from '../common/schemas.js'
import type { Storage } from '../storage/storage.js'
export type NotesServiceDeps = {
  storage: Storage
  logger: Logger
}

export type NotesService = {
  getAllNotes: () => ReturnType<Storage['notes']['getAllNotes']>
  createNote: (data: NoteCreateInput) => ReturnType<Storage['notes']['createNote']>
  softDeleteNote: (data: IdInput) => ReturnType<Storage['notes']['softDeleteNote']>
  deleteNote: (data: IdInput) => ReturnType<Storage['notes']['deleteNote']>
  getNotesPaginated: (data: PaginationInput) => ReturnType<Storage['notes']['getNotesPaginated']>
}

function getAllNotes({ storage, logger }: NotesServiceDeps) {
  return async function (): Promise<Note[]> {
    logger.info('Fetching all notes')
    return await storage.notes.getAllNotes()
  }
}

function createNote({ storage, logger }: NotesServiceDeps) {
  return async function (data: NoteCreateInput) {
    logger.info('Creating a new note with data: %o', data)
    const note = await storage.notes.createNote(data)
    // future business logic here
    return note // TypeScript infers Promise<Note>
  }
}

function getNotesPaginated({ storage, logger }: NotesServiceDeps) {
  return async function (data: PaginationInput) {
    logger.info('Fetching paginated notes with data: %o', data)
    const notes = await storage.notes.getNotesPaginated(data)
    // future business logic here
    return notes
  }
}

function softDeleteNote({ storage, logger }: NotesServiceDeps) {
  return async function (data: IdInput): Promise<string> {
    logger.info('Soft deleting a note with id: %o', data)
    return await storage.notes.softDeleteNote(data)
  }
}

function deleteNote({ storage, logger }: NotesServiceDeps) {
  return async function (data: IdInput): Promise<string> {
    logger.info('Deleting a note with id: %o', data)
    return await storage.notes.deleteNote(data)
  }
}

export function createNotesService(deps: NotesServiceDeps): NotesService {
  return {
    getAllNotes: getAllNotes(deps),
    createNote: createNote(deps),
    softDeleteNote: softDeleteNote(deps),
    deleteNote: deleteNote(deps),
    getNotesPaginated: getNotesPaginated(deps),
  }
}
