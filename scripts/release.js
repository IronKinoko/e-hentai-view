const pkg = require('../package.json')
const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const inquirer = require('inquirer')

const rPath = (filePath) => path.resolve(__dirname, filePath)

async function release() {
  const versionSplite = pkg.version.split('.').map((v) => +v)
  const patchVersion = [
    versionSplite[0],
    versionSplite[1],
    versionSplite[2] + 1,
  ].join('.')
  const minorVersion = [versionSplite[0], versionSplite[1] + 1, 0].join('.')
  const majorVersion = [versionSplite[0] + 1, 0, 0].join('.')
  const options = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: 'Version:',
      choices: [
        { name: 'patch', checked: true, value: patchVersion },
        { name: 'minor', value: minorVersion },
        { name: 'major', value: majorVersion },
      ],
    },
    {
      type: 'input',
      name: 'message',
      message: 'Commit message',
    },
  ])

  pkg.version = options.version

  fs.writeFileSync(rPath('../package.json'), JSON.stringify(pkg, null, 2))

  cp.execSync('git add .')
  cp.execSync(`git commit -m "${options.message}"`)
  cp.execSync(`git tag v${pkg.version}`)
  cp.execSync('git push')
  cp.execSync('git push origin --tags')

  console.log(`build success, version: ${pkg.name}@${pkg.version}`)
}

release()
