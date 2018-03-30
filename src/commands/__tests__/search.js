const PERSON_MODEL_DATASET = `
[
  {
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
  }
]
`
const PERSON_SEARCH_RESULT = '[{"_id": 1, "active": true, "alias": "Miss Coffey", "created_at": "2016-04-15T05:19:46 -10:00", "email": "coffeyrasmussen@flotonic.com", "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f", "last_login_at": "2013-08-04T01:03:27 -10:00", "locale": "en-AU", "name": "Francisca Rasmussen", "organization_id": 119, "phone": "8335-422-718", "role": "admin", "shared": false, "signature": "Don\'t Worry Be Happy!", "suspended": true, "tags": ["Springville", "Sutton", "Hartsville/Hartley", "Diaperville"], "timezone": "Sri Lanka", "url": "http://initech.zendesk.com/api/v2/users/1.json", "verified": true}]'

const { register, search, searchAction } = require('../search')
const Model = require('../../models/Model')

const datasets = {
  users: new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })
}

const cli = require('vorpal')()

// lets mock out console log for now, because vorpal likes to use it
global.console = { log: jest.fn() }

it('can create a vorpal cli command for search', () => {
  const result = register({ cli, datasets })
  expect(result._name).toBe('search')
})

it('can call the searchAction', async () => {
  const result = await searchAction({
    dataset: 'users',
    field: 'name',
    query: 'Francisca'
  }, cli, datasets)

  expect(result).toMatch(/francisca/i)
})

it('can call the searchAction with a query that has no result', async () => {
  const result = await searchAction({
    dataset: 'users',
    field: 'name',
    query: 'Thomas'
  }, cli, datasets)

  expect(result).toMatch(/no results found/i)
  expect(result).toMatch(/name/i)
})


it('can call the searchAction without a valid dataset', async () => {
  const result = await searchAction({
    dataset: 'notReal',
    field: 'name',
    query: 'Francisca'
  }, cli, datasets)
  expect(result).toMatch(/dataset/i)
  expect(result).toMatch(/not found/i)
})

it('can call the searchAction without a valid field', async () => {
  const result = await searchAction({
    dataset: 'users',
    field: 'status',
    query: 'Francisca'
  }, cli, datasets)

  expect(result).toMatch(/field/i)
  expect(result).toMatch(/not found/i)
})

describe('search functionality', () => {
  it('can find data for a field', async () => {
    const result = await search(
      {
        dataset: 'users',
        field: 'name',
        query: 'Francisca'
      },
      datasets
    )
    expect(result).toEqual(JSON.parse(PERSON_SEARCH_RESULT))
  })
})
