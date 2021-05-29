import Axios from 'axios'
import Router from 'next/router'
import { DetailPageListItemProps } from '@/interface/gallery'
export const axios = Axios.create({})
// const maxQueueLength = 8
// let count = 0
// axios.interceptors.request.use((req) => {
//   return new Promise((resolve, reject) => {
//     const fn = () => {
//       if (count < maxQueueLength) {
//         count++
//         return resolve(req)
//       }
//       requestAnimationFrame(fn)
//     }
//     fn()
//   })
// })

axios.interceptors.response.use((res) => {
  // count--
  if (res.data.error && res.data.message?.includes('No login')) {
    Router.replace('/signin')
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

export interface loadImgRes {
  error: boolean
  url: string
  retryURL: string
}
export async function loadImg(url: string) {
  const res = await axios.get<loadImgRes>('/api/gallery/loadImg', {
    params: { url },
  })
  return res.data
}

export async function setting() {
  const res = await axios.post('/api/user/setting')
  return res.data
}

export async function loadMorePage(url: string) {
  const res = await axios.get<{
    error: boolean
    list: DetailPageListItemProps[]
    total: number
  }>(url)
  if (res.data.error) throw new Error('')
  return res.data.list
}
