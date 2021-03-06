const express = require('express')
const { getCookieString } = require('../utils/cookies')
const { getPopular } = require('./popluarApi')
const cache = require('../cache')
const router = express.Router()

router.get('/', async (req, res) => {
  const cacheKey = `[g${req.cookies.ipb_member_id}] popular`
  let content = cache.get(cacheKey)
  if (!content) {
    content = await getPopular(getCookieString(req.cookies))
    cache.set(cacheKey, content)
  }
  res.json({ error: false, list: content })
})

module.exports = router
