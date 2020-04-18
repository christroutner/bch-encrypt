const { Command, flags } = require('@oclif/command')

const BCHJS = require('@chris.troutner/bch-js')
const bchjs = new BCHJS()

let _this

class SendMessage extends Command {
  constructor (argv, config) {
    super(argv, config)

    _this = this

    this.bchjs = bchjs
  }

  async run () {
    try {
      const { flags } = this.parse(SendMessage)
      // const name = flags.name

      const success = await _this.sendMsg(flags)

      if (!success) {
        _this.log('Message could not be sent.')
        return
      }

      _this.log('Message encrypted and sent successfully.')
    } catch (err) {
      console.error('Error in get-key: ', err.message)
    }
  }

  async sendMsg (flags) {
    return false
  }
}

SendMessage.description = `Send an encrypted message to a BCH address.
...
Encrypts a message with the recipients BCH address and publishes the encrypted
message to the blockchain by sending transactions to the recipients address.
The message will be broken up into multiple transactions that will need
to be parsed together using the memo.cash and member.cash protocols.
`

SendMessage.flags = {
  addr: flags.string({
    char: 'a',
    description: 'BCH cash address of the recipient'
  }),
  msg: flags.string({ char: 'm', description: 'Message to encrypt' }),
  wif: flags.string({
    char: 'w',
    description: 'Base58 WIF private key to pay for transaction'
  })
}

module.exports = SendMessage
