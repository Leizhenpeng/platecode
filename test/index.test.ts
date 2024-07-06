import { describe, expect, it } from 'vitest'
import { decode, encode, hash } from '../src'

describe('hash', () => {
  const input = 'Hello World!'
  it('should hash a string', () => {
    expect(hash(input)).toBe('🍢 渝F·WGVA2 🪣')
  })
  it('should hash a string without emoji', () => {
    expect(hash(input, { emoji: false })).toBe('渝F·WGVA2')
  })
})

describe('base32', () => {
  describe('with emoji', () => {
    const answer = '🎤 辽U·JBSWY 🥚 藏P·3DPFQ 🐟 苏H·QFO33 👞 湘U·SNRSC 🚿 琼M·CAAAA 🐱'
    it('should encode str with', () => {
      const input = 'Hello, World!'
      const result = encode(input)
      expect(result).toBe(answer)
    })
    it('should decode str with ', () => {
      const input = answer
      const result = decode(input)
      expect(result).toBe('Hello, World!')
    })
  })
  describe('without emoji', () => {
    const answer = '辽U·JBSWY 藏P·3DPFQ 苏H·QFO33 湘U·SNRSC 琼M·CAAAA'
    it('should encode str without emoji', () => {
      const input = 'Hello, World!'
      const result = encode(input, { emoji: false })
      expect(result).toBe(answer)
    })
    it('should decode str without emoji', () => {
      const input = answer
      const result = decode(input)
      expect(result).toBe('Hello, World!')
    })
  })
})
