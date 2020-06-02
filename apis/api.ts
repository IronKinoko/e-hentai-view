import Axios, { AxiosResponse } from 'axios'
const baseURL = 'https://e-hentai-node.du.r.appspot.com'
export const axios = Axios.create({
  baseURL,
  withCredentials: true,
})

export type UserPayload = {
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

export async function loadImg(url: string) {
  const img = sessionStorage.getItem(url)
  if (img) return img

  const res = await axios.get<{ url: string }>('/api/gallery/loadImg', {
    params: { url },
  })
  sessionStorage.setItem(url, res.data.url)
  return res.data.url
}
