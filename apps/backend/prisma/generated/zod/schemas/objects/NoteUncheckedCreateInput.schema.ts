import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const NoteUncheckedCreateInputObjectSchema: z.ZodType<Prisma.NoteUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUncheckedCreateInput>;
export const NoteUncheckedCreateInputObjectZodSchema = makeSchema();
