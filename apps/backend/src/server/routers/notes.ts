import { createUseCaseExecutor } from '../../common/error/error-utils.js'
import { IdSchema, NoteCreateSchema, PaginationSchema } from '../../common/schemas.js'
import { createNotesUseCases } from '../../notes/notes.application.js'
import { createTRPCRouter } from './trpc.js'
type NotesRouterDeps = {
  t: ReturnType<typeof createTRPCRouter>
  notesUseCases: ReturnType<typeof createNotesUseCases>
  executor: ReturnType<typeof createUseCaseExecutor>
}
export function createNotesRouter(deps: NotesRouterDeps) {
  const { t, notesUseCases, executor } = deps
  const { router, protectedProcedure } = t
  return router({
    getAllNotes: protectedProcedure.query(() => {
      return executor.execute('getAllNotes', notesUseCases.getAllNotes())
    }),
    getNotesPaginated: protectedProcedure.input(PaginationSchema).query(({ ctx, input }) => {
      return executor.execute('getNotesPaginated', notesUseCases.getNotesPaginated(input))
    }),
    createNote: protectedProcedure.input(NoteCreateSchema).mutation(({ ctx, input }) => {
      return executor.execute('createNote', notesUseCases.createNote(input))
    }),
    softDeleteNote: protectedProcedure.input(IdSchema).mutation(({ ctx, input }) => {
      return executor.execute('softDeleteNote', notesUseCases.softDeleteNote(input))
    }),
    deleteNote: protectedProcedure.input(IdSchema).mutation(({ ctx, input }) => {
      return executor.execute('deleteNote', notesUseCases.deleteNote(input))
    }),
  })
}
