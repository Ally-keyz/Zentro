import { useEffect  } from 'react'
import './App.css'

function App() {

  useEffect(()=>{
    const unsub = window.electron.subscribeStatistics((stats)=> console.log(stats))
    return unsub
  },[])

  return (
    <>
    <div className="p-5 flex justify-center">

    </div>
    
    </>
  )
}

export default App
