import { useTab } from '@/context/Tab.context'
import fetchFromAPI from '@/lib/fetchFromAPI'
import { Action } from '@/types/Action'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../ui/spinner'
import Transaction from './Transaction'
import { useState } from 'react'

const Transactions = () => {
  const { activeTab, setActiveTab } = useTab()
  const [actions, setActions] = useState<Action[]>([])
  const fetchActionsExists = activeTab.actions && activeTab.actions.length > 0
  const fetchActions = () =>
    Boolean(fetchActionsExists)
      ? Promise.resolve(activeTab.actions || []).then((data) => {
          setActions(data)
          return data
        })
      : fetchFromAPI<Action[]>({ expenses: activeTab.expenses }, 'actions', 'POST').then((data) => {
          setActiveTab({
            ...activeTab,
            actions: data
          })
          setActions(data)
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
