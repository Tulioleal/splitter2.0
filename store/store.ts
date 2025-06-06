import { create } from "zustand"
import { Tab } from "@/types/Tab";

interface TabStore {
  tab: Tab
  modTab: (tab: Partial<Tab>) => void
}

export const useTabStore = create<TabStore>((set) => ({
  tab: {
    name: '',
    currency: '',
    totalAmount: 0,
    expenses: [],
    actions: [],
    closed: false,
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  modTab: (partialTab: Partial<Tab>) => set((state) => ({
    tab: {
      ...state.tab,
      ...partialTab,
    }
  })),
}))