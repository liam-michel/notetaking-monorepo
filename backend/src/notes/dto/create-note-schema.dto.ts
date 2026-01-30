import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
export const CreateNoteSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be at most 100 characters'),
  content: z
    .string()
    .min(1, 'Content is required for a note')
    .max(5000, 'Content must be at most 5000 characters'),
});

export class CreateNoteDto extends createZodDto(CreateNoteSchema) {}
export type CreateNoteDtoType = z.infer<typeof CreateNoteSchema>;
