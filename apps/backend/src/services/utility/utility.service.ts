import type { Logger } from 'pino'

import { IdInput } from '../../../../../packages/shared/src/schemas'
import { AddUtilityApplicationInput } from '../../../../../packages/shared/src/schemas'
import { EditUtilityApplicationInput } from '../../../../../packages/shared/src/schemas'
import type { Storage } from '../../storage/storage'
import type { Repo } from '../../storage/storage'
export type UtilityServiceDeps = {
  storage: Storage
  logger: Logger
}

export type UtilityService = {
  getStrategyUtilities: (data: IdInput) => ReturnType<Repo['utility']['getStrategyUtilities']>
  addUtility: (data: AddUtilityApplicationInput) => ReturnType<Repo['utility']['addUtility']>
  editUtility: (data: EditUtilityApplicationInput) => ReturnType<Repo['utility']['editUtility']>
  deleteUtility: (data: IdInput & { userId: string }) => ReturnType<Repo['utility']['deleteUtility']>
}

function getStrategyUtilities({ storage }: UtilityServiceDeps) {
  return async function (data: IdInput) {
    return storage.utility.getStrategyUtilities(data)
  }
}

function addUtility({ storage, logger }: UtilityServiceDeps) {
  return async function (data: AddUtilityApplicationInput) {
    logger.setBindings({ operation: 'addUtility', userId: data.userId })
    return storage.utility.addUtility(data)
  }
}

function editUtility({ storage, logger }: UtilityServiceDeps) {
  return async function (data: EditUtilityApplicationInput) {
    logger.setBindings({ operation: 'editUtility', userId: data.userId })
    const existingUtility = await storage.utility.getStrategyUtility({ id: data.id })
    if (!existingUtility) throw new Error('Utility not found')
    if (existingUtility.strategyId !== data.strategyId)
      throw new Error('Utility does not belong to the specified strategy')
    return storage.utility.editUtility(data)
  }
}

function deleteUtility({ storage, logger }: UtilityServiceDeps) {
  return async function (data: IdInput & { userId: string }) {
    logger.setBindings({ operation: 'deleteUtility', userId: data.userId })
    const existingUtility = await storage.utility.getStrategyUtility({ id: data.id })
    if (!existingUtility) throw new Error('Utility not found')
    return storage.utility.deleteUtility(data)
  }
}

export function createUtilityService(deps: UtilityServiceDeps): UtilityService {
  const { logger, storage } = deps
  const log = logger.child({ layer: 'service', service: 'utility' })
  return {
    getStrategyUtilities: getStrategyUtilities({ storage, logger: log }),
    addUtility: addUtility({ ...deps, logger: log }),
    editUtility: editUtility({ ...deps, logger: log }),
    deleteUtility: deleteUtility({ ...deps, logger: log }),
  }
}
