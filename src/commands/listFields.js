const command = 'list [dataset]'
const description = 'List fields available for searching on available datasets'

const listFields = async (args, datasets, callback, activeCommand) => {
  const { dataset } = args
  if (dataset !== undefined && Object.prototype.hasOwnProperty.call(datasets, dataset)) {
    return new Promise((resolve) => {
      activeCommand.log(datasets[dataset].fields)
      resolve()
    })
  }

  // otherwise, list all
  return new Promise((resolve) => {
    activeCommand.log(datasets.users.fields, datasets.organisations.fields, datasets.tickets.fields)
    resolve()
  })
}

module.exports = (injectees) => {
  const { cli, datasets } = injectees

  return cli
    .command(command)
    .description(description)
    .autocomplete(Object.keys(datasets))
    .action((args, callback) => {
      return listFields.call(this, args, datasets, callback, cli.activeCommand)
    })
}
