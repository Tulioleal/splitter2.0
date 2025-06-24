import { ExpenseOBC } from "@/types/Expense";
import { getCleanSet } from "./getCleanSet";

export function normalizeUsers(expenses: ExpenseOBC[]): string[] {
  return getCleanSet(
    expenses.flatMap((expense) => expense.splitBetween.map(
      (person) => person.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    ))
  )
}