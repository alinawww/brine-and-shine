export const COMPATIBILITY: Record<string, {
  salt: string[]
  vinegar: string[]
  note: string
}> = {
  cucumber: {
    salt: ['garlic', 'greenBean', 'cabbage', 'radish'],
    vinegar: ['redOnion', 'carrot', 'bellPepper', 'jalapeno'],
    note: 'Classic dill pickle companions',
  },
  carrot: {
    salt: ['greenBean', 'cauliflower', 'radish', 'beet'],
    vinegar: ['jalapeno', 'redOnion', 'cauliflower', 'bellPepper'],
    note: 'Mixed veg pickles — hold their crunch together',
  },
  jalapeno: {
    salt: ['garlic', 'carrot', 'radish'],
    vinegar: ['carrot', 'redOnion', 'cauliflower', 'bellPepper'],
    note: 'Escabeche-style — classic Mexican mixed pickle',
  },
  redOnion: {
    salt: ['beet', 'cabbage', 'radish'],
    vinegar: ['carrot', 'bellPepper', 'cucumber', 'jalapeno'],
    note: 'Adds sweetness and colour to any mixed jar',
  },
  beet: {
    salt: ['cabbage', 'carrot', 'redOnion', 'radish'],
    vinegar: ['carrot', 'redOnion'],
    note: 'Turns everything in the jar a beautiful magenta',
  },
  greenBean: {
    salt: ['cucumber', 'carrot', 'cauliflower', 'garlic'],
    vinegar: ['carrot', 'cauliflower', 'bellPepper'],
    note: 'Classic mixed veg — holds its snap alongside other firm veg',
  },
  cauliflower: {
    salt: ['carrot', 'greenBean', 'beet', 'radish'],
    vinegar: ['carrot', 'jalapeno', 'bellPepper', 'redOnion'],
    note: 'Romanian murături-style — great in mixed winter jars',
  },
  radish: {
    salt: ['carrot', 'cucumber', 'beet', 'greenBean'],
    vinegar: ['carrot', 'redOnion', 'jalapeno'],
    note: 'Adds peppery depth and visual contrast',
  },
  cabbage: {
    salt: ['carrot', 'beet', 'radish', 'redOnion'],
    vinegar: ['carrot', 'redOnion'],
    note: 'Curtido and kimchi-style — ferments well with root veg',
  },
  garlic: {
    salt: ['cucumber', 'greenBean', 'carrot', 'cauliflower'],
    vinegar: ['jalapeno', 'carrot', 'asparagus'],
    note: 'Flavour enhancer — works with almost everything',
  },
  asparagus: {
    salt: ['garlic', 'greenBean', 'carrot'],
    vinegar: ['garlic', 'carrot', 'bellPepper'],
    note: 'Best in elegant mixed jars — pairs with firm veg',
  },
  bellPepper: {
    salt: ['carrot', 'cauliflower', 'greenBean'],
    vinegar: ['jalapeno', 'redOnion', 'carrot', 'cauliflower'],
    note: 'Adds sweetness and colour — great in antipasto-style jars',
  },
}
