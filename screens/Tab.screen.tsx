'use client'

import Expenses from '@/components/Expenses/Expenses'
import NameAndCurrency from '@/components/NameAndCurrency'
import Transactions from '@/components/Transactions/Transactions'
import Heading from '@/components/ui/heading'
import Stepper from '@/components/ui/stepper'
import { tabSchema } from '@/schemas/Tab.schema'
import { useTabStore } from '@/store/store'
import { JSX, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { shallow } from 'zustand/shallow'
import upsertTab from '@/lib/upsertTab'
import fetchTab from '@/lib/fetchTab'
import { Skeleton } from '@/components/ui/skeleton'

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
        canMoveForward: Boolean(
          tab.actions.length === 0 || (tab.actions.length > 0 && tab.actions.every((action) => action.checked))
        ),
        onNextSideEffect: () => {
          upsertTab({ ...tab, closed: true })
            .then(() => router.push(`/`))
            .catch((error) => {
              console.error('Error closing tab:', error)
            })
        }
      }
    ],
    [tab, router]
  )

  const Step = useMemo(() => STEPS[currentStep], [currentStep, STEPS])

  return (
    <div className="flex flex-col gap-4 w-full max-w-[400px] sm:max-w-[640px]">
      <Stepper steps={STEPS} currentStep={currentStep} onStepChange={setCurrentStep} {...Step}>
        <Step.component />
      </Stepper>
    </div>
  )
}

const TabScreen = ({ id }: { id?: string }) => {
  const { isLoading } = useQuery({ queryKey: [id], queryFn: fetchTab.bind(null, id) })
  useEffect(() => {
    const sub = useTabStore.subscribe(
      (state) => state.tab,
      async (tab) => await upsertTab(tab),
      {
        equalityFn: shallow,
        fireImmediately: false
      }
    )

    return sub
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 w-[320px] sm:w-[600px]">
        <Skeleton className="h-[35px] w-full rounded-md bg-gray-200" />
        <Skeleton className="h-[250px] w-full rounded-md bg-gray-200" />
        <div className="flex flex-row gap-2 justify-between">
          <Skeleton className="h-[35px] w-[100px] rounded-md bg-gray-200" />
          <Skeleton className="h-[35px] w-[100px] rounded-md bg-gray-200" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Heading className="mb-4">Tab</Heading>
      <TabScreenContent />
    </>
  )
}

export default TabScreen
