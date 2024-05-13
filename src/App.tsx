import './index.css'
import { chestLogParser } from './aoChestLogParser'
import { useState } from 'react'
function App() {

  const [chestLog, setChestLog] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChestLog(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center gap-2">
        <h1 className="text-3xl">AOChestItemCounter</h1>
        <input className="text-xl border border-black p-4" placeholder='Paste the chest logs here...' onChange={handleChange} />
        <button className="border border-black p-4" onClick={() => chestLogParser(chestLog)}>Submit</button>
      </div>
    </>
  )
}

export default App
