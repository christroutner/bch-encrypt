@oclif/example-multi-js
=======================

example multi-command CLI built with javascript

[![Version](https://img.shields.io/npm/v/@oclif/example-multi-js.svg)](https://npmjs.org/package/@oclif/example-multi-js)
[![CircleCI](https://circleci.com/gh/oclif/example-multi-js/tree/master.svg?style=shield)](https://circleci.com/gh/oclif/example-multi-js/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/oclif/example-multi-js?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/example-multi-js/branch/master)
[![Codecov](https://codecov.io/gh/oclif/example-multi-js/branch/master/graph/badge.svg)](https://codecov.io/gh/oclif/example-multi-js)
[![Greenkeeper](https://badges.greenkeeper.io/oclif/example-multi-js.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/oclif/example-multi-js/badge.svg)](https://snyk.io/test/github/oclif/example-multi-js)
[![Downloads/week](https://img.shields.io/npm/dw/@oclif/example-multi-js.svg)](https://npmjs.org/package/@oclif/example-multi-js)
[![License](https://img.shields.io/npm/l/@oclif/example-multi-js.svg)](https://github.com/oclif/example-multi-js/blob/master/package.json)

<!-- toc -->
* [Install](#install)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
<!-- install -->
# Install

with yarn:
```
$ yarn global add @oclif/example-multi-js
```

or with npm:
```
$ npm install -g @oclif/example-multi-js
```
<!-- installstop -->
<!-- usage -->
# Usage

```sh-session
$ example-multi-js COMMAND
running command...
$ example-multi-js (-v|--version|version)
@oclif/example-multi-js/1.3.6 (linux-x64) node-v9.5.0
$ example-multi-js --help [COMMAND]
USAGE
  $ example-multi-js COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
# Commands

* [example-multi-js hello](#hello)
* [example-multi-js help [COMMAND]](#help-command)
## hello

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

_See code: [src/commands/hello.js](https://github.com/oclif/example-multi-js/blob/v1.3.6/src/commands/hello.js)_

## help [COMMAND]

display help for example-multi-js

```
USAGE
  $ example-multi-js help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v1.1.2/src/commands/help.ts)_
<!-- commandsstop -->
