import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const NoteCreateInputObjectSchema: z.ZodType<Prisma.NoteCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteCreateInput>;
export const NoteCreateInputObjectZodSchema = makeSchema();
