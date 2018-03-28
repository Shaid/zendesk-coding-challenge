const resolveRelations = require('../utils/resolveRelations')

const command = 'search <dataset> <field> <query>'
const description = 'Search through the available datasets'

const searchDatasetByField = async (args, callback, activeCommand) => {
  const { dataset, field, query } = args

  return new Promise(async (resolve) => {
    activeCommand.log(`searching for ${field} ${query}`)

    const result = await resolveRelations(dataset.find(field, query), dataset)
    activeCommand.log(dataset.find(field, query))

    resolve(result)
  })
}

const search = async (args, datasets, callback, activeCommand) => {
  const { dataset, field, query } = args
  return searchDatasetByField({
    dataset: datasets[dataset],
    field,
    query
  }, callback, activeCommand)
}


module.exports = (injectees) => {
  const { cli, datasets } = injectees

  return cli
    .command(command)
    .description(description)
    .autocomplete(Object.keys(datasets))
    .action((args, callback) => {
      cli.activeCommand.log('searching!')
      return search.call(this, args, datasets, callback, cli.activeCommand)
    })
}
