export const getVersion = (): string => {
  return process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0'
}
