export const materialTierChecker = (str: string): number => {
  if (str.endsWith('Planks')) {
    switch (str.split(' ')[0]) {
      case 'Birch':
        return 2
      case 'Chestnut':
        return 3
      case 'Pine':
        return 4
      case 'Cedar':
        return 5
      case 'Bloodoak':
        return 6
      case 'Ashenbark':
        return 7
      case 'Whitewood':
        return 8
      default:
        return 0
    }
  } else if (str.endsWith('Block')) {
    switch (str.split(' ')[0]) {
      case 'Limestone':
        return 2
      case 'Sandstone':
        return 3
      case 'Travertine':
        return 4
      case 'Granite':
        return 5
      case 'Slate':
        return 6
      case 'Basalt':
        return 7
      case 'Marble':
        return 8
      default:
        return 0
    }
  } else if (str.endsWith('Leather')) {
    switch (str.split(' ')[0]) {
      case 'Stiff':
        return 2
      case 'Thick':
        return 3
      case 'Worked':
        return 4
      case 'Cured':
        return 5
      case 'Hardened':
        return 6
      case 'Reinforced':
        return 7
      case 'Fortified':
        return 8
      default:
        return 0
    }
  } else if (str.endsWith('Bar')) {
    switch (str.split(' ')[0]) {
      case 'Copper':
        return 2
      case 'Bronze':
        return 3
      case 'Steel':
        return 4
      case 'Titanium':
        return 5
      case 'Runite':
        return 6
      case 'Meteorite':
        return 7
      case 'Adamantium':
        return 8
      default:
        return 0
    }
  } else if (str.endsWith('Cloth')) {
    switch (str.split(' ')[0]) {
      case 'Simple':
        return 2
      case 'Neat':
        return 3
      case 'Fine':
        return 4
      case 'Ornate':
        return 5
      case 'Lavish':
        return 6
      case 'Opulent':
        return 7
      case 'Baroque':
        return 8
      default:
        return 0
    }
  } else {
    return 0
  }
}


export const itemTierChecker = (str: string): number => {
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

export const isMaterial = (str: string): boolean => {
  if (
    str.endsWith('Planks') ||
    str.endsWith('Block') ||
    str.endsWith('Leather') ||
    str.endsWith('Bar') ||
    str.endsWith('Cloth')) {
    return true
  } else {
    return false
  }
}
