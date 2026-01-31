import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const NoteCreateManyInputObjectSchema: z.ZodType<Prisma.NoteCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteCreateManyInput>;
export const NoteCreateManyInputObjectZodSchema = makeSchema();
