const {
  setColors,
  concurrent,
  crossEnv,
  mkdirp,
  series,
} = require('nps-utils')

setColors(['dim'])

const script = (script, description) => description ? {script, description} : {script}

const linters = {
  eslint: script('eslint .', 'lint js files'),
  commitlint: script('commitlint --from origin/master', 'ensure that commits are in valid conventional-changelog format'),
}

const scripts = {
  ...linters,
  lint: concurrent(linters),
  test: script(concurrent.nps(...Object.keys(linters), 'mocha'), 'lint and run all tests'),
  mocha: script('mocha --forbid-only "test/**/*.test.js"', 'run all mocha tests'),
}

if (process.env.CI) {
  if (process.env.CIRCLECI) {
    scripts.test.script = series(mkdirp('reports'), scripts.test.script)
    // add mocha junit reporter
    scripts.mocha.script = crossEnv(`MOCHA_FILE=reports/mocha.xml ${scripts.mocha.script} --reporter mocha-junit-reporter`)
    // add eslint reporter
    scripts.eslint.script = `${scripts.eslint.script} --format junit --output-file reports/eslint.xml`
    scripts.release = 'semantic-release -e @dxcli/dev-semantic-release'
  }
  // add code coverage reporting with nyc
  const nyc = 'nyc --nycrc-path node_modules/@dxcli/dev-nyc-config/.nycrc'
  const nycReport = `${nyc} report --reporter text-lcov > coverage.lcov`
  scripts.mocha.script = series(`${nyc} ${scripts.mocha.script}`, nycReport)
}

module.exports = {scripts}
