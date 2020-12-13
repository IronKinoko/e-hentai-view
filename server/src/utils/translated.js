const { find } = require('lodash')
const db = require('./db.text.json')

/**
 * translate Tag to Chinese
 *
 * @param {{namespace: string, tags: {name:string}[]}[]} tagList
 * @return {{namespace: string, namespace_CHS: string, description: string, tags: {name:string,name_CHS:string, intro:string}[]}[]}
 */
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
