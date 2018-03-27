const Model = require('./Model.js')
const dataset = require('../../data/users.json')

const relations = {
  organization_id: 'organization'
}

module.exports = new Model({
  dataset,
  relations
})
