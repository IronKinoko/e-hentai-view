import Axios, { AxiosResponse } from 'axios'
import * as Page from './page'
import moment from 'moment'
import filesize from 'filesize'
const baseURL = 'https://e-hentai-node.du.r.appspot.com'
const axios = Axios.create({
  baseURL,
  withCredentials: true,
})
interface IndexListSearchPorps {
  page?: number
  f_search?: string
}
export async function galleryList({ page, f_search }: IndexListSearchPorps) {
  return (
    await axios.get<{
      list: Page.IndexListItemPorps[]
      total: number
      error: boolean
      message: string
    }>('/api/gallery', { params: { page, f_search } })
  ).data
}
type UserPayload = {
  UserName: string
  PassWord: string
}
export async function login(payload: UserPayload) {
  return (
    await axios.post<{ error: boolean; message: string }>(
      '/api/user/login',
      payload
    )
  ).data
}

interface Detailpage {
  info: Page.IndexListItemPorps
  list: Page.DetailPageListItemProps[]
  commentList: Page.commentListItemProps[]
  tagList: Page.tagListItemProps[]
}
export async function galleryDetial(path: string) {
  return (await axios.get<Detailpage>('/api/gallery' + path)).data
}

export async function loadImg(url: string) {
  return (
    await axios.get<{ url: string }>('/api/gallery/loadImg', {
      params: { url },
    })
  ).data.url
}
export type GidList = string[][]
export interface GdataRes {
  gmetadata: Page.IndexListItemPorps[]
}
export async function gdata(
  gidlist: GidList
): Promise<AxiosResponse<GdataRes>> {
  if (gidlist.length === 1) {
    let res = sessionStorage.getItem(gidlist[0][0])
    if (res !== null) return JSON.parse(res) as AxiosResponse<GdataRes>
  }
  let res = await axios.post<GdataRes>('', {
    method: 'gdata',
    gidlist,
  })
  res.data.gmetadata.forEach((o) => {
    o.time = moment(+o.posted * 1000).format('YYYY-MM-DD HH:mm')
    o.title_jpn = o.title_jpn || o.title
    o.category = o.category.replace(/\s/, '_') as Page.Category
    o.filesize = filesize(+o.filesize)
    let store = { ...res, data: { gmetadata: [o] } }
    sessionStorage.setItem(o.gid, JSON.stringify(store))
  })

  return res
}
