import type { IdInput } from '@cs2monorepo/shared'
import type { Logger } from 'pino'

import type { AddUserInput } from '../../common/schemas/user'
import type { Services } from '../create-strategies'
type UserUseCaseDeps = {
  logger: Logger
  services: Services
}

export type UserUseCases = ReturnType<typeof createUserUseCases>

export function createUserUseCases({ logger, services }: UserUseCaseDeps) {
  return {
    createUser: async (data: AddUserInput) => {
      logger.info('Use case: Creating user with data: %o', data)
      return services.user.createUser(data)
    },
    softDeleteUser: async (data: IdInput) => {
      logger.info('Use case: Soft deleting user with id: %o', data)
      return services.user.deleteUser(data)
    },
    deleteUser: async (data: IdInput) => {
      logger.info('Use case: Deleting user with id: %o', data)
      return services.user.deleteUser(data)
    },
  }
}
