const { uniq } = require('lodash')
const moment = require('moment')
const { GalleryMode } = require('../constant')

/**
 * @param {Document} document
 * @param {int} mode
 */
function parseGalleryList(document, mode) {
  const res = []
  let total = 0

  if (mode === GalleryMode.FrontPage || mode === GalleryMode.Favorites)
    total = parseInt(
      document.querySelector('p.ip').textContent.replace(/[^0-9]/g, '')
    )
  if (mode === GalleryMode.Watched)
    total = parseInt(
      document.querySelectorAll('p.ip')[1].textContent.replace(/[^0-9]/g, '')
    )
  Array.from(document.querySelectorAll('.itg > tbody > tr'))
    .slice(1)
    .forEach((tr) => {
      try {
        const title = tr.querySelector('.glink').textContent
        const category = tr.querySelector('.cn').textContent
        const posted =
          moment.utc(tr.querySelector('[id^=posted_]').textContent).unix() *
          1000

        const rating = _parseRating(
          tr.querySelector('.ir').getAttribute('style')
        )

        const url = tr
          .querySelector('.glink')
          .parentElement.getAttribute('href')
        const uploader =
          mode === GalleryMode.Favorites
            ? ''
            : tr.querySelector('.gl4c a').textContent
        const filecount = parseInt(
          tr.querySelector('.glthumb').textContent.match(/:\d\d(\d+) pages/)[1]
        )
        const gid = _parseUrl(url)[0]
        const token = _parseUrl(url)[1]
        const thumb =
          tr.querySelector('.glthumb img').getAttribute('data-src') ||
          tr.querySelector('.glthumb img').getAttribute('src')
        res.push({
          gid,
          token,
          posted,
          title,
          category,
          rating,
          uploader,
          filecount,
          thumb,
        })
      } catch (e) {
        console.error(e)
      }
    })
  if (mode === GalleryMode.Popular) total = res.length
  return { list: res, total }
}

/**
 * @param {string} style
 * @return {number}
 */
function _parseRating(style) {
  let rating = 5.0
  const re = RegExp(/(-?\d+)px (-?\d+)px/)
  const res = style.match(re)
  const left = parseFloat(res[1])
  const top = parseFloat(res[2])
  rating += left / 16
  rating += top === -21 ? -0.5 : 0

  return rating
}

/**
 * @param { string } url
 * @returns {[string, string]}
 */
function _parseUrl(url) {
  const res = url.split('/').filter((element) => element !== '')
  const gid = res[res.length - 2]
  const token = res[res.length - 1]
  return [gid, token]
}
/**
 * 解析并去重url
 */
async function parseHTMLAnchorElement(document) {
  const as = document.querySelectorAll('a[href*=".org/g/"]')
  const pathnameList = Array.from(as)
    .map((a) => a.href)
    .map((url) => new URL(url).pathname.slice(3, -1))
  return uniq(pathnameList).map((pathname) => pathname.split('/'))
}

function parseDetailPageList(document) {
  const gdts = document
    .getElementById('gdt')
    .querySelectorAll('div[class^="gdt"')
  const filecount = parseInt(
    document
      .querySelector('#gdd table tr:nth-of-type(6) .gdt2')
      .textContent.replace(/[^0-9]/g, '')
  )
  return {
    list: Array.from(gdts).map((gdt) => {
      const aEl = gdt.querySelector('a')
      const imgEl = gdt.querySelector('img')

      return { thumb: imgEl.src, url: aEl.href }
    }),
    total: filecount,
  }
}

function parseDetailPageCommentList(document) {
  const divs = document.querySelectorAll('#cdiv .c1')

  if (divs.length === 0) return []

  return Array.from(divs).map((c1) => {
    const res = {}
    const c3 = c1.querySelector('.c3') // time + name
    const c5 = c1.querySelector('.c5 [id^=comment]') //  score
    const c6 = c1.querySelector('.c6') // comment
    const [, time, name] = c3.textContent
      ? c3.textContent.match(/Posted on (.*?)by:(.*)/).map((v) => v.trim())
      : []
    res.time = moment(new Date(time)).format('YYYY-MM-DD HH:mm')
    res.userName = name
    res.score = c5 ? c5.textContent : ''

    res.comment = c6.innerHTML
    return res
  })
}

