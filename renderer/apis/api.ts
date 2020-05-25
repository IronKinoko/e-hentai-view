import Axios from 'axios'
import * as Page from './page'
import moment from 'moment'
const baseURL = 'https://exhentai.org/api.php'
const axios = Axios.create({
  baseURL,
})

export type GidList = string[][]
export interface GdataRes {
  gmetadata: Page.IndexListItemPorps[]
}
export async function gdata(gidlist: GidList) {
  let res = await axios.post<GdataRes>('', {
    method: 'gdata',
    gidlist,
  })
  res.data.gmetadata.forEach((o) => {
    o.time = moment(+o.posted * 1000).format('YYYY-MM-DD HH:mm')
    o.title_jpn = o.title_jpn || o.title
    o.category = o.category.replace(/\s/, '_') as Page.Category
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
