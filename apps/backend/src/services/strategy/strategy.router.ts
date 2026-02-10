import { IdSchema } from '@cs2monorepo/shared'
import { AddStrategySchema } from '@cs2monorepo/shared'

import type { createTRPCRouterReturn } from '../../server/routers/trpc'
type StrategyRouterDeps = {
  t: createTRPCRouterReturn
}

export function createStrategyRouter(deps: StrategyRouterDeps) {
  const { t } = deps
  const { router, protectedProcedure } = t
  return router({
    createStrategy: protectedProcedure.input(AddStrategySchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute('createStrategy', ctx.useCases.strategy.createStrategy(input))
    }),
    softDeleteStrategy: protectedProcedure.input(IdSchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute('softDeleteStrategy', ctx.useCases.strategy.softDeleteStrategy(input))
    }),
    deleteStrategy: protectedProcedure.input(IdSchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute('deleteStrategy', ctx.useCases.strategy.deleteStrategy(input))
    }),
  })
}
