const Model = require('./Model.js')
const dataset = require('../../data/users.json')

const relations = {
  organization: { key: 'organization_id', model: 'organisations' },
  opened_tickets: { key: 'submitter_id', foreign: true, model: 'tickets' },
  assigned_tickets: { key: 'assignee_id', foreign: true, model: 'tickets' }
}

module.exports = new Model({
  name: 'users',
  dataset,
  relations
})
