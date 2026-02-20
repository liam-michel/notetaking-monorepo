import { columns } from '../../components/strategy-table/columns'
import { DataTable } from '@/components/ui/data-table'
import { useUserStrategies } from '@/hooks/user/useUserStrategies'
import { CreateStrategyForm } from '@/forms/createStrategyForm'

import { DialogWrapper } from '@/components/ui/dialog-wrapper'
import { useCreateUserStrategy } from '@/hooks/user/useCreateStrategy'
export default function UserStrategies() {
  const { data, error } = useUserStrategies()
  const createStrategyMutation = useCreateUserStrategy()

  if (error) {
    return <div>Error loading strategies: {error.message}</div>
  }

  return (
    <div>
      <DialogWrapper
        title="Create New Strategy"
        description="Fill out the form below to create a new strategy."
        triggerLabel="Create Strategy"
      >
        {({ close }) => (
          <CreateStrategyForm
            onSubmit={async (data) => {
              await createStrategyMutation.mutateAsync({
                ...data,
              })
              close()
            }}
          />
        )}
      </DialogWrapper>

      <h1>My Strategies</h1>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  )
}
