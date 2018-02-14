@oclif/example-multi-js
=======================

example multi-command CLI built with javascript

[![Version](https://img.shields.io/npm/v/@oclif/example-multi-js.svg)](https://npmjs.org/package/@oclif/example-multi-js)
[![CircleCI](https://circleci.com/gh/oclif/example-multi-js/tree/master.svg?style=svg)](https://circleci.com/gh/oclif/example-multi-js/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/oclif/example-multi-js?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/example-multi-js/branch/master)
[![Codecov](https://codecov.io/gh/oclif/example-multi-js/branch/master/graph/badge.svg)](https://codecov.io/gh/oclif/example-multi-js)
[![Greenkeeper](https://badges.greenkeeper.io/oclif/example-multi-js.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/npm/@oclif/example-multi-js/badge.svg)](https://snyk.io/test/npm/@oclif/example-multi-js)
[![Downloads/week](https://img.shields.io/npm/dw/@oclif/example-multi-js.svg)](https://npmjs.org/package/@oclif/example-multi-js)
[![License](https://img.shields.io/npm/l/@oclif/example-multi-js.svg)](https://github.com/oclif/example-multi-js/blob/master/package.json)

<!-- toc -->
* [Install](#Install)
* [Usage](#Usage)
* [Commands](#Commands)
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
@oclif/example-multi-js/1.1.2 (linux-x64) node-v9.5.0
$ example-multi-js --help [COMMAND]
USAGE
  $ example-multi-js COMMAND [OPTIONS]
...
```
<!-- usagestop -->
<!-- commands -->
# Commands

* [example-multi-js hello [OPTIONS]](#hello)
* [example-multi-js help [COMMAND] [OPTIONS]](#help)
## hello [OPTIONS]

```
USAGE
  $ example-multi-js hello [OPTIONS]

OPTIONS
  -n, --name=name  name to print
```

_See code: [@oclif/example-multi-js](https://github.com/oclif/example-multi-js/blob/v1.1.2/src/commands/hello.js)_

## help [COMMAND] [OPTIONS]

display help for example-multi-js

```
USAGE
  $ example-multi-js help [COMMAND] [OPTIONS]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v1.0.1/src/commands/help.ts)_
<!-- commandsstop -->
