import Axios, { AxiosResponse } from 'axios'
const baseURL =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://e-hentai-node.du.r.appspot.com'
export const axios = Axios.create({
  baseURL,
  withCredentials: true,
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
  const img = sessionStorage.getItem(url)
  if (img) return img

  const res = await axios.get<{ url: string }>('/api/gallery/loadImg', {
    params: { url },
  })
  sessionStorage.setItem(url, res.data.url)
  return res.data.url
}

export async function setting() {
  const res = await axios.post('/api/user/setting')
  return res.data
}
