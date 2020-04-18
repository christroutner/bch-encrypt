/*
  Mocking data for the get-key command unit tests.
*/

const noTxs = { success: true, transactions: [] }

const noPubKey = {
  success: true,
  transactions: [
    {
      height: 631219,
      tx_hash: 'ae2daa01c8172545b5edd205ea438706bcb74e63d4084a26b9ff2a46d46dc97f'
    }
  ]
}

const noPubKeyTxDetails = {
  txid: 'ae2daa01c8172545b5edd205ea438706bcb74e63d4084a26b9ff2a46d46dc97f',
  hash: 'ae2daa01c8172545b5edd205ea438706bcb74e63d4084a26b9ff2a46d46dc97f',
  version: 2,
  size: 225,
  locktime: 0,
  vin: [
    {
      txid: '4fe60a51e0d8f5134bfd8e5f872d6e502d7f01b28a6afebb27f4438a4f638d53',
      vout: 1,
      scriptSig: {
        asm: '304402205bf256707347fa0fd1b3bfaac7f76cbf8963db1acc3e8dcb433060b1899f7fc002207da08c6a72b8a697d32b551d289ee587698401f4d648dc632da46e40800269a9[ALL|FORKID] 03979d86166894e2794671384cd72e3a309d7843763c85b03d97b5bd733374c801',
        hex: '47304402205bf256707347fa0fd1b3bfaac7f76cbf8963db1acc3e8dcb433060b1899f7fc002207da08c6a72b8a697d32b551d289ee587698401f4d648dc632da46e40800269a9412103979d86166894e2794671384cd72e3a309d7843763c85b03d97b5bd733374c801'
      },
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 0.00001,
      n: 0,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 fea9fe1de92dacd8d33bc207da115349d39938f9 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914fea9fe1de92dacd8d33bc207da115349d39938f988ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: [
          'bitcoincash:qrl2nlsaayk6ekxn80pq0ks32dya8xfclyktem2mqj'
        ]
      }
    },
    {
      value: 0.00114512,
      n: 1,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 e6241f5cabf0fb7091c944041c91e23f0f062134 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914e6241f5cabf0fb7091c944041c91e23f0f06213488ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: [
          'bitcoincash:qrnzg86u40c0kuy3e9zqg8y3ugls7p3pxslmh2xpnh'
        ]
      }
    }
  ],
  hex: '0200000001538d634f8a43f427bbfe6a8ab2017f2d506e2d875f8efd4b13f5d8e0510ae64f010000006a47304402205bf256707347fa0fd1b3bfaac7f76cbf8963db1acc3e8dcb433060b1899f7fc002207da08c6a72b8a697d32b551d289ee587698401f4d648dc632da46e40800269a9412103979d86166894e2794671384cd72e3a309d7843763c85b03d97b5bd733374c801ffffffff02e8030000000000001976a914fea9fe1de92dacd8d33bc207da115349d39938f988ac50bf0100000000001976a914e6241f5cabf0fb7091c944041c91e23f0f06213488ac00000000',
  blockhash: '000000000000000002336e70a3b0d9bfdcb22c9bdac4c43c3fca9b41023358af',
  confirmations: 135,
  time: 1587146580,
  blocktime: 1587146580
}

const validTxs = {
  success: true,
  transactions: [
    {
      height: 630682,
      tx_hash: '1ddaa169e5c7a47578dca117d94aabca9e19d03d24268117bcd52d44691a5a03'
    },
    {
      height: 630682,
      tx_hash: '5b2f606f4daec5d897bd7136b37605d94efbe456481db9c7889a3f0ceeb7871e'
    },
    {
      height: 630682,
      tx_hash: 'e4effd31a46705c18cb4b83ce3d7d355466c8fef900e7da02001b1c0d434efa0'
    },
    {
      height: 630682,
      tx_hash: 'f7c33c7a7715ddefac0c3179a1c3157768e1ba1066cf6d9666ae952bfb385b2a'
    }
  ]
}

