const Model = require('./Model.js')
const dataset = require('../../data/tickets.json')

const relations = {
  submitter: { key: 'submitter_id', model: 'users' },
  assignee: { key: 'assignee_id', model: 'users' },
  organization: { key: 'organization_id', model: 'organisations' },
}

module.exports = new Model({
  dataset,
  relations
})
