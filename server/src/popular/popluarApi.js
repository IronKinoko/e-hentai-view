const axios = require('../axios')
const { popularURL } = require('../config/api')
const JSDOM = require('jsdom').JSDOM
const { parseGalleryList } = require('../gallery/galleryParser')
const { GalleryMode } = require('../constant')
async function getPopular(cookies) {
  const res = await axios.get(popularURL, {
    params: { inline_set: 'dm_l' },
    headers: { Cookie: cookies },
  })

  const document = new JSDOM(res.data).window.document

  return parseGalleryList(document, GalleryMode.Popular).list
}

module.exports = { getPopular }
