import * as z from 'zod';

export const NoteScalarFieldEnumSchema = z.enum(['id', 'title', 'content', 'createdAt', 'updatedAt'])

export type NoteScalarFieldEnum = z.infer<typeof NoteScalarFieldEnumSchema>;