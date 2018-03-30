const FLAT_TICKET_DATA = {
  _id: '01e60325-abe4-44d8-a821-035e15637428',
  url: 'http://initech.zendesk.com/api/v2/tickets/01e60325-abe4-44d8-a821-035e15637428.json',
  external_id: '62d598ce-4bdf-4527-ba1b-7ed0ce3b9760',
  created_at: '2016-06-05T08:59:38 -10:00',
  type: 'task',
  subject: 'A Catastrophe in Korea (South)',
  description: 'Eiusmod labore pariatur incididunt pariatur occaecat amet nulla ad duis nisi sit ex qui. Mollit ex veniam elit duis do in reprehenderit.',
  priority: 'high',
  status: 'closed',
  submitter_id: 22,
  assignee_id: 15,
  organization_id: 108,
  tags: ['Oregon', 'Arizona', 'Delaware', 'New Hampshire'],
  has_incidents: false,
  via: 'voice',
  due_at: '2016-06-05T08:59:38 -10:00'
}

const resolveRelations = require('../../utils/resolveRelations')
const tickets = require('../../models/tickets')
const ticketPresenter = require('../ticket')

it('can render a ticket', () => {
  const ticket = resolveRelations(tickets.find('_id', '01e60325-abe4-44d8-a821-035e15637428'), tickets)[0]
  const result = ticketPresenter(ticket)

  // use string matching to check that it renders out a subject, description, etc
  expect(result).toMatch(ticket.external_id)
  expect(result).toMatch(ticket.subject)
  expect(result).toMatch(ticket.description)
})


it('can render a ticket with no relations', () => {
  const result = ticketPresenter(FLAT_TICKET_DATA)

  // use string matching to check that it renders out a subject, description, etc
  expect(result).toMatch(FLAT_TICKET_DATA.external_id)
  expect(result).toMatch(FLAT_TICKET_DATA.subject)
  expect(result).toMatch(FLAT_TICKET_DATA.description)
})
