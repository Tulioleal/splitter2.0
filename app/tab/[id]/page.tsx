import TabScreen from '@/screens/Tab.screen'

async function TabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <TabScreen id={id} />
}

export default TabPage
