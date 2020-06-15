const express = require('express')
const { getCookieString } = require('../utils/cookies')
const { getWatched } = require('./watchedApi')
const cache = require('../cache')
const router = express.Router()

router.get('/', async (req, res) => {
  const page = req.query.page || 0
  const cacheKey = `[g${req.cookies.ipb_member_id}] watched ${page}`
  let content = cache.get(cacheKey)
  if (!content) {
    content = await getWatched(page, getCookieString(req.cookies))
    cache.set(cacheKey, content)
  }
  res.json({ error: false, ...content })
})

module.exports = router
