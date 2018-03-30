const Model = require('./Model.js')
const dataset = require('../../data/organizations.json')

const relations = {
  tickets: { key: 'organization_id', foreign: true, model: 'tickets' },
  users: { key: 'organization_id', foreign: true, model: 'users' }
}

module.exports = new Model({
  name: 'organisation',
  dataset,
  relations
})
