const chalk = require('chalk')

const fieldList = (fieldSet) => {
  const { dataset, fields } = fieldSet
  if (Array.isArray(fields) && fields.length > 0) {
    return chalk`
    Fields searchable on {bold ${dataset}}:
    ${fields.map((field) => { return `\t${field}` }).join('\n')}
    `
  }
  return 'No fields available.'
}

module.exports = fieldList
