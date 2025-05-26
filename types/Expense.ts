import { Basic } from './Basic'

export interface Expense extends Basic {
  amount: number
  paidBy: string
  splitBetween: number
}
