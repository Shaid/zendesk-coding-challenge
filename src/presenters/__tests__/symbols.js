const symbol = require('../symbol')

it('renders a ✔ (tick)', () => {
  const result = symbol(true)
  expect(result).toMatch('✔')
})

it('renders a ✖ (cross)', () => {
  const result = symbol(false)
  expect(result).toMatch('✖')
})

it('handles non-booleans', () => {
  const result = symbol('true')
  expect(result).toBe('')
})
