const chalk = require('chalk')

const ticketList = (tickets) => {
  if (Array.isArray(tickets) && tickets.length > 0) {
    return tickets.map((ticket) => {
      return chalk`\t${ticket.subject} [${ticket.type}:{bold ${ticket.priority.toUpperCase()}}] `
    }).join('\n')
  }
  return 'None'
}

module.exports = ticketList
