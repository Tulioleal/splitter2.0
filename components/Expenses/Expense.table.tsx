import { useTabStore } from '@/store/store'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import Expense from './Expense'
import { useShallow } from 'zustand/shallow'
import { useMemo } from 'react'
import { getCleanSet } from '@/lib/getCleanSet'

//TODO: Add mod and delete functionality to each expense

const ExpenseTable = () => {
  const { expenses, currency } = useTabStore(
    useShallow((state) => ({
      expenses: state.tab.expenses,
      currency: state.tab.currency
    }))
  )
  const getTotal = useMemo((): number => {
    if (!expenses) return 0
    return parseFloat(expenses.reduce((curr, next) => curr + next.amount, 0).toFixed(2))
  }, [expenses])

  const getTotalPeople = useMemo((): number => {
    if (!expenses) return 0
    const cleanNames = getCleanSet(expenses.flatMap((expense) => expense.splitBetween))
    return cleanNames.length || 1 // Ensure at least one person to avoid division by zero
  }, [expenses])

  return (
    <Table className="bg-gray-200">
      <TableCaption>List of all the expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Expense</TableHead>
          <TableHead className="text-center">Between</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-auto max-h-[300px]">
        {expenses.map((expense, key) => (
          <TableRow key={key}>
            <Expense {...expense} />
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-bold text-center">Total</TableCell>
          <TableCell className="font-bold text-center">{getTotalPeople}</TableCell>
          <TableCell className="font-bold text-center">
            {getTotal.toFixed(2)} {`${currency}`}
          </TableCell>
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell className="font-bold text-center">Total each</TableCell>
          <TableCell />
          <TableCell className="font-bold text-center">
            {(getTotal / getTotalPeople).toFixed(2)} {`${currency}`}
          </TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default ExpenseTable
