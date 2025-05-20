import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Heading>Welcome to Splitter</Heading>
      <Text>A simple straightforward way to split bills with friends and family.</Text>
      <div className="mt-8">
        <Button variant="default" size="lg">
          <Link href="/tab">Open a new Tab</Link>
        </Button>
      </div>
    </>
  )
}
