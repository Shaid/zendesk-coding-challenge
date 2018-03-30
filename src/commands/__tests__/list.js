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
const PERSON_MODEL_DATASET_FIELDS = ['_id', 'name', 'age', 'description', 'tags']

const TASK_MODEL_DATASET = `
[
  {
    "_id": 1,
    "title": "bob",
    "created": "2018-03-30T12:33:06+11:00",
    "due": "2018-04-03T12:33:06+11:00",
    "content": "finish writing tests for the list command",
    "priority": "high"
  }
]
`
const TASK_MODEL_DATASET_FIELDS = ['_id', 'title', 'created', 'due', 'content', 'priority']

const { register, list, listAction } = require('../list')
const Model = require('../../models/Model')

const datasets = {
  persons: new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) }),
  tasks: new Model({ dataset: JSON.parse(TASK_MODEL_DATASET) })
}

const cli = require('vorpal')()

describe('cli functionality', () => {
  it('can create a vorpal cli command for list', () => {
    const result = register({
      cli,
      datasets
    })
    expect(result._name).toBe('list')
  })

  it('can call the listAction', async () => {
    const result = await listAction(
      datasets,
      { dataset: 'persons' }
    )

    expect(result).toEqual([PERSON_MODEL_DATASET_FIELDS])
  })
})

describe('list functionality', () => {
  it('can list fields from a single dataset', async () => {
    const result = await list(
      datasets,
      'persons'
    )

    expect(result).toEqual([PERSON_MODEL_DATASET_FIELDS])
  })

  it('can list fields from multiple datasets', async () => {
    const result = await list(datasets)

    expect(result).toEqual([PERSON_MODEL_DATASET_FIELDS, TASK_MODEL_DATASET_FIELDS])
  })
})
