const matcher = require('../utils/matcher')

const ExceptionFieldNotFound = {
  name: 'FieldNotFound', message: 'Field not found.'
}

const ExceptionModelDatasetNotProvided = {
  name: 'ModelDatasetNotProvided', message: 'No dataset has been provided for this model, and no default dataset has been defined.'
}

class Model {
  constructor(options) {
    const { dataset, relations } = options
    this.relations = relations
    if (dataset) {
      this.processDataset(dataset)
    } else {
      throw ExceptionModelDatasetNotProvided
    }
  }

  processDataset(dataset) {
    this.data = dataset
    this.fields = this.getFieldNames()
  }

  // we don't have any schemas (really) so let's go work out what fields are available.
  getFieldNames() {
    const fields = new Set()

    for (const obj of this.data) {
      for (const keys of Object.keys(obj)) {
        fields.add(keys)
      }
    }

    return [...fields]
  }

  hasField(field) {
    return this.fields.includes(field)
  }

  // this is used for fetching related objects
  getById(id) {
    return this.find('_id', id)[0]
  }

  find(field, value) {
    if (!this.hasField(field)) {
      throw ExceptionFieldNotFound
    }

    const result = this.data.filter((item) => {
      return matcher(item[field], value)
    })

    return result
  }
}

module.exports = Model
