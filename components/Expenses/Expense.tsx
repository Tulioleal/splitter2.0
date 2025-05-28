import { Expense as ExpenseType } from '@/types/Expense'
import { JSX } from 'react'
import { useTab } from '@/context/Tab.context'
import { TableCell } from '../ui/table'

const Expense = ({ splitBetween, name, amount }: ExpenseType): JSX.Element => {
  const { activeTab } = useTab()
  return (
    <>
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center">
        {splitBetween.map((name, i) => name + (i < splitBetween.length - 1 ? ', ' : '.'))}
      </TableCell>
      <TableCell className="text-center">
        {amount} {activeTab.currency}
      </TableCell>
    </>
  )
}

export default Expense
