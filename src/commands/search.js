const resolveRelations = require('../utils/resolveRelations')


const searchDatasetByField = async (args) => {
  const { dataset, field, query } = args

  return new Promise(async (resolve) => {
    const result = await resolveRelations(dataset.find(field, query), dataset)

    resolve(result)
  })
}

const search = async (args, datasets) => {
  const { dataset, field, query } = args
  return searchDatasetByField({
    dataset: datasets[dataset],
    field,
    query
  })
}


module.exports = {
  register: (injectees) => {
    const { cli, datasets } = injectees

    return cli
      .command('search <dataset> <field> <query>')
      .description('Search through the available datasets')
      .autocomplete(Object.keys(datasets))
      .action((args, callback) => {
        cli.activeCommand.log('searching!')
        return search.call(this, args, datasets, callback, cli.activeCommand)
      })
  },
  search
}

