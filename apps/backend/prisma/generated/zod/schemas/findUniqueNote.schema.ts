import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { NoteSelectObjectSchema as NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteWhereUniqueInputObjectSchema as NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';

export const NoteFindUniqueSchema: z.ZodType<Prisma.NoteFindUniqueArgs> = z.object({ select: NoteSelectObjectSchema.optional(),  where: NoteWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.NoteFindUniqueArgs>;

export const NoteFindUniqueZodSchema = z.object({ select: NoteSelectObjectSchema.optional(),  where: NoteWhereUniqueInputObjectSchema }).strict();