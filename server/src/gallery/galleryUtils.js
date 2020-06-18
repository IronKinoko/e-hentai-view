const { find } = require('lodash')
function mergerTorrents(info, torrents) {
  if (Array.isArray(info.torrents) && info.torrents.length > 0)
    info.torrents = torrents.map((o) => {
      const t = find(info.torrents, { hash: o.hash })
      return { ...t, ...o }
    })
}

module.exports = { mergerTorrents }
