'use client'

import { TabOBC } from '@/types/Tab'
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react'
import ReactQueryProvider from './Query.provider'
import { useParams } from 'next/navigation'

type TabContextType = {
  activeTab: TabOBC
  setActiveTab: (tab: TabOBC) => void
  touched: boolean
  setTouched?: (touched: boolean) => void
  isNew?: boolean
  setIsNew?: (isNew: boolean) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState<TabOBC>({
    name: 'Test',
    currency: 'USD',
    totalAmount: 0,
    expenses: [
      {
        id: '1',
        name: 'Expense 1',
        amount: 100,
        splitBetween: ['Alice', 'Bob'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Expense 2',
        amount: 75,
        splitBetween: ['Alice', 'Charlie'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    actions: [],
    closed: false
  })
  const [touched, setTouched] = useState<boolean>(false)
  const [isNew, setIsNew] = useState<boolean>(true)
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      console.log('Active Tab Expenses Changed:', activeTab.expenses)
      setTouched(true)
      return
    }
    console.log(id)

    isMounted.current = true
  }, [activeTab.expenses, id])

  const VALUES = {
    activeTab,
    setActiveTab,
    touched,
    setTouched,
    isNew,
    setIsNew
  }

  return (
    <TabContext.Provider value={VALUES}>
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
