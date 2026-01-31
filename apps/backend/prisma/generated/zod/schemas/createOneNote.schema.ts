import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { NoteSelectObjectSchema as NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteCreateInputObjectSchema as NoteCreateInputObjectSchema } from './objects/NoteCreateInput.schema';
import { NoteUncheckedCreateInputObjectSchema as NoteUncheckedCreateInputObjectSchema } from './objects/NoteUncheckedCreateInput.schema';

export const NoteCreateOneSchema: z.ZodType<Prisma.NoteCreateArgs> = z.object({ select: NoteSelectObjectSchema.optional(),  data: z.union([NoteCreateInputObjectSchema, NoteUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.NoteCreateArgs>;

export const NoteCreateOneZodSchema = z.object({ select: NoteSelectObjectSchema.optional(),  data: z.union([NoteCreateInputObjectSchema, NoteUncheckedCreateInputObjectSchema]) }).strict();