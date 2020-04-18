/*
Encrypt a message and write it to the blockchain.

./bin/run send -a bitcoincash:qzpsvahr07t73l679cytvmu9vtm7frf8qcfvdmlq9l -w KwrE4dKiuDiSLdWcpXfGE8CnE3nkC6ZpWYCx1S1rXgFPzaZALgcE -m "This is a test"
*/

const { Command, flags } = require('@oclif/command')

const eccryptoJS = require('eccrypto-js')

const BCHJS = require('@chris.troutner/bch-js')
const bchjs = new BCHJS()

const GetKey = require('./get-key')

let _this

class SendMessage extends Command {
  constructor (argv, config) {
    super(argv, config)

    _this = this

    this.bchjs = bchjs
    this.getKey = new GetKey(argv, config)
    this.eccrypto = eccryptoJS
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
      if (err.message) console.error('Error in send: ', err.message)
      else console.error('Error in send: ', err)
    }
  }

  // Input validation.
  validateInputs (flags) {
    try {
      let addr = flags.addr
      if (!addr) throw new Error('BCH address required.')

      addr = _this.bchjs.Address.toCashAddress(addr)

      const msg = flags.msg
      if (!msg) throw new Error('A message is required.')

      const wif = flags.wif
      if (!wif) {
        throw new Error(
          'A WIF private key is required to pay for the transaction.'
        )
      }

      return { addr, msg, wif }
    } catch (err) {
      _this.log('Error in send/validateInputs()')
      throw err
    }
  }

  async sendMsg (flags) {
    try {
      // Validate the inputs.
      const { addr, msg, wif } = _this.validateInputs(flags)
      console.log(`BCH address: ${addr}`)
      console.log(`msg: ${msg}`)
      console.log(`wif: ${wif}`)

      const pubKey = await _this.getKey.getKey(addr)
      if (!pubKey) {
        throw new Error('Could not find a public key to match that address.')
      }
      console.log(`Public Key: ${pubKey}`)

      // Encrypt the message
      const pubKeyBuf = Buffer.from(pubKey, 'hex')
      const data = Buffer.from(msg)
      const structuredEj = await _this.eccrypto.encrypt(pubKeyBuf, data)

      // Exta: Serialize the encrypted data
      const encryptedEj = Buffer.concat([
        structuredEj.ephemPublicKey,
        structuredEj.iv,
        structuredEj.ciphertext,
        structuredEj.mac
      ])
      const encryptedStr = encryptedEj.toString('hex')
      console.log(`encryptedEj: ${encryptedStr}`)

      const txObj = {
        msg: encryptedStr,
        wif,
        addr
      }
      const transactions = await _this.generateTransactions(txObj)
      console.log(`transactions: ${JSON.stringify(transactions, null, 2)}`)

      const lastTxid = transactions[transactions.length - 1]
      console.log(
        `https://member.cash/index.html#thread?root=${transactions[0]}&post=${lastTxid}`
      )

      return true
    } catch (err) {
      _this.log('Error in send/sendMsg()')
      throw err
    }
  }

  // Broadcasts a series of chained OP_RETURN transactions.
  // The input message is broken up into multiple transations using the
  // memo.cash protocol and member.cash UI.
  async generateTransactions (inObj) {
    try {
      const { msg, wif, addr } = inObj

      // Generate a random 6-digit number.
      const serialNum = Math.floor(100000000 * Math.random())
      console.log(`serialNum: ${serialNum}`)

      // Generate a standardized title for the post.
      const title = `ENCRYPTED #${serialNum}`

      const msgChunks = _this.chunkMsg(msg)
      console.log(`msgChunks: ${JSON.stringify(msgChunks, null, 2)}`)

      const hex1 = await _this.sendTitleTx({ title, wif, addr })
      // console.log(`hex1: ${hex1}`)

      console.log(' ')
      const txidTitle = await _this.broadcast(hex1)
      // const txidTitle = 'placeholder'
      console.log(`txidTitle: ${txidTitle}`)
      console.log(' ')

      const txids = await _this.sendChunks({ txidTitle, msgChunks, wif, addr })
      // console.log(`txids: ${JSON.stringify(txids, null, 2)}`)

      // const lastTxid = txids[txids.length - 1]

      return [txidTitle].concat(txids)
    } catch (err) {
      console.error('Error in generateTransactions()')
      throw err
    }
  }

  // Generates and broadcasts a transaction for each chunk.
  async sendChunks (inObj) {
    try {
      const { txidTitle, msgChunks, wif, addr } = inObj
      const recvAddr = addr

      let lastTxid = txidTitle

      const txids = []

      // Loop through each chunk.
      for (let i = 0; i < msgChunks.length; i++) {
        // Wait 5 seconds before sending each chunk.
        await _this.sleep(5000)
        console.log(' ')
        console.log(`Sending chunk ${i + 1} of ${msgChunks.length}`)

        const msgChunk = msgChunks[i]

        // Create an EC Key Pair from the user-supplied WIF.
        const ecPair = _this.bchjs.ECPair.fromWIF(wif)

        // Generate the public address that corresponds to this WIF.
        const sendAddr = _this.bchjs.ECPair.toCashAddress(ecPair)
        // console.log(`Replying with '${obj.msg}' to ${ADDR}`)

        // Pick a UTXO controlled by this address.
        const utxos = await _this.bchjs.Electrumx.utxo(sendAddr)
        const utxo = _this.findBiggestUtxo(utxos.utxos)

        // instance of transaction builder
        const transactionBuilder = new _this.bchjs.TransactionBuilder()

        const originalAmount = utxo.value
        const vout = utxo.tx_pos
        const txid = utxo.tx_hash

        // add input with txid and index of vout
        transactionBuilder.addInput(txid, vout)

        // TODO: Compute the 1 sat/byte fee.
        const fee = 500

        // Send the same amount - fee back to the sender address.
        transactionBuilder.addOutput(recvAddr, originalAmount - fee)

        const endChg = _this.changeEndian(lastTxid)
        // console.log(`Original txid: ${obj.txid}`)
        // console.log(`txid endian swapped: ${endChg}`)

        // Add the memo.cash OP_RETURN to the transaction.
        const script = [
          _this.bchjs.Script.opcodes.OP_RETURN,
          Buffer.from('6d03', 'hex'),
          Buffer.from(endChg, 'hex'),
          Buffer.from(msgChunk)
        ]

        // console.log(`script: ${util.inspect(script)}`);
        const data = _this.bchjs.Script.encode(script)
        // console.log(`data: ${util.inspect(data)}`);
        transactionBuilder.addOutput(data, 0)

        // Sign the transaction with the HD node.
        let redeemScript
        transactionBuilder.sign(
          0,
          ecPair,
          redeemScript,
          transactionBuilder.hashTypes.SIGHASH_ALL,
          originalAmount
        )

        // build tx
        const tx = transactionBuilder.build()
        // output rawhex
        const hex = tx.toHex()
        // console.log(`TX hex: ${hex}`)
        // console.log(' ')

        // Broadcast transation to the network
        lastTxid = await _this.broadcast(hex)
        // console.log(`Transaction ID: ${lastTxid}`)
        // console.log(`https://memo.cash/post/${lastTxid}`)
        // console.log(`https://explorer.bitcoin.com/bch/tx/${lastTxid}`)

        txids.push(lastTxid)
      }

      return txids
    } catch (err) {
      console.error('Error in send/sendChunks()')
      throw err
    }
  }

  // Change the endianness of a hex string.
  changeEndian (str) {
    try {
      // https://stackoverflow.com/questions/44287769/parsing-a-little-endian-hex-string-to-decimal
      if (!str) return undefined

      var len = str.length
      var bigEndianHexString = ''
      for (var i = 0; i < len / 2; i++) {
        bigEndianHexString += str.substring(len - (i + 1) * 2, len - i * 2)
      }

      return bigEndianHexString
    } catch (err) {
      console.error('Error in changeEndian(): ', err)
    }
  }

  // Splits a larger message up into chunks that are 184 bytes long or shorter.
  // Assumes the msg variable is a hex string, so that every two characters
  // represents a byte.
  chunkMsg (msg) {
    try {
      const MAX_BYTE_SIZE = 92
      const CHAR_PER_BYTE = 2

      const msgBytes = msg.length / CHAR_PER_BYTE
      console.log(`original message length: ${msgBytes} bytes`)

      const numChunks = Math.ceil(msgBytes / MAX_BYTE_SIZE)
      console.log(`numChunks: ${numChunks}`)

      if (numChunks === 1) return [msg]

      const chunks = []
      for (let i = 0; i < numChunks; i++) {
        const start = MAX_BYTE_SIZE * CHAR_PER_BYTE * i
        const stop =
          MAX_BYTE_SIZE * CHAR_PER_BYTE * i + MAX_BYTE_SIZE * CHAR_PER_BYTE

        const chunk = msg.slice(start, stop)
        chunks.push(chunk)
      }

      return chunks
    } catch (err) {
      console.error('Error in send/chunkMsg()')
      throw err
    }
  }

  // Send the first 'title' transaction
  async sendTitleTx (inObj) {
    try {
      const { title, wif, addr } = inObj
      const recvAddr = addr

      // Create an EC Key Pair from the user-supplied WIF.
      const ecPair = _this.bchjs.ECPair.fromWIF(wif)

      // Generate the public address that corresponds to this WIF.
      const sendAddr = _this.bchjs.ECPair.toCashAddress(ecPair)
      // console.log(`Publishing ${hash} to ${ADDR}`)

      // Pick a UTXO controlled by this address.
      const utxos = await _this.bchjs.Electrumx.utxo(sendAddr)
      // console.log(`utxos: ${JSON.stringify(utxos, null, 2)}`)

      if (!utxos.success) throw new Error('Could not get UTXOs')

      const utxo = _this.findBiggestUtxo(utxos.utxos)
      // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

      // instance of transaction builder
      const transactionBuilder = new _this.bchjs.TransactionBuilder()

      // const satoshisToSend = SATOSHIS_TO_SEND
      const originalAmount = utxo.value
      const vout = utxo.tx_pos
      const txid = utxo.tx_hash

      // add input with txid and index of vout
      transactionBuilder.addInput(txid, vout)

      // TODO: Compute the 1 sat/byte fee.
      const fee = 500

      // Send the same amount - fee.
      transactionBuilder.addOutput(recvAddr, originalAmount - fee)

      // Add the memo.cash OP_RETURN to the transaction.
      const script = [
        _this.bchjs.Script.opcodes.OP_RETURN,
        Buffer.from('6d02', 'hex'),
        Buffer.from(title)
      ]

      // console.log(`script: ${util.inspect(script)}`);
      const data = _this.bchjs.Script.encode(script)
      // console.log(`data: ${util.inspect(data)}`);
      transactionBuilder.addOutput(data, 0)

      // Sign the transaction with the HD node.
      let redeemScript
      transactionBuilder.sign(
        0,
        ecPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        originalAmount
      )

      // build tx
      const tx = transactionBuilder.build()
      // output rawhex
      const hex = tx.toHex()

      return hex
    } catch (err) {
      console.error('Error in sendTitleTx(): ', err)
      throw err
    }
  }

  // Broadcast a hex encoded string transaction to the BCH network.
  async broadcast (hex) {
    try {
      // Broadcast transation to the network
      const txidStr = await _this.bchjs.RawTransactions.sendRawTransaction(hex)
      // console.log(`Transaction ID: ${txidStr}`)
      // console.log(`https://memo.cash/post/${txidStr}`)
      // console.log(`https://explorer.bitcoin.com/bch/tx/${txidStr}`)

      return txidStr
    } catch (err) {
      console.error('Error in send/broadcast()')
      throw err
    }
  }

  // Returns the utxo with the biggest balance from an array of utxos.
  findBiggestUtxo (utxos) {
    let largestAmount = 0
    let largestIndex = 0

    for (var i = 0; i < utxos.length; i++) {
      const thisUtxo = utxos[i]

      if (thisUtxo.value > largestAmount) {
        largestAmount = thisUtxo.value
        largestIndex = i
      }
    }

    // console.log(`Largest UTXO: ${JSON.stringify(utxos[largestIndex], null, 2)}`)

    return utxos[largestIndex]
  }

  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
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
