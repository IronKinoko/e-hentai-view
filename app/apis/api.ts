import Axios from 'axios'
import Router from 'next/router'
import { DetailPageListItemProps } from 'interface/gallery'
export const axios = Axios.create({})
const maxQueueLength = 6
let count = 0
axios.interceptors.request.use((req) => {
  return new Promise((resolve, reject) => {
    const fn = () => {
      if (count < maxQueueLength) {
        count++
        return resolve(req)
      }
      requestAnimationFrame(fn)
    }
    fn()
  })
})

axios.interceptors.response.use((res) => {
  count--
  if (res.data.error && res.data.message.includes('[404]')) {
    Router.replace('/404')
  }
  return res
})

export type UserPayload = {
  UserName?: string
  PassWord?: string
  method?: 'cookie'
  ipb_member_id?: string
  ipb_pass_hash?: string
  igneous?: string
}
export async function login(payload: UserPayload) {
  return (
    await axios.post<{ error: boolean; message: string }>(
      '/api/user/login',
      payload
    )
  ).data
}

export async function loadImg(url: string) {
  const res = await axios.get<{ url: string }>('/api/gallery/loadImg', {
    params: { url },
  })
  return res.data.url
}

export async function setting() {
  const res = await axios.post('/api/user/setting')
  return res.data
}

export async function loadMorePage(url: string) {
  return (
    await axios.get<{
      error: boolean
      list: DetailPageListItemProps[]
    }>(url)
  ).data.list
}
