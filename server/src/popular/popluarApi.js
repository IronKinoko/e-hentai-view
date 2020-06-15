const axios = require('../axios')
const { popularURL } = require('../config/api')
const JSDOM = require('jsdom').JSDOM
const { parseHTMLAnchorElement } = require('../gallery/galleryParser')
const { gdata } = require('../gallery/galleryApi')
async function getPopular(cookies) {
  const res = await axios.get(popularURL, { headers: { Cookie: cookies } })

  const document = new JSDOM(res.data).window.document
  const gidlist = await parseHTMLAnchorElement(document)

  return await gdata(gidlist, cookies)
}

module.exports = { getPopular }
