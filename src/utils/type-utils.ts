export type SafeAny = unknown

export function safelyParseJson(json: string): SafeAny {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function isRecord(value: SafeAny): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
