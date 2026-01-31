import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const NoteOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.NoteOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteOrderByWithRelationInput>;
export const NoteOrderByWithRelationInputObjectZodSchema = makeSchema();
