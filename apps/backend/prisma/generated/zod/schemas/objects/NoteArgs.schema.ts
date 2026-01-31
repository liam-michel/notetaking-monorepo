import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteSelectObjectSchema as NoteSelectObjectSchema } from './NoteSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => NoteSelectObjectSchema).optional()
}).strict();
export const NoteArgsObjectSchema = makeSchema();
export const NoteArgsObjectZodSchema = makeSchema();
