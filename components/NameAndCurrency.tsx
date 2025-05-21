'use client'

import { Input } from './ui/input'
import { tabSchema } from '@/schemas/Tab.schema'
import { useTab } from '@/context/Tab.context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import CURRENCY from '@/lib/currency'
import { SelectGroup, SelectLabel } from '@radix-ui/react-select'
import { useDebouncedCallback } from 'use-debounce'
import { toast } from 'sonner'
import { useEffect } from 'react'

// type TabFormType = z.infer<typeof tabSchema>

const NameAndCurrencyForm = () => {
  const { activeTab, setActiveTab } = useTab()

  const setName = useDebouncedCallback((name: string) => {
    setActiveTab({ ...activeTab, name })
  }, 500)

  const setCurrency = (currency: string) => {
    setActiveTab({ ...activeTab, currency })
  }

  useEffect(() => {
    if (activeTab.name === undefined || activeTab.currency === undefined) return

    const { name, currency } = activeTab
    const result = tabSchema.safeParse({ name, currency })

    if (!result.success) {
      const errorMessage = result.error.issues.map((issue) => issue.message).join(', ')
      toast.error(errorMessage)
      return
    }
  }, [activeTab])

  return (
    <form className="flex flex-row gap-4 justify-between">
      <Input
        className="min-w-100"
        placeholder="Name for the Tab"
        defaultValue={activeTab.name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select onValueChange={(value) => setCurrency(value)} defaultValue={activeTab.currency}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Currency</SelectLabel>
            {Object.entries(CURRENCY).map((currency) => (
              <SelectItem key={currency[0]} value={currency[0]}>
                {currency[1]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  )
}

export default NameAndCurrencyForm
