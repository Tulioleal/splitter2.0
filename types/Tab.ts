import { Action } from './Action'
import { Basic } from './Basic'
import { Expense } from './Expense'

export interface Tab extends Basic {
  name: string
  currency: string
  totalAmount: number
  expenses: Expense[]
  actions: Action[]
}
