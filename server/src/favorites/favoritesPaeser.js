/**
 * @param { Document } document
 */
function parseFavoritesSettingInfo(document) {
  const lists = document.querySelectorAll('.nosel [class=fp]')

  const total = +document
    .querySelector('p.ip')
    .innerHTML.match(/[0-9,]+/)[0]
    .replace(',', '')

  const res = Array.from(lists).map((favNode, index) => {
    const count = favNode.children[0].textContent
    const favName = favNode.children[2].textContent
    return { count, favName, index }
  })
  res.unshift({ favName: 'All', count: total, index: 'all' })
  return res
}

module.exports = { parseFavoritesSettingInfo }
