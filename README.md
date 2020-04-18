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
* [`bch-encrypt get-key`](#bch-encrypt-get-key)
* [`bch-encrypt help [COMMAND]`](#bch-encrypt-help-command)

## `bch-encrypt get-key`

Get the public key for a BCH address.

```
USAGE
  $ bch-encrypt get-key

OPTIONS
  -n, --name=name  BCH cash address

DESCRIPTION
  ...
  Analyizes transactions on the blockchain to try and retrieve a public key for
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
<!-- commandsstop -->
