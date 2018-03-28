const organisations = require('./models/organisations')
const tickets = require('./models/tickets')
const users = require('./models/users')

const datasets = {
  users,
  organisations,
  tickets
}

module.exports = datasets
