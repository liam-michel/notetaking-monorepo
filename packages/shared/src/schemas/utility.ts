import { z } from 'zod'

import { PlayerRoleSchema, userIdSchema, UtilitySchema } from './common'

export const AddUtilitySchema = z.object({
  strategyId: z.uuid('Invalid strategy ID'),
  type: UtilitySchema,
  location: z.string('Location must be a string').nullable(),
  timing: z.string('Timing must be a string').nullable(),
  order: z
    .number('Order must be a number')
    .transform((num) => Math.round(num))
    .nullable(),
  role: PlayerRoleSchema.nullable(),
})

export const AddUtilityServiceSchema = AddUtilitySchema.extend({
  userId: userIdSchema.shape.userId,
})

export const EditUtilitySchema = AddUtilitySchema.extend({
  id: z.uuid('Invalid utility ID'),
})

export const EditUtilityServiceSchema = EditUtilitySchema.extend({
  userId: userIdSchema.shape.userId,
})

export type AddUtilityInput = z.output<typeof AddUtilitySchema>

export type AddUtilityApplicationInput = z.output<typeof AddUtilityServiceSchema>

export type EditUtilityInput = z.output<typeof EditUtilitySchema>

export type EditUtilityApplicationInput = z.output<typeof EditUtilityServiceSchema>
