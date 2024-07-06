import * as base32 from 'hi-base32'
import { getSeedFromString, splitMix32 } from './prng'
import { emojiDictionary } from './emoji'

export class PlateCode {
  private readonly province = '黑吉辽京津晋冀鲁豫蒙沪渝苏浙皖闽湘赣鄂桂琼川贵云藏陕甘宁青新粤'
  private readonly alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ' // Excludes "I" and "O"
  private readonly alphanumeric = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789' // Excludes "I" and "O"
  private readonly emojis = emojiDictionary

  public encode = (input: string, options?: { emoji?: boolean }): string => {
    const encoded = base32.encode(input).replace(/=/g, '') // Base32 encode and remove padding
    return this.generateFullLicensePlates(encoded, input, options?.emoji ?? true)
  }

  public decode = (licensePlates: string): string => {
    const encoded = this.extractEncodedText(licensePlates)
    return base32.decode(encoded)
  }

  public hash = (value: string, options?: { emoji?: boolean }): string => {
    return this.generateHashLicensePlate(value, options?.emoji ?? true)
  }

  private generateFullLicensePlates(encoded: string, originalInput: string, includeEmoji: boolean): string {
    const seed = getSeedFromString(originalInput)
    const random = splitMix32(seed)

    const chunks = encoded.match(/.{1,5}/g) || []
    const paddedChunks = chunks.map(chunk => chunk.padEnd(5, 'A'))

    const plates = paddedChunks.map((chunk) => {
      const provinceIndex = Math.floor(random() * this.province.length)
      const letterIndex = Math.floor(random() * this.alphabet.length)
      return `${this.province[provinceIndex]}${this.alphabet[letterIndex]}·${chunk}`
    })

    if (!includeEmoji)
      return plates.join(' ')

    const emojis = this.generateUniqueEmojis(random, plates.length + 2)

    const startEmoji = emojis.shift()!
    const separatorEmojis = emojis

    const plateString = plates.map((plate, index) => {
      const separator = separatorEmojis[index]
      return `${plate} ${separator}`
    }).join(' ').trim()

    return `${startEmoji} ${plateString}`
  }

  private generateHashLicensePlate(value: string, hasEmoji: boolean): string {
    const seed = getSeedFromString(value)
    const random = splitMix32(seed)

    const provinceIndex = Math.floor(random() * this.province.length)
    const letterIndex = Math.floor(random() * this.alphabet.length)
    const randomAlphanumerics = this.generateRandomAlphanumeric(random, 5)

    const basePlate = `${this.province[provinceIndex]}${this.alphabet[letterIndex]}·${randomAlphanumerics}`

    if (!hasEmoji)
      return basePlate

    const startEmoji = this.emojis[Math.floor(random() * this.emojis.length)]
    const endEmoji = this.emojis[Math.floor(random() * this.emojis.length)]

    return `${startEmoji} ${basePlate} ${endEmoji}`
  }

  private extractEncodedText(licensePlates: string): string {
    return licensePlates.split(' ').map((plate) => {
      const parts = plate.split('·')
      return parts.length > 1 ? parts[1].replace(/A+$/, '') : ''
    }).join('')
  }

  private generateRandomAlphanumeric(random: () => number, length: number): string {
    return Array.from({ length }, () => this.alphanumeric[Math.floor(random() * this.alphanumeric.length)]).join('')
  }

  private generateUniqueEmojis(random: () => number, count: number): string[] {
    const uniqueEmojis = new Set<string>()
    while (uniqueEmojis.size < count) {
      const emoji = this.emojis[Math.floor(random() * this.emojis.length)]
      uniqueEmojis.add(emoji)
    }
    return Array.from(uniqueEmojis)
  }
}

export const { decode, encode, hash } = new PlateCode()
