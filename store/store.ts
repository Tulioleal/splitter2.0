import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { Tab } from "@/types/Tab";
// import db from "@/db/db";

interface TabStore {
  tab: Tab
  ExpensesTouched: boolean,
  toggleExpensesTouched: () => void,
  modTab: (tab: Partial<Tab>) => void,
  resetTab: () => void
}

const initialState: Tab = {
  name: '',
  currency: '',
  totalAmount: 0,
  expenses: [],
  actions: [],
  closed: false,
  id: '',
  createdAt: "",
  updatedAt: "",
  isNew: false,
}

export const useTabStore = create<TabStore>()(subscribeWithSelector((set) => ({
  tab: initialState,
  ExpensesTouched: false,
  toggleExpensesTouched: () => set((state) => ({
    ExpensesTouched: !state.ExpensesTouched,
  })),
  modTab: (partialTab: Partial<Tab>) => set((state) => ({
    tab: {
      ...state.tab,
      ...partialTab,
    }
  })),
  resetTab: () => set({ tab: initialState }),
})))