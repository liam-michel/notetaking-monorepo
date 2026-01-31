import * as z from 'zod';
// prettier-ignore
export const NoteInputSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type NoteInputType = z.infer<typeof NoteInputSchema>;
