const chalk = require('chalk')
const moment = require('moment')

const symbol = require('./symbol')

module.exports = (ticket) => {
  return chalk`
  {inverse [Ticket: ${ticket._id} - ${ticket.external_id}]}

  {bold ${ticket.subject}}
  ${ticket.organization ? `Organisation: ${ticket.organization.name}` : ''}

  {bold Description}
  ${ticket.description}

  Status: ${ticket.status.toUpperCase()}
  Priority: {bold ${ticket.priority.toUpperCase()}}
  Type: ${ticket.type}
  ${ticket.assignee ? `Assigned to: ${ticket.assignee.name}` : ''}
  ${ticket.due_at ? `Due: ${ticket.due_at}` : ''}
  Incidents: ${symbol(ticket.has_incidents)}

  Tags: ${ticket.tags.map((tag) => { return tag }).join(', ')}

  ${ticket.submitter ? `Submitted by: ${ticket.submitter.name} via ${ticket.via}` : ''}
  Submitted on: ${moment(ticket.created_at, 'YYYY-MM-DDThh:mm:ss Z').format('dddd, MMMM Do YYYY [at] h:mm:ss a')}
`
}
