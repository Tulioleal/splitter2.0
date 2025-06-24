import getObjectWithBasic from '@/lib/getObjectWithBasic'
import { expenseSchema } from '@/schemas/Expense.schema'
import { useTabStore } from '@/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type ExpenseForm = z.infer<typeof expenseSchema>

const ExpenseForm = () => {
  const { expenses, modTab, setExpensesTouched } = useTabStore(
    useShallow((state) => ({
      expenses: state.tab.expenses,
      currency: state.tab.currency,
      closed: state.tab.closed,
      modTab: state.modTab,
      setExpensesTouched: state.setExpensesTouched
    }))
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema)
  })
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

  function onSubmit(data: ExpenseForm) {
    // Add the expense to the list of expenses
    modTab({
      expenses: [...(expenses || []), getObjectWithBasic(data)],
      closed: false
    })
    setExpensesTouched(true)
    reset()
  }

  return (
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
  )
}

export default ExpenseForm
