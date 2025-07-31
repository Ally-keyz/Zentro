import { app, BrowserWindow, ipcMain } from 'electron'
import { ipcHandle, isDev } from './utils.js'
import { getStaticData, pollResource } from './resourceManager.js'
import { getPreloadPath, getUiPath } from './pathResolver.js'
import path from 'path'

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,                
    frame: false,         
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true, // for security
      nodeIntegration: false,
    }
  })

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123")
  } else {
    mainWindow.loadFile(getUiPath())
  }

  pollResource(mainWindow)

  ipcHandle('getStaticData', () => {
    return getStaticData()
  })
})
