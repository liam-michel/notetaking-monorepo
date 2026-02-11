import type { IdInput } from '@cs2monorepo/shared'
import type { Logger } from 'pino'

import type { UpdateUserEmailInput } from '../../common/schemas/user'
import type { UpdateUserPasswordInput } from '../../common/schemas/user'
import { AddUserInput } from '../../common/schemas/user'
import type { Repo } from '../../storage/storage'
export type UserServiceDeps = {
  storage: Repo
  logger: Logger
}

export type StrategyService = {
  createUser: (data: AddUserInput) => ReturnType<Repo['user']['createUser']>
  deleteUser: (data: IdInput) => ReturnType<Repo['user']['deleteUser']>
  updateUserEmail: (data: UpdateUserEmailInput) => ReturnType<Repo['user']['updateUserEmail']>
  updateUserPassword: (data: UpdateUserPasswordInput) => ReturnType<Repo['user']['updateUserPassword']>
}

function createUser({ storage, logger }: UserServiceDeps) {
  return async function (data: AddUserInput) {
    logger.info('Creating a new user with data: %o', data)
    const user = await storage.user.createUser(data)

    // future business logic here
    return user
  }
}

function deleteUser({ storage, logger }: UserServiceDeps) {
  return async function (data: IdInput) {
    logger.info('Deleting a user with id: %o', data)
    return await storage.user.deleteUser(data)
  }
}

function updateUserEmail({ storage, logger }: UserServiceDeps) {
  return async function (data: UpdateUserEmailInput) {
    logger.info('Updating email for user with id: %o', data.id)
    return await storage.user.updateUserEmail(data)
  }
}

function updateUserPassword({ storage, logger }: UserServiceDeps) {
  return async function (data: UpdateUserPasswordInput) {
    logger.info('Updating password for user with id: %o', data.id)
    return await storage.user.updateUserPassword(data)
  }
}

export function createUserService(deps: UserServiceDeps): StrategyService {
  return {
    createUser: createUser(deps),
    deleteUser: deleteUser(deps),
    updateUserEmail: updateUserEmail(deps),
    updateUserPassword: updateUserPassword(deps),
  }
}
