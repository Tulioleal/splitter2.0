'use client'

import Expenses from '@/components/Expenses/Expenses'
import NameAndCurrency from '@/components/NameAndCurrency'
import Transactions from '@/components/Transactions/Transactions'
import Heading from '@/components/ui/heading'
import { Stepper } from '@/components/ui/stepper'
import db from '@/db/db'
import ReactQueryProvider from '@/context/Query.provider'
import { tabSchema } from '@/schemas/Tab.schema'
import { useTabStore } from '@/store/store'
import { JSX, useEffect, useMemo, useState } from 'react'
import getObjectWithBasic from '@/lib/getObjectWithBasic'
import { useRouter } from 'next/navigation'
import { useLiveQuery } from 'dexie-react-hooks'
import { useShallow } from 'zustand/react/shallow'

interface StepInterface {
  title: string
  component: () => JSX.Element
  canMoveForward: boolean
  onNextSideEffect?: () => void
}

const TabScreenContent = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const tab = useTabStore((state) => state.tab)
  const router = useRouter()

  const STEPS: StepInterface[] = useMemo(
    () => [
      {
        title: 'Setup',
        component: NameAndCurrency,
        canMoveForward: !Boolean(tabSchema.safeParse({ name: tab.name, currency: tab.currency }).error)
      },
      {
        title: 'What Was Spent?',
        component: Expenses,
        canMoveForward: Boolean(tab.expenses?.length > 0)
      },
      {
        title: 'Even Things Out',
        component: Transactions,
        canMoveForward: Boolean(tab.actions.every((action) => action.checked)),
        onNextSideEffect: () => {
          db.tab
            .add({
              ...getObjectWithBasic({
                ...tab,
                totalAmount: tab.expenses.reduce((acc, expense) => acc + expense.amount, 0),
                closed: true
              })
            })
            .then(() => {
              router.push(`/`)
            })
        }
      }
    ],
    [tab, router]
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

const TabScreen = ({ id }: { id?: string }) => {
  const tab = useLiveQuery(() => {
    if (!id) return undefined
    return db.tab.get(id)
  }, [id])
  const { modTab, resetTab } = useTabStore(
    useShallow((state) => ({
      modTab: state.modTab,
      resetTab: state.resetTab
    }))
  )

  useEffect(() => {
    if (!id || !tab) {
      console.log('TabScreen: No ID or tab found, resetting tab state')
      resetTab()
      return
    }

    modTab(tab)
  }, [modTab, resetTab, id, tab])

  return (
    <>
      <Heading className="mb-4">Tab</Heading>
      <ReactQueryProvider>
        <TabScreenContent />
      </ReactQueryProvider>
    </>
  )
}

export default TabScreen
