import type { Note } from '@prisma/client'
import type { Logger } from 'pino'
import * as td from 'testdouble'

import type { Storage } from '../../storage/storage'
import { createNotesService } from '../note.service'

const storage = td.object<Storage>()
const logger = td.object<Logger>()
const deps = { storage, logger } // ✅ Plain object, not td.object()

const service = createNotesService(deps)

describe('Notes Service softDeleteNote', () => {
  it('should soft delete a note', async () => {
    const idInput = { id: '1' }
    const expectedMessage = 'Note with id 1 has been soft deleted'

    td.when(storage.notes.softDeleteNote(idInput)).thenResolve(expectedMessage)

    const result = await service.softDeleteNote(idInput)

    expect(result).toEqual(expectedMessage)
    td.verify(logger.info('Soft deleting a note with id: %o', idInput))
  })
  it('should throw an error if I try to soft delete a note that does not exist', async () => {
    const idInput = { id: '999' }
    const error = new Error('Note not found')

    td.when(storage.notes.softDeleteNote(idInput)).thenReject(error)

    await expect(service.softDeleteNote(idInput)).rejects.toThrow('Note not found')
    td.verify(logger.info('Soft deleting a note with id: %o', idInput))
  })
  it('should throw an error if database crashes when soft deleting a note', async () => {
    const idInput = { id: '1' }
    const error = new Error('Database connection error')

    td.when(storage.notes.softDeleteNote(idInput)).thenReject(error)

    await expect(service.softDeleteNote(idInput)).rejects.toThrow('Database connection error')
    td.verify(logger.info('Soft deleting a note with id: %o', idInput))
  })
})
