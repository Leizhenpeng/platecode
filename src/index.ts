import * as base32 from 'hi-base32'
import { getSeedFromString, splitMix32 } from './prng'
import { emojiDictionary } from './emoji'

export class PlateCode {
  private province: string
  private alphabet: string
  private alphanumeric: string
  emojis: string[]

  constructor() {
    this.province = '黑吉辽京津晋冀鲁豫蒙沪渝苏浙皖闽湘赣鄂桂琼川贵云藏陕甘宁青新粤'
    this.alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ' // 去掉了 "I" 和 "O"
    this.alphanumeric = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789' // 去掉了 "I" 和 "O"
    this.emojis = emojiDictionary
  }

  public encode = (input: string): string => {
    const encoded = base32.encode(input).replace(/=/g, '') // Base32 编码，删除填充
    return this.generateFullLicensePlates(encoded, input)
  }

  public decode = (licensePlates: string): string => {
    const encoded = this.extractEncodedText(licensePlates)
    return base32.decode(encoded)
  }

  public hash = (value: string, options?: { hasEmoji: true }): string => {
    return this.generateHashLicensePlate(value, options?.hasEmoji ?? true)
  }

  private generateFullLicensePlates(encoded: string, originalInput: string): string {
    const seed = getSeedFromString(originalInput)
    const random = splitMix32(seed)

    const chunks = encoded.match(/.{1,5}/g) || []
    const paddedChunks = chunks.map(chunk => chunk.padEnd(5, 'A'))

    const plates = paddedChunks.map((chunk) => {
      const provinceIndex = Math.floor(random() * this.province.length)
      const letterIndex = Math.floor(random() * this.alphabet.length)
      return `${this.province[provinceIndex]}${this.alphabet[letterIndex]}·${chunk}`
    })

    const emojis = [] as string[]
    while (emojis.length < plates.length + 2) {
      const emoji = this.emojis[Math.floor(random() * this.emojis.length)]
      if (!emojis.includes(emoji))
        emojis.push(emoji)
    }

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

    const rand_p = Math.floor(random() * this.province.length)
    const rand_alphabet = Math.floor(random() * this.alphabet.length)
    const randArr = []
    for (let i = 0; i < 5; i++)
      randArr.push(Math.floor(random() * this.alphanumeric.length))

    const result_no_emoji = [
            `${this.province[rand_p]}${this.alphabet[rand_alphabet]}`,
            `${this.alphanumeric[randArr[0]]}${this.alphanumeric[randArr[1]]}${this.alphanumeric[randArr[2]]}${this.alphanumeric[randArr[3]]}${this.alphanumeric[randArr[4]]}`,
    ].join('·')

    if (!hasEmoji)
      return result_no_emoji

    const result_emoji = [
      this.emojis[Math.floor(random() * this.emojis.length)],
      result_no_emoji,
      this.emojis[Math.floor(random() * this.emojis.length)],
    ].join(' ')

    return result_emoji
  }

  private extractEncodedText(licensePlates: string): string {
    return licensePlates.split(' ').map((plate) => {
      const parts = plate.split('·')
      if (parts.length > 1)
        return parts[1].replace(/A+$/, '')
      return '' // 或者可以根据你的需求返回一个默认值或抛出错误
    }).join('')
  }
}

export const {
  decode,
  encode,
  hash,
} = new PlateCode()
