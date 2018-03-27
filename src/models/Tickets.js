const Model = require('./Model.js')

class Tickets extends Model {

}

Tickets.defaults = {
  data: '../../data/tickets.json'
}

module.exports = Tickets
