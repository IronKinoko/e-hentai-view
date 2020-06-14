const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 600 })

module.exports = cache
