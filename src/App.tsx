import './index.css'
import { useState } from 'react'
import { materialTierChecker, itemTierChecker, isMaterial } from './checkers'

type Item = {
  name: string,
  tier: number,
  amount?: number
}

type Mats = {
  name: string,
  tier: number,
  enchantment: number,
  amount?: number
}

function App() {
  const [chestLog, setChestLog] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChestLog(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center gap-2 bg-[#1D2932]">
        <img className="h-40" src="https://assets.albiononline.com/assets/images/header/logo.svg?cb=2.132.1" />
        <h1 className="text-6xl font-extrabold text-white">Chest Item Counter</h1>
        <input id="log" className="text-xl border border-black p-4 focus:outline outline-offset-2 outline-[#D02C27]" placeholder='Paste the chest logs here...' onChange={handleChange} />
        <button className="bg-[#D02C27] text-xl text-white p-4" onClick={() => downloadCSV(chestLog)}>Download CSV</button>
      </div>
    </>
  )
}

const downloadCSV = (str: string) => {
  if (str == '') {
    alert("Input is empty!")
    return
  }

  let [items, materials] = chestLogParser(str)

  let mergedItem = mergeItems(items)

  let csvContent = 'Gears\r\nName,Tier,Amount\r\n'

  mergedItem.forEach(items => {
    let item = `${items.name},${items.tier},${items.amount}`
    csvContent += item + '\r\n'
  })

  csvContent += '\r\nMaterials\r\nName,Tier,Amount\r\n'

  materials.forEach(mats => {
    let mat = `${mats.name},${mats.tier + '.' + mats.enchantment},${mats.amount}`
    csvContent += mat + '\r\n'
  })

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
  hiddenElement.target = '_blank';

  //provide the name for the CSV file to be downloaded  
  hiddenElement.download = 'albion.csv';
  hiddenElement.click();
}

const mergeItems = (items: Item[]): Item[] => {
  const itemMap: { [key: string]: Item } = {}

  items.forEach(item => {
    const key = `${item.name}-${item.tier}`
    if (!itemMap[key]) {
      itemMap[key] = { ...item }
    } else {
      itemMap[key].amount! += item.amount!
    }
  });

  let filteredItem = Object.values(itemMap).filter(item => {
    return item.amount != 0
  })

  return filteredItem;
};

const chestLogParser = (str: string): [Item[], Mats[]] => {
  let lines = str.split('\t')
  let gear: string[] = []
  let enchantment: number[] = []
  let amount: number[] = []
  let items: Item[] = []
  let materials: Mats[] = []

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
    if (isMaterial(gear[i])) {
      materials.push({
        name: gear[i],
        enchantment: enchantment[i],
        tier: materialTierChecker(gear[i]),
        amount: amount[i]
      })
    } else {
      items.push({
        name: gear[i],
        tier: enchantment[i] + itemTierChecker(gear[i]),
        amount: amount[i]
      })
    }
  }

  return [gearNameModifier(items), materials]
}

const gearNameModifier = (arr: Item[]): Item[] => {
  arr.forEach((item) => {
    item.name = item.name.split(' ').slice(1).join(' ')
  })

  return arr
}

export default App
