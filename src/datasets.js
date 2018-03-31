const organisations = require('./models/organisations')
const tickets = require('./models/tickets')
const users = require('./models/users')

const resolveRelations = require('./utils/resolveRelations')

const datasets = {
  users,
  organisations,
  tickets
}

Object.values(datasets).forEach((dataset) => {
  dataset.setDataset(resolveRelations(dataset.data, dataset, datasets))
})

module.exports = datasets
