import { Expense as ExpenseType } from '@/types/Expense'
import { JSX } from 'react'
import { TableCell } from '../ui/table'
import { useTabStore } from '@/store/store'

const Expense = ({ splitBetween, name, amount }: ExpenseType): JSX.Element => {
  const currency = useTabStore((state) => state.tab.currency)

  return (
    <>
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center">
        {splitBetween.map((name, i) => name + (i < splitBetween.length - 1 ? ', ' : '.'))}
      </TableCell>
      <TableCell className="text-center">
        {amount} {currency}
      </TableCell>
    </>
  )
}

export default Expense
