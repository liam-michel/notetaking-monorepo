import { IdInput } from '@cs2monorepo/shared'

import type { AddUserInput, UpdateUserEmailInput, UpdateUserPasswordInput } from '../../common/schemas/user'
import { SafeUser } from '../../common/schemas/user'
import { DbClient } from '../../storage/types'

export type UserStorageMethods = {
  findById: (data: IdInput) => Promise<SafeUser | null>
  createUser: (data: AddUserInput) => Promise<SafeUser>
  deleteUser: (data: IdInput) => Promise<string>
  updateUserEmail: (data: UpdateUserEmailInput) => Promise<SafeUser>
  updateUserPassword(data: UpdateUserPasswordInput): Promise<SafeUser>
}

function findById(db: DbClient) {
  return async function (data: IdInput): Promise<SafeUser | null> {
    const user = await db.user.findUnique({
      where: { id: data.id },
    })
    if (!user) {
      return null
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }
  }
}
function createUser(db: DbClient) {
  return async function (data: AddUserInput): Promise<SafeUser> {
    const user = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    })
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }
  }
}

function deleteUser(db: DbClient) {
  return async function (data: IdInput): Promise<string> {
    await db.user.delete({
      where: { id: data.id },
    })
    return data.id
  }
}

function updateUserEmail(db: DbClient) {
  return async function (data: UpdateUserEmailInput): Promise<SafeUser> {
    const user = await db.user.update({
      where: { id: data.id },
      data: { email: data.email },
    })
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }
  }
}

function updateUserPassword(db: DbClient) {
  return async function (data: UpdateUserPasswordInput): Promise<SafeUser> {
    const user = await db.user.update({
      where: { id: data.id },
      data: { password: data.password },
    })
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }
  }
}

export function createUserStorage(db: DbClient): UserStorageMethods {
  return {
    findById: findById(db),
    createUser: createUser(db),
    deleteUser: deleteUser(db),
    updateUserEmail: updateUserEmail(db),
    updateUserPassword: updateUserPassword(db),
  }
}
