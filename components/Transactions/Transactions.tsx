import { useTab } from '@/context/Tab.context'
import fetchFromAPI from '@/lib/fetchFromAPI'
import { Action } from '@/types/Action'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../ui/spinner'

const Transactions = () => {
  const {
    activeTab: { expenses }
  } = useTab()

  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ['actions'],
    queryFn: () => fetchFromAPI<Action[]>({ expenses }, 'actions', 'POST')
  })

  if (isLoading) return <Spinner size="md" />
  if (error || !data) return <div>Error: {error?.message}</div>

  return (
    <div>
      {data.map((action, key) => {
        return (
          <div key={key}>
            <p>Action ID: {action.id}</p>
            <p>Amount: {action.amount}</p>
            <p>From: {action.from}</p>
            <p>To: {action.to}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Transactions
