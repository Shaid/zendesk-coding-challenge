const datasets = require('../datasets')

const resolveRelations = (dataset, model) => {
  if (!model.relations || Object.values(model.relations).length === 0) {
    return dataset
  }

  const rendered = []
  dataset.forEach((result) => {
    const renderedElement = result
    Object.keys(model.relations).forEach((relation) => {
      const relationship = model.relations[relation]
      const relatedModel = datasets[relationship.model]

      let relatedEntity
      if (relationship.foreign) {
        relatedEntity = relatedModel.find(relationship.key, result._id) //eslint-disable-line
      } else {
        relatedEntity = relatedModel.getById(result[relationship.key])
      }
      renderedElement[relation.replace(/_id/g, '')] = relatedEntity
    })
    rendered.push(renderedElement)
  })

  return rendered
}

module.exports = resolveRelations
