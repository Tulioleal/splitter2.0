import { Action } from '@/types/Action'
import { JSX } from 'react'
import Text from '../ui/text'
import TextTransition, { presets } from 'react-text-transition'
import { useTabStore } from '@/store/store'
import { useShallow } from 'zustand/react/shallow'
import { capitalize } from '@/lib/capitalize'

type TransactionProps = Action

const Transaction = ({ id, amount, from, to, checked }: TransactionProps): JSX.Element => {
  const { actions, currency, modTab } = useTabStore(
    useShallow((state) => ({
      actions: state.tab.actions,
      currency: state.tab.currency,
      modTab: state.modTab
    }))
  )

  const toggleChecked = () => {
    // find the corresponding expense
    const action = actions?.find((action) => action.id === id)

    if (!action) return

    const newActions = actions?.map((a) => {
      if (a.id !== id) return a
      return { ...a, checked: a.checked ? false : true }
    })
    modTab({
      actions: newActions
    })
  }

  return (
    <div
      className={`flex flex-row gap-2 p-4 border rounded-lg shadow-sm cursor-pointer ${checked ? 'bg-green-100 hover:bg-green-50 ' : 'bg-red-100 hover:bg-red-50 '} transition-colors`}
      onClick={toggleChecked}
    >
      <Text tag="span">
        {`${capitalize(from)} `}
        <TextTransition inline springConfig={presets.wobbly}>
          {checked ? 'paid' : 'owes'}
        </TextTransition>
        {` ${capitalize(to)}`} <span className="font-bold">{amount}</span> {currency}
      </Text>
    </div>
  )
}

export default Transaction
