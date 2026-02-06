import type { Note } from '@prisma/client'
import type { Logger } from 'pino'
import * as td from 'testdouble'

import type { Storage } from '../../storage/storage'
import { createNotesService } from '../note.service'

const storage = td.object<Storage>()
const logger = td.object<Logger>()
const deps = { storage, logger } // ✅ Plain object, not td.object()

const mockExampleNotes: Note[] = [
  {
    id: '1',
    title: 'Note 1',
    content: 'Content of note 1',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Note 2',
    content: 'Content of note 2',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
const service = createNotesService(deps)
describe('Note Service getAllNotes', () => {
  ;(it('should get all notes', async () => {
    //setup input data

    //stub storage method to return the expected note
    td.when(storage.notes.getAllNotes()).thenResolve(mockExampleNotes)
    //call the service method
    const result = await service.getAllNotes()
    //assert the result
    expect(result).toEqual(mockExampleNotes)
    //verify that logger was called
    td.verify(logger.info('Fetching all notes'))
  }),
    it('should get a single note in an array if there is only one note', async () => {
      const singleNote: Note[] = [mockExampleNotes[0]]
      td.when(storage.notes.getAllNotes()).thenResolve(singleNote)
      const result = await service.getAllNotes()
      expect(result).toEqual(singleNote)
      td.verify(logger.info('Fetching all notes'))
    }),
    it('should return an empty array if there are no notes', async () => {
      td.when(storage.notes.getAllNotes()).thenResolve([])
      const result = await service.getAllNotes()
      expect(result).toEqual([])
      td.verify(logger.info('Fetching all notes'))
    }),
    it('should throw an error if database crashes when fetching notes', async () => {
      const error = new Error('Database connection error')
      td.when(storage.notes.getAllNotes()).thenReject(error)
      await expect(service.getAllNotes()).rejects.toThrow('Database connection error')
    }))
})
