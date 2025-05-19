import { Basic } from "./Basic";
import { Expense } from "./Expense";

export interface Tab extends Basic {
  name: string;
  totalAmount: number;
  expenses: Expense[]
}

