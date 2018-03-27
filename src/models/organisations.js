const Model = require('./Model.js')
const dataset = require('../../data/organizations.json')

const relations = {}

module.exports = new Model({
  dataset,
  relations
})
