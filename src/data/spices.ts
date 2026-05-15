export interface Spice {
  slug: string;
  name: string;
  emoji: string;
  flavor: string;
  bestWith: string[];
  intensity: 'mild' | 'medium' | 'bold';
}

export const spices: Spice[] = [
  {
    slug: 'dill-seed',
    name: 'Dill Seed',
    emoji: '🌿',
    flavor: 'Earthy, grassy, and slightly bitter — the quintessential pickle spice',
    bestWith: ['cucumbers', 'green-beans', 'asparagus', 'okra', 'cabbage'],
    intensity: 'medium',
  },
  {
    slug: 'dill-weed',
    name: 'Dill Weed',
    emoji: '🌿',
    flavor: 'Fresher and brighter than dill seed with a more herbaceous, feathery quality',
    bestWith: ['cucumbers', 'radishes', 'carrots', 'asparagus', 'red-onion'],
    intensity: 'mild',
  },
  {
    slug: 'mustard-seed-yellow',
    name: 'Yellow Mustard Seed',
    emoji: '🟡',
    flavor: 'Mild heat with a nutty, slightly bitter note — a classic pickle jar essential',
    bestWith: ['cucumbers', 'green-beans', 'cabbage', 'eggs', 'brussels-sprouts'],
    intensity: 'mild',
  },
  {
    slug: 'mustard-seed-black',
    name: 'Black Mustard Seed',
    emoji: '⚫',
    flavor: 'More pungent and peppery than yellow — prominent in South Asian and Eastern European pickling',
    bestWith: ['cauliflower', 'carrots', 'cabbage', 'green-beans', 'turnips'],
    intensity: 'medium',
  },
  {
    slug: 'black-peppercorns',
    name: 'Black Peppercorns',
    emoji: '⚫',
    flavor: 'Sharp, piney heat with earthy depth — goes with virtually everything in the jar',
    bestWith: ['cucumbers', 'carrots', 'jalapenos', 'red-onion', 'garlic', 'eggs'],
    intensity: 'medium',
  },
  {
    slug: 'red-pepper-flakes',
    name: 'Red Pepper Flakes',
    emoji: '🌶️',
    flavor: 'Bright, fruity heat that builds slowly — adds a kick to any pickle',
    bestWith: ['cucumbers', 'carrots', 'jalapenos', 'cauliflower', 'green-beans', 'garlic'],
    intensity: 'bold',
  },
  {
    slug: 'coriander-seed',
    name: 'Coriander Seed',
    emoji: '🌿',
    flavor: 'Warm and citrusy with floral notes — pairs beautifully with most vegetables',
    bestWith: ['carrots', 'beets', 'cauliflower', 'bell-peppers', 'fennel', 'jalapenos'],
    intensity: 'mild',
  },
  {
    slug: 'celery-seed',
    name: 'Celery Seed',
    emoji: '🌿',
    flavor: 'Intensely savory and herbal — a little goes a long way; essential in dill pickles',
    bestWith: ['cucumbers', 'green-beans', 'cabbage', 'okra', 'turnips'],
    intensity: 'bold',
  },
  {
    slug: 'bay-leaf',
    name: 'Bay Leaf',
    emoji: '🍃',
    flavor: 'Subtle, herbal, and slightly floral — adds depth and helps maintain crunch in pickles',
    bestWith: ['cucumbers', 'beets', 'garlic', 'cabbage', 'cherry-tomatoes', 'eggs', 'turnips'],
    intensity: 'mild',
  },
  {
    slug: 'garlic-cloves',
    name: 'Garlic Cloves',
    emoji: '🧄',
    flavor: 'Pungent and savory when raw; sweet and mellow after weeks in brine',
    bestWith: ['cucumbers', 'green-beans', 'asparagus', 'jalapenos', 'okra', 'turnips'],
    intensity: 'bold',
  },
  {
    slug: 'fennel-seed',
    name: 'Fennel Seed',
    emoji: '🌾',
    flavor: 'Sweet and anise-like with warm undertones — great for Mediterranean-style pickles',
    bestWith: ['fennel', 'asparagus', 'garlic', 'cherry-tomatoes', 'bell-peppers'],
    intensity: 'medium',
  },
  {
    slug: 'caraway-seed',
    name: 'Caraway Seed',
    emoji: '🌾',
    flavor: 'Earthy and anise-adjacent — the defining spice of Eastern European and Scandinavian pickling',
    bestWith: ['cabbage', 'beets', 'turnips', 'brussels-sprouts'],
    intensity: 'medium',
  },
  {
    slug: 'turmeric',
    name: 'Turmeric',
    emoji: '🟡',
    flavor: 'Earthy, slightly bitter, and peppery — turns everything a glorious golden yellow',
    bestWith: ['cauliflower', 'carrots', 'radishes', 'eggs', 'daikon', 'turnips'],
    intensity: 'medium',
  },
  {
    slug: 'cumin-seed',
    name: 'Cumin Seed',
    emoji: '🟤',
    flavor: 'Warm, earthy, and slightly smoky — essential for Mexican and Middle Eastern-inspired pickles',
    bestWith: ['jalapenos', 'carrots', 'bell-peppers', 'turnips', 'garlic'],
    intensity: 'medium',
  },
  {
    slug: 'cinnamon-stick',
    name: 'Cinnamon Stick',
    emoji: '🍂',
    flavor: 'Warm, sweet, and complex — transforms sweet pickles and fruit-forward brines',
    bestWith: ['beets', 'watermelon-rind', 'carrots', 'fennel'],
    intensity: 'medium',
  },
  {
    slug: 'whole-cloves',
    name: 'Whole Cloves',
    emoji: '🌑',
    flavor: 'Intensely aromatic and sweet-spicy — use sparingly, these are powerful',
    bestWith: ['beets', 'watermelon-rind', 'fennel', 'eggs'],
    intensity: 'bold',
  },
  {
    slug: 'star-anise',
    name: 'Star Anise',
    emoji: '⭐',
    flavor: 'Strong licorice-like warmth with sweet, complex depth — a powerhouse spice',
    bestWith: ['watermelon-rind', 'fennel', 'daikon', 'cherry-tomatoes'],
    intensity: 'bold',
  },
  {
    slug: 'allspice-berries',
    name: 'Allspice Berries',
    emoji: '🫐',
    flavor: 'Warm blend of clove, cinnamon, and nutmeg notes — a Caribbean and Northern European classic',
    bestWith: ['beets', 'watermelon-rind', 'cabbage', 'eggs', 'red-onion'],
    intensity: 'medium',
  },
  {
    slug: 'fresh-ginger',
    name: 'Fresh Ginger',
    emoji: '🟡',
    flavor: 'Bright, warming heat with a citrusy edge — excellent in Asian-inspired pickles',
    bestWith: ['daikon', 'carrots', 'radishes', 'garlic', 'cherry-tomatoes', 'red-onion'],
    intensity: 'medium',
  },
  {
    slug: 'horseradish-root',
    name: 'Horseradish Root',
    emoji: '🌿',
    flavor: 'Fiery, sharp heat that clears the sinuses — also keeps pickles extra crisp and firm',
    bestWith: ['cucumbers', 'beets', 'eggs', 'green-beans'],
    intensity: 'bold',
  },
  {
    slug: 'juniper-berries',
    name: 'Juniper Berries',
    emoji: '🫐',
    flavor: 'Piney, resinous, and gin-like — a Scandinavian and Eastern European specialty',
    bestWith: ['cabbage', 'beets', 'turnips', 'garlic'],
    intensity: 'bold',
  },
];

export const spicesBySlug = Object.fromEntries(
  spices.map((s) => [s.slug, s])
) as Record<string, Spice>;
