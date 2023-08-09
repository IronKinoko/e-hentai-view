const axios = require('../axios')
const { favoritesURL, favoritesApiURL } = require('../config/api')
const JSDOM = require('jsdom').JSDOM
const { parseGalleryList } = require('../gallery/galleryParser')
const { parseFavoritesSettingInfo } = require('./favoritesPaeser')
const qs = require('qs')
const { GalleryMode } = require('../constant')
async function getFavorites({ next, favcat }, cookies) {
  let res = await axios.get(`${favoritesURL}`, {
    params: { next, favcat },
    headers: { Cookie: cookies },
  })

  let document = new JSDOM(res.data).window.document

  const mode = document.querySelector('[selected="selected"]').textContent

  if (mode !== 'Compact') {
    res = await axios.get(`${favoritesURL}`, {
      params: { next, favcat, inline_set: 'dm_l' },
      headers: { Cookie: cookies },
    })
    document = new JSDOM(res.data).window.document
  }

  if (document.body.innerHTML.includes('No hits found')) {
    return { list: [], total: 0 }
  }

  return parseGalleryList(document, GalleryMode.Favorites)
}

async function getFavoritesInfo(cookies) {
  const res = await axios.get(favoritesURL, { headers: { Cookie: cookies } })
  const document = new JSDOM(res.data).window.document
  return await parseFavoritesSettingInfo(document)
}

async function updateFavorite({ gid, token, favcat }, cookies) {
  await axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: cookies,
    },
    method: 'POST',
    url: favoritesApiURL,
    params: { gid, t: token, act: 'addfav' },
    data: qs.stringify({
      favcat,
      favnote: '',
      update: 1,
    }),
  })
}

module.exports = { getFavorites, getFavoritesInfo, updateFavorite }
