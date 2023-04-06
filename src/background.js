// 'use strict'

import {app, protocol, BrowserWindow, ipcMain} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const remote = require("@electron/remote/main")
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
remote.initialize()

import "./render/createWin"

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 900,
    minHeight: 700,
    title: "Electron射孔软件",
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      // nodeIntegration: true,
      // contextIsolation:false,
      enableRemoteModule: true,
    }
  })

  //子窗口向父窗口传递数据
  ipcMain.on("send-data-to-main", (e, data, winId)=>{
    win.webContents.send("send-data-to-child", {...data});
    if(winId) BrowserWindow.fromId(winId).destroy();
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
