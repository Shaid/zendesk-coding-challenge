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

const Model = require('../models/Model')

const datasets = {
  persons: new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) }),
  tasks: new Model({ dataset: JSON.parse(TASK_MODEL_DATASET) })
}

const vorpal = require('vorpal')
const cli = require('../cli')

it('can create a vorpal cli instance', () => {
  const app = cli(vorpal, datasets)
  expect(app.commands).toEqual(expect.arrayContaining([
    expect.objectContaining({
      _name: 'help'
    }),
    expect.objectContaining({
      _name: 'exit'
    })
  ]))
})

it('has a command called list', () => {
  const app = cli(vorpal, datasets)
  expect(app.commands).toEqual(expect.arrayContaining([
    expect.objectContaining({
      _name: 'list'
    }),
  ]))
})

it('has a command called search', () => {
  const app = cli(vorpal, datasets)
  expect(app.commands).toEqual(expect.arrayContaining([
    expect.objectContaining({
      _name: 'search'
    })
  ]))
})
