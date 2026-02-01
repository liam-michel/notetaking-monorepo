import { NoteCreateSchema } from '../../common/schemas.js';
import { createNotesUseCases } from '../../notes/application.js';
import { createTRPCRouter } from './trpc.js';

export function createNotesRouter(
  t: ReturnType<typeof createTRPCRouter>,
  notesUseCases: ReturnType<typeof createNotesUseCases>,
) {
  return t.router({
    createNote: t.procedure
      .input(NoteCreateSchema)
      .mutation(({ ctx, input }) => {
        return notesUseCases.createNote(input);
      }),
  });
}
