import { Input } from './ui/input'
import { tabSchema } from '@/schemas/Tab.schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import CURRENCY from '@/lib/currency'
import { SelectGroup, SelectLabel } from '@radix-ui/react-select'
import { useDebouncedCallback } from 'use-debounce'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useTabStore } from '@/store/store'

// type TabFormType = z.infer<typeof tabSchema>

const NameAndCurrencyForm = () => {
  const name = useTabStore((state) => state.tab.name)
  const currency = useTabStore((state) => state.tab.currency)
  const modTab = useTabStore((state) => state.modTab)

  const setName = useDebouncedCallback((name: string) => {
    modTab({ name })
  }, 500)

  const setCurrency = (currency: string) => {
    modTab({ currency })
  }

  useEffect(() => {
    if (name === undefined || currency === undefined) return

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
        defaultValue={name ?? ''}
        onChange={(e) => setName(e.target.value)}
      />
      <Select onValueChange={(value) => setCurrency(value)} defaultValue={currency ?? 'USD'}>
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
