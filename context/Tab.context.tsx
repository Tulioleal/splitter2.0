'use client'

import { Tab } from '@/types/Tab'
import React, { createContext, useContext, useState, ReactNode } from 'react'

type TabContextType = {
  activeTab: Partial<Tab>
  setActiveTab: (tab: Partial<Tab>) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Partial<Tab>>({
    id: undefined,
    name: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    expenses: undefined
  })

  return <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>
}

export const useTab = (): TabContextType => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTab must be used within a TabProvider')
  }
  return context
}
