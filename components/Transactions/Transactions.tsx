import fetchFromAPI from '@/lib/fetchFromAPI'
import { Action } from '@/types/Action'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../ui/spinner'
import Transaction from './Transaction'
import { useTabStore } from '@/store/store'
import { useShallow } from 'zustand/react/shallow'

const Transactions = () => {
  const { actions, expenses, modTab } = useTabStore(
    useShallow((state) => ({
      actions: state.tab.actions,
      expenses: state.tab.expenses,
      modTab: state.modTab
    }))
  )
  const fetchActions = () =>
    Boolean(actions.length > 0)
      ? Promise.resolve(actions || []).then((data) => {
          modTab({
            actions: data
          })
          return data
        })
      : fetchFromAPI<Action[]>({ expenses: expenses }, 'actions', 'POST').then((data) => {
          modTab({
            actions: data
          })
          return data
        })

  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ['actions'],
    queryFn: fetchActions
  })

  if (isLoading) return <Spinner size="md" />
  if (error || !data) return <div>Error: {error?.message}</div>

  return (
    <div className="flex flex-col gap-4 py-4 rounded-lg max-h-[calc(100vh-200px)] overflow-y-auto">
      {actions?.map((action) => <Transaction key={action.id} {...action} />)}
    </div>
  )
}

export default Transactions
