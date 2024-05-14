import './index.css'
import { useState } from 'react'
import { materialTierChecker, itemTierChecker, isMaterial } from './checkers'

interface Item {
  name: string,
  tier: number,
  amount?: number
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
        <button className="border border-black p-4" onClick={() => downloadCSV(chestLog)}>Download CSV</button>
      </div>
    </>
  )
}

const downloadCSV = (str: string) => {
  let log = chestLogParser(str)
  console.log(log)
}

const itemCounter = (items: Item[]): Item[] => {
  let itemCount: Item[] = []
  let itemName: Item[] = []

  for (let i = 0; i < items.length; i++) {
    if (!itemName.includes({ name: items[i].name, tier: items[i].tier })) {
      itemName.push({ name: items[i].name, tier: items[i].tier })
      itemCount.push(items[i])
      continue
    }

    for (let j = 0; j < itemCount.length; j++) {
      if (items[i].name == itemCount[j].name && items[i].tier == itemCount[j].tier) {
        itemCount[j]!.amount += items[i]!.amount
      }
    }
  }

  return items
}

const chestLogParser = (str: string): Item[] => {
  let lines = str.split('\t')
  let gear: string[] = []
  let enchantment: number[] = []
  let amount: number[] = []
  let items: Item[] = []

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
      items.push({
        name: gear[i],
        tier: enchantment[i] + itemTierChecker(gear[i]),
        amount: amount[i]
      })
    } else if (isMaterial(gear[i])) {
      items.push({
        name: gear[i],
        tier: materialTierChecker(gear[i]), amount: amount[i]
      })
    } else {
      items.push({
        name: gear[i],
        tier: enchantment[i] + itemTierChecker(gear[i]), amount: amount[i]
      })
    }
  }

  return (gearNameModifier(items))
}

const gearNameModifier = (arr: Item[]) => {
  arr.forEach((item) => {
    item.name = item.name.split(' ').slice(1).join(' ')
  })

  return arr
}

export default App
