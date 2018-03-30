const FIELDS = {
  dataset: 'person',
  fields: ['_id', 'name', 'age', 'description', 'tags']
}

const fieldListPresenter = require('../fieldList')

it('renders a list of fields', () => {
  const result = fieldListPresenter(FIELDS)

  expect(result).toMatch('person')
  expect(result).toMatch('name')
  expect(result).toMatch('age')
})

it('deals with an empty fieldset', () => {
  const result = fieldListPresenter({})

  expect(result).toBe('No fields available.')
})
