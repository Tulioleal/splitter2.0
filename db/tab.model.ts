import { Tab } from "@/types/Tab"
import db from "./db"

export const GET_tab = (id: string | undefined) => {
  if (!id) return undefined
  return db.tab.get(id)
}

export const UPDATE_tab = (tab: Tab) => {
  if (!tab.id) return db.tab.update(tab, {
    totalAmount: tab.expenses.reduce((acc, expense) => acc + expense.amount, 0),
    updatedAt: new Date().toISOString(),
  })
  return db.tab.put(tab)
}

export const POST_tab = (tab: Tab) => {
  return db.tab.add({
    ...tab,
    totalAmount: tab.expenses.reduce((acc, expense) => acc + expense.amount, 0),
    closed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}