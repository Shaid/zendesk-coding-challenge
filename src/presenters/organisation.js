const chalk = require('chalk')

const ticketList = require('./ticketList')
const userList = require('./userList')

module.exports = (org) => {
  return chalk`
  {inverse [Organisation: ${org._id} - ${org.external_id} - Created: ${org.created_at}]}

  {bold ${org.name}} [${org.details}]
  Domain names: ${org.domain_names.map((domain) => {
    return domain
  }).join(', ')}

  Tags: ${org.tags.map((tag) => {
    return tag
  }).join(', ')}

  Shared tickets: ${org.shared_tickets}

  {bold Tickets}
  ${ticketList(org.tickets)}

  {bold Users}
  ${userList(org.users)}
  `
}
