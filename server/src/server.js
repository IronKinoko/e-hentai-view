// server.js
const path = require('path')
const next = require('next')
const createProxyMiddleware = require('http-proxy-middleware')
  .createProxyMiddleware
const nextI18next = require('../../app/i18n')
const devProxy = {
  '/api': {
    target: 'http://localhost:8080/', // 端口自己配置合适的
    // target: 'https://exhentai.appspot.com/', // 端口自己配置合适的
    changeOrigin: true,
  },
}

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: path.resolve(__dirname, '../../app') })
const handle = app.getRequestHandler()

;(async () => {
  await app.prepare()

  const server = dev ? require('express')() : require('./app')

  if (dev && devProxy) {
    Object.keys(devProxy).forEach(function (context) {
      server.use(createProxyMiddleware(context, devProxy[context]))
    })
  }

  await nextI18next.initPromise

  server.get('/service-worker.js', (req, res) => {
    const filePath = path.resolve(
      __dirname,
      '../../app/.next/static/service-worker.js'
    )
    app.serveStatic(req, res, filePath)
  })
  server.all('*', (req, res) => {
    handle(req, res)
  })

  if (dev) {
    server.listen(3000, () => {
      console.log(`app listening on http://localhost:3000`)
    })
  }
})()
