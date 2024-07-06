/* eslint-disable no-console */
import { describe, expect, it } from 'vitest'
import { CryptoPlate } from '../src'

describe('cryptoPlate', () => {
  const crypto = new CryptoPlate()

  it('should encode a string to a single string of multiple license plates', () => {
    const originalString = 'Hello, World! This is a test string to be encoded.'
    const licensePlates = crypto.encode(originalString)
    console.log('Encoded License Plates:', licensePlates)

    const platesArray = licensePlates.split(' ')
    platesArray.forEach((plate) => {
      expect(plate).toMatch(/^[\u4E00-\u9FA5][A-Z]·[A-Za-z0-9+/=]{5}$/)
    })
  })

  it('should decode the license plates string back to the original string', () => {
    const originalString = 'Hello, World! This is a test string to be encoded.'
    const licensePlates = crypto.encode(originalString)
    const decodedString = crypto.decode(licensePlates)
    expect(decodedString).toBe(originalString)
  })
})
