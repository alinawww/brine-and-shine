export type BrineType = 'salt' | 'vinegar'
export type CardType = 'custom' | 'readymade'

export interface Ingredient {
  id: string
  name: string
  desc: string
  tags: [string, string]
  brineDefault: BrineType
  cardType: 'custom'
  suggestedSpices: string[]
}

export interface ReadyMade {
  id: string
  name: string
  region: string
  desc: string
  tags: [string, string]
  cardType: 'readymade'
  brineType: BrineType
  ingredients: string[]
  spices: string[]
  timeline: string
  proTip: string
  healthBenefits: string[]
}

export type GridItem = Ingredient | ReadyMade

export const INGREDIENTS: Ingredient[] = [
  { id: 'cucumber',    name: 'Cucumbers',    brineDefault: 'salt',    cardType: 'custom', desc: 'The undisputed king of the pickle jar. Fermented in salt brine for that classic sour crunch.', tags: ['salt brine', '3-7 days'], suggestedSpices: ['dill-seed', 'garlic-cloves', 'black-peppercorns', 'mustard-seed-yellow'] },
  { id: 'carrot',      name: 'Carrots',      brineDefault: 'vinegar', cardType: 'custom', desc: 'Pickled carrots stay satisfyingly crunchy and turn sweet-sour in a few days.', tags: ['vinegar', '5-10 days'], suggestedSpices: ['coriander-seed', 'dill-weed', 'black-peppercorns', 'fresh-ginger'] },
  { id: 'jalapeno',    name: 'Jalapeños',    brineDefault: 'vinegar', cardType: 'custom', desc: 'Mellows the heat just enough — vinegar brine keeps the personality without the punch.', tags: ['vinegar', '2-4 days'], suggestedSpices: ['garlic-cloves', 'cumin-seed', 'black-peppercorns', 'red-pepper-flakes'] },
  { id: 'redOnion',    name: 'Red Onion',    brineDefault: 'vinegar', cardType: 'custom', desc: 'Quick-pickled in vinegar — they turn a brilliant magenta in just an hour.', tags: ['vinegar', '1 hour'], suggestedSpices: ['black-peppercorns', 'dill-weed', 'allspice-berries', 'fresh-ginger'] },
  { id: 'beet',        name: 'Beets',        brineDefault: 'salt',    cardType: 'custom', desc: 'Earthy and sweet, fermented in salt brine for a deep jewel-red that stains everything in the best way.', tags: ['salt brine', '7-14 days'], suggestedSpices: ['bay-leaf', 'caraway-seed', 'allspice-berries', 'cinnamon-stick'] },
  { id: 'greenBean',   name: 'Green Beans',  brineDefault: 'salt',    cardType: 'custom', desc: '"Dilly beans" — salt-fermented, snappy, and garlicky. The pickle that disappears fastest at parties.', tags: ['salt brine', '5-7 days'], suggestedSpices: ['dill-seed', 'garlic-cloves', 'mustard-seed-yellow', 'red-pepper-flakes'] },
  { id: 'cauliflower', name: 'Cauliflower',  brineDefault: 'vinegar', cardType: 'custom', desc: 'Porous florets soak up vinegar brine like a sponge. The crunch holds for weeks.', tags: ['vinegar', '7-14 days'], suggestedSpices: ['turmeric', 'mustard-seed-black', 'coriander-seed', 'red-pepper-flakes'] },
  { id: 'radish',      name: 'Radishes',     brineDefault: 'salt',    cardType: 'custom', desc: 'Salt-fermented radishes transform dramatically — peppery raw becomes mellow, tangy, a little sweet.', tags: ['salt brine', '3-5 days'], suggestedSpices: ['dill-weed', 'turmeric', 'fresh-ginger'] },
  { id: 'cabbage',     name: 'Cabbage',      brineDefault: 'salt',    cardType: 'custom', desc: 'The soul of fermented pickling. Salt brine is the only way — sauerkraut, kimchi, curtido all start here.', tags: ['salt brine', '7-21 days'], suggestedSpices: ['caraway-seed', 'dill-seed', 'bay-leaf', 'mustard-seed-yellow'] },
  { id: 'garlic',      name: 'Garlic',       brineDefault: 'salt',    cardType: 'custom', desc: 'Salt-fermented garlic mellows from sharp and pungent into something nutty and buttery. Patience required.', tags: ['salt brine', '30+ days'], suggestedSpices: ['bay-leaf', 'fresh-ginger', 'juniper-berries', 'fennel-seed'] },
  { id: 'asparagus',   name: 'Asparagus',    brineDefault: 'vinegar', cardType: 'custom', desc: 'Elegant, crunchy spears in vinegar brine. Makes any bloody mary look like it came from a magazine.', tags: ['vinegar', '5-10 days'], suggestedSpices: ['dill-seed', 'garlic-cloves', 'dill-weed', 'black-peppercorns'] },
  { id: 'bellPepper',  name: 'Bell Peppers', brineDefault: 'vinegar', cardType: 'custom', desc: 'Sweet, tangy, vibrantly colored in vinegar brine. Great on sandwiches, in salads, straight from the jar.', tags: ['vinegar', '5-7 days'], suggestedSpices: ['coriander-seed', 'cumin-seed', 'black-peppercorns', 'red-pepper-flakes'] },
]

