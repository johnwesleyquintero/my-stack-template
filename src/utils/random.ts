import { webcrypto } from 'crypto'

export const getSecureRandom = (min: number, max: number): number => {
  const range = max - min
  const randomBuffer = new Uint32Array(1)
  webcrypto.getRandomValues(randomBuffer)
  
  // Convert to number between 0 and 1, then scale to our range
  return Math.floor((randomBuffer[0] / (0xffffffff + 1)) * range) + min
}
