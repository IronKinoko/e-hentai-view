// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  })
  mainWindow.webContents.session.cookies.on('changed', () => {
    mainWindow.webContents.session.cookies.remove(
      'https://exhentai.org/',
      'yay',
    )
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })
  winSizeEvent(mainWindow)
  mainWindow.loadURL(url)
  mainWindow.webContents.session.cookies.remove('https://exhentai.org/', 'yay')
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  event.sender.send('message', message)
})

function winSizeEvent(win: BrowserWindow) {
  win.webContents.on('new-window', function(event, url) {
    event.preventDefault()

    const newWindow = new BrowserWindow({
      width: win.getSize()[0],
      height: win.getSize()[1],
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        preload: join(__dirname, 'preload.js'),
        webSecurity: false,
      },
    })
    winSizeEvent(newWindow)
    newWindow.loadURL(url)
  })
}
