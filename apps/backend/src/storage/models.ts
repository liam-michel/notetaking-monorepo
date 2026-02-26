import { z } from 'zod'

import * as Enums from '../__generated__/database'

const Side = z.enum(Object.values(Enums.Side))

const Economy = z.enum(Object.values(Enums.Economy))

const PlayerRole = z.enum(Object.values(Enums.PlayerRole))

const UtilityType = z.enum(Object.values(Enums.UtilityType))
const UserRole = z.enum(Object.values(Enums.UserRole))

const Account = z.object({
  id: z.string('Account id must be a string'),
  userId: z.string('User id must be a string'),
  accountId: z.string('Account id must be a string'),
  providerId: z.string('Provider id must be a string'),
  accessToken: z.string('Access token must be a string or null').nullable(),
  refreshToken: z.string('Refresh token must be a string or null').nullable(),
  idToken: z.string('ID token must be a string or null').nullable(),
  expiresAt: z
    .date('Expires at must be a date or null')
    .nullable()
    .transform((date) => date?.toISOString() ?? null),
  password: z.string('Password must be a string or null').nullable(),
  createdAt: z.date('Created at must be a date').transform((date) => date.toISOString()),
  updatedAt: z.date('Updated at must be a date').transform((date) => date.toISOString()),
})

const GameMap = z.object({
  id: z.string('Map id must be a string'),
  name: z.string('Map name must be a string'),
  isActive: z.boolean('Is active must be a boolean'),
})

const Session = z.object({
  id: z.string('Session id must be a string'),
  userId: z.string('User id must be a string'),
  expiresAt: z.date('Expires at must be a date').transform((date) => date.toISOString()),
  token: z.string('Token must be a string'),
  ipAddress: z.string('IP address must be a string or null').nullable(),
  userAgent: z.string('User agent must be a string or null').nullable(),
  createdAt: z.date('Created at must be a date').transform((date) => date.toISOString()),
  updatedAt: z.date('Updated at must be a date').transform((date) => date.toISOString()),
})

const Strategy = z.object({
  id: z.string('Strategy id must be a string'),
  userId: z.string('User id must be a string'),
  name: z.string('Strategy name must be a string'),
  description: z.string('Strategy description must be a string'),
  side: Side,
  difficulty: z.number('Difficulty must be a number').transform((num) => Math.round(num)),
  mapId: z.string('Map id must be a string'),
  economy: Economy,
  ratingAverage: z.number('Rating average must be a number').transform((num) => Math.round(num * 100) / 100),
  ratingCount: z.number('Rating count must be a number').transform((num) => Math.round(num)),
  createdAt: z.date('Created at must be a date').transform((date) => date.toISOString()),
  updatedAt: z.date('Updated at must be a date').transform((date) => date.toISOString()),
  deletedAt: z
    .date('Deleted at must be a date or null')
    .nullable()
    .transform((date) => date?.toISOString() ?? null),
})

const StrategyComment = z.object({
  id: z.string('Strategy comment id must be a string'),
  strategyId: z.string('Strategy id must be a string'),
  userId: z.string('User id must be a string or null').nullable(),
  content: z.string('Content must be a string'),
  rating: z
    .number('Rating must be a number or null')
    .nullable()
    .transform((num) => (num !== null ? Math.round(num) : null)),
  createdAt: z.date('Created at must be a date').transform((date) => date.toISOString()),
  updatedAt: z.date('Updated at must be a date').transform((date) => date.toISOString()),
})

const User = z.object({
  id: z.string('User id must be a string'),
  name: z.string('User name must be a string'),
  email: z.string('User email must be a string'),
  role: UserRole,
  createdAt: z.date('Created at must be a date').transform((date) => date.toISOString()),
  updatedAt: z.date('Updated at must be a date').transform((date) => date.toISOString()),
  emailVerified: z.boolean('Email verified must be a boolean'),
})

const StrategyWithDetails = Strategy.extend({
  map: GameMap,
})
export type Account = z.infer<typeof Account>
export type GameMap = z.infer<typeof GameMap>
export type Session = z.infer<typeof Session>
export type Strategy = z.infer<typeof Strategy>
export type StrategyComment = z.infer<typeof StrategyComment>
export type User = z.infer<typeof User>
export type Side = z.infer<typeof Side>
export type Economy = z.infer<typeof Economy>
export type PlayerRole = z.infer<typeof PlayerRole>
export type UtilityType = z.infer<typeof UtilityType>
export type UserRole = z.infer<typeof UserRole>

export type StrategyWithDetails = Strategy & { map: GameMap }

export const Models = {
  Account,
  GameMap,
  Session,
  Strategy,
  StrategyComment,
  User,
  Side,
  Economy,
  PlayerRole,
  UtilityType,
  UserRole,
  StrategyWithDetails,
}

export type Models = {
  [K in keyof typeof Models]: (typeof Models)[K] extends z.ZodSchema ? z.infer<(typeof Models)[K]> : (typeof Models)[K]
}
