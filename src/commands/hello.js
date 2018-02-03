const {Command, flags} = require('@anycli/command')
const {cli} = require('cli-ux')

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand)
    const name = flags.name || 'world'
    cli.log(`hello ${name} from hello!`)
  }
}

HelloCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = HelloCommand
