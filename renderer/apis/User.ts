import Axios from 'axios'
import qs from 'qs'
import Err from './err'

const baseURL = 'https://forums.e-hentai.org/index.php'
export type UserPayload = {
  UserName: string
  PassWord: string
}
const axios = Axios.create({
  baseURL,
})
export async function login(payload: UserPayload) {
  let res = await axios('?act=Login&CODE=01', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      referer: 'https://forums.e-hentai.org/index.php?',
      b: '',
      bt: '',
      CookieDate: 1,
      ...payload,
    }),
  })
  let html = <string>res.data
  let re = /You are now logged in as: (.*?)<br \/>/
  let arr = html.match(re)

  if (arr !== null && arr.length > 1) {
    await axios.get('https://exhentai.org/uconfig.php')
    return Err.success(`You are now logged in as: ${arr[1]}`, {})
  } else {
    return Err.error('login faild', {})
  }
}

export async function logout() {
  let res = await axios.get('?', {})
  let html = <string>res.data
  let re = /var ipb_md5_check\s*=\s*"(.*?)";/
  let arr = html.match(re)
  let k = ''
  if (arr !== null && arr.length > 1) {
    k = arr[1]
    await axios.get('', { params: { act: 'Login', CODE: '03', k } })
  } else {
    window.alert('faild')
  }
}
