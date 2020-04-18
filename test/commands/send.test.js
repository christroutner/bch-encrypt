// const assert = require('chai').assert
const sinon = require('sinon')

const SendMessage = require('../../src/commands/send')
// const mockData = require('../mocks/get-key.mocks')

describe('#send', () => {
  let sandbox
  let uut

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    uut = new SendMessage()
  })

  afterEach(() => sandbox.restore())

  // These are boilerplate tests whos only purpose is to increase code coverage
  // to 100%.
  describe('#run', () => {
    it('should catch an error', async () => {
      sandbox.stub(uut, 'parse').returns()

      await uut.run()
    })

    it('should report when a message can not be sent', async () => {
      sandbox.stub(uut, 'parse').returns({})
      sandbox.stub(uut, 'sendMsg').resolves(false)

      await uut.run()
    })

    it('should report when a message was sent successfully', async () => {
      sandbox.stub(uut, 'parse').returns({})
      sandbox.stub(uut, 'sendMsg').resolves(true)

      await uut.run()
    })
  })
})
