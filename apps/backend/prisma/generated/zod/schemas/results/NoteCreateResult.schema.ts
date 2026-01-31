import * as z from 'zod';
export const NoteCreateResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});