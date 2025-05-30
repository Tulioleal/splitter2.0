'use client'

import { Tab } from '@/types/Tab'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import ReactQueryProvider from './Query.provider'

type TabContextType = {
  activeTab: Partial<Tab>
  setActiveTab: (tab: Partial<Tab>) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Partial<Tab>>({})

  // useEffect(() => {
  //   return () => {}
  // }, []) // for when we need to save things on indexedDB on every change

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </TabContext.Provider>
  )
}

export const useTab = (): TabContextType => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTab must be used within a TabProvider')
  }
  return context
}
