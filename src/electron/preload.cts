const electron = require("electron");

electron.contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback) => {
    ipcOn('statistics', (stats: any) => {
      callback(stats);
    });
  },
  getStaticData: () => ipcInvoke('getStaticData'),
  minimize: () => electron.ipcRenderer.send('minimize-window'),
  maximize: () => electron.ipcRenderer.send('maximize-window'),
  close: () => electron.ipcRenderer.send('close-window')
} satisfies Window["electron"]);

function ipcInvoke<key extends keyof EventPayLoadMapping>(key: key): Promise<EventPayLoadMapping[key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<key extends keyof EventPayLoadMapping>(key: key, callback: (payload: EventPayLoadMapping[key]) => void) {
  electron.ipcRenderer.on(key, (_: any, payload: any) => callback(payload));
}