import { useEffect, useState } from 'react'
import './App.css'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  AreaChart,
  Area,
} from 'recharts'
import { BiMinus, BiSquare, BiX } from 'react-icons/bi'
import logo from "./assets/circle.png"

function App() {
  type StatData = {
    CpuUsage: number
    RamUsage: number
    storageData: number
    name?: string
  }

  const [statisticsData, setStatisticsData] = useState<StatData[]>([])
  const [staticData, setStaticData] = useState<staticData | null>(null)


useEffect(() => {
  // Get static system data once
  window.electron.getStaticData().then((data) => {
    setStaticData(data)
  })

  // Subscribe to live statistics
  const unsub = window.electron.subscribeStatistics((stat: StatData) => {
    setStatisticsData((prev) => [
      ...prev.slice(-9),
      {
        CpuUsage: stat.CpuUsage,
        RamUsage: stat.RamUsage,
        storageData: stat.storageData,
        name: new Date().toLocaleTimeString(),
      },
    ])
  })

  return unsub
}, [])


  const latest = statisticsData[statisticsData.length - 1]

  return (
    <div className="min-h-screen w-screen bg-zinc-800 text-white overflow-auto">
      {/* Compact Header */}
      <div className="flex justify-between items-center bg-zinc-800 px-3 py-1 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Zentro" className='w-5 h-5' />
          <p className='text-white font-mono text-[13px]'>Zentro</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Compact System Stats */}
          {latest && (
            <div className="flex text-[14px] items-center space-x-3 mr-4">
              
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                  <span>CPU: {(latest.CpuUsage * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-1"></span>
                  <span>RAM: {(latest.RamUsage * 100).toFixed(0)}%</span>
                </div>
              </div>
            
          )}
          
          {/* Window Controls */}
<button 
  onClick={() => window.electron?.minimize?.()} 
  className="text-gray-300 hover:text-white p-1"
>
  <BiMinus className="w-4 h-4" />
</button>
<button 
  onClick={() => window.electron?.maximize?.()} 
  className="text-gray-300 hover:text-white p-1"
>
  <BiSquare className="w-3 h-3" />
</button>
<button 
  onClick={() => window.electron?.close?.()} 
  className="text-gray-300 hover:text-white p-1"
>
  <BiX className="w-5 h-5" />
</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 sm:gap-6">
          {/* CPU Usage Line Chart */}
          <div className="p-3 sm:p-5 rounded bg-zinc-900">
            <h2 className="text-white font-mono mb-2 text-sm sm:text-base">CPU Usage</h2>
            <ResponsiveContainer width="100%" height={150} className="text-xs">
              <LineChart data={statisticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="name" 
                  stroke="#ccc" 
                  tick={{ fontSize: 10 }}
                  tickMargin={5}
                />
                <YAxis 
                  stroke="#ccc" 
                  domain={[0, 1]} 
                  tickFormatter={(v) => `${v * 100}%`} 
                  tick={{ fontSize: 10 }}
                  width={30}
                />
                <Tooltip 
                  formatter={(v) => [`${(v as number * 100).toFixed(1)}%`, 'CPU Usage']}
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#333',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="CpuUsage" 
                  stroke="#FFA500" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* RAM Usage Area Chart */}
          <div className="p-3 sm:p-5 rounded bg-zinc-900">
            <h2 className="text-white font-mono mb-2 text-sm sm:text-base">RAM Usage</h2>
            <ResponsiveContainer width="100%" height={150} className="text-xs">
              <AreaChart data={statisticsData}>
             <defs>
             <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7b7b" stopOpacity={0.8} />
             <stop offset="95%" stopColor="#ff7b7b" stopOpacity={0} />
              </linearGradient>
             </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="#ccc" 
                  tick={{ fontSize: 10 }}
                  tickMargin={5}
                />
                <YAxis 
                  stroke="#ccc" 
                  domain={[0, 1]} 
                  tickFormatter={(v) => `${v * 100}%`} 
                  tick={{ fontSize: 10 }}
                  width={30}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <Tooltip 
                  formatter={(v) => [`${(v as number * 100).toFixed(1)}%`, 'RAM Usage']}
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#333',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="RamUsage"
                  stroke="#FF5C00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRam)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Info - Responsive Layout */}
        {staticData && (
          <div className="p-3 sm:p-4 rounded bg-red-600/30 mt-4 sm:mt-8 w-full mx-auto text-white">
            <h2 className="text-sm sm:text-lg font-mono mb-2">System Info</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div>
                <div className="text-zinc-400">CPU Model</div>
                <div className="truncate">{staticData.cpuModel}</div>
              </div>
              <div>
                <div className="text-zinc-400">Total Storage</div>
                <div>{staticData.totalStorage} GB</div>
              </div>
              <div>
                <div className="text-zinc-400">Free Storage</div>
                <div>{Math.floor(staticData.freeSpace / 1_000_000_000)} GB</div>
              </div>
              <div>
                <div className="text-zinc-400">Total RAM</div>
                <div>{staticData.totalStorageMBS} MB</div>
              </div>
            </div>
          </div>
        )}

        {/* System Stats Table - Now as a compact card */}
        {latest && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded bg-zinc-900 w-full mx-auto">
            <h2 className="text-sm sm:text-base font-mono mb-2">Current Usage</h2>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                <span>CPU:</span>
                <span className="ml-auto font-mono">{(latest.CpuUsage * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                <span>RAM:</span>
                <span className="ml-auto font-mono">{(latest.RamUsage * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>)
}

export default App
