import { useTabStore } from '@/store/store'
import ExpenseForm from './Expense.form'
import ExpenseTable from './Expense.table'

const Expenses = () => {
  const expenses = useTabStore((state) => state.tab.expenses)

  return (
    <div className="flex flex-col gap-4">
      <ExpenseForm />
      {expenses ? <ExpenseTable /> : <p className="text-center text-gray-500">No expenses added yet.</p>}
    </div>
  )
}

export default Expenses
