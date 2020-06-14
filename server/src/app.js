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

// // cors
// const whitelist = [
//   'http://localhost',
//   'https://e-hentai-view.now.sh',
//   'https://ironkinoko.github.io',
//   'https://exhentai.appspot.com',
//   'https://e-hentai-node.appspot.com',
//   'https://e-hentai-node.du.r.appspot.com',
// ]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (process.env.NODE_ENV === 'development') {
//       callback(null, true)
//     } else if (isNil(origin) || whitelist.some((v) => origin.includes(v))) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,
// }
// app.use(cors(corsOptions))
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) console.log('%s -> %s', req.method, req.url)
  next()
})
app.get('/api', async (req, res) => {
  res.send(`<pre>${JSON.stringify(listEndpoints(app), null, 2)}</pre>`)
})

app.use('/api/gallery', require('./gallery/galleryRouter'))
app.use('/api/popular', require('./popular/popularRouter'))
app.use('/api/user', require('./user/userRouter'))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(200).send({ error: true, message: err.message })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`)
})

module.exports = app
