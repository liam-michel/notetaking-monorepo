export function toHeaders(headers: Record<string, string | string[] | undefined>): Headers {
  const result = new Headers()
  for (const [key, value] of Object.entries(headers)) {
    if (!value) continue
    if (Array.isArray(value)) {
      for (const v of value) result.append(key, v)
    } else {
      result.set(key, value)
    }
  }
  return result
}
