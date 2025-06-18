'use client'

import Expenses from '@/components/Expenses/Expenses'
import NameAndCurrency from '@/components/NameAndCurrency'
import Transactions from '@/components/Transactions/Transactions'
import Heading from '@/components/ui/heading'
import { Stepper } from '@/components/ui/stepper'
import db from '@/db/db'
import { tabSchema } from '@/schemas/Tab.schema'
import { useTabStore } from '@/store/store'
import { JSX, useEffect, useMemo, useState } from 'react'
import getObjectWithBasic from '@/lib/getObjectWithBasic'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { GET_tab } from '@/db/tab.model'
import { shallow } from 'zustand/shallow'

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
        canMoveForward: Boolean(tab.actions.length > 0 && tab.actions.every((action) => action.checked)),
        onNextSideEffect: () => {
          db.tab
            .add({
              ...getObjectWithBasic({
                ...tab,
                totalAmount: tab.expenses.reduce((acc, expense) => acc + expense.amount, 0),
                closed: true
              })
            })
            .then(() => router.push(`/`))
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

const fetchTab = async (id: string | undefined) => {
  if (!id) {
    useTabStore.getState().resetTab()
    return useTabStore.getState().tab
  }
  const tab = await GET_tab(id)
  if (!tab) return useTabStore.getState().tab
  useTabStore.getState().modTab(tab)
  return tab
}

const TabScreen = ({ id }: { id?: string }) => {
  const { isLoading } = useQuery({ queryKey: [id], queryFn: fetchTab.bind(null, id) })
  const modTab = useTabStore((state) => state.modTab)
  useEffect(() => {
    const sub = useTabStore.subscribe(
      (state) => state.tab,
      (tab) => {
        if (tab.id == '') {
          const completeTab = getObjectWithBasic({
            ...tab,
            isNew: true
          })
          db.tab
            .add(completeTab)
            .then((id) => modTab({ id }))
            .catch((error) => {
              console.error('Error adding tab:', error)
            })
        }

        if (tab.id != '') {
          db.tab.put(getObjectWithBasic(tab)).catch((error) => {
            console.error('Error updating tab:', error)
          })
        }
      },
      {
        equalityFn: shallow,
        fireImmediately: false
      }
    )

    return sub
  }, [modTab])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Heading className="mb-4">Tab</Heading>
      <TabScreenContent />
    </>
  )
}

export default TabScreen
