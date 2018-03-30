
const list = (datasets, dataset) => {
  if (dataset !== undefined && Object.prototype.hasOwnProperty.call(datasets, dataset)) {
    return new Promise((resolve) => {
      resolve([datasets[dataset].fields])
    })
  }

  // otherwise, list all
  return new Promise((resolve) => {
    const allFields = []
    Object.values(datasets).forEach((set) => {
      allFields.push(set.fields)
    })
    resolve(allFields)
  })
}

async function listAction(datasets, args) {
  const fields = await list(datasets, args[0])

  return fields
}

module.exports = {
  register: (injectees) => {
    const { cli, datasets } = injectees
    const doListAction = async () => {
      const fields = await listAction(cli, datasets, ...arguments)
      cli.activeCommand.log(fields)
      return fields
    }

    return cli
      .command('list [dataset]')
      .description('List fields available for searching on available datasets')
      .autocomplete(Object.keys(datasets))
      .action(doListAction)
  },
  list,
  listAction
}
