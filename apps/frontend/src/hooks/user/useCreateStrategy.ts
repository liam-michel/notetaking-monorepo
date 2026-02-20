import { trpc } from '@/lib/providers/trpc'

export function useCreateUserStrategy() {
  return trpc.strategy.createStrategy.useMutation()
}
