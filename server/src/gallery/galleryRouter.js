const express = require('express')
const axios = require('../axios')
const {
  gdata,
  galleryList,
  galleryDetail,
  loadImg,
  galleryDetailPage,
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

  const content = await Promise.all([
    gdata([[gid, token]], getCookieString(req.cookies)),
    galleryDetail({ gid, token }, getCookieString(req.cookies)),
  ])

  const [[info], { list, commentList, tagList, otherInfo }] = content

  res.json({ info: { ...info, ...otherInfo }, list, commentList, tagList })
})

router.get('/:gid/:token/:p', async (req, res) => {
  const { gid, token, p } = req.params
  const cacheKey = req.path
  let list = cache.get(cacheKey)

  if (!list) {
    list = await galleryDetailPage(
      { gid, token, p },
      getCookieString(req.cookies)
    )
    cache.set(cacheKey, list)
  }

  res.json({ error: false, list })
})

router.get('/loadImg', async (req, res) => {
  const { url } = req.query
  let content = cache.get(url)
  if (!content) {
    content = await loadImg(url, getCookieString(req.cookies))
    if (content !== '') cache.set(url, content, 120)
  }

  res.json({ url: content })
})

router.get('/img', async (req, res) => {
  const { url } = req.query
  let content = cache.get(url)
  if (!content) {
    const ext = url.split('.').pop() || 'jpg'
    const base64 = await axios
      .get(url, {
        headers: { Cookie: getCookieString(req.cookies) },
        responseType: 'arraybuffer',
      })
      .then((response) =>
        Buffer.from(response.data, 'binary').toString('base64')
      )
    content = [base64, ext]
    cache.set(url, content)
  }
  res.send(content)
})
module.exports = router
