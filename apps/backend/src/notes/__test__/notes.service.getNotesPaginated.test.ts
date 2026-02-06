import * as td from 'testdouble'
import type { Logger } from 'pino'
import type { Note } from '@prisma/client'

import { createNotesService } from '../note.service'
import type { Storage } from '../../storage/storage'
import { NoteCreateInput } from '../../common/schemas'
import { createExampleNotes } from './exampleNotes'

const storage = td.object<Storage>()
const logger = td.object<Logger>()
const deps = { storage, logger } // ✅ Plain object, not td.object()
const service = createNotesService(deps)

const notes = createExampleNotes()

describe('Notes Service getNotesPaginated', () => {
  ;(it('should return paginated notes', async () => {
    const paginationInput = { page: 1, limit: 2 }
    const expectedNotes: Note[] = notes.slice(0, 2)

    td.when(storage.notes.getNotesPaginated(paginationInput)).thenResolve(expectedNotes)

    const result = await service.getNotesPaginated(paginationInput)

    expect(result).toEqual(expectedNotes)
    td.verify(logger.info('Fetching paginated notes with data: %o', paginationInput))
  }),
    it('should return an empty array if there are no notes for the given page', async () => {
      const paginationInput = { page: 10, limit: 2 }
      td.when(storage.notes.getNotesPaginated(paginationInput)).thenResolve([])

      const result = await service.getNotesPaginated(paginationInput)

      expect(result).toEqual([])
      td.verify(logger.info('Fetching paginated notes with data: %o', paginationInput))
    }),
    it('should throw an error if database crashes when fetching paginated notes', async () => {
      const paginationInput = { page: 1, limit: 2 }
      const error = new Error('Database connection error')
      td.when(storage.notes.getNotesPaginated(paginationInput)).thenReject(error)

      await expect(service.getNotesPaginated(paginationInput)).rejects.toThrow('Database connection error')
    }))
})
