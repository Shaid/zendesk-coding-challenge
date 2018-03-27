const Model = require('./Model.js')
const dataset = require('../../data/tickets.json')

const relations = {
  submitter_id: 'User',
  assignee_id: 'User',
  organization_id: 'Organisation'
}

module.exports = new Model({
  dataset,
  relations
})
