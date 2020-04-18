@oclif/example-multi-js
=======================

example multi-command CLI built with javascript

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@oclif/example-multi-js.svg)](https://npmjs.org/package/@oclif/example-multi-js)
[![CircleCI](https://circleci.com/gh/oclif/example-multi-js/tree/master.svg?style=shield)](https://circleci.com/gh/oclif/example-multi-js/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/oclif/example-multi-js?branch=master&svg=true)](https://ci.appveyor.com/project/oclif/example-multi-js/branch/master)
[![Codecov](https://codecov.io/gh/oclif/example-multi-js/branch/master/graph/badge.svg)](https://codecov.io/gh/oclif/example-multi-js)
[![Downloads/week](https://img.shields.io/npm/dw/@oclif/example-multi-js.svg)](https://npmjs.org/package/@oclif/example-multi-js)
[![License](https://img.shields.io/npm/l/@oclif/example-multi-js.svg)](https://github.com/oclif/example-multi-js/blob/master/package.json)

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
* [`bch-encrypt goodbye`](#bch-encrypt-goodbye)
* [`bch-encrypt hello`](#bch-encrypt-hello)
* [`bch-encrypt help [COMMAND]`](#bch-encrypt-help-command)

## `bch-encrypt get-key`

Describe the command here

```
USAGE
  $ bch-encrypt get-key

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/get-key.js](https://github.com/christroutner/bch-encrypt/blob/v1.0.1/src/commands/get-key.js)_

## `bch-encrypt goodbye`

Describe the command here

```
USAGE
  $ bch-encrypt goodbye

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/goodbye.js](https://github.com/christroutner/bch-encrypt/blob/v1.0.1/src/commands/goodbye.js)_

## `bch-encrypt hello`

Describe the command here

```
USAGE
  $ bch-encrypt hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/christroutner/bch-encrypt/blob/v1.0.1/src/commands/hello.js)_

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
