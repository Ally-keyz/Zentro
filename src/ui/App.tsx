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
  BarChart,
  Bar,
} from 'recharts'

function App() {
  type StatData = {
    CpuUsage: number,
    RamUsage: number,
    storageData: number,
    name?: string 
  }

  const [statisticsData, setStatisticsData] = useState<StatData[]>([])

  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stat: Statistics) => {
      setStatisticsData(prev => [
        ...prev.slice(-9), // Keep only last 9 items
        {
          CpuUsage: stat.CpuUsage,
          RamUsage: stat.RamUsage,
          storageData: stat.storageData,
          name: new Date().toLocaleTimeString()
        }
      ])
    })
    return unsub // cleanup
  }, [])

  return (
    <div className="p-5 h-screen w-screen bg-gray-800 overflow-auto">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        
        {/* CPU Chart */}
        <div className="p-5 rounded-xl bg-gray-900">
          <h2 className='text-white font-mono mb-2'>CPU Usage</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={statisticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="CpuUsage" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RAM Chart */}
        <div className="p-5 rounded-xl bg-gray-900">
          <h2 className='text-white font-mono mb-2'>RAM Usage</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={statisticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="RamUsage" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Storage Bar Chart */}
        <div className="p-5 rounded-xl bg-gray-900">
          <h2 className='text-white font-mono mb-2'>Storage (Static Snapshot)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statisticsData.slice(-1)}> {/* Only show latest */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="storageData" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default App
