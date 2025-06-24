import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { Tab } from "@/types/Tab";
// import db from "@/db/db";

interface TabStore {
  tab: Tab
  expensesTouched: boolean,
  setExpensesTouched: (value: boolean) => void,
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
  expensesTouched: false,
  setExpensesTouched: (value: boolean) => set(() => ({
    expensesTouched: value,
  })),
  modTab: (partialTab: Partial<Tab>) => set((state) => ({
    tab: {
      ...state.tab,
      ...partialTab,
    }
  })),
  resetTab: () => set({ tab: initialState }),
})))