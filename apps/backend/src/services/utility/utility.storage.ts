import { AddUtilityApplicationInput, EditUtilityApplicationInput, IdInput } from '@cs2monorepo/shared'

import { Models } from '../../storage/models'
import { KyselyDB } from '../../storage/types/types'
export type UtilityStorageMethods = {
  getStrategyUtility: (data: IdInput) => Promise<Models['Utility'] | null>
  getStrategyUtilities: (data: IdInput) => Promise<Models['Utility'][]>
  addUtility: (data: AddUtilityApplicationInput) => Promise<Models['Utility']>
  editUtility: (data: EditUtilityApplicationInput) => Promise<Models['Utility']>
  deleteUtility: (data: IdInput) => Promise<string>
}

function getStrategyUtility(db: KyselyDB) {
  return async function (data: IdInput): Promise<Models['Utility'] | null> {
    const result = await db.selectFrom('Utility').where('id', '=', data.id).selectAll().executeTakeFirst()
    if (!result) return null
    const input = result satisfies Models['Utility']
    return Models['Utility'].parse(input)
  }
}

function getStrategyUtilities(db: KyselyDB) {
  return async function (data: IdInput): Promise<Models['Utility'][]> {
    const result = (await db
      .selectFrom('Utility')
      .where('strategyId', '=', data.id)
      .selectAll()
      .execute()) satisfies Models['Utility'][]
    return result.map((utility) => Models['Utility'].parse(utility))
  }
}

function addUtility(db: KyselyDB) {
  return async function (data: AddUtilityApplicationInput): Promise<Models['Utility']> {
    const result = (await db
      .insertInto('Utility')
      .values({
        id: crypto.randomUUID(),
        strategyId: data.strategyId,
        type: data.type,
        location: data.location,
        timing: data.timing,
        order: data.order,
        role: data.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow()) satisfies Models['Utility']
    return Models['Utility'].parse(result)
  }
}

function editUtility(db: KyselyDB) {
  return async function (data: EditUtilityApplicationInput): Promise<Models['Utility']> {
    const updated = (await db
      .updateTable('Utility')
      .set({
        type: data.type,
        location: data.location,
        timing: data.timing,
        order: data.order,
        role: data.role,
        updatedAt: new Date(),
      })
      .where('id', '=', data.id)
      .returningAll()
      .executeTakeFirstOrThrow()) satisfies Models['Utility']
    return Models['Utility'].parse(updated)
  }
}

function deleteUtility(db: KyselyDB) {
  return async function (data: IdInput): Promise<string> {
    await db.deleteFrom('Utility').where('id', '=', data.id).execute()
    return data.id
  }
}

export function createUtilityStorage(db: KyselyDB): UtilityStorageMethods {
  return {
    getStrategyUtility: getStrategyUtility(db),
    getStrategyUtilities: getStrategyUtilities(db),
    addUtility: addUtility(db),
    editUtility: editUtility(db),
    deleteUtility: deleteUtility(db),
  }
}
