const chalk = require('chalk')

// we're using vorpal to provide the cli framework
// let's set it up
const search = require('./commands/search')
const fields = require('./commands/fields')
const cliConfig = require('../config/cli.json')

function initialise(vorpalInstance, datasets) {
  const cli = vorpalInstance()
  cli.history(cliConfig.historyId)
  cli.delimiter(chalk`{bold ${cliConfig.prompt.delimiter}}`)

  // add our available commands
  search.register({ cli, datasets })
  fields.register({ cli, datasets })

  cli.log(chalk`
  {bgHex('#03363D') ZENDESK}

  Welcome to the Zendesk interactive shell.

  Type 'help' for a list of available commands.
  `)

  return cli
}

module.exports = initialise
