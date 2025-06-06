import { Basic } from '@/types/Basic'

export default function getObjectWithBasic<T>(object: T): T & Basic {
  if (typeof object !== 'object' || object === null) {
    return object as T & Basic;
  }

  const id = "id" in object && object.id !== "" ? object.id as string : crypto.randomUUID();
  const createdAt = "createdAt" in object && typeof object.createdAt == "string" ? object.createdAt : new Date().toISOString();

  return {
    ...object,
    id,
    createdAt,
    updatedAt: new Date().toISOString(),
  }
}