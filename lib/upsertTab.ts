import { Tab } from "@/types/Tab"
import getObjectWithBasic from "./getObjectWithBasic"
import db from "@/db/db"
import { useTabStore } from "@/store/store"

export default async function upsertTab(tab: Tab) {
  if (tab.id === '') {
    const completeTab = getObjectWithBasic({
      ...tab,
      isNew: true
    })
    db.tab
      .add(completeTab)
      .then((id) => useTabStore.getState().modTab({ id }))
      .catch((error) => {
        console.error('Error adding tab:', error)
      })

    return {
      id: completeTab.id,
      isNew: true
    }
  }

  if (tab.id !== '') {
    db.tab.put(getObjectWithBasic(tab)).catch((error) => {
      console.error('Error updating tab:', error)
    })

    return {
      id: tab.id,
      isNew: false
    }
  }

  return {
    id: '',
    isNew: false
  }
}