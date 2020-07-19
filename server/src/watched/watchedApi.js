const axios = require('../axios')
const { watchedURL } = require('../config/api')
const JSDOM = require('jsdom').JSDOM
const { parseGalleryList } = require('../gallery/galleryParser')
const { GalleryMode } = require('../constant')
async function getWatched(page, cookies) {
  const res = await axios.get(`${watchedURL}`, {
    params: { page, inline_set: 'dm_l' },
    headers: { Cookie: cookies },
  })

  const document = new JSDOM(res.data).window.document

  if (document.body.innerHTML.includes('No hits found')) {
    return { list: [], total: 0 }
  }

  return parseGalleryList(document, GalleryMode.Watched)
}

module.exports = { getWatched }
