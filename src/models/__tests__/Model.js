const PERSON_MODEL_DATASET = `
[
  {
    "_id": "1",
    "name": "bob",
    "age": "27",
    "description": "tall",
    "tags": [
      "tall", "bald"
    ]
  },
  {
    "_id": "2",
    "name": "tim",
    "age": "27",
    "description": "short",
    "tags": [
      "short", "bald"
    ]
  },
  {
    "_id": "3",
    "name": "jane",
    "description": "",
    "disabled": true
  },
  {
    "_id": "4",
    "name": "kate",
    "age": "27",
    "description": "",
    "disabled": false
  }
]
`
const PERSON_MODEL_DATASET_FIELDS = ['_id', 'name', 'age', 'description', 'tags', 'disabled']

const QUOTE_MODEL_DATASET = `
[
  {
    "_id": "1",
    "person_id": "1",
    "title": "By the pricking of my thumbs"
  },
  {
    "_id": "2",
    "person_id": "3",
    "title": "Something wicked this way comes"
  }
]
`

const QUOTE_MODEL_DATASET_FIELDS = ['_id', 'person_id', 'title']

const Model = require('../Model')

describe('model initialisation and data loading', () => {
  it('can load a dataset', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })

    expect(model.data).toBeDefined()
    expect(model.fields).not.toHaveLength(0)
  })

  it('throws an exception when no dataset is provided', () => {
    expect(() => {
      const model = new Model() //eslint-disable-line
    }).toThrow()
  })
})

describe('basic model related functionality', () => {
  it('can determine available fields in dataset dynamically', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })

    expect(model.fields).toEqual(PERSON_MODEL_DATASET_FIELDS)

    const quote = new Model({ dataset: JSON.parse(QUOTE_MODEL_DATASET) })

    expect(quote.fields).toEqual(QUOTE_MODEL_DATASET_FIELDS)
  })

  it('can pick an item by id', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })
    const result = model.getById('2')

    expect(result.name).toBe('tim')
  })

  it('can render a resultset', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })

    const result = model.render(PERSON_MODEL_DATASET)
    expect(result).toBe(PERSON_MODEL_DATASET)
  })

  it('can render a resultset that has nested relations', () => {
    expect(true).toBe(false)
  })
})

describe('searching for items', () => {
  it('can search for strings', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })
    const result = model.find('name', 'kate')

    expect(result).toHaveLength(1)
  })

  it('can find fields with empty values', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })
    const result = model.find('description', '')

    expect(result).toHaveLength(2)
  })


  it('can search for booleans using booleans', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })
    const result = model.find('disabled', true)

    expect(result).toHaveLength(1)
  })

  it('can search for booleans using strings', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })
    const result = model.find('disabled', 'true')

    expect(result).toHaveLength(1)
  })

  it('can search inside nested arrays', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })

    let result = model.find('tags', 'tall')
    expect(result).toHaveLength(1)

    result = model.find('tags', 'bald')
    expect(result).toHaveLength(2)
  })

  it('can happily find no matches', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })
    const result = model.find('name', 'keith')

    expect(result).toHaveLength(0)
  })

  it('rejects searches against fields that do not exist', () => {
    const model = new Model({ dataset: JSON.parse(PERSON_MODEL_DATASET) })

    expect(() => {
      model.find('suburb', 'melbourne')
    }).toThrow()
  })
})
