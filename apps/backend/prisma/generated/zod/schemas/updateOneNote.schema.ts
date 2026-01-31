import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { NoteSelectObjectSchema as NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteUpdateInputObjectSchema as NoteUpdateInputObjectSchema } from './objects/NoteUpdateInput.schema';
import { NoteUncheckedUpdateInputObjectSchema as NoteUncheckedUpdateInputObjectSchema } from './objects/NoteUncheckedUpdateInput.schema';
import { NoteWhereUniqueInputObjectSchema as NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';

export const NoteUpdateOneSchema: z.ZodType<Prisma.NoteUpdateArgs> = z.object({ select: NoteSelectObjectSchema.optional(),  data: z.union([NoteUpdateInputObjectSchema, NoteUncheckedUpdateInputObjectSchema]), where: NoteWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.NoteUpdateArgs>;

export const NoteUpdateOneZodSchema = z.object({ select: NoteSelectObjectSchema.optional(),  data: z.union([NoteUpdateInputObjectSchema, NoteUncheckedUpdateInputObjectSchema]), where: NoteWhereUniqueInputObjectSchema }).strict();