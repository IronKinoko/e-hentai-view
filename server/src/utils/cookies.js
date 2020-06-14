const Cookie = require('jsdom').toughCookie.Cookie
function getCookieString(obj) {
  const arr = []
  Object.entries(obj).forEach(([key, value]) => {
    arr.push(`${key}=${value}`)
  })
  return arr.join('; ')
}

function parseCookieToJSON(arr = []) {
  const res = {}
  arr.forEach((cookieString) => {
    const cookie = Cookie.parse(cookieString)
    res[cookie.key] = cookie.value
  })
  return res
}

module.exports = { getCookieString, parseCookieToJSON }
