const express = require('express')
const { login, validateLogin, getUserSetting } = require('./userApi')
const { getCookieString } = require('../utils/cookies')
const cache = require('../cache')
const router = express.Router()

const cookieOption = (req) => ({
  maxAge: 6 * 31 * 24 * 60 * 60 * 1000,
  path: '/',
})

router.post('/login', async (req, res) => {
  const {
    UserName,
    PassWord,
    method,
    ipb_member_id,
    ipb_pass_hash,
    igneous,
  } = req.body

  let content = ''
  let userCookie = {}

  if (method === 'cookie') {
    content = await validateLogin({ ipb_member_id, ipb_pass_hash, igneous })
    userCookie = { ipb_member_id, ipb_pass_hash, igneous }
  } else {
    const { message, cookie } = await login({ UserName, PassWord })
    content = message
    userCookie = cookie
  }

  const { cookie: setingCookie } = await getUserSetting(
    getCookieString(userCookie)
  )
  Object.entries({ ...setingCookie, ...userCookie }).forEach(([key, value]) => {
    if (key === 'igneous' && value === 'mystery')
      throw new Error('[login faild] User cookie "igneous" value error')
    res.cookie(key, value, cookieOption(req))
  })
  res.send({ error: false, message: content })
})

router.post('/setting', async (req, res) => {
  const { cookie } = await getUserSetting(getCookieString(req.cookies))
  Object.entries(cookie).forEach(([key, value]) =>
    res.cookie(key, value, cookieOption(req))
  )

  cache.del(
    cache.keys().filter((v) => v.includes(`[g${req.cookies.ipb_member_id}]`))
  )
  res.send({ error: false, message: 'fresh setting success' })
})

router.post('/logout', async (req, res) => {
  Object.keys(req.cookies).forEach((key) => {
    res.clearCookie(key)
  })

  res.send({ error: false, message: 'logged out' })
})

router.get('/test/cookie', async (req, res) => {
  if (req.cookies.test) {
    res.clearCookie('test')
    res.json({ error: false, message: 'success' })
  } else res.json({ error: true, message: 'cookie no set' })
})
router.post('/test/cookie', async (req, res) => {
  res.cookie('test', true, { maxAge: 180 * 1000 })
  res.json({ error: false, message: 'cookie set' })
})

module.exports = router
