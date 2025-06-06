import TabScreen from '@/screens/Tab.screen'

const TabPage = async ({ params }: { params: { id: string } }) => {
  return <TabScreen id={params.id} />
}

export default TabPage
