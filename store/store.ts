import { create } from "zustand"
import { Tab } from "@/types/Tab";

interface TabStore {
  tab: Tab
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
}

export const useTabStore = create<TabStore>((set) => ({
  tab: initialState,
  modTab: (partialTab: Partial<Tab>) => set((state) => ({
    tab: {
      ...state.tab,
      ...partialTab,
    }
  })),
  resetTab: () => set({ tab: initialState }),
}))