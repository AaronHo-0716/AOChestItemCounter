import './index.css'
import { useState } from 'react'

type item = {
  type: string,
  name: string,
  tier: number,
  amount: number
}

function App() {

  const [chestLog, setChestLog] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChestLog(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center gap-2">
        <h1 className="text-3xl">AOChestItemCounter</h1>
        <input id="log" className="text-xl border border-black p-4" placeholder='Paste the chest logs here...' onChange={handleChange} />
        <button className="border border-black p-4" onClick={() => chestLogParser(chestLog)}>Submit</button>
      </div>
    </>
  )
}

const chestLogParser = (str: string): typeof items => {
  let lines = str.split('\t')
  let gear: string[] = []
  let enchantment: number[] = []
  let amount: number[] = []

  let items: item[] = []


  for (let i = 7; i < lines.length; i += 5) {
    gear.push(lines[i].replace(/"/g, ''))
  }

  for (let i = 8; i < lines.length; i += 5) {
    enchantment.push(parseInt(lines[i].replace(/"/g, '')))
  }

  for (let i = 10; i < lines.length; i += 5) {
    amount.push(parseInt(lines[i].replace(/"/g, '').split(' ')[0]))
  }

  for (let i = 0; i < gear.length; i++) {
    if (gear[i].endsWith('Cape')) {
      items.push({ type: 'Cape', name: gear[i], tier: enchantment[i] + itemTierChecker(gear[i]), amount: amount[i] })
    } else {
      items.push({ type: 'Gear', name: gear[i], tier: enchantment[i] + itemTierChecker(gear[i]), amount: amount[i] })
    }
  }

  console.log(items)

  return items
}

const itemTierChecker = (str: string): number => {
  if (str.startsWith('Novice')) {
    return 2
  } else if (str.startsWith('Journeyman')) {
    return 3
  } else if (str.startsWith('Adept')) {
    return 4
  } else if (str.startsWith('Expert')) {
    return 5
  } else if (str.startsWith('Master')) {
    return 6
  } else if (str.startsWith('Grandmaster')) {
    return 7
  } else if (str.startsWith('Elder')) {
    return 8
  } else {
    return 0
  }
}
export default App
