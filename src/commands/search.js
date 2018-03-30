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
  register: (dependencies) => {
    const { cli, datasets } = dependencies

    return cli
      .command('search <dataset> <field> <query>')
      .description('Search through the available datasets')
      .autocomplete(Object.keys(datasets))
      .action(async (args, callback) => {
        const result = await search.call(this, args, datasets, callback, cli.activeCommand)
        cli.log(result)
        callback()
      })
  },
  search
}

