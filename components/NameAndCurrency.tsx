import { Input } from './ui/input'
import { tabSchema } from '@/schemas/Tab.schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import CURRENCY from '@/lib/currency'
import { SelectGroup, SelectLabel } from '@radix-ui/react-select'
import { useDebouncedCallback } from 'use-debounce'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useTabStore } from '@/store/store'
import { useShallow } from 'zustand/react/shallow'

const NameAndCurrencyForm = () => {
  const { name, currency, modTab } = useTabStore(
    useShallow((state) => ({
      name: state.tab.name,
      currency: state.tab.currency,
      modTab: state.modTab
    }))
  )

  const setName = useDebouncedCallback((name: string) => {
    modTab({ name })
  }, 1000)

  const setCurrency = useDebouncedCallback((currency: string) => {
    modTab({ currency })
  }, 1000)

  useEffect(() => {
    if (name === '' || currency === '') return

    const result = tabSchema.safeParse({ name, currency })

    if (!result.success) {
      const errorMessage = result.error.issues.map((issue) => issue.message).join(', ')
      toast.error(errorMessage)
      return
    }
  }, [name, currency])

  return (
    <form className="flex flex-row gap-4 justify-between">
      <Input
        className="min-w-100"
        placeholder="Name for the Tab"
        value={name ?? ''}
        onChange={(e) => setName(e.target.value)}
      />
      <Select onValueChange={(value) => setCurrency(value)} value={currency ?? 'USD'}>
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
