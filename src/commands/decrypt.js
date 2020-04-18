const { Command, flags } = require('@oclif/command')

const eccryptoJS = require('eccrypto-js')
const wif = require('wif')

const BCHJS = require('@chris.troutner/bch-js')
const bchjs = new BCHJS()

const GetKey = require('./get-key')

let _this

class DecryptMessage extends Command {
  constructor (argv, config) {
    super(argv, config)

    _this = this

    this.bchjs = bchjs
    this.getKey = new GetKey(argv, config)
    this.eccrypto = eccryptoJS
    this.wif = wif
  }

  async run () {
    try {
      const { flags } = this.parse(DecryptMessage)
      // const name = flags.name

      const success = await _this.decryptMsg(flags)

      if (!success) {
        _this.log('Message could not be decrypted.')
        return
      }

      _this.log('Message decrypted successfully.')
    } catch (err) {
      if (err.message) console.error('Error in send: ', err.message)
      else console.error('Error in send: ', err)
    }
  }

  // Input validation.
  validateInputs (flags) {
    try {
      const msg = flags.msg
      if (!msg) throw new Error('A message is required.')

      const wif = flags.wif
      if (!wif) {
        throw new Error(
          'A WIF private key is required to pay for the transaction.'
        )
      }

      return { msg, wif }
    } catch (err) {
      _this.log('Error in send/validateInputs()')
      throw err
    }
  }

  async decryptMsg (flags) {
    try {
      // Validate the inputs.
      const { msg, wif } = _this.validateInputs(flags)
      console.log(`encrypted msg: ${msg}`)
      console.log(`wif: ${wif}`)

      // Generate a private key from the WIF for decrypting the data.
      const privKeyBuf = _this.wif.decode(wif).privateKey
      console.log(`private key: ${privKeyBuf.toString('hex')}`)

      // Convert the hex encoded message to a buffer
      const msgBuf = Buffer.from(msg, 'hex')

      // Convert the bufer into a structured object.
      const structData = _this.convertToEncryptStruct(msgBuf)

      // Decrypt the data with a private key.
      const fileBuf = await _this.eccrypto.decrypt(privKeyBuf, structData)
      _this.log('Decrypted message:')
      _this.log(fileBuf.toString())

      return true
    } catch (err) {
      _this.log('Error in send/sendMsg(): ', err)
      throw err
    }
  }

  // Converts a serialized buffer containing encrypted data into an object
  // that can interpreted by the eccryptoJS library.
  convertToEncryptStruct (encbuf) {
    let offset = 0
    const tagLength = 32
    let pub
    switch (encbuf[0]) {
      case 4:
        pub = encbuf.slice(0, 65)
        break
      case 3:
      case 2:
        pub = encbuf.slice(0, 33)
        break
      default:
        throw new Error('Invalid type: ' + encbuf[0])
    }
    offset += pub.length

    const c = encbuf.slice(offset, encbuf.length - tagLength)
    const ivbuf = c.slice(0, 128 / 8)
    const ctbuf = c.slice(128 / 8)

    const d = encbuf.slice(encbuf.length - tagLength, encbuf.length)

    return {
      iv: ivbuf,
      ephemPublicKey: pub,
      ciphertext: ctbuf,
      mac: d
    }
  }
}

DecryptMessage.description = `Decrypt a a message with the WIF private key.
...
Decrypts an encrypted message, using the private key in the WIF.
`

DecryptMessage.flags = {
  msg: flags.string({ char: 'm', description: 'Encrypted message' }),
  wif: flags.string({
    char: 'w',
    description: 'Base58 WIF private key to decrypt message'
  })
}

module.exports = DecryptMessage
