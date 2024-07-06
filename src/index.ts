import * as base32 from 'hi-base32'
import { emojiDictionary } from './emoji'

export class PlateCode {
  private province: string
  private alphabet: string

  emojis: string[]

  constructor() {
    this.province = '黑吉辽京津晋冀鲁豫蒙沪渝苏浙皖闽湘赣鄂桂琼川贵云藏陕甘宁青新粤'
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.emojis = emojiDictionary
  }

  public encode = (input: string): string => {
    const encoded = base32.encode(input).replace(/=/g, '') // Base32 编码，删除填充
    return this.generateLicensePlates(encoded, input)
  }

  public decode = (licensePlates: string): string => {
    const encoded = this.extractEncodedText(licensePlates)
    return base32.decode(encoded)
  }

  private generateLicensePlates(encoded: string, originalInput: string): string {
    const hashValue = this.simpleHash(originalInput)
    const chunkSize = 5
    let chunks = encoded.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || []
    chunks = chunks.map(chunk => chunk.padEnd(chunkSize, 'A'))

    const startEmoji = this.emojis[hashValue % this.emojis.length]
    const endEmoji = this.emojis[(hashValue + 1) % this.emojis.length]

    const plates = chunks.map((chunk, index) => {
      const provinceIndex = (hashValue + index) % this.province.length
      const letterIndex = (hashValue + 2 * index) % this.alphabet.length
      const separatorEmoji = this.emojis[(hashValue + 2 + index) % this.emojis.length]
      const province = this.province[provinceIndex]
      const letter = this.alphabet[letterIndex]
      return `${province}${letter}·${chunk}${index < chunks.length - 1 ? ` ${separatorEmoji}` : ''}`
    })

    return `${startEmoji} ${plates.join(' ')} ${endEmoji}`
  }

  private extractEncodedText(licensePlates: string): string {
    return licensePlates.split(' ').map((plate) => {
      const parts = plate.split('·')
      if (parts.length > 1)
        return parts[1].replace(/A+$/, '')

      return '' // 或者可以根据你的需求返回一个默认值或抛出错误
    }).join('')
  }

  private simpleHash(input: string): number {
    return input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  }
}

export const {
  decode,
  encode,
} = new PlateCode()
