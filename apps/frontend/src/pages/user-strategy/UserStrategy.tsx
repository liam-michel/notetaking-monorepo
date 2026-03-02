import { trpc } from '@/lib/providers/trpc'
import { useParams } from '@tanstack/react-router'
import { useMatches } from '@tanstack/react-router'

export default function StrategyDetail() {
  const matches = useMatches()
  console.log('Matches:', matches) // Log the matches to see the route hierarchy and params
  const { id } = useParams({ from: '/protected/strategy/$id' })
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
