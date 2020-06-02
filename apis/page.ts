import Axios from 'axios'
import * as api from './api'
import { uniq } from 'lodash'
import moment from 'moment'
import jsZip from 'jszip'
import { saveAs } from 'file-saver'
import message from 'components/message'
export const baseURL = 'https://exhentai.org/'
const axios = Axios.create({
  baseURL,
  withCredentials: true,
})

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

export async function LoadImg(url: string): Promise<string> {
  try {
    let res = await axios.get(url)
    let html = res.data as string
    let document = new DOMParser().parseFromString(html, 'text/html')
    return parseBigImg(document)
  } catch (error) {
    console.error(error)
    return await LoadImg(url)
  }
}

export async function DownloadAllImg(
  {
    record,
    tagList,
  }: { record: IndexListItemPorps; tagList: tagListItemProps[] },
  list: DetailPageListItemProps[]
) {
  message.info('loading...', 1e6)
  let arr: Promise<string>[] = []
  list.forEach((o) => {
    arr.push(LoadImg(o.url))
  })
  let res = await Promise.all(arr)
  console.log(res)
  let arr2: Promise<[string, string]>[] = []
  res.forEach((o) => {
    arr2.push(getUrlBase64(o))
  })
  let base64s = await Promise.all(arr2)
  console.log(base64s)
  let zip = new jsZip()
  base64s.forEach(([base64, ext], k) => {
    zip.file(
      `${String(k).padStart(3, '0')}.${ext}`,
      base64.substring(base64.indexOf(',') + 1),
      { base64: true }
    )
  })

  zip.file(
    'info.json',
    JSON.stringify({ ...record, tagList, imgList: res }, null, 2)
  )
  zip.generateAsync({ type: 'blob' }).then((res) => {
    saveAs(res, record.title_jpn)
    message.success('download without error', 1.5e3)
  })
}
async function getUrlBase64(url: string) {
  return await new Promise<[string, string]>((resolve, reject) => {
    let ext = url.split('.').pop() || 'jpg'
    let canvas = document.createElement('canvas') // 创建canvas DOM元素
    let ctx = canvas.getContext('2d')
    let img = new Image()
    img.src = url
    img.onerror = () => {
      img.src = url + '?ts=' + Math.random()
    }
    img.onload = () => {
      canvas.width = img.width // 指定画板的高度,自定义
      canvas.height = img.height // 指定画板的宽度，自定义
      ctx!.drawImage(img, 0, 0) // 参数可自定义
      let dataURL = canvas.toDataURL()
      resolve([dataURL, ext]) // 回调函数获取Base64编码
    }
  })
}
export enum Category {
  'Doujinshi' = 'Doujinshi',
  'Manga' = 'Manga',
  'Artist_CG' = 'Artist_CG',
  'Game_CG' = 'Game_CG',
  'Western' = 'Western',
  'Non-H' = 'Non-H',
  'Image_Set' = 'Image_Set',
  'Cosplay' = 'Cosplay',
  'Asian_Porn' = 'Asian_Porn',
  'Misc' = 'Misc',
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
  filesize: string
  expunged: boolean
  rating: string
  torrentcount: string
  tags: string[]
  url: string
  time: string
  path: string
}

export interface DetailPageListItemProps {
  thumb: string
  url: string
}

function parseBigImg(document: Document) {
  let target = document.getElementById('img') as HTMLImageElement
  return target.src
}
