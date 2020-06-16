const axios = require('../axios')
const { watchedURL } = require('../config/api')
const JSDOM = require('jsdom').JSDOM
const { parseHTMLAnchorElement } = require('../gallery/galleryParser')
const { gdata } = require('../gallery/galleryApi')
async function getWatched(page, cookies) {
  const res = await axios.get(`${watchedURL}?page=${page}`, {
    headers: { Cookie: cookies },
  })

  const document = new JSDOM(res.data).window.document

  if (document.body.innerHTML.includes('No hits found')) {
    return { list: [], total: 0 }
  }

  const gidlist = await parseHTMLAnchorElement(document)

  const list = await gdata(gidlist, cookies)
  const total = +document
    .querySelectorAll('p.ip')[1]
    .innerHTML.replace(/[^0-9]/g, '')
  return { list, total }
}

module.exports = { getWatched }
