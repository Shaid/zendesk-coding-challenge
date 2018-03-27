#!/usr/bin/env node

const chalk = require('chalk')
const cli = require('vorpal')()

const organisations = require('./src/models/organisations')
const tickets = require('./src/models/tickets')
const users = require('./src/models/users')

const datasets = {
  users,
  organisations,
  tickets
}

// we're using vorpal to provide the cli framework
// let's set it up
const cliConfig = require('./config/cli.json')

cli.history(cliConfig.historyId)
cli.delimiter(chalk`{bgHex('${cliConfig.prompt.colour}') ${cliConfig.prompt.delimiter}}`)

// add our available commands
require('./src/commands/search')({ cli, datasets })
require('./src/commands/listFields')({ cli, datasets })

// now, begin!
cli.show()
