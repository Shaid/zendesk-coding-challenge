const chalk = require('chalk')

const ticketList = require('./ticketList')

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
  Active: ${user.active}
  Verified: ${user.verified}
  Shared: ${user.shared}
  Suspended: ${user.suspended}

  Tags: ${user.tags.map((tag) => {
    return tag
  }).join(', ')}

  {bold Tickets}
  Opened:
  ${ticketList(user.opened_tickets)}

  Assigned:
  ${ticketList(user.assigned_tickets)}
  `
}
