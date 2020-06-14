const express = require('express')
const { getCookieString } = require('../utils/cookies')
const { getPopular } = require('./popluarApi')
const cache = require('../cache')
const router = express.Router()

router.get('/', async (req, res) => {
  let content = cache.get(getCookieString(req.cookies))
  if (!content) {
    content = await getPopular(getCookieString(req.cookies))
    cache.set(getCookieString(req.cookies), content)
  }
  res.json({ error: false, list: content })
})

module.exports = router
