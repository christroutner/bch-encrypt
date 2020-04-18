const assert = require('chai').assert
const sinon = require('sinon')

const GetKey = require('../../src/commands/get-key')
const mockData = require('../mocks/get-key.mocks')

describe('#get-key', () => {
  let sandbox
  let uut

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    uut = new GetKey()
  })

  afterEach(() => sandbox.restore())

  describe('#getKey', () => {
    it('should throw an error for invalid address', async () => {
      try {
        const addr = 'abc123'

        await uut.getKey(addr)

        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(err.message, 'Invalid address')
      }
    })

    it('should throw an error for address with no transactions', async () => {
      try {
        const addr = 'bitcoincash:qzlgrjwreuqkw4q6htnk8f2hvddpkkm67cvgplzz87'

        // Mock bch-js to prevent live network call.
        sandbox
          .stub(uut.bchjs.Electrumx, 'transactions')
          .returns(mockData.noTxs)

        await uut.getKey(addr)
      } catch (err) {
        // console.log('err: ', err)
        assert.include(err.message, 'No transaction history')
      }
    })

    it('should return false if no pubkey can be found', async () => {
      const addr = 'bitcoincash:qrl2nlsaayk6ekxn80pq0ks32dya8xfclyktem2mqj'

      // Mock calls to prevent live network calls.
      sandbox
        .stub(uut.bchjs.Electrumx, 'transactions')
        .resolves(mockData.noPubKey)
      sandbox
        .stub(uut.bchjs.RawTransactions, 'getRawTransaction')
        .resolves(mockData.noPubKeyTxDetails)

      const result = await uut.getKey(addr)

      assert.equal(result, false)
    })

    it('should return a pubkey', async () => {
      const addr = 'bitcoincash:qzpsvahr07t73l679cytvmu9vtm7frf8qcfvdmlq9l'
      const knownPubKey = '0246194d3284386d034875b7a4fe4c322f30058e0d4e622e2a4aae0bbba44ae758'

      // Mock calls to prevent live network calls.
      sandbox
        .stub(uut.bchjs.Electrumx, 'transactions')
        .resolves(mockData.validTxs)
      sandbox
        .stub(uut.bchjs.RawTransactions, 'getRawTransaction')
        .resolves(mockData.validTxDetails)

      const result = await uut.getKey(addr)

      assert.equal(result, knownPubKey)
    })
  })

  // These are boilerplate tests whos only purpose is to increase code coverage
  // to 100%.
  describe('#run', () => {
    it('should report when no pubkey can be found', async () => {
      const flags = {
        name: 'bitcoincash:qzpsvahr07t73l679cytvmu9vtm7frf8qcfvdmlq9l'
      }

      // Mock dependencies to the function.
      sandbox.stub(uut, 'parse').returns({ flags })
      sandbox.stub(uut, 'getKey').resolves(false)

      await uut.run()
    })

    it('should report a pubkey', async () => {
      const knownPubKey = '0246194d3284386d034875b7a4fe4c322f30058e0d4e622e2a4aae0bbba44ae758'

      const flags = {
        name: 'bitcoincash:qzpsvahr07t73l679cytvmu9vtm7frf8qcfvdmlq9l'
      }

      // Mock dependencies to the function.
      sandbox.stub(uut, 'parse').returns({ flags })
      sandbox.stub(uut, 'getKey').resolves(knownPubKey)

      await uut.run()
    })

    it('should catch an error', async () => {
      sandbox.stub(uut, 'parse').returns()

      await uut.run()
    })
  })
})
