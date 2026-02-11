import { IdSchema } from '@cs2monorepo/shared'

import { AddUserSchema } from '../../common/schemas/user'
import type { createTRPCRouterReturn } from '../../server/routers/trpc'
type UserRouterDeps = {
  t: createTRPCRouterReturn
}
export function createUserRouter(deps: UserRouterDeps) {
  const { t } = deps
  const { router, protectedProcedure } = t
  return router({
    createUser: protectedProcedure.input(AddUserSchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute('createUser', ctx.useCases.user.createUser(input))
    }),
    softDeleteUser: protectedProcedure.input(IdSchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute('softDeleteUser', ctx.useCases.user.softDeleteUser(input))
    }),
    deleteUser: protectedProcedure.input(IdSchema).mutation(({ ctx, input }) => {
      return ctx.executor.execute('deleteUser', ctx.useCases.user.deleteUser(input))
    }),
  })
}
