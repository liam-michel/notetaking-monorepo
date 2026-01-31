import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { NoteSelectObjectSchema as NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteWhereUniqueInputObjectSchema as NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';

export const NoteDeleteOneSchema: z.ZodType<Prisma.NoteDeleteArgs> = z.object({ select: NoteSelectObjectSchema.optional(),  where: NoteWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.NoteDeleteArgs>;

export const NoteDeleteOneZodSchema = z.object({ select: NoteSelectObjectSchema.optional(),  where: NoteWhereUniqueInputObjectSchema }).strict();