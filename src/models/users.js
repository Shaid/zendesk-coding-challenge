const Model = require('./Model.js')

const relations = {
  organization_id: 'organization'
}

module.exports = new Model({
  dataset: require('../../data/users.json'),
  relations
})
