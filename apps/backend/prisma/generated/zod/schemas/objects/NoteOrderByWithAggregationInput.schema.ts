import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { NoteCountOrderByAggregateInputObjectSchema as NoteCountOrderByAggregateInputObjectSchema } from './NoteCountOrderByAggregateInput.schema';
import { NoteMaxOrderByAggregateInputObjectSchema as NoteMaxOrderByAggregateInputObjectSchema } from './NoteMaxOrderByAggregateInput.schema';
import { NoteMinOrderByAggregateInputObjectSchema as NoteMinOrderByAggregateInputObjectSchema } from './NoteMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => NoteCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => NoteMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => NoteMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const NoteOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.NoteOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteOrderByWithAggregationInput>;
export const NoteOrderByWithAggregationInputObjectZodSchema = makeSchema();
