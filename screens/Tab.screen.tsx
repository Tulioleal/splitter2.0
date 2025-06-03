'use client'

import Expenses from '@/components/Expenses/Expenses'
import NameAndCurrency from '@/components/NameAndCurrency'
import Transactions from '@/components/Transactions/Transactions'
import Heading from '@/components/ui/heading'
import { Stepper } from '@/components/ui/stepper'
import { TabProvider, useTab } from '@/context/Tab.context'
import db from '@/db/db'
import { JSX, useMemo, useState } from 'react'

interface StepInterface {
  title: string
  component: () => JSX.Element
  canMoveForward: boolean
}

const TabScreenContent = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const { activeTab } = useTab()

  const STEPS: StepInterface[] = useMemo(
    () => [
      {
        title: 'Setup',
        component: NameAndCurrency,
        canMoveForward: Boolean(activeTab.name && activeTab.currency)
      },
      {
        title: 'What Was Spent?',
        component: Expenses,
        canMoveForward: Boolean(activeTab.expenses && activeTab.expenses?.length > 0)
      },
      {
        title: 'Even Things Out',
        component: Transactions,
        canMoveForward: activeTab.actions != undefined && Boolean(activeTab.actions.every((action) => action.checked)),
        onNextSideEffect: () => {
          db.tab.add({
            ...activeTab,
            createdAt: new Date(),
            updatedAt: new Date(),
            closed: true
          })
        }
      }
    ],
    [activeTab]
  )

  const Step = useMemo(() => STEPS[currentStep], [currentStep, STEPS])

  return (
    <div className="flex flex-col gap-4 min-w-[720px]">
      <Stepper steps={STEPS} currentStep={currentStep} onStepChange={setCurrentStep} {...Step}>
        <Step.component />
      </Stepper>
    </div>
  )
}

const TabScreen = () => (
  <>
    <Heading className="mb-4">Tab</Heading>
    <TabProvider>
      <TabScreenContent />
    </TabProvider>
  </>
)

export default TabScreen
