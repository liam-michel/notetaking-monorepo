import * as z from 'zod';
// prettier-ignore
export const NoteResultSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type NoteResultType = z.infer<typeof NoteResultSchema>;
