'use client'

import db from '@/db/db'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'

const TabList = () => {
  const tabs = useLiveQuery(() => db.tab.toArray())
  if (!tabs)
    return (
      <div className="flex flex-col gap-1.5 w-[300px] sm:w-[600px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-[35px] w-full rounded-md bg-gray-200" />
        ))}
      </div>
    )

  return (
    <div className="flex flex-col gap-1.5 w-[300px] xs:w-[250px] sm:w-[600px]">
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className="p-2 border-b border-gray-200 last:border-b-0 transition-colors hover:bg-gray-200 "
          >
            <Link href={`/tab/${tab.id}`} className="flex justify-between">
              <span className="font-medium">{tab.name}</span>
              <span className="text-right">
                {tab.totalAmount.toFixed(2)}
                <strong> {tab.currency}</strong>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TabList
