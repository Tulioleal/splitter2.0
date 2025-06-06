'use client'

import db from '@/db/db'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'

const TabList = () => {
  const tabs = useLiveQuery(() => db.tab.toArray())
  if (!tabs) return null // Still loading.

  return (
    <ul>
      {tabs.map((tab) => (
        <li key={tab.id}>
          <Link href={`/tab/${tab.id}`} className="text-blue-500 hover:underline">
            {tab.name}, {tab.totalAmount} {tab.currency}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TabList
