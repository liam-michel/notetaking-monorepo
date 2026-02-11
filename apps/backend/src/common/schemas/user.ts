import { UserRoleSchema } from '@cs2monorepo/shared'
import { z } from 'zod'

export const SafeUserSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  email: z.email(),
  role: UserRoleSchema,
})

export const AddUserSchema = z.object({
  username: z.string().min(5).max(20),
  email: z.email(),
  password: z.string().min(8).max(30),
})

export const UpdateUserEmailSchema = z.object({
  id: z.uuid(),
  email: z.email(),
})

export const UpdateUserPasswordSchema = z.object({
  id: z.uuid(),
  password: z.string().min(8).max(30),
})

export type AddUserInput = z.infer<typeof AddUserSchema>
export type SafeUser = z.infer<typeof SafeUserSchema>
export type UpdateUserEmailInput = z.infer<typeof UpdateUserEmailSchema>
export type UpdateUserPasswordInput = z.infer<typeof UpdateUserPasswordSchema>
