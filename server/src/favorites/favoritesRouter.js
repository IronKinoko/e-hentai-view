const express = require('express')
const { getCookieString } = require('../utils/cookies')
const {
  getFavorites,
  getFavoritesInfo,
  updateFavorite,
} = require('./favoritesApi')
const cache = require('../cache')
const router = express.Router()

router.get('/', async (req, res) => {
  const page = req.query.page || 0
  const favcat = req.query.favcat || 'all'
  const cacheKey = `[g${req.cookies.ipb_member_id}] favorites ${page} ${favcat}`
  let content = cache.get(cacheKey)
  if (!content) {
    content = await getFavorites({ page, favcat }, getCookieString(req.cookies))
    cache.set(cacheKey, content)
  }
  res.json({ error: false, ...content })
})

router.get('/info', async (req, res) => {
  const list = await getFavoritesInfo(getCookieString(req.cookies))
  res.json({ error: false, list })
})

router.put('/add/:gid/:token', async (req, res) => {
  const { gid, token } = req.params
  const { favcat } = req.query
  await updateFavorite({ gid, token, favcat }, getCookieString(req.cookies))
  res.json({ error: false, message: 'success' })
})

module.exports = router
