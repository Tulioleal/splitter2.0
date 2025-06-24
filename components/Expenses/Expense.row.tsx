import { Expense as ExpenseType } from '@/types/Expense'
import { JSX, useState } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { useTabStore } from '@/store/store'
import { Button } from '../ui/button'
import { EditIcon, SaveIcon, TrashIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useShallow } from 'zustand/shallow'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog'
import { DialogClose, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

type ExpenseToDisplay = Omit<ExpenseType, 'createdAt' | 'updatedAt'>
type ExpenseWithEdit = ExpenseToDisplay & {
  onEditExpense: (expense: ExpenseToDisplay | null) => void
}

const EditableExpenseRow = (expense: ExpenseType): JSX.Element => {
  const setExpensesTouched = useTabStore((state) => state.setExpensesTouched)
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseToDisplay | null>(null)

  const handleExpenseEdit = (expense: ExpenseToDisplay | null) => {
    if (Boolean(expense == null)) {
      setExpensesTouched(true)
    }
    setExpenseToEdit(expense)
  }

  if (expenseToEdit) {
    return <EditExpense {...expenseToEdit} onEditExpense={handleExpenseEdit} />
  }

  return <ExpenseRow {...expense} onEditExpense={handleExpenseEdit} />
}

export default EditableExpenseRow

const EditExpense = (props: ExpenseWithEdit): JSX.Element => {
  const { modTab, expenses } = useTabStore(
    useShallow((state) => ({
      modTab: state.modTab,
      expenses: state.tab.expenses
    }))
  )
  const { onEditExpense, amount, splitBetween, name, id } = props

  function handleSave(expenseToEdit: ExpenseToDisplay) {
    modTab({
      expenses: expenses.map((expense) =>
        expense.id === expenseToEdit.id ? { ...expense, ...expenseToEdit } : expense
      )
    })
    toast.success('Expense updated successfully!')
    onEditExpense(null)
  }

  return (
    <TableRow>
      <TableCell>
        <Input
          type="text"
          value={props.name}
          onChange={(e) => onEditExpense({ ...props, name: e.target.value })}
          className="border rounded p-1 bg-gray-50"
        />
      </TableCell>
      <TableCell>
        <Input
          type="text"
          value={props.splitBetween.join(', ')}
          onChange={(e) => onEditExpense({ ...props, splitBetween: e.target.value.split(', ') })}
          className="border rounded p-1 bg-gray-50"
        />
      </TableCell>
      <TableCell className="d-flex justify-center">
        <Input
          type="number"
          value={props.amount}
          onChange={(e) => onEditExpense({ ...props, amount: parseFloat(e.target.value) })}
          className="border rounded p-1 bg-gray-50"
        />
      </TableCell>
      <TableCell className="flex justify-center gap-2">
        <Button
          onClick={handleSave.bind(null, { amount, name, splitBetween, id })}
          className="cursor-pointer bg-green-600 hover:bg-green-500 text-white hover:text-white"
        >
          <SaveIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}

const ExpenseRow = (props: ExpenseWithEdit) => {
  const currency = useTabStore((state) => state.tab.currency)
  const { modTab, expenses } = useTabStore(
    useShallow((state) => ({
      modTab: state.modTab,
      expenses: state.tab.expenses
    }))
  )
  const { name, splitBetween, amount, onEditExpense } = props

  function handleDelete(expenseId: string) {
    modTab({
      expenses: expenses.filter((expense) => expense.id !== expenseId)
    })
    toast.success('Expense deleted!')
    onEditExpense(null)
  }

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Delete Expense &apos;<b>{name}</b>&apos;
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete this expense?</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4"></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete.bind(null, props.id)}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <TableRow>
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
            variant="ghost"
            size="icon"
            onClick={onEditExpense.bind(null, props)}
          >
            <EditIcon />
          </Button>
          <DialogTrigger asChild>
            <Button variant="destructive" className="cursor-pointer hover:bg-red-400">
              <TrashIcon />
            </Button>
          </DialogTrigger>
        </TableCell>
      </TableRow>
    </Dialog>
  )
}
