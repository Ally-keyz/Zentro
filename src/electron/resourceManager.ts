import osUtils from "os-utils"
import fs from "fs"
import os  from 'os'
import { BrowserWindow } from "electron";
const POLLING_INTERVAL:number = 500;


export function pollResource(mainWindow: BrowserWindow) {
    setInterval(async () => {
       const CpuUsage = await getCpuResource()
       const RamUsage = getRamUsage()
       const storageData = getStorageData()
       mainWindow.webContents.send('statistics',{CpuUsage , RamUsage , storageData})
    }, POLLING_INTERVAL);
}

export function getStaticData():any{
    const totalStorage = getStorageData().total;
    const freeSpace = getStorageData().free
    const cpuModel = os.cpus()[0].model
    const totalStorageMBS = Math.floor(osUtils.totalmem() / 1024)

    return {
        totalStorage ,
        freeSpace ,
        cpuModel ,
        totalStorageMBS
    }

}

function getCpuResource():any {
    return new Promise((resolve)=>{
       osUtils.cpuUsage(resolve)
    })
}

function getRamUsage():any{
    return 1- osUtils.freememPercentage()
}

function getStorageData():any {

    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/')
    const total = stats.bsize * stats.blocks
    const free = stats.bsize * stats.bfree

    return {
        total : Math.floor(total / 1_000_000_000),
        free:free,
        usage : 1 - free / total
    }

}