const resolveRelations = require('../utils/resolveRelations')

const organisations = require('../presenters/organisation')
const tickets = require('../presenters/ticket')
const users = require('../presenters/user')

const presenters = {
  organisations,
  tickets,
  users
}

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
        const results = await search.call(this, args, datasets, callback, cli.activeCommand)
        results.forEach((result) => {
          cli.log(presenters[args.dataset](result))
        })

        callback()
      })
  },
  search
}

