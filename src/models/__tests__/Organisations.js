const ORGANISATIONS_DATASET = require('../../../data/organizations.json')

const ORGANISATIONS_DATASET_FIELDS_LENGTH = 9

const Organisations = require('../Organisations')

const SINGLE_ORGANISATION_TEST_DATA = `
{
  "_id": 101,
  "url": "http://initech.zendesk.com/api/v2/organizations/101.json",
  "external_id": "9270ed79-35eb-4a38-a46f-35725197ea8d",
  "name": "Enthaze",
  "domain_names": [
    "kage.com",
    "ecratic.com",
    "endipin.com",
    "zentix.com"
  ],
  "created_at": "2016-05-21T11:10:28 -10:00",
  "details": "MegaCorp",
  "shared_tickets": false,
  "tags": [
    "Fulton",
    "West",
    "Rodriguez",
    "Farley"
  ]
}
`

it('should load the dataset', () => {
  const users = new Organisations({ dataset: ORGANISATIONS_DATASET })

  expect(users.fields.length).toBe(ORGANISATIONS_DATASET_FIELDS_LENGTH)
})

it('should be able to call find and return a user', () => {
  const users = new Organisations({ dataset: ORGANISATIONS_DATASET })
  const result = users.getById(101)

  expect(result).toEqual(JSON.parse(SINGLE_ORGANISATION_TEST_DATA))
})
