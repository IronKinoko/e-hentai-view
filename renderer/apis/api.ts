import Axios, { AxiosResponse } from 'axios'
import * as Page from './page'
import moment from 'moment'
import filesize from 'filesize'
const baseURL = 'https://exhentai.org/api.php'
const axios = Axios.create({
  baseURL,
})

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

export async function gtoken() {
  return await axios.post('', {
    method: 'gtoken',
    pagelist: [[1633855, 'c18a8de667', 3]],
  })
}
export async function glist() {
  return await axios.post('', {
    method: 'showpage',
    gid: 618395,
    page: 1,
    imgkey: '1463dfbc16',
    showkey: '387132-43f9269494',
  })
}
