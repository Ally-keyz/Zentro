import { useEffect, useState  } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css'

function App() {
  type StatData = {
    CpuUsage : number ,
    name : string
  }

  type ramData = {
    RamUsage: number,
    name : string
  }
  //data preparation
  
  const [statisticsData , setStatisticsData] = useState<StatData[]>([])
  const [ramData , setRamData] = useState([])
  useEffect(()=>{
    const unsub = window.electron.subscribeStatistics((stats : {CpuUsage : number})=> {
    const newStats : StatData  = {
      ...stats,
      name : new Date().toLocaleTimeString()
    }

    setStatisticsData(prev => [...prev , newStats].slice(-20))
    console.log(newStats)
  })
    return unsub
  },[])

  return (
    <>
    <div className="p-5 h-screen w-screen bg-gray-800">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
        
        <div className="p-5 rounded-xl bg-gray-900">
          <h2 className='text-white font-mono'>CPU</h2>
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
        <div className="p-5 rounded-xl bg-white"></div>
        <div className="p-5 rounded-xl bg-white"></div>
        <div className="p-5 rounded-xl bg-white"></div>
      </div>
    </div>
    </>
  )
}

export default App
