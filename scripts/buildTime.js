const path = require('path')
const pkg = require('../package.json')
const fs = require('fs')
pkg.buildTime = +new Date()

const rPath = (filePath) => path.resolve(__dirname, filePath)

fs.writeFileSync(rPath('../package.json'), JSON.stringify(pkg, null, 2))
