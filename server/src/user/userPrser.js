const jsdom = require('jsdom')
/**
 * @param {string} html
 */
function parseLogin(html) {
  const re = /You are now logged in as: (.*?)<br \/>/
  const arr = html.match(re)
  const re2 = /The captcha was not entered correctly. Please try again./
  if (re2.test(html)) {
    throw new Error(
      'The captcha was not entered correctly. Please use cookie login'
    )
  }

  if (arr !== null && arr.length > 1) {
    return `You are now logged in as: ${arr[1]}`
  }
  throw new Error('login faild')
}

function parseCookieLogin(html) {
  const document = new jsdom.JSDOM(html, {
    virtualConsole: new jsdom.VirtualConsole(),
  }).window.document
  return `You are now logged in as: ${
    document.querySelector('.home a').innerHTML
  }`
}

module.exports = { parseLogin, parseCookieLogin }
