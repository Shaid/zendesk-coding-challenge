const fieldsListPresenter = require('../presenters/fieldList')

const list = (datasets, dataset) => {
  if (dataset !== undefined && Object.prototype.hasOwnProperty.call(datasets, dataset)) {
    return new Promise((resolve) => {
      resolve({
        dataset: datasets[dataset].name,
        fields: datasets[dataset].fields
      })
    })
  }

  // otherwise, list all
  return new Promise((resolve) => {
    const allFields = []
    Object.values(datasets).forEach((set) => {
      allFields.push({
        dataset: set.name,
        fields: set.fields
      })
    })
    resolve(allFields)
  })
}

async function listAction(datasets, args) {
  const fields = await list(datasets, args.dataset)

  if (Array.isArray(fields)) {
    return fields.map((field) => {
      return fieldsListPresenter(field)
    }).join('')
  }
  return fieldsListPresenter(fields)
}

module.exports = {
  register: (dependencies) => {
    const { cli, datasets } = dependencies

    return cli
      .command('fields [dataset]')
      .description('List fields available for searching on a dataset, or all datasets if no dataset is provided')
      .autocomplete(Object.keys(datasets))
      .alias('list')
      .action(async (args) => {
        cli.log(await listAction(datasets, args))
      })
  },
  list,
  listAction
}
