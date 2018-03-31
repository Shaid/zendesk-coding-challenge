const FLAT_ORGANISATION_DATA = {
  _id: 119,
  url: 'http://initech.zendesk.com/api/v2/organizations/119.json',
  external_id: '2386db7c-5056-49c9-8dc4-46775e464cb7',
  name: 'Multron',
  domain_names: ['bleeko.com', 'pulze.com', 'xoggle.com', 'sultraxin.com'],
  created_at: '2016-02-29T03:45:12 -11:00',
  details: 'Non profit',
  shared_tickets: false,
  tags: ['Erickson', 'Mccoy', 'Wiggins', 'Brooks']
}

const { organisations } = require('../../datasets')
const organisationPresenter = require('../organisation')

it('can render an organisation with no relations', () => {
  const result = organisationPresenter(FLAT_ORGANISATION_DATA)
  // use string matching to check that it renders out a subject, description, etc
  expect(result).toMatch(FLAT_ORGANISATION_DATA.external_id)
  expect(result).toMatch(FLAT_ORGANISATION_DATA.name)
  expect(result).toMatch(FLAT_ORGANISATION_DATA.details)
})

it('can render an organisation', () => {
  const org = organisations.find('_id', 109)[0]
  const result = organisationPresenter(org)

  // use string matching to check that it renders out a subject, description, etc
  expect(result).toMatch(org.external_id)
  expect(result).toMatch(org.name)
  expect(result).toMatch(org.details)
  expect(result).toMatch(org.users[0].name)
})
