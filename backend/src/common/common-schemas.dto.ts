import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const IdSchema = z.object({
  id: z.string().uuid('Invalid UUID format'),
});

export class IdDto extends createZodDto(IdSchema) {}
export type IdDtoType = z.infer<typeof IdSchema>;
