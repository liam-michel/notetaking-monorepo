import type { Note } from '@prisma/client'
import type { Logger } from 'pino'
import * as td from 'testdouble'

import type { Storage } from '../../storage/storage'
import { createNotesService } from '../note.service'

const storage = td.object<Storage>()
const logger = td.object<Logger>()
const deps = { storage, logger } // ✅ Plain object, not td.object()

const service = createNotesService(deps)

describe('Notes Service deleteNote', () => {
  it('should delete a note', async () => {
    const idInput = { id: '1' }
    const expectedMessage = 'Note with id 1 has been deleted'

    td.when(storage.notes.deleteNote(idInput)).thenResolve(expectedMessage)

    const result = await service.deleteNote(idInput)

    expect(result).toEqual(expectedMessage)
    td.verify(logger.info('Deleting a note with id: %o', idInput))
  })
  it('should error if I try to delete a note that does not exist', async () => {
    const idInput = { id: '999' }
    const error = new Error('Note not found')

    td.when(storage.notes.deleteNote(idInput)).thenReject(error)

    await expect(service.deleteNote(idInput)).rejects.toThrow('Note not found')
    td.verify(logger.info('Deleting a note with id: %o', idInput))
  })
  it('should throw an error if database crashes when deleting a note', async () => {
    const idInput = { id: '1' }
    const error = new Error('Database connection error')

    td.when(storage.notes.deleteNote(idInput)).thenReject(error)

    await expect(service.deleteNote(idInput)).rejects.toThrow('Database connection error')
    td.verify(logger.info('Deleting a note with id: %o', idInput))
  })
})
