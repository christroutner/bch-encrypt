@oclif/example-multi-js
=======================

example multi-command CLI built with javascript

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
$ npm install -g @oclif/example-multi-js
$ example-multi-js COMMAND
running command...
$ example-multi-js (-v|--version|version)
@oclif/example-multi-js/1.7.18 linux-x64 node-v9.11.1
$ example-multi-js --help [COMMAND]
USAGE
  $ example-multi-js COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [example-multi-js hello](#example-multi-js-hello)
* [example-multi-js help [COMMAND]](#example-multi-js-help-command)

## example-multi-js hello

Describe the command here

```
USAGE
  $ example-multi-js hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  Describe the command here
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/oclif/example-multi-js/blob/v1.7.18/src/commands/hello.js)_

## example-multi-js help [COMMAND]

display help for example-multi-js

```
USAGE
  $ example-multi-js help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v1.2.3/src/commands/help.ts)_
<!-- commandsstop -->
