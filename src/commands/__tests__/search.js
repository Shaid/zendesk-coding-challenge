const PERSON_MODEL_DATASET = `
[
  {
    "_id": 1,
    "name": "bob",
    "age": "27",
    "description": "tall",
    "tags": [
      "tall", "bald"
    ]
  }
]
`
const PERSON_SEARCH_RESULT = [{
  _id: 1,
  age: '27',
  description: 'tall',
  name: 'bob',
  tags: ['tall', 'bald']
}]

const { register, search } = require('../search')
const Model = require('../../models/Model')

const datasets = {
  persons: new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })
}

const cli = require('vorpal')()

it('can create a vorpal cli command for search', () => {
  const result = register({ cli, datasets })
  expect(result._name).toBe('search')
})

describe('search functionality', () => {
  it('can find data for a field', async () => {
    const result = await search(
      {
        dataset: 'persons',
        field: 'name',
        query: 'bob'
      },
      datasets
    )
    expect(result).toEqual(PERSON_SEARCH_RESULT)
  })
})
