const axios = require('../axios')
const { popularURL } = require('../config/api')
const JSDOM = require('jsdom').JSDOM
const { parseHTMLAnchorElement } = require('../gallery/galleryParser')
const { gdata } = require('../gallery/galleryApi')
const { chunk } = require('lodash')
async function getPopular(cookies) {
  const res = await axios.get(popularURL, { headers: { Cookie: cookies } })

  const document = new JSDOM(res.data).window.document
  const gidlist = await parseHTMLAnchorElement(document)
  const gidChunkList = chunk(gidlist, 25)
  const taskList = []
  gidChunkList.forEach((gidlist) => {
    taskList.push(gdata(gidlist, cookies))
  })
  const taskRes = await Promise.all(taskList)
  return taskRes.reduce((prev, next) => [...prev, ...next], [])
}

module.exports = { getPopular }
