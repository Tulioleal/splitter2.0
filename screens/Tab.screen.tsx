'use client'

import Expenses from '@/components/Expenses/Expenses'
import NameAndCurrency from '@/components/NameAndCurrency'
import Transactions from '@/components/Transactions/Transactions'
import Heading from '@/components/ui/heading'
import { Stepper } from '@/components/ui/stepper'
import ReactQueryProvider from '@/context/Query.provider'
import { tabSchema } from '@/schemas/Tab.schema'
import { useTabStore } from '@/store/store'
import { JSX, useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

interface StepInterface {
  title: string
  component: () => JSX.Element
  canMoveForward: boolean
}

const TabScreenContent = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const { name, currency, expenses } = useTabStore(
    useShallow((state) => ({
      name: state.tab.name,
      currency: state.tab.currency,
      expenses: state.tab.expenses
    }))
  )

  const STEPS: StepInterface[] = useMemo(
    () => [
      {
        title: 'Setup',
        component: NameAndCurrency,
        canMoveForward: !Boolean(tabSchema.safeParse({ name, currency }).error)
      },
      {
        title: 'What Was Spent?',
        component: Expenses,
        canMoveForward: Boolean(expenses?.length > 0)
      },
      {
        title: 'Even Things Out',
        component: Transactions,
        canMoveForward: true
      }
    ],
    [name, currency, expenses]
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
  <>
    <Heading className="mb-4">Tab</Heading>
    <ReactQueryProvider>
      <TabScreenContent />
    </ReactQueryProvider>
  </>
)

export default TabScreen