function parseDetailPageTagList(document) {
  const trs = document.querySelectorAll('#taglist tr')

  if (trs.length === 0) return []
  return Array.from(trs).map((tr) => {
    const res = {}

    // parse tag Category
    res.namespace = tr.childNodes[0].innerHTML.slice(0, -1)
    res.tags = Array.from(tr.childNodes[1].children).map((div) => {
      const name = div.textContent
      const keyword = res.namespace + ':' + name
      const dash = div.className === 'gtl'
      return { name, keyword, dash }
    })
    return res
  })
}

/**
 * @param { Document } document
 * @param { string } html
 */
function parseDetailPageInfo(document, html) {
  const rating_count = document.getElementById('rating_count').textContent

  let favoritelink = document.getElementById('favoritelink').textContent
  if (favoritelink.includes('Add to Favorites')) favoritelink = ''

  const favcount = document
    .getElementById('favcount')
    .textContent.replace(/[^0-9]/g, '')

  const gid = html.match(/var gid = (\d+);/)[1]
  const token = html.match(/var token = "(.*)";/)[1]
  const rating = html.match(/var average_rating = ([0-9.]+)?;/)[1]
  const thumb = html.match(/background:transparent url\((.*?)\)/)[1]
  const category = document.querySelector('#gdc div').textContent
  const title = document.querySelector('#gn').textContent
  const title_jpn = document.querySelector('#gj').textContent || title
  const uploader = document.querySelector('#gdn a').textContent
  const posted =
    moment
      .utc(
        document.querySelector('#gdd table tr:nth-of-type(1) .gdt2').textContent
      )
      .unix() * 1000
  const language = document
    .querySelector('#gdd table tr:nth-of-type(4) .gdt2')
    .textContent.trim()
  const filesize = document.querySelector('#gdd table tr:nth-of-type(5) .gdt2')
    .textContent
  const filecount = document
    .querySelector('#gdd table tr:nth-of-type(6) .gdt2')
    .textContent.replace(/[^0-9]/g, '')
  const torrentcount = document
    .querySelector('#gd5 p:nth-of-type(3) a')
    .textContent.replace(/[^0-9]/g, '')
  return {
    gid,
    token,
    title,
    title_jpn,
    thumb,
    posted,
    category,
    uploader,
    url: `https://exhentai.org/g/${gid}/${token}`,
    language,
    filesize,
    filecount,
    torrentcount,
    rating,
    rating_count,
    favcount,
    favoritelink,
  }
}
/**
 * @param {Document} document
 */
function parseBigImg(document) {
  const retryURL = document
    .getElementById('loadfail')
    .getAttribute('onclick')
    .match(/'(.*)'/)[1]
  return { url: document.getElementById('img').src, retryURL }
}

/**
 * @param { Document } document
 */
function parseTorrentList(document) {
  const tables = document.querySelectorAll('table')
  if (tables.length === 0) return []
  const list = Array.from(tables)
    .map((table) => {
      try {
        const trs = table.querySelectorAll('tr')
        const tr0tds = trs[0].querySelectorAll('td')
        const info = {}
        Array.from(tr0tds).forEach((td) => {
          const str = td.textContent
          if (str !== '') {
            const [key, value] = getKV(str)
            if (key.toLowerCase() === 'downloads') info[key] = value
          }
        })
        const tr1td0 = trs[1].querySelector('td')
        const [key, value] = getKV(tr1td0.textContent)
        info[key] = value
        const a = trs[2].querySelector('a')
        info.url = a.href
        info.name = a.textContent
        info.hash = a.href.split('/').pop().split('.').shift()
        return info
      } catch (e) {
        return null
      }
    })
    .filter((v) => v)
  return list
}

/**
 * @param { string } str
 */
function getKV(str) {
  return str
    .replace(/:/, '=')
    .split('=')
    .map((v) => v.trim())
}

module.exports = {
  parseGalleryList,
  parseHTMLAnchorElement,
  parseDetailPageList,
  parseDetailPageCommentList,
  parseDetailPageTagList,
  parseDetailPageInfo,
  parseBigImg,
  parseTorrentList,
}
