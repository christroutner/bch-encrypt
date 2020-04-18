const { Command, flags } = require('@oclif/command')

const BCHJS = require('@chris.troutner/bch-js')
const bchjs = new BCHJS()

let _this

class GetKey extends Command {
  constructor (argv, config) {
    super(argv, config)

    _this = this

    this.bchjs = bchjs
  }

  async run () {
    try {
      const { flags } = this.parse(GetKey)
      const name = flags.name

      const pubKey = await _this.getKey(name)
      _this.log(`Public key for address ${name}:`)
      _this.log(`${pubKey}`)
    } catch (err) {
      console.error('Error in get-key: ', err.message)
    }
  }

  // Get a public key by searching transactions on the blockchain.
  async getKey (addr) {
    // Filter input
    let cashAddr = ''
    try {
      cashAddr = _this.bchjs.Address.toCashAddress(addr)
    } catch (err) {
      throw new Error('Invalid address: addr')
    }

    // Retrieve the transaction history for this address.
    const txHistory = await _this.bchjs.Electrumx.transactions(cashAddr)
    // console.log(`txHistory: ${JSON.stringify(txHistory, null, 2)}`)

    if (txHistory.transactions.length === 0) {
      throw new Error('No transaction history.')
    }

    // Loop through the transaction history and search for the public key.
    for (let i = 0; i < txHistory.transactions.length; i++) {
      const thisTx = txHistory.transactions[i].tx_hash
      // console.log(`txid: ${thisTx}`)

      const txDetails = await _this.bchjs.RawTransactions.getRawTransaction(
        thisTx,
        true
      )
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      const vin = txDetails.vin

      // Loop through each input.
      for (let j = 0; j < vin.length; j++) {
        const thisVin = vin[j]
        // console.log(`thisVin: ${JSON.stringify(thisVin, null, 2)}`)

        // Extract the script signature.
        const scriptSig = thisVin.scriptSig.asm.split(' ')
        // console.log(`scriptSig: ${JSON.stringify(scriptSig, null, 2)}`)

        // Extract the public key from the script signature.
        const pubKey = scriptSig[scriptSig.length - 1]
        // console.log(`pubKey: ${pubKey}`)

        // Generate cash address from public key.
        const keyBuf = Buffer.from(pubKey, 'hex')
        const ec = _this.bchjs.ECPair.fromPublicKey(keyBuf)
        const cashAddr2 = _this.bchjs.ECPair.toCashAddress(ec)
        // console.log(`cashAddr2: ${cashAddr2}`)

        // If public keys match, this is the correct public key.
        if (cashAddr === cashAddr2) {
          return pubKey
        }
      }
    }

    // If public key can not be found, return false.
    return false
  }
}

GetKey.description = `Get the public key for a BCH address.
...
Analyizes transactions on the blockchain to try and retrieve a public key for
a BCH address. This will not work if the address does not have any transactions.
`

GetKey.flags = {
  name: flags.string({ char: 'n', description: 'BCH cash address' })
}

module.exports = GetKey
