import { Basic } from '@/types/Basic'

export default function getObjectWithBasic<T>(object: T): T & Basic {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...object
  }
}