export const READY_MADE: ReadyMade[] = [
  {
    id: 'sauerkraut',
    name: 'Sauerkraut',
    region: 'Germany',
    desc: 'The original ferment. Shredded cabbage and salt — nothing else needed. Tangy, crunchy, alive.',
    tags: ['Eastern European', '2-4 weeks'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Green cabbage', 'Non-iodized salt'],
    spices: ['Caraway seeds (optional)', 'Juniper berries (optional)'],
    timeline: 'Ready in 2–4 weeks. Taste from day 7.',
    proTip: 'Pack the cabbage tightly — it should be fully submerged under its own brine within 24 hours.',
    healthBenefits: [
      'Rich in lactobacillus bacteria that support gut health',
      'High in vitamin C and K',
      'Fermentation increases bioavailability of nutrients',
      'May support immune function and digestion',
    ],
  },
  {
    id: 'kimchi',
    name: 'Kimchi',
    region: 'Korea',
    desc: "Korea's living treasure. Napa cabbage fermented with gochugaru, garlic, and ginger into something deeply complex.",
    tags: ['Korean', '1-2 weeks'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Napa cabbage', 'Korean radish', 'Green onions', 'Fish sauce or soy sauce'],
    spices: ['Gochugaru (Korean chili flakes)', 'Garlic', 'Ginger', 'Sesame seeds'],
    timeline: 'Ready in 1–2 weeks. Best after 3 weeks.',
    proTip: 'Wear gloves when mixing — gochugaru stains everything and your hands will thank you.',
    healthBenefits: [
      'Exceptionally rich in probiotics and live cultures',
      'High in vitamins A, B, and C',
      'Contains antioxidants from chili and garlic',
      'Traditionally associated with gut health and longevity',
    ],
  },
  {
    id: 'romanian-pink-cauliflower',
    name: 'Romanian Pink Cauliflower',
    region: 'Romania',
    desc: 'Conopidă Murată — cauliflower turned magenta by beetroot. Sour, earthy, visually stunning.',
    tags: ['Eastern European', '7-14 days'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Cauliflower', 'Beetroot', 'Celery stalks', 'Garlic'],
    spices: ['Fresh dill', 'Black peppercorns', 'Bay leaf', 'Horseradish (optional)'],
    timeline: 'Ready in 7–14 days. The pink deepens over time.',
    proTip: 'The beetroot is purely for color — use just one small beet for the most vibrant magenta.',
    healthBenefits: [
      'Beetroot provides betalains — powerful anti-inflammatory compounds',
      'Cauliflower is high in vitamin C and folate',
      'Fermentation adds beneficial bacteria and improves nutrient absorption',
      'Garlic contributes allicin, associated with immune support',
    ],
  },
  {
    id: 'ogorki-kiszone',
    name: 'Ogórki Kiszone',
    region: 'Poland',
    desc: 'Traditional Polish lacto-fermented cucumbers. Cloudy, sour, garlicky — the real dill pickle.',
    tags: ['Eastern European', '3-7 days'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Pickling cucumbers', 'Garlic', 'Fresh dill', 'Horseradish root'],
    spices: ['Black peppercorns', 'Allspice berries', 'Bay leaf', 'Mustard seeds'],
    timeline: 'Ready in 3–7 days at room temperature. Move to fridge to slow fermentation.',
    proTip: 'Use cucumbers picked that same day — older cucumbers go soft. The horseradish leaf keeps them crunchy.',
    healthBenefits: [
      'Rich in lactobacillus bacteria from natural fermentation',
      'Hydrating and low calorie',
      'Dill provides flavonoids and antioxidants',
      'Naturally fermented (no vinegar) means living cultures stay active',
    ],
  },
  {
    id: 'takuan',
    name: 'Takuan',
    region: 'Japan',
    desc: 'Fermented daikon radish, bright yellow, sweet-sour. A Japanese bento staple for centuries.',
    tags: ['Japanese', '1-2 weeks'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Daikon radish (whole or halved)', 'Non-iodized salt', 'Rice bran or kombu'],
    spices: ['Turmeric (for color)', 'Dried chili', 'Kombu kelp'],
    timeline: 'Ready in 1–2 weeks. Traditional versions age for months.',
    proTip: 'Sun-dry the daikon for 1–2 days before pickling to concentrate flavor and improve texture.',
    healthBenefits: [
      'Daikon is rich in digestive enzymes and vitamin C',
      'Fermentation creates beneficial gut bacteria',
      'Low calorie and hydrating',
      'Turmeric adds curcumin, a well-studied anti-inflammatory',
    ],
  },
  {
    id: 'curtido',
    name: 'Curtido',
    region: 'El Salvador',
    desc: 'Central American fermented cabbage slaw with carrots and oregano. The perfect pupusa companion.',
    tags: ['Latin American', '1-3 days'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Green cabbage', 'Carrots', 'White onion', 'Jalapeño'],
    spices: ['Dried oregano', 'Red chili flakes', 'Apple cider vinegar (small amount)', 'Salt'],
    timeline: 'Ready in 1–3 days. Best eaten within 2 weeks.',
    proTip: 'A short ferment (1 day) gives a fresh, lightly sour crunch. 3 days gives a deeper, more complex flavor.',
    healthBenefits: [
      'Cabbage provides glucosinolates linked to cellular health',
      'Carrots add beta-carotene and vitamin A',
      'Short fermentation adds beneficial bacteria without strong sourness',
      'Oregano contains rosmarinic acid, an antioxidant',
    ],
  },
  {
    id: 'torshi',
    name: 'Torshi',
    region: 'Iran',
    desc: 'Persian mixed vegetable pickle, long-aged in vinegar with herbs and spices. Complex, deeply savory.',
    tags: ['Middle Eastern', '4-8 weeks'],
    cardType: 'readymade',
    brineType: 'vinegar',
    ingredients: ['Cauliflower', 'Eggplant', 'Garlic', 'Celery', 'Carrots'],
    spices: ['Dried fenugreek', 'Dried mint', 'Coriander seeds', 'Turmeric', 'Black pepper'],
    timeline: 'Ready in 4–8 weeks. Improves significantly with age.',
    proTip: 'The longer you wait the better — most Persian families age torshi for 6–12 months.',
    healthBenefits: [
      'Fenugreek is associated with blood sugar regulation',
      'Garlic provides allicin and immune-supporting compounds',
      'Mixed vegetables provide a wide spectrum of vitamins and minerals',
      'Long aging develops complex beneficial compounds',
    ],
  },
  {
    id: 'pao-cai',
    name: 'Pao Cai',
    region: 'Sichuan, China',
    desc: "Sichuan's continuously maintained pickle brine. Vegetables go in, come out tangy and numbing.",
    tags: ['Chinese', '1-3 days'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Napa cabbage', 'Radish', 'Carrots', 'Green beans', 'Ginger'],
    spices: ['Sichuan peppercorns', 'Dried chili', 'Star anise', 'Garlic', 'Rice wine (small amount)'],
    timeline: 'First batch ready in 3–5 days. Subsequent batches in 1–2 days once brine is established.',
    proTip: 'The magic is the living brine — never let it go empty. Add new vegetables as you remove old ones.',
    healthBenefits: [
      'Sichuan peppercorns contain hydroxy-alpha-sanshool, which may support circulation',
      'Living brine becomes increasingly probiotic-rich over time',
      'Diverse vegetables provide a wide range of phytonutrients',
      'Ginger aids digestion and reduces inflammation',
    ],
  },
  {
    id: 'shibazuke',
    name: 'Shibazuke',
    region: 'Kyoto, Japan',
    desc: "Kyoto's famous purple pickle — cucumber and eggplant fermented with red shiso. Strikingly beautiful.",
    tags: ['Japanese', '1-2 weeks'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Japanese eggplant', 'Cucumber', 'Myoga ginger', 'Red shiso leaves'],
    spices: ['Salt', 'Rice vinegar (small amount)'],
    timeline: 'Ready in 1–2 weeks. The purple deepens after day 5.',
    proTip: "Red shiso is non-negotiable — it's the source of the purple color and the distinctive flavor.",
    healthBenefits: [
      'Red shiso is rich in rosmarinic acid and anthocyanins — powerful antioxidants',
      'Eggplant contains nasunin, linked to brain cell protection',
      'Natural fermentation adds beneficial bacteria',
      'Low calorie and deeply hydrating',
    ],
  },
  {
    id: 'gajar-gobhi-shalgam',
    name: 'Gajar Gobhi Shalgam',
    region: 'North India',
    desc: 'North Indian winter pickle of carrots, cauliflower, and turnips in mustard oil. Bold, funky, warming.',
    tags: ['Indian', '3-5 days'],
    cardType: 'readymade',
    brineType: 'salt',
    ingredients: ['Carrots', 'Cauliflower', 'Turnips', 'Mustard oil'],
    spices: ['Yellow mustard seeds (coarsely ground)', 'Turmeric', 'Red chili powder', 'Salt', 'Fenugreek seeds'],
    timeline: 'Ready in 3–5 days in sunlight. Traditional method uses winter sun.',
    proTip: 'Sun-ferment it — place the jar in direct sunlight during the day and bring it inside at night. The warmth accelerates fermentation.',
    healthBenefits: [
      'Mustard seeds are rich in selenium and omega-3 fatty acids',
      'Turmeric provides curcumin with anti-inflammatory properties',
      'Turnips are high in vitamin C and glucosinolates',
      'Fenugreek supports blood sugar balance and digestion',
    ],
  },
]

const INGREDIENT_EMOJI: Record<string, string> = {
  cucumber: '🥒',
  carrot: '🥕',
  jalapeno: '🌶️',
  redOnion: '🧅',
  beet: '🍠',
  greenBean: '🫛',
  cauliflower: '🥦',
  radish: '🌸',
  cabbage: '🥬',
  garlic: '🧄',
  asparagus: '🌿',
  bellPepper: '🫑',
}

export const ingredientsBySlug: Record<string, { name: string; emoji: string }> = {
  ...Object.fromEntries(
    INGREDIENTS.map(i => [i.id, { name: i.name, emoji: INGREDIENT_EMOJI[i.id] ?? '🫙' }])
  ),
  ...Object.fromEntries(
    READY_MADE.map(i => [i.id, { name: i.name, emoji: '🫙' }])
  ),
}
