const ExceptionFieldNotFound = {
  name: 'FieldNotFoundException', message: 'Field not found.'
}

const ExceptionModelDatasetNotProvided = {
  name: 'ExceptionModelDatasetNotProvided', message: 'No dataset has been provided for this model, and no default dataset has been defined.'
}

class Model {
  constructor(options) {
    this.options = { ...this.defaults, ...options }

    if (this.options.dataset !== undefined) {
      this.loadDataset(this.options.dataset)
    } else {
      throw ExceptionModelDatasetNotProvided
    }
  }

  loadDataset(dataset) {
    this.data = dataset
    this.fields = this.getFieldNames()
    return true
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
      if (item[field] === value) {
        return true
      }
      return false
    })

    return result
  }
}

Model.defaults = {}

module.exports = Model
