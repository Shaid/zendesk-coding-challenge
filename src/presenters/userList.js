const chalk = require('chalk')

const userList = (users) => {
  if (Array.isArray(users) && users.length > 0) {
    return users.map((user) => {
      return chalk`\t{bold ${user.name}} <${user.email}> [${user.role}] `
    }).join('\n')
  }
  return 'None'
}

module.exports = userList
