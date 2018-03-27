const matcher = require('../matcher')

describe('match different datatypes', () => {
  it('can find strings', () => {
    expect(matcher('bob', 'bobby')).not.toBe(true)
    expect(matcher('bob', 'bob')).toBe(true)
  })

  it('can find numbers', () => {
    expect(matcher(1234, 1234)).toBe(true)
    expect(matcher(12345, 1234)).not.toBe(true)

  })

  it('can find booleans using booleans', () => {
    expect(matcher(true, true)).toBe(true)
  })

  it('can find booleans using strings', () => {
    expect(matcher(true, 'true')).toBe(true)
  })

  it('can find things inside objects', () => {
    expect(matcher({ one: 'one', two: 'two' }, 'two')).toBe(true)
    expect(matcher({ one: 'one', two: 'two' }, 'three')).not.toBe(true)
  })

  it('can find things inside arrays', () => {
    expect(matcher(['one', 'two'], 'one')).toBe(true)
    expect(matcher(['one', 'two'], 'three')).not.toBe(true)
  })

})
