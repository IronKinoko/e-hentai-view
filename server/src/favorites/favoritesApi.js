const axios = require('../axios')
const { favoritesURL, favoritesApiURL } = require('../config/api')
const JSDOM = require('jsdom').JSDOM
const { parseHTMLAnchorElement } = require('../gallery/galleryParser')
const { parseFavoritesSettingInfo } = require('./favoritesPaeser')
const { gdata } = require('../gallery/galleryApi')
const qs = require('qs')
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
  const total = +document.querySelector('p.ip').innerHTML.replace(/[^0-9]/g, '')

  return { list, total }
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
