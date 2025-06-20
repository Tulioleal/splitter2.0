import { GET_tab } from "@/db/tab.model"
import { useTabStore } from "@/store/store"

export default async function fetchTab(id: string | undefined) {
  if (!id) {
    useTabStore.getState().resetTab()
    return useTabStore.getState().tab
  }
  const tab = await GET_tab(id)
  if (!tab) return useTabStore.getState().tab
  useTabStore.getState().modTab(tab)
  return tab
}