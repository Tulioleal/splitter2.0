export default async function fetchFromAPI<T>(body: Record<string, unknown>, slug: string, method: "POST" | "GET"): Promise<T> {
  const res = await fetch(`/api/${slug}`, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return res.json() as Promise<T>
}