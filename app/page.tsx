import TabList from '@/components/TabList'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Heading className="text-4xl sm:text-5xl">Welcome to Splitter</Heading>
      <Text className="text-center">A simple straightforward way to split bills with friends and family.</Text>
      <div className="mt-8">
        <Link href="/tab">
          <Button variant="default" size="lg">
            Open a new Tab
          </Button>
        </Link>
      </div>

      <div className="mt-4">
        <TabList />
      </div>
    </>
  )
}
