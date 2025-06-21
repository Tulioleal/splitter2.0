import { ExpenseOBC } from '@/types/Expense'
import { JSX, useState } from 'react'
import { TableCell } from '../ui/table'
import { useTabStore } from '@/store/store'
import { Button } from '../ui/button'
import { EditIcon, SaveIcon, TrashIcon } from 'lucide-react'
import { Input } from '../ui/input'

const Expense = ({ splitBetween, name, amount }: ExpenseOBC): JSX.Element => {
  const currency = useTabStore((state) => state.tab.currency)
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseOBC | null>(null)

  if (expenseToEdit) {
    return (
      <>
        <TableCell>
          <Input
            type="text"
            value={expenseToEdit.name}
            onChange={(e) => setExpenseToEdit({ ...expenseToEdit, name: e.target.value })}
            className="border rounded p-1 bg-gray-50"
          />
        </TableCell>
        <TableCell>
          <Input
            type="text"
            value={expenseToEdit.splitBetween.join(', ')}
            onChange={(e) => setExpenseToEdit({ ...expenseToEdit, splitBetween: e.target.value.split(', ') })}
            className="border rounded p-1 bg-gray-50"
          />
        </TableCell>
        <TableCell className="d-flex justify-center">
          <Input
            type="number"
            value={expenseToEdit.amount}
            onChange={(e) => setExpenseToEdit({ ...expenseToEdit, amount: parseFloat(e.target.value) })}
            className="border rounded p-1 bg-gray-50"
          />
        </TableCell>
        <TableCell className="flex justify-center gap-2">
          <Button
            onClick={() => setExpenseToEdit(null)}
            className="cursor-pointer bg-green-600 hover:bg-green-500 text-white hover:text-white"
          >
            <SaveIcon />
          </Button>
        </TableCell>
      </>
    )
  }

  return (
    <>
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center">
        {splitBetween.map((name, i) => name + (i < splitBetween.length - 1 ? ', ' : '.'))}
      </TableCell>
      <TableCell className="text-center">
        {amount} {currency}
      </TableCell>
      <TableCell className="flex justify-center gap-2">
        <Button
          className="cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-white hover:text-white"
          variant="outline"
          onClick={() => setExpenseToEdit({ splitBetween, name, amount })}
        >
          <EditIcon />
        </Button>
        <Button variant="destructive" className="cursor-pointer hover:bg-red-400">
          <TrashIcon />
        </Button>
      </TableCell>
    </>
  )
}

export default Expense
