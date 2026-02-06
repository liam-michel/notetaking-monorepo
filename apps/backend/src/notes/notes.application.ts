import type { Logger } from 'pino'

import { IdInput, NoteCreateInput } from '../common/schemas.js'
import { PaginationInput } from '../common/schemas.js'
import type { Storage } from '../storage/storage.js'
import { createNotesService } from './note.service.js'
type Deps = {
  storage: Storage
  logger: Logger
}
export function createNotesUseCases({ logger, storage }: Deps) {
  return {
    getAllNotes: async () => {
      logger.info('Use case: Fetching all notes')
      const notesService = createNotesService({ logger, storage })
      return notesService.getAllNotes()
    },
    getNotesPaginated: async (data: PaginationInput) => {
      logger.info('Use case: Fetching paginated notes with data: %o', data)
      const notesService = createNotesService({ logger, storage })
      return notesService.getNotesPaginated(data)
    },
    createNote: async (data: NoteCreateInput) => {
      logger.info('Use case: Creating note with data: %o', data)
      const notesService = createNotesService({ logger, storage })
      return notesService.createNote(data)
    },
    softDeleteNote: async (data: IdInput) => {
      logger.info('Use case: Soft deleting note with id: %o', data)
      const notesService = createNotesService({ logger, storage })

      return notesService.softDeleteNote(data)
    },
    deleteNote: async (data: IdInput) => {
      logger.info('Use case: Deleting note with id: %o', data)
      const notesService = createNotesService({ logger, storage })

      return notesService.deleteNote(data)
    },
  }
}
