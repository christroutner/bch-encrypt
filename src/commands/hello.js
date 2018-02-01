const {Command, flags, parse} = require('@anycli/command')
const {cli} = require('cli-ux')

class HelloCommand extends Command {
  async run() {
    const options = parse(this.argv, HelloCommand)
    const name = options.flags.name || 'world'
    cli.log(`hello ${name} from hello!`)
  }
}

HelloCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = HelloCommand
