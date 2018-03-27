const Model = require('./Model.js')

const relations = {}

module.exports = new Model({
  dataset: require('../../data/organizations.json'),
  relations
})
