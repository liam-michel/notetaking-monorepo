import * as z from 'zod';
// prettier-ignore
export const NoteModelSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type NotePureType = z.infer<typeof NoteModelSchema>;
