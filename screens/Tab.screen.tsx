'use client'

import Expenses from '@/components/Expenses/Expenses'
import NameAndCurrency from '@/components/NameAndCurrency'
import Heading from '@/components/ui/heading'
import { Stepper } from '@/components/ui/stepper'
import { TabProvider, useTab } from '@/context/Tab.context'
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
        title: 'Name & currency',
        component: NameAndCurrency,
        canMoveForward: Boolean(activeTab.name && activeTab.currency)
      },
      {
        title: 'Expenses',
        component: Expenses,
        canMoveForward: Boolean(activeTab.expenses && activeTab.expenses?.length > 0)
      }
    ],
    [activeTab]
  )

  const { component: Step, canMoveForward } = useMemo(() => STEPS[currentStep], [currentStep, STEPS])

  return (
    <div className="flex flex-col gap-4 min-w-[720px]">
      <Stepper steps={STEPS} currentStep={currentStep} onStepChange={setCurrentStep} canMoveForward={canMoveForward}>
        <Step />
      </Stepper>
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
