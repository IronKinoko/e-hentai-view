const express = require('express')
const axios = require('../axios')
const {
  galleryList,
  galleryDetail,
  loadImg,
  galleryDetailPage,
  gallerytorrentsList,
} = require('./galleryApi')
const { getCookieString } = require('../utils/cookies')
const cache = require('../cache')
const router = express.Router()

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || 0)
  const f_search = req.query.f_search || ''

  const cacheKey =
    `[g${req.cookies.ipb_member_id}]` +
    JSON.stringify({
      page,
      f_search,
      cookie: getCookieString(req.cookies),
    })

  let content = cache.get(cacheKey)
  if (!content) {
    content = await galleryList(
      { page, f_search },
      getCookieString(req.cookies)
    )

    cache.set(cacheKey, content, 180)
  }

  res.json(content)
})

router.get('/:gid/:token', async (req, res) => {
  const { gid, token } = req.params

  const content = await galleryDetail(
    { gid, token },
    getCookieString(req.cookies)
  )

  // 为read页面缓存下数据
  const cacheKey = `/${gid}/${token}/0`
  cache.set(cacheKey, content.list)
  content.list = content.list.list

  res.json(content)
})
router.get('/:gid/:token/torrent', async (req, res) => {
  const { gid, token } = req.params

  const content = await gallerytorrentsList(
    { gid, token },
    getCookieString(req.cookies)
  )

  res.json({ error: false, list: content })
})
router.get('/:gid/:token/:p', async (req, res) => {
  const { gid, token, p } = req.params
  const cacheKey = `/${gid}/${token}/${p}`

  let content = cache.get(cacheKey)

  if (!content) {
    content = await galleryDetailPage(
      { gid, token, p },
      getCookieString(req.cookies)
    )
    cache.set(cacheKey, content)
  }

  res.json({ error: false, list: content.list, total: content.total })
})

router.get('/loadImg', async (req, res) => {
  const { url } = req.query
  let content = cache.get(url)
  if (!content) {
    try {
      content = await loadImg(url, getCookieString(req.cookies))
      cache.set(url, content, 120)
    } catch (error) {
      return res.json({ error: true })
    }
  }

  res.json({ error: false, url: content.url, retryURL: content.retryURL })
})

router.get('/proxy', async (req, res) => {
  const url = req.query.url
  axios
    .get(url, {
      headers: { Cookie: getCookieString(req.cookies) },
      responseType: 'stream',
    })
    .then((response) => {
      Object.entries(response.headers).forEach(([key, value]) => {
        res.setHeader(key, value)
      })
      res.setHeader('cache-control', 'max-age=31536000, public, immutable')
      res.setHeader('max-age', '31536000')
      response.data.pipe(res)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})
module.exports = router
