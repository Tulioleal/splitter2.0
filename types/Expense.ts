import { Basic } from './Basic'

export interface ExpenseOBC {
  name: string
  amount: number
  splitBetween: string[]
}

export type Expense = ExpenseOBC & Basic