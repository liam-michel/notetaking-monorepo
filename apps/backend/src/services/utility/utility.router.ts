import { AddUtilitySchema, EditUtilitySchema, IdSchema } from '@cs2monorepo/shared'

import type { createTRPCRouterReturn } from '../../server/routers/trpc'

type UtilityRouterDeps = {
  t: createTRPCRouterReturn
}

export function createUtilityRouter(deps: UtilityRouterDeps) {
  const { t } = deps
  const { router, protectedProcedure } = t
  return router({
    getStrategyUtilities: protectedProcedure.input(IdSchema).query(({ ctx, input }) => {
      return ctx.executor.execute(
        'getStrategyUtilities',
        ctx.useCases.utility.getStrategyUtilities({
          id: input.id,
        }),
      )
    }),
    addUtility: protectedProcedure.input(AddUtilitySchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute(
        'addUtility',
        ctx.useCases.utility.addUtility({
          ...input,
          userId: ctx.user.id,
        }),
      )
    }),
    editUtility: protectedProcedure.input(EditUtilitySchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute(
        'editUtility',
        ctx.useCases.utility.editUtility({
          ...input,
          userId: ctx.user.id,
        }),
      )
    }),
    deleteUtility: protectedProcedure.input(IdSchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute(
        'deleteUtility',
        ctx.useCases.utility.deleteUtility({
          id: input.id,
          userId: ctx.user.id,
        }),
      )
    }),
  })
}
