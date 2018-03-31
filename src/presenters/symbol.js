const logSymbols = require('log-symbols')

const symbol = (bool) => {
  if (typeof bool === 'boolean') {
    if (bool) {
      return logSymbols.success
    }
    return logSymbols.error
  }
  return ''
}

module.exports = symbol
