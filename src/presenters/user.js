const chalk = require('chalk')

const ticketList = require('./ticketList')

const logSymbols = require('log-symbols')

const symbol = (bool) => {
  if (bool) {
    return logSymbols.success
  }
  return logSymbols.error
}

module.exports = (user) => {
  return chalk`
  {inverse [User: ${user._id} - ${user.external_id} - Created: ${user.created_at}]}

  {bold ${user.name}} [${user.alias}]
  ${user.email}
  ${user.phone}
  "${user.signature}"

  Last logged in: ${user.last_login_at} / ${user.timezone}
  Locale: ${user.locale}

  ${user.organization ? chalk`Organisation: {bold ${user.organization.name}}` : ''}
  Role: ${user.role}
  Active: ${symbol(user.active)}
  Verified: ${symbol(user.verified)}
  Shared: ${symbol(user.shared)}
  Suspended: ${symbol(user.suspended)}

  Tags: ${user.tags.map((tag) => { return tag }).join(', ')}

  {bold Tickets}
  Opened:
  ${ticketList(user.opened_tickets)}

  Assigned:
  ${ticketList(user.assigned_tickets)}
  `
}
