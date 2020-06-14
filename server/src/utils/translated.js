const { find } = require('lodash')
const db = require('./db.text.json')

function translated(tagList) {
  tagList.forEach((row) => {
    const namespace = find(db.data, { namespace: row.namespace })

    row.tags.forEach((o) => {
      const tag = namespace.data[o.name] || {}
      o.name_CHS = tag.name || o.name
      o.intro = tag.intro || ''
    })

    row.namespace_CHS = namespace.frontMatters.name
    row.description = namespace.frontMatters.description
  })
  return tagList
}

module.exports = translated
