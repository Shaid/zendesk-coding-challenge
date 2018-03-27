const Model = require('./Model.js')

const relations = {
  submitter_id: 'User',
  assignee_id: 'User',
  organization_id: 'Organisation'
}

module.exports = new Model({
  dataset: require('../../data/tickets.json'),
  relations
})
