import type { ColumnType } from 'kysely'
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export const Side = {
  CT: 'CT',
  T: 'T',
} as const
export type Side = (typeof Side)[keyof typeof Side]
export const Economy = {
  PISTOL: 'PISTOL',
  ANTI_ECO: 'ANTI_ECO',
  ECO: 'ECO',
  FORCE_BUY: 'FORCE_BUY',
  FULL_BUY: 'FULL_BUY',
} as const
export type Economy = (typeof Economy)[keyof typeof Economy]
export const PlayerRole = {
  ENTRY: 'ENTRY',
  SUPPORT: 'SUPPORT',
  LURKER: 'LURKER',
  ANCHOR: 'ANCHOR',
  AWPER: 'AWPER',
  IGL: 'IGL',
} as const
export type PlayerRole = (typeof PlayerRole)[keyof typeof PlayerRole]
export const UtilityType = {
  SMOKE: 'SMOKE',
  FLASH: 'FLASH',
  HE_GRENADE: 'HE_GRENADE',
  MOLOTOV: 'MOLOTOV',
  INCENDIARY: 'INCENDIARY',
  DECOY: 'DECOY',
} as const
export type UtilityType = (typeof UtilityType)[keyof typeof UtilityType]
export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]
export type Account = {
  id: string
  userId: string
  accountId: string
  providerId: string
  accessToken: string | null
  refreshToken: string | null
  idToken: string | null
  expiresAt: Timestamp | null
  password: string | null
  createdAt: Generated<Timestamp>
  updatedAt: Timestamp
}
export type Map = {
  id: string
  name: string
  isActive: Generated<boolean>
}
export type Session = {
  id: string
  userId: string
  expiresAt: Timestamp
  token: string
  ipAddress: string | null
  userAgent: string | null
  createdAt: Generated<Timestamp>
  updatedAt: Timestamp
}
export type Strategy = {
  id: string
  userId: string
  name: string
  description: string
  side: Side
  difficulty: Generated<number>
  mapId: string
  economy: Economy
  ratingAverage: Generated<number>
  ratingCount: Generated<number>
  createdAt: Generated<Timestamp>
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}
export type StrategyComment = {
  id: string
  strategyId: string
  userId: string | null
  content: string
  rating: number | null
  createdAt: Generated<Timestamp>
  updatedAt: Timestamp
}
export type User = {
  id: string
  email: string
  emailVerified: Generated<boolean>
  name: string
  createdAt: Generated<Timestamp>
  updatedAt: Timestamp
  role: Generated<UserRole>
}
export type Utility = {
  id: string
  strategyId: string
  type: UtilityType
  location: string | null
  timing: string | null
  order: number | null
  role: PlayerRole | null
  createdAt: Generated<Timestamp>
  updatedAt: Timestamp
}
export type Verification = {
  id: string
  identifier: string
  value: string
  expiresAt: Timestamp
  createdAt: Generated<Timestamp>
  updatedAt: Timestamp
}
export type DB = {
  Account: Account
  Map: Map
  Session: Session
  Strategy: Strategy
  StrategyComment: StrategyComment
  User: User
  Utility: Utility
  Verification: Verification
}
