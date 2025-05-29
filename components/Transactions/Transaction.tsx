import { Action } from '@/types/Action'
import { JSX, useState } from 'react'
import Text from '../ui/text'
import { useTab } from '@/context/Tab.context'
import TextTransition, { presets } from 'react-text-transition'

type TransactionProps = Action

const Transaction = ({ id, amount, from, to, checked }: TransactionProps): JSX.Element => {
  const [isPaid, setIsPaid] = useState<boolean>(checked || false)
  const { activeTab, setActiveTab } = useTab()

  const toggleChecked = () => {
    setIsPaid(!isPaid)

    // find the corresponding expense
    const action = activeTab.actions?.find((action) => action.id === id)

    if (action) {
      // Update the action with the new checked state
      const newActions = activeTab.actions?.map((a) => {
        if (a.id === id) {
          return { ...a, checked: !isPaid }
        }
        return a
      })
      setActiveTab({
        ...activeTab,
        actions: newActions
      })
    }
  }

  return (
    <div
      className={`flex flex-row gap-2 p-4 border rounded-lg shadow-sm cursor-pointer ${isPaid ? 'bg-green-100 hover:bg-green-50 ' : 'bg-red-100 hover:bg-red-50 '} transition-colors`}
      onClick={toggleChecked}
    >
      <Text tag="span">
        {from}{' '}
        <TextTransition inline springConfig={presets.wobbly}>
          {isPaid ? 'paid' : 'owes'}
        </TextTransition>{' '}
        {to} <span className="font-bold">{amount}</span> {activeTab.currency}
      </Text>
    </div>
  )
}

export default Transaction
