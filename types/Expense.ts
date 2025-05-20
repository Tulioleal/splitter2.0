import { Basic } from './Basic'

export interface Expense extends Basic {
  name: string
  amount: number
  paidBy: string
  splitBetween: number
}
