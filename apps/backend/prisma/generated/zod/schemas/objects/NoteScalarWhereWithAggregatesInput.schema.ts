import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const notescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => NoteScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => NoteScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => NoteScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => NoteScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => NoteScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const NoteScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.NoteScalarWhereWithAggregatesInput> = notescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.NoteScalarWhereWithAggregatesInput>;
export const NoteScalarWhereWithAggregatesInputObjectZodSchema = notescalarwherewithaggregatesinputSchema;
