import { describe, expect, it } from 'vitest'
import { decode, encode } from '../src'

// describe.skip('hash', () => {
//   const input = 'Hello World!'
//   it('should hash a string', () => {
//     expect(hash(input)).toBe('🍢 渝F·WGVA2 🪣')
//   })
//   it('should hash a string without emoji', () => {
//     expect(hash(input, { hasEmoji: false })).toBe('渝F·WGVA2')
//   })
// })

describe('base32', () => {
  it('should encode str with ', () => {
    const input = 'Hello, World!'
    const result = encode(input) as any
    expect(result)
      .toBe('🏷️ 浙L·JBSWY 🪙 皖N·3DPFQ 💴 闽P·QFO33 💵 湘R·SNRSC 💶 赣T·CAAAA 💰')
  })

  it('should decode str with ', () => {
    const input = '🏷️ 浙L·JBSWY 🪙 皖N·3DPFQ 💴 闽P·QFO33 💵 湘R·SNRSC 💶 赣T·CAAAA 💰'
    const result = decode(input) as any
    expect(result).toBe('Hello, World!')
  })
})
