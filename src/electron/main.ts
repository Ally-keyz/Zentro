import { app , BrowserWindow, ipcMain} from 'electron'
import path from 'path'
import { ipcHandle, isDev } from './utils.js'
import { getStaticData, pollResource } from './resourceManager.js';
import { getPreloadPath, getUiPath } from './pathResolver.js';



app.on('ready' , ()=>{
    const mainWindow = new BrowserWindow({
        webPreferences:{
            preload: getPreloadPath()
        }
    });
    if(isDev()){
        mainWindow.loadURL("http://localhost:5123")
    }else{
          mainWindow.loadFile(getUiPath());
    }
    
    pollResource(mainWindow);

    ipcHandle('getStaticData',()=>{
    return getStaticData();
    })
})

