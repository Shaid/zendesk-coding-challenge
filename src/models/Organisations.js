const Model = require('./Model.js')

class Organisations extends Model {

}

Organisations.defaults = {
  data: '../../data/organisations.json'
}

module.exports = Organisations
