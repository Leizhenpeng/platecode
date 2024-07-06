export function splitMix32(seed: number) {
  return function () {
    seed |= 0
    seed = seed + 0x9E3779B9 | 0
    let hash = seed ^ seed >>> 16
    hash = Math.imul(hash, 0x21F0AAAD)
    hash = hash ^ hash >>> 15
    hash = Math.imul(hash, 0x735A2D97)
    return ((hash = hash ^ hash >>> 15) >>> 0) / 4294967296
  }
}

export function getSeedFromString(value: string) {
  let seed = 0
  for (let index = 0; index < value.length; index++)
    seed = (seed * 31 + value.charCodeAt(index)) | 0

  return seed
}
