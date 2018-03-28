const USER = `
[{
  "_id": 1,
  "url": "http://initech.zendesk.com/api/v2/users/1.json",
  "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
  "name": "Francisca Rasmussen",
  "alias": "Miss Coffey",
  "created_at": "2016-04-15T05:19:46 -10:00",
  "active": true,
  "verified": true,
  "shared": false,
  "locale": "en-AU",
  "timezone": "Sri Lanka",
  "last_login_at": "2013-08-04T01:03:27 -10:00",
  "email": "coffeyrasmussen@flotonic.com",
  "phone": "8335-422-718",
  "signature": "Don't Worry Be Happy!",
  "organization_id": 119,
  "tags": [
    "Springville",
    "Sutton",
    "Hartsville/Hartley",
    "Diaperville"
  ],
  "suspended": true,
  "role": "admin"
}]
`
const ORGANISATION = `
[{
  "_id": 119,
  "url": "http://initech.zendesk.com/api/v2/organizations/119.json",
  "external_id": "2386db7c-5056-49c9-8dc4-46775e464cb7",
  "name": "Multron",
  "domain_names": [
    "bleeko.com",
    "pulze.com",
    "xoggle.com",
    "sultraxin.com"
  ],
  "created_at": "2016-02-29T03:45:12 -11:00",
  "details": "Non profit",
  "shared_tickets": false,
  "tags": [
    "Erickson",
    "Mccoy",
    "Wiggins",
    "Brooks"
  ]
}]
`

const { organisations, users } = require('../../datasets')
const resolveRelations = require('../resolveRelations')


it('can provide a resultset that has no nested relations', () => {
  const result = resolveRelations(JSON.parse(ORGANISATION), organisations)[0]
  expect(result).toEqual(JSON.parse(ORGANISATION)[0])
})


it('can provide a resultset that has nested relations', () => {
  const result = resolveRelations(JSON.parse(USER), users)[0]

  expect(result).toHaveProperty('organization')
  expect(result.organization).toBeDefined()
  expect(result.organization.name).toBe('Multron')
})
