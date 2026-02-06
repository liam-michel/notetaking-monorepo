import type { Note } from '@prisma/client'
import type { Logger } from 'pino'
import * as td from 'testdouble'

import { NoteCreateInput } from '../../common/schemas'
import type { Storage } from '../../storage/storage'
import { createNotesService } from '../note.service'

const storage = td.object<Storage>()
const logger = td.object<Logger>()
const deps = { storage, logger } // ✅ Plain object, not td.object()
const service = createNotesService(deps)
describe('Notes Service createNote', () => {
  ;(it('should create a note', async () => {
    //setup input data
    const inputData: NoteCreateInput = {
      title: 'Test Note',
      content: 'This is a test note.',
    }
    const expectedNote: Note = {
      id: '1',
      title: inputData.title,
      content: inputData.content,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    //stub storage method to return the expected note
    td.when(storage.notes.createNote(inputData)).thenResolve(expectedNote)
    //call the service method
    const result = await service.createNote(inputData)
    //assert the result
    expect(result).toEqual(expectedNote)
    //verify that logger was called
    td.verify(logger.info('Creating a new note with data: %o', inputData))
  }),
    it('should throw an error when I try to create a note with a duplicate title', async () => {
      const inputData = {
        title: 'Duplicate Note',
        content: 'This note has a duplicate title.',
      }

      const error = new Error('Unique constraint failed on the fields: (`title`)')

      //stub storage method to throw an error for duplicate title
      td.when(storage.notes.createNote(inputData)).thenReject(error)

      //call the service method and expect it to throw an error
      await expect(service.createNote(inputData)).rejects.toThrow('Unique constraint failed on the fields: (`title`)')
    }),
    it('should throw an error if database crashes when creating a note', async () => {
      const inputData = {
        title: 'Test Note',
        content: 'This is a test note.',
      }

      const error = new Error('Database connection error')
      td.when(storage.notes.createNote(inputData)).thenReject(error)
      await expect(service.createNote(inputData)).rejects.toThrow('Database connection error')
    }))
})
