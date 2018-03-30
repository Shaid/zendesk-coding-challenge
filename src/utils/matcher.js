const matchers = {
  boolean: (field, value) => {
    return (field === JSON.parse(value))
  },
  string: (field, value) => {
    // using String.prototype.includes() allows us to match partial strings,
    // but we must also ensure the search isn't '' first, as all strings
    // include ''.
    if (value === '') {
      return (field === value)
    }
    return (field.toLowerCase().includes(value.toLowerCase()))
  },
  number: (field, value) => {
    return (field === value)
  },
  // also triggers for arrays. thanks, loose typing.
  object: (field, value) => {
    return (Object.values(field).findIndex((item) => { return item.toLowerCase() === value.toLowerCase()}) >= 0)
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
