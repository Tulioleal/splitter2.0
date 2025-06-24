import fetchFromAPI from '@/lib/fetchFromAPI'
import { Action } from '@/types/Action'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../ui/spinner'
import Transaction from './Transaction'
import { useTabStore } from '@/store/store'
import { useShallow } from 'zustand/react/shallow'

const Transactions = () => {
  const { actions, expenses, modTab, expensesTouched, setExpensesTouched } = useTabStore(
    useShallow((state) => ({
      actions: state.tab.actions,
      expenses: state.tab.expenses,
      modTab: state.modTab,
      expensesTouched: state.expensesTouched,
      setExpensesTouched: state.setExpensesTouched
    }))
  )
  const fetchActions = async () => {
    return Boolean(actions.length > 0) && !expensesTouched
      ? await Promise.resolve(actions || [])
      : await fetchFromAPI<Action[]>({ expenses: expenses }, 'actions', 'POST').then((data) => {
          modTab({
            actions: data
          })
          setExpensesTouched(false)
          return data
        })
  }

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
