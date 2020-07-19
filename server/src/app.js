const express = require('express')
const bodyParser = require('body-parser')
// const cors = require('cors')
require('express-async-errors')
const cookieParser = require('cookie-parser')
const app = express()
const listEndpoints = require('express-list-endpoints')
// const { isNil } = require('lodash')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse cookies
app.use(cookieParser())

app.use((req, res, next) => {
  if (req.url.startsWith('/api')) console.log('%s -> %s', req.method, req.url)
  next()
})
app.get('/api', async (req, res) => {
  res.send(`<pre>${JSON.stringify(listEndpoints(app), null, 2)}</pre>`)
})

app.use('/api/gallery', require('./gallery/galleryRouter'))
app.use('/api/popular', require('./popular/popularRouter'))
app.use('/api/watched', require('./watched/watchedRouter'))
app.use('/api/favorites', require('./favorites/favoritesRouter'))
app.use('/api/user', require('./user/userRouter'))

app.use((err, req, res, next) => {
  console.error(err)
  if (err.message === 'Request failed with status code 302')
    err.message = 'no login'
  res.status(200).send({ error: true, message: err.message })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(
    `app listening on http://localhost:${PORT}, env: ${process.env.NODE_ENV}`
  )
})

module.exports = app
