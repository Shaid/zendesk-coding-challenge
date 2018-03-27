const Model = require('./Model.js')

class Users extends Model {

}

Users.defaults = {
  data: '../../data/users.json'
}

module.exports = Users
