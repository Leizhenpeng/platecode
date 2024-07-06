import { Buffer } from 'node:buffer'

export class CryptoPlate {
  private province: string
  private alphabet: string

  constructor() {
    this.province = '黑吉辽京津晋冀鲁豫蒙沪渝苏浙皖闽湘赣鄂桂琼川贵云藏陕甘宁青新粤'
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }

  public encode(input: string): string {
    const encoded = Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') // URL安全的Base64，删除填充
    return this.generateLicensePlates(encoded)
  }

  public decode(licensePlates: string): string {
    const encoded = this.extractEncodedText(licensePlates).replace(/-/g, '+').replace(/_/g, '/')
    const paddedEncoded = encoded.padEnd(encoded.length + (4 - encoded.length % 4) % 4, '=') // 重新添加必要的填充
    return Buffer.from(paddedEncoded, 'base64').toString('utf8')
  }

  private generateLicensePlates(encoded: string): string {
    const chunkSize = 5
    let chunks = encoded.match(new RegExp(`.{1,${chunkSize}}`, 'g')) as string[] || []
    // 不转换为大写
    chunks = chunks.map(chunk => chunk.padEnd(chunkSize, 'A'))

    return chunks.map((chunk) => {
      const province = this.province[Math.floor(Math.random() * this.province.length)]
      const letter = this.alphabet[Math.floor(Math.random() * this.alphabet.length)]
      return `${province}${letter}·${chunk}`
    }).join(' ')
  }

  private extractEncodedText(licensePlates: string): string {
    return licensePlates.split(' ').map((plate) => {
      // 移除额外的填充字符'A'
      return plate.split('·')[1].replace(/A+$/, '')
    }).join('')
  }
}

export default CryptoPlate
