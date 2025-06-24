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

  const setValue = useDebouncedCallback((newValue: string, key: 'name' | 'currency') => {
    modTab({ [key]: newValue })
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
    <form className="flex flex-col gap-4 justify-between sm:flex-row">
      <Input placeholder="Name for the Tab" defaultValue={name} onChange={(e) => setValue(e.target.value, 'name')} />
      <Select defaultValue={currency} onValueChange={(value) => setValue(value, 'currency')}>
        <SelectTrigger className="w-full sm:w-[180px]">
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
