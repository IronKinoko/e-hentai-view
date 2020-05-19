import Axios from 'axios'
import Err from './err'
import * as api from './api'
import { uniq } from 'lodash'
import moment from 'moment'
export const baseURL = 'https://exhentai.org/'
const axios = Axios.create({
  baseURL,
  withCredentials: true,
})
interface IndexListSearchPorps {
  page?: number
  f_search?: string
}
export async function IndexList({ page, f_search }: IndexListSearchPorps) {
  let res = await axios.get(`?page=${page}&f_search=${f_search}`)
  let html = res.data as string
  let document = new DOMParser().parseFromString(html, 'text/html')
  let list: IndexListItemPorps[]
  let total = 0
  if (document.body.innerHTML === '') {
    return Err.error('no login', { list: [], total: 0, totalPage: 1 })
  }

  if (document.body.innerHTML.includes('No hits found')) {
    return Err.success('no hits found', { list: [], total: 0, totalPage: 1 })
  }
  try {
    list = await parseHTMLAnchorElement(document)
    total = +document
      .querySelector('p.ip')!
      .innerHTML.match(/[0-9,]+/)![0]
      .replace(',', '')
    if (list.length === 0) throw new Error('parse faild')
  } catch (e) {
    console.error(e)
    list = []
  }
  return Err.success('', {
    list,
    total: total,
    totalPage: Math.ceil(total / 25),
  })
}

export interface commentListItemProps {
  time: string
  userName: string
  comment: string
  score: string
}
export interface tagListItemProps {
  name: string
  tags: { name: string; keyword: string; dash: boolean }[]
}

export async function DetailPage(
  gid: string,
  token: string,
  filecount: string,
) {
  let list: DetailPageListItemProps[] = []
  let commentList: commentListItemProps[] = []
  let tagList: tagListItemProps[] = []
  for (let index = 0; index < Math.ceil(+filecount / 20); index++) {
    let res = await axios.get(`g/${gid}/${token}?p=${index}`)
    let html = res.data as string
    let document = new DOMParser().parseFromString(html, 'text/html')
    list = [...list, ...parseDetailPageList(document)]
    index === 0 && (commentList = parseDetailPageCommentList(document))
    index === 0 && (tagList = parseDetailPageTagList(document))
  }
  return { list, commentList, tagList }
}

export async function LoadImg(url: string) {
  let res = await axios.get(url)
  let html = res.data as string
  let document = new DOMParser().parseFromString(html, 'text/html')
  return parseBigImg(document)
}
export enum Category {
  Doujinshi = 'Doujinshi',
  Manga = 'Manga',
  'Non-H' = 'Non-H',
}
export interface IndexListItemPorps {
  gid: string
  token: string
  archiver_key: string
  title: string
  title_jpn: string
  category: Category
  thumb: string
  uploader: string
  posted: string
  filecount: string
  filesize: number
  expunged: boolean
  rating: string
  torrentcount: string
  tags: string[]
  url: string
  time: string
  path: string
}

/**
 * 解析并去重url
 */
async function parseHTMLAnchorElement(document: Document) {
  let as = document.querySelectorAll<HTMLAnchorElement>('a[href*=".org/g/"]')
  let pathnameList = Array.from(as)
    .map((a) => a.href)
    .map((url) => new URL(url).pathname.slice(3, -1))
  let gidlist = uniq(pathnameList).map((pathname) => pathname.split('/'))
  return (await api.gdata(gidlist)).data.gmetadata.map((o) => {
    o.url = `https://exhentai.org/g/${o.gid}/${o.token}`
    o.path = `/${o.gid}/${o.token}`
    return o
  })
}
export interface DetailPageListItemProps {
  thumb: string
  url: string
}
function parseDetailPageList(document: Document): DetailPageListItemProps[] {
  let gdts = document
    .getElementById('gdt')!
    .querySelectorAll<HTMLDivElement>('div[class^="gdt"')
  return Array.from(gdts).map((gdt) => {
    let aEl = gdt.querySelector<HTMLAnchorElement>('a')!
    let imgEl = gdt.querySelector<HTMLImageElement>('img')!
    aEl.href
    return { thumb: imgEl.src, url: aEl.href }
  })
}

function parseBigImg(document: Document) {
  let target = document.getElementById('img') as HTMLImageElement
  return target.src
}

function parseDetailPageCommentList(
  document: Document,
): commentListItemProps[] {
  let divs = document.querySelectorAll<HTMLDivElement>('#cdiv .c1')

  if (divs.length === 0) return []
  return Array.from(divs).map((c1) => {
    let res = {} as commentListItemProps
    let c3 = c1.querySelector<HTMLDivElement>('.c3')! // time + name
    let c5 = c1.querySelector<HTMLDivElement>('.c5 [id^=comment]') //  score
    let c6 = c1.querySelector<HTMLDivElement>('.c6')! // comment
    let [_, time, name] = c3.innerText
      .match(/Posted on (.*?)by:(.*)/)!
      .map((v) => v.trim())
    res.time = moment(new Date(time)).format('YYYY-MM-DD HH:mm')
    res.userName = name
    res.score = c5 ? c5.innerText : 'Uploader Comment'
    res.comment = c6.innerHTML
    return res
  })
}

function parseDetailPageTagList(document: Document): tagListItemProps[] {
  let trs = document.querySelectorAll<HTMLTableRowElement>('#taglist tr')!

  if (trs.length === 0) return []
  return Array.from(trs).map((tr) => {
    let res = {} as tagListItemProps

    // parse tag Category
    res.name = (tr.childNodes[0] as HTMLTableDataCellElement).innerHTML
    res.tags = (Array.from(
      (tr.childNodes[1] as HTMLTableDataCellElement).children,
    ) as HTMLDivElement[]).map((div) => {
      let name = div.innerText,
        keyword = res.name + name,
        dash = div.className === 'gtl' ? true : false
      return { name, keyword, dash }
    })
    return res
  })
}
