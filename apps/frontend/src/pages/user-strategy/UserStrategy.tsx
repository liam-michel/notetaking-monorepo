import { trpc } from '@/lib/providers/trpc'
import { strategyRoute } from '@/router'
export default function StrategyDetail() {
  const { id } = strategyRoute.useParams()
  const { data, error, isLoading } = trpc.strategy.getUserStrategyById.useQuery({ id })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>Strategy not found</div>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>Map: {data.map.name}</p>
      <p>Side: {data.side}</p>
      <p>Difficulty: {data.difficulty}</p>
      <p>Economy: {data.economy}</p>
    </div>
  )
}
