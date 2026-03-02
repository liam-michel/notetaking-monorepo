import type { AddUtilityApplicationInput, EditUtilityApplicationInput, IdInput } from '@cs2monorepo/shared'
import type { Logger } from 'pino'

import type { Services } from '../create-services.ts'

type UtilityUseCaseDeps = {
  logger: Logger
  services: Services
}

export function createUtilityUseCases({ logger, services }: UtilityUseCaseDeps) {
  const log = logger.child({ layer: 'useCase', domain: 'utility' })
  return {
    getStrategyUtilities: async (data: IdInput) => {
      log.info('Fetching utilities for strategy with id: %o', data.id)
      return services.utility.getStrategyUtilities(data)
    },
    addUtility: async (data: AddUtilityApplicationInput) => {
      log.info('Adding utility with data: %o', data)
      return services.utility.addUtility(data)
    },
    editUtility: async (data: EditUtilityApplicationInput & { userId: string }) => {
      log.info('Editing utility with id: %o, data: %o', data.id, data)
      return services.utility.editUtility(data)
    },
    deleteUtility: async (data: IdInput & { userId: string }) => {
      log.info('Deleting utility with id: %o', data.id)
      return services.utility.deleteUtility(data)
    },
  }
}
