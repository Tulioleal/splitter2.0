import { create } from "zustand"
import { Tab } from "@/types/Tab";

interface TabStore {
  tab: Partial<Tab>
  modTab: (tab: Partial<Tab>) => void
}

export const useTabStore = create<TabStore>((set) => ({
  tab: {},
  modTab: (partialTab: Partial<Tab>) => set((state) => ({
    tab: {
      ...state.tab,
      ...partialTab,
    }
  })),
}))