const chalk = require('chalk')

// we're using vorpal to provide the cli framework
// let's set it up
const search = require('./commands/search')
const list = require('./commands/list')
const cliConfig = require('../config/cli.json')

function initialise(vorpalInstance, datasets) {
  const cli = vorpalInstance()
  cli.history(cliConfig.historyId)
  cli.delimiter(chalk`{bold ${cliConfig.prompt.delimiter}}`)

  // add our available commands
  search.register({ cli, datasets })
  list.register({ cli, datasets })

  return cli
}

module.exports = initialise
