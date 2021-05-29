// server.js
const next = require('next')
const createProxyMiddleware =
  require('http-proxy-middleware').createProxyMiddleware
const devProxy = {
  '/api': {
    target: process.env.PROXY_URL || 'https://exhentai.appspot.com/', // 端口自己配置合适的
    changeOrigin: true,
  },
}

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

;(async () => {
  await app.prepare()

  const server = dev ? require('express')() : require('./app')
  if (dev && devProxy) {
    const cookieParser = require('cookie-parser')
    server.use(cookieParser())
    Object.keys(devProxy).forEach(function (context) {
      server.use(createProxyMiddleware(context, devProxy[context]))
    })
  }

  // server.get('/', (req, res) => {
  //   if (!req.cookies['next-i18next']) {
  //     const lang = req.headers['accept-language'].slice(0, 2)
  //     if (localeSubpaths[lang]) {
  //       res.redirect('/' + localeSubpaths[lang])
  //     } else {
  //       res.cookie('next-i18next', 'en', {
  //         maxAge: 6 * 31 * 24 * 60 * 60 * 1000,
  //         path: '/',
  //       })
  //       res.redirect('/')
  //     }
  //   } else {
  //     /** @type {string} */
  //     const lang = req.cookies['next-i18next']
  //     if (lang !== 'en') {
  //       res.redirect('/' + localeSubpaths[lang])
  //     } else {
  //       handle(req, res)
  //     }
  //   }
  // })

  // await nextI18next.initPromise
  server.all('*', (req, res) => {
    handle(req, res)
  })

  if (dev) {
    server.listen(3000, () => {
      console.log(`app listening on http://localhost:3000`)
    })
  }
})()
