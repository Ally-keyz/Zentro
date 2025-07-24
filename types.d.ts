
type Statistics = {
    CpuUsage : number ;
    RamUsage : number ;
    storageData : number ;
};

type staticData = {
        totalStorage : number ;
        freeSpace : number ;
        cpuModel : string ;
        totalStorageMBS : number ;
};


interface Window {
    electron :{
        subscribeStatistics : (callback : (statistics : Statistics) => void) => void;
        getStaticData:() => Promise<staticData>;
    }
}