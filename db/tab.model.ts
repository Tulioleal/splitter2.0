import db from "./db"

export const GET_tab = (id: string | undefined) => {
  if (!id) return undefined
  return db.tab.get(id)
}