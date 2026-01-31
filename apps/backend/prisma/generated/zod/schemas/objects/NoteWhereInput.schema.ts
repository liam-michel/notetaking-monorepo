import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const notewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => NoteWhereInputObjectSchema), z.lazy(() => NoteWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => NoteWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => NoteWhereInputObjectSchema), z.lazy(() => NoteWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const NoteWhereInputObjectSchema: z.ZodType<Prisma.NoteWhereInput> = notewhereinputSchema as unknown as z.ZodType<Prisma.NoteWhereInput>;
export const NoteWhereInputObjectZodSchema = notewhereinputSchema;
