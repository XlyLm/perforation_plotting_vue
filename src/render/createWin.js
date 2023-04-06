// const {ipcMain, BrowserWindow} = require('electron')
import {ipcMain, BrowserWindow} from 'electron'

const createWin = (title, path, data) => {
    let root_path
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        root_path = process.env.WEBPACK_DEV_SERVER_URL
    } else {
        root_path = 'app://./index.html'
    }
    const win = new BrowserWindow({
        title,
        width: 800,
        height: 700,
        resizable: false,
        parent: BrowserWindow.getFocusedWindow() || undefined,
        modal: true,
        webPreferences: {
            webviewTag: true,
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            webSecurity: false,
        },
        show: false
    })

    win.loadURL(root_path + '#/' + path);
    win.webContents.openDevTools();
    win.webContents.on('did-finish-load', function(){
        win.webContents.send('get-data', data, win.id);
    });
    win.once('ready-to-show',()=>{
        win.show();
    })
}

ipcMain.on("create-win", (e, title, path, data)=>{
    createWin(title, path, data);
})