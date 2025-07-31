
type Statistics = {
    CpuUsage : number ,
    RamUsage : number ,
    storageData : number 
};

type staticData = {
        totalStorage : number ;
        freeSpace : number ;
        cpuModel : string ;
        totalStorageMBS : number ;
};

interface EventPayLoadMapping {
  'statistics': {
    CpuUsage: number;
    RamUsage: number;
    storageData: number;
  };
  'getStaticData': {
    cpuModel: string;
    totalStorage: number;
    freeSpace: number;
    totalStorageMBS: number;
  };
}

interface Window {
  electron: {
    subscribeStatistics: (callback: (stats: EventPayLoadMapping['statistics']) => void) => void;
    getStaticData: () => Promise<EventPayLoadMapping['getStaticData']>;
    minimize: () => void;
    maximize: () => void;
    close: () => void;
  };
}