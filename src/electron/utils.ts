import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUiPath } from "./pathResolver.js";
import { pathToFileURL } from 'url'

export function isDev():boolean {
    return process.env.NODE_ENV ==="development";
}


export function ipcHandle <key extends keyof EventPayLoadMapping> (key:key , handler : 
    ()=> EventPayLoadMapping[key]){
    ipcMain.handle(key , (event)=>{ 
        event.senderFrame?.url == getUiPath();
         return handler();
    })
}


export function ipcWebContentsSend <key extends keyof EventPayLoadMapping> (key:key , webContents:WebContents ,
     payload:EventPayLoadMapping[key]){
        webContents.send(key , payload)
}

export function validateEventFrame(frame:WebFrameMain){
    if (isDev() && new URL(frame.url).host === 'localhost:5123'){
        return
    }if ( frame.url !== pathToFileURL(getUiPath()).toString()){
        throw new Error('Malicious event')
    }

}


