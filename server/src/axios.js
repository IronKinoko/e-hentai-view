const Axios = require('axios').default

const axios = Axios.create({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',

    withCredentials: true,
  },
  maxRedirects: 0,
})

module.exports = axios
