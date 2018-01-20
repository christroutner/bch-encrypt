const {concurrent, series} = require('nps-utils')

module.exports = {
  scripts: {
    lint: {
      default: concurrent.nps('lint.eslint', 'lint.commitlint'),
      eslint: {
        script: 'eslint .',
        description: 'lint js files',
      },
      commitlint: {
        script: 'commitlint --from origin/master',
        description: 'ensure that commits are in valid conventional-changelog format',
      },
    },
    test: {
      default: {
        script: concurrent.nps('lint', 'test.mocha'),
        description: 'lint and run all tests',
      },
      mocha: {
        script: 'mocha "test/**/*.test.js"',
        description: 'run all mocha tests',
      },
    },
    ci: {
      default: {
        script: concurrent.nps(
          'ci.mocha',
          'ci.eslint',
        ),
        hiddenFromHelp: true,
      },
      mocha: {
        default: {
          script: series.nps('ci.mocha.test', 'ci.mocha.report'),
          hiddenFromHelp: true,
        },
        test: {
          script: 'MOCHA_FILE="reports/mocha.xml" nps "ci.mocha.nyc nps \\"test.mocha --reporter mocha-junit-reporter\\""',
          hiddenFromHelp: true,
        },
        report: {
          script: series.nps('ci.mocha.nyc report --reporter text-lcov > coverage.lcov'),
          hiddenFromHelp: true,
        },
        nyc: {
          script: 'nyc --nycrc-path node_modules/@dxcli/dev-nyc-config/.nycrc',
          hiddenFromHelp: true,
        },
      },
      eslint: {
        script: series.nps('lint.eslint --format junit --output-file reports/eslint.xml'),
        hiddenFromHelp: true,
      },
      release: {
        script: 'yarn --frozen-lockfile && dxcli-dev-semantic-release',
        hiddenFromHelp: true,
      },
    },
  },
}
