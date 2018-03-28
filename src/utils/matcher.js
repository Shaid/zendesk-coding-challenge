const matchers = {
  boolean: (field, value) => {
    return (field === JSON.parse(value))
  },
  string: (field, value) => {
    return (field === value)
  },
  number: (field, value) => {
    return (field === value)
  },
  // also triggers for arrays. thanks, loose typing.
  object: (field, value) => {
    return Object.values(field).includes(value)
  }
}

const matcher = (field, value) => {
  const type = typeof field

  if (type !== 'undefined' && value !== 'undefined') {
    return matchers[type].call(this, field, value)
  }

  return false
}
module.exports = matcher
