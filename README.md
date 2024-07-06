# platecode

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Generate readable hashes or encodings in the style of license plates

`platecode` 是一个 JavaScript 库，用于生成类似车牌的可读哈希或 Base32 编码,使其更加有趣和直观。

## Features
-  **车牌风格的哈希**: 使用 `hash` 函数可以生成带有或不带有表情符号的车牌风格哈希。
- **Base32 编码和解码**: 支持通过 `encode` 和 `decode` 函数对字符串进行车牌风格的 Base32 编码和解码。
- **定制选项**: 支持在编码和哈希时选择是否包含表情符号。

## Usage

### Hash
```js
import { hash } from 'platecode'

const hash = hash('hello world')
console.log(hash1) // '🍢 渝F·WGVA2 🪣

const encoded = encode('hello world', { emoji: false })
console.log(encoded) // '渝F·WGVA2'
```

### Encoding and Decoding
```js
import { decode, encode } from 'platecode'

const result = encode('hello world')
console.log(result) // 🎤 辽U·JBSWY 🥚 藏P·3DPFQ 🐟 苏H·QFO33 👞 湘U·SNRSC 🚿 琼M·CAAAA 🐱

const decoded = decode(result)
console.log(decoded) // 'hello world'
```
## Credit

Thanks to my friend [cunzaizhuyi](https://github.com/cunzaizhuyi) for the new repository [hashplate-cn](https://github.com/cunzaizhuyi/hashplate-cn), which I find quite interesting.

Since hash has its limitations, I'm considering giving encoding a try

## License

[MIT](./LICENSE) License © 2023-PRESENT [leizhenpeng](https://github.com/leizhenpeng)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/platecode?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/platecode
[npm-downloads-src]: https://img.shields.io/npm/dm/platecode?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/platecode
[bundle-src]: https://img.shields.io/bundlephobia/minzip/platecode?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=platecode
[license-src]: https://img.shields.io/github/license/leizhenpeng/platecode.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/leizhenpeng/platecode/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/platecode
