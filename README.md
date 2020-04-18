@chris.troutner/bch-encrypt
=======================

Command Line Interface (CLI) for encrypting, decrypting, and sending messages
over the BCH blockchain.

## Installation:
- `git clone https://github.com/christroutner/bch-encrypt && cd bch-encrypt`
- `npm install`
- `./bin/run help`

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @chris.troutner/bch-encrypt
$ bch-encrypt COMMAND
running command...
$ bch-encrypt (-v|--version|version)
@chris.troutner/bch-encrypt/1.0.1 linux-x64 node-v12.16.1
$ bch-encrypt --help [COMMAND]
USAGE
  $ bch-encrypt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bch-encrypt decrypt`](#bch-encrypt-decrypt)
* [`bch-encrypt get-key`](#bch-encrypt-get-key)
* [`bch-encrypt help [COMMAND]`](#bch-encrypt-help-command)
* [`bch-encrypt send`](#bch-encrypt-send)

## `bch-encrypt decrypt`

Decrypt a a message with the WIF private key.

```
USAGE
  $ bch-encrypt decrypt

OPTIONS
  -m, --msg=msg  Encrypted message
  -w, --wif=wif  Base58 WIF private key to decrypt message

DESCRIPTION
  ...
  Decrypts an encrypted message, using the private key in the WIF.
```

_See code: [src/commands/decrypt.js](https://github.com/christroutner/bch-encrypt/blob/v1.0.1/src/commands/decrypt.js)_

## `bch-encrypt get-key`

Get the public key for a BCH address.

```
USAGE
  $ bch-encrypt get-key

OPTIONS
  -n, --name=name  BCH cash address

DESCRIPTION
  ...
  Analyzes transactions on the blockchain to try and retrieve a public key for
  a BCH address. This will not work if the address does not have any transactions.
```

_See code: [src/commands/get-key.js](https://github.com/christroutner/bch-encrypt/blob/v1.0.1/src/commands/get-key.js)_

## `bch-encrypt help [COMMAND]`

display help for bch-encrypt

```
USAGE
  $ bch-encrypt help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `bch-encrypt send`

Send an encrypted message to a BCH address.

```
USAGE
  $ bch-encrypt send

OPTIONS
  -a, --addr=addr  BCH cash address of the recipient
  -m, --msg=msg    Message to encrypt
  -w, --wif=wif    Base58 WIF private key to pay for transaction

DESCRIPTION
  ...
  Encrypts a message with the recipients BCH address and publishes the encrypted
  message to the blockchain by sending transactions to the recipients address.
  The message will be broken up into multiple transactions that will need
  to be parsed together using the memo.cash and member.cash protocols.
```

_See code: [src/commands/send.js](https://github.com/christroutner/bch-encrypt/blob/v1.0.1/src/commands/send.js)_
<!-- commandsstop -->
