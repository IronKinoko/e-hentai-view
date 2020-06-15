const axios = require('../axios')
const { baseApiURL, baseURL } = require('../config/api')
const {
  parseHTMLAnchorElement,
  parseDetailPageCommentList,
  parseDetailPageList,
  parseDetailPageTagList,
  parseBigImg,
} = require('./galleryParser')
const JSDOM = require('jsdom').JSDOM
const moment = require('moment')
const filesize = require('filesize')
const translated = require('../utils/translated')
const { chunk } = require('lodash')
async function gdata(gidlist, cookies) {
  if (gidlist.length === 0) return []
  const taskList = []
  chunk(gidlist, 25).forEach((gidlist) =>
    taskList.push(
      axios.post(
        baseApiURL,
        {
          method: 'gdata',
          gidlist,
        },
        {
          headers: {
            Cookie: cookies,
          },
        }
      )
    )
  )

  const res = (await Promise.all(taskList))
    .map((res) => {
      res.data.gmetadata.forEach((o) => {
        if (o.error)
          throw new Error('[404]Key missing, or incorrect key provided.')
        o.time = moment(+o.posted * 1000).format('YYYY-MM-DD HH:mm')
        o.title_jpn = o.title_jpn || o.title
        o.category = o.category.replace(/\s/, '_')
        o.filesize = filesize(+o.filesize)
        o.url = `${baseURL}/g/${o.gid}/${o.token}`
        o.path = `/${o.gid}/${o.token}`
      })
      return res.data.gmetadata
    })
    .reduce((prev, next) => [...prev, ...next], [])

  return res
}

async function galleryList({ page, f_search }, cookies) {
  const res = await axios.get(`${baseURL}`, {
    headers: {
      Cookie: cookies,
    },
    params: { page, f_search },
  })
  const document = new JSDOM(res.data).window.document
  let list = []
  let total = 0
  if (document.body.innerHTML === '') {
    throw new Error(
      '[sad panda] login cookie incorrect, try to sign in with cookie'
    )
  }

  if (document.body.innerHTML.includes('No hits found')) {
    return { list: [], total: 0 }
  }

  try {
    const gidlist = await parseHTMLAnchorElement(document)
    list = await gdata(gidlist, cookies)
    total = +document
      .querySelector('p.ip')
      .innerHTML.match(/[0-9,]+/)[0]
      .replace(',', '')
    if (list.length === 0) throw new Error('parse faild')
  } catch (error) {
    console.error(error)
  }

  return { list, total }
}

async function galleryDetail({ gid, token }, cookies) {
  let list = []
  let commentList = []
  let tagList = []

  const res = await axios.get(`${baseURL}/g/${gid}/${token}?p=0`, {
    headers: { Cookie: cookies },
  })
  const document = new JSDOM(res.data).window.document
  if (document.body.textContent === 'Key missing, or incorrect key provided.')
    throw new Error('[404]Key missing, or incorrect key provided.')
  list = parseDetailPageList(document)
  commentList = parseDetailPageCommentList(document)
  tagList = parseDetailPageTagList(document)

  tagList = translated(tagList)

  return { list, commentList, tagList }
}
async function galleryDetailPage({ gid, token, p }, cookies) {
  const res = await axios.get(`${baseURL}/g/${gid}/${token}?p=${p}`, {
    headers: { Cookie: cookies },
  })
  const document = new JSDOM(res.data).window.document
  return parseDetailPageList(document)
}
async function loadImg(url, cookies) {
  let count = 0
  async function load() {
    try {
      const res = await axios.get(url, { headers: { Cookie: cookies } })
      const document = new JSDOM(res.data).window.document
      return parseBigImg(document)
    } catch (error) {
      if (count++ > 3) return ''
      return await load()
    }
  }
  return await load()
}

module.exports = {
  gdata,
  galleryList,
  galleryDetail,
  loadImg,
  galleryDetailPage,
}