const validTxDetails = {
  txid: '1ddaa169e5c7a47578dca117d94aabca9e19d03d24268117bcd52d44691a5a03',
  hash: '1ddaa169e5c7a47578dca117d94aabca9e19d03d24268117bcd52d44691a5a03',
  version: 2,
  size: 423,
  locktime: 0,
  vin: [
    {
      txid: 'e4effd31a46705c18cb4b83ce3d7d355466c8fef900e7da02001b1c0d434efa0',
      vout: 1,
      scriptSig: {
        asm: '30440220493b66f93efd683bd20d9b734afbc2baa07d6ec4ca2407875bc1c415c64103a50220525202a93be2d82efc2c049006f744f82f02c54932c97cfa24bb674c0931e22d[ALL|FORKID] 0246194d3284386d034875b7a4fe4c322f30058e0d4e622e2a4aae0bbba44ae758',
        hex: '4730440220493b66f93efd683bd20d9b734afbc2baa07d6ec4ca2407875bc1c415c64103a50220525202a93be2d82efc2c049006f744f82f02c54932c97cfa24bb674c0931e22d41210246194d3284386d034875b7a4fe4c322f30058e0d4e622e2a4aae0bbba44ae758'
      },
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm: 'OP_RETURN 877 a0ef34d4c0b10120a07d0e90ef8f6c4655d3d7e33cb8b48cc10567a431fdefe4 30343436626132323135623435653232363433663235633037616635396265376563626230643061666431373134386139616634666332303836313931646139303239373338643030333338366131353937383364313863646562343066356263656338666539303539653333303362613930633636306465323234313532373937376639333937306363326135303239313030626138663835643334326266303736303333613535366438326363623265323936646532',
        hex: '6a026d0320a0ef34d4c0b10120a07d0e90ef8f6c4655d3d7e33cb8b48cc10567a431fdefe44cb830343436626132323135623435653232363433663235633037616635396265376563626230643061666431373134386139616634666332303836313931646139303239373338643030333338366131353937383364313863646562343066356263656338666539303539653333303362613930633636306465323234313532373937376639333937306363326135303239313030626138663835643334326266303736303333613535366438326363623265323936646532',
        type: 'nulldata'
      }
    },
    {
      value: 0.00090604,
      n: 1,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 830676e37f97e8ff5e2e08b66f8562f7e48d2706 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914830676e37f97e8ff5e2e08b66f8562f7e48d270688ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: [
          'bitcoincash:qzpsvahr07t73l679cytvmu9vtm7frf8qcfvdmlq9l'
        ]
      }
    }
  ],
  hex: '0200000001a0ef34d4c0b10120a07d0e90ef8f6c4655d3d7e33cb8b48cc10567a431fdefe4010000006a4730440220493b66f93efd683bd20d9b734afbc2baa07d6ec4ca2407875bc1c415c64103a50220525202a93be2d82efc2c049006f744f82f02c54932c97cfa24bb674c0931e22d41210246194d3284386d034875b7a4fe4c322f30058e0d4e622e2a4aae0bbba44ae758ffffffff020000000000000000df6a026d0320a0ef34d4c0b10120a07d0e90ef8f6c4655d3d7e33cb8b48cc10567a431fdefe44cb830343436626132323135623435653232363433663235633037616635396265376563626230643061666431373134386139616634666332303836313931646139303239373338643030333338366131353937383364313863646562343066356263656338666539303539653333303362613930633636306465323234313532373937376639333937306363326135303239313030626138663835643334326266303736303333613535366438326363623265323936646532ec610100000000001976a914830676e37f97e8ff5e2e08b66f8562f7e48d270688ac00000000',
  blockhash: '000000000000000000e52500b0e8aef8bc12c152dba906b2b5aefa7229bda4cb',
  confirmations: 672,
  time: 1586789243,
  blocktime: 1586789243
}

module.exports = {
  noTxs,
  noPubKey,
  noPubKeyTxDetails,
  validTxs,
  validTxDetails
}