const Axios = require('axios').default
const { HttpProxyAgent } = require('http-proxy-agent')
const { HttpsProxyAgent } = require('https-proxy-agent')

const axios = Axios.create({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
    withCredentials: true,
  },
  maxRedirects: 2,
  httpAgent: new HttpProxyAgent('http://192.168.31.38:10809'),
  httpsAgent: new HttpsProxyAgent('http://192.168.31.38:10809'),
  proxy: false,
})
module.exports = axios
