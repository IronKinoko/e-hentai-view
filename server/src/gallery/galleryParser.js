const { uniq } = require('lodash')
const moment = require('moment')
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
  return Array.from(gdts).map((gdt) => {
    const aEl = gdt.querySelector('a')
    const imgEl = gdt.querySelector('img')

    return { thumb: imgEl.src, url: aEl.href }
  })
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
 */
function parseDetailPageOtherInfo(document) {
  const rating_count = document.getElementById('rating_count').textContent

  let favoritelink = document.getElementById('favoritelink').textContent
  if (favoritelink.includes('Add to Favorites')) favoritelink = ''

  const favcount = document
    .getElementById('favcount')
    .textContent.replace(/[^0-9]/g, '')

  return { rating_count, favcount, favoritelink }
}
function parseBigImg(document) {
  return document.getElementById('img').src
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
  parseHTMLAnchorElement,
  parseDetailPageList,
  parseDetailPageCommentList,
  parseDetailPageTagList,
  parseDetailPageOtherInfo,
  parseBigImg,
  parseTorrentList,
}
