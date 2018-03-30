const FLAT_USER = {
  _id: 22,
  url: 'http://initech.zendesk.com/api/v2/users/22.json',
  external_id: 'bf313bac-e4b1-46a3-a7ee-7cc584b7cbb8',
  name: 'Thomas Vincent Moore',
  alias: 'Miss Cohen',
  created_at: '2016-01-28T08:49:17 -11:00',
  active: true,
  verified: false,
  shared: false,
  locale: 'en-AU',
  timezone: 'Qatar',
  last_login_at: '2014-07-30T03:32:49 -10:00',
  email: 'cohenvincent@flotonic.com',
  phone: '8895-892-293',
  signature: 'Don\'t Worry Be Happy!',
  organization_id: 124,
  tags: ['Veyo', 'Highland', 'Kiskimere', 'Hoehne'],
  suspended: false,
  role: 'end-user'
}

const resolveRelations = require('../../utils/resolveRelations')
const users = require('../../models/users')
const userPresenter = require('../user')

it('can render a user with nested relationships', () => {
  const user = resolveRelations(users.find('_id', 1), users)[0]
  const result = userPresenter(user)

  // use string matching to find the name, org name and first ticket subject
  expect(result).toMatch(user.external_id)
  expect(result).toMatch(user.organization.name)
  expect(result).toMatch(user.assigned_tickets[0].subject)
})

it('can render a simple user with no relations', () => {
  const result = userPresenter(FLAT_USER)

  // use string matching to check that user renders out a name, alias, email, etc
  expect(result).toMatch(FLAT_USER.external_id)
  expect(result).toMatch(FLAT_USER.name)
  expect(result).toMatch(FLAT_USER.email)
  expect(result).toMatch(FLAT_USER.alias)
  expect(result).toMatch(FLAT_USER.role)
})
