'use client'

import Expenses from '@/components/Expenses/Expenses'
import NameAndCurrency from '@/components/NameAndCurrency'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { TabProvider, useTab } from '@/context/Tab.context'
import { Tab } from '@/types/Tab'
import { toast } from 'sonner'

const TabScreenContent = () => {
  const { activeTab } = useTab()

  const processTab = (tab: Partial<Tab> | null) => {
    if (!tab) {
      toast.error('No tab data available to process', {
        description: 'Please fill out the tab form before processing.',
        duration: 5000
      })
      return
    }

    // Process the tab data here
    console.log('Processing tab:', tab)
  }

  return (
    <div className="flex flex-col gap-4">
      <NameAndCurrency />
      <Expenses />
      <Button onClick={() => processTab(activeTab)}>Save and process</Button>
    </div>
  )
}

const TabScreen = () => (
  <TabProvider>
    <Heading className="mb-4">Tab</Heading>
    <TabScreenContent />
  </TabProvider>
)

export default TabScreen
