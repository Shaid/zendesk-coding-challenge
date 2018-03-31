const chalk = require('chalk')

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

  return new Promise(async (resolve, reject) => {
    try {
      const result = await dataset.find(field, query)
      resolve(result)
    } catch (error) {
      reject()
    }
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

async function searchAction(args, cli, datasets) {
  if (Object.keys(datasets).includes(args.dataset)) {
    try {
      const results = await search(args, datasets)
      if (results.length > 0) {
        return results.map((result) => {
          return presenters[args.dataset](result)
        }).join('\n')
      }
      return chalk`No results found for {bold ${args.field}} matching {bold ${args.query}} on {bold ${args.dataset}}.`
    } catch (error) {
      return chalk`Field {bold ${args.field}} not found on {bold ${args.dataset}}`
    }
  }
  return chalk`Dataset {bold ${args.dataset}} not found.`
}

module.exports = {
  register: (dependencies) => {
    const { cli, datasets } = dependencies

    return cli
      .command('search <dataset> <field> <query>')
      .description('Search through the available datasets')
      .autocomplete(Object.keys(datasets))
      .action(async (args) => {
        return cli.log(await searchAction(args, cli, datasets))
      })
  },
  search,
  searchAction
}
