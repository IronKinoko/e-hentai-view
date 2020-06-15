const axios = require('../axios')
const { favoritesURL } = require('../config/api')
const JSDOM = require('jsdom').JSDOM
const { parseHTMLAnchorElement } = require('../gallery/galleryParser')
const { parseFavoritesSettingInfo } = require('./favoritesPaeser')
const { gdata } = require('../gallery/galleryApi')
async function getFavorites({ page, favcat }, cookies) {
  const res = await axios.get(`${favoritesURL}?page=${page}&favcat=${favcat}`, {
    headers: { Cookie: cookies },
  })

  const document = new JSDOM(res.data).window.document

  if (document.body.innerHTML.includes('No hits found')) {
    return { list: [], total: 0 }
  }

  const gidlist = await parseHTMLAnchorElement(document)
  const list = await gdata(gidlist, cookies)
  const total = +document
    .querySelector('p.ip')
    .innerHTML.match(/[0-9,]+/)[0]
    .replace(',', '')

  return { list, total }
}

async function getFavoritesInfo(cookies) {
  const res = await axios.get(favoritesURL, { headers: { Cookie: cookies } })
  const document = new JSDOM(res.data).window.document
  return await parseFavoritesSettingInfo(document)
}
module.exports = { getFavorites, getFavoritesInfo }
