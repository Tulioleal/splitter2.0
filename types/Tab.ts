import { Action } from './Action'
import { Basic } from './Basic'
import { Expense } from './Expense'

export interface TabOBC {
  name: string
  currency: string
  totalAmount: number
  expenses: Expense[]
  actions: Action[]
  closed: boolean
  isNew: boolean
}

export type Tab = TabOBC & Basic