import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { z } from 'zod'
import { expenseSchema } from '@/schemas/Expense.schema'
import Expense from './Expense'
import { useTab } from '@/context/Tab.context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import getObjectWithBasic from '@/lib/getObjectWithBasic'
import { getCleanSet } from '@/lib/getCleanSet'

type ExpenseForm = z.infer<typeof expenseSchema>

const Expenses = () => {
  const { activeTab, setActiveTab } = useTab()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema)
  })

  const getTotal = useMemo((): number => {
    if (!activeTab.expenses) return 0
    return parseFloat(activeTab.expenses.reduce((curr, next) => curr + next.amount, 0).toFixed(2))
  }, [activeTab.expenses])

  const getTotalPeople = useMemo((): number => {
    if (!activeTab.expenses) return 0
    const cleanNames = getCleanSet(activeTab.expenses.flatMap((expense) => expense.splitBetween))
    return cleanNames.length || 1 // Ensure at least one person to avoid division by zero
  }, [activeTab.expenses])

  function onSubmit(data: ExpenseForm) {
    // Add the expense to the list of expenses
    setActiveTab({
      ...activeTab,
      expenses: [
        ...(activeTab?.expenses || []),
        getObjectWithBasic({
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ]
    })
    reset()
  }

  useEffect(() => {
    if (errors.amount) {
      toast.error('Error on Amount field', {
        description: errors.amount.message,
        duration: 5000
      })
      return
    }

    if (errors.name) {
      toast.error('Error on Paid By field', {
        description: errors.name.message || 'This field is required',
        duration: 5000
      })
      return
    }

    if (errors.splitBetween) {
      toast.error('Error on Split Between field', {
        description: errors.splitBetween.message,
        duration: 5000
      })
      return
    }
  }, [errors])

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          {...register('name', { required: true })}
          type="text"
          placeholder="Name the expense"
          required
          aria-invalid={errors.name ? 'true' : 'false'}
          className="col-span-2"
        />
        <Input
          {...register('amount', { required: true, valueAsNumber: true })}
          type="number"
          placeholder="What was the amount?"
          aria-invalid={errors.amount ? 'true' : 'false'}
          required
          className="col-span-2"
        />
        <Input
          {...register('splitBetween', {
            required: true,
            setValueAs: (value: string) => value.split(',').map((item) => item.trim())
          })}
          placeholder="Who split the expense? (comma separated)"
          aria-invalid={errors.splitBetween ? 'true' : 'false'}
          required
          className="col-span-3"
        />
        <Button type="submit">Add</Button>
      </form>
      {activeTab.expenses ? (
        <Table className="overflow-y-scroll max-h-10 bg-gray-200">
          <TableCaption>List of all the expenses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Expense</TableHead>
              <TableHead className="text-center">Between</TableHead>
              <TableHead className="text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeTab.expenses.map((expense, key) => (
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
                {getTotal.toFixed(2)} {`${activeTab.currency}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-center">Total each</TableCell>
              <TableCell />
              <TableCell className="font-bold text-center">
                {(getTotal / getTotalPeople).toFixed(2)} {`${activeTab.currency}`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="text-center text-gray-500">No expenses added yet.</div>
      )}
    </div>
  )
}

export default Expenses
