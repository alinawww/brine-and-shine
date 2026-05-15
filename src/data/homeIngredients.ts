export interface HomeIngredient {
  id: string;
  slug: string;
  name: string;
  desc: string;
  tags: [string, string];
  brineDefault: 'salt' | 'vinegar';
}

export const HOME_INGREDIENTS: HomeIngredient[] = [
  { id: 'cucumber',    slug: 'cucumbers',    name: 'Cucumbers',    brineDefault: 'salt',    desc: 'The undisputed king of the pickle jar. Crisp, cooling, infinitely customizable.',       tags: ['classic',  '3-7 days']  },
  { id: 'carrot',      slug: 'carrots',      name: 'Carrots',      brineDefault: 'vinegar', desc: 'Pickled carrots stay satisfyingly crunchy and turn sweet-sour in a few days.',           tags: ['crunchy',  '5-10 days'] },
  { id: 'jalapeno',    slug: 'jalapenos',    name: 'Jalapeños',    brineDefault: 'vinegar', desc: 'Mellows the heat just enough — you keep the personality without the punch.',             tags: ['spicy',    '2-4 days']  },
  { id: 'redOnion',    slug: 'red-onion',    name: 'Red Onion',    brineDefault: 'vinegar', desc: 'Quick-pickled red onions are a fridge staple. They turn a brilliant magenta.',            tags: ['fast',     '1 hour']    },
  { id: 'beet',        slug: 'beets',        name: 'Beets',        brineDefault: 'salt',    desc: 'Earthy, sweet, and a deep jewel-red that stains everything in the best way.',             tags: ['earthy',   '7-14 days'] },
  { id: 'greenBean',   slug: 'green-beans',  name: 'Green Beans',  brineDefault: 'salt',    desc: '"Dilly beans" — the snappy, garlicky pickle that disappears fastest at parties.',        tags: ['snappy',   '5-7 days']  },
  { id: 'cauliflower', slug: 'cauliflower',  name: 'Cauliflower',  brineDefault: 'vinegar', desc: 'Porous florets soak up brine like a sponge. The crunch holds for weeks.',                tags: ['sponge',   '7-14 days'] },
  { id: 'radish',      slug: 'radishes',     name: 'Radishes',     brineDefault: 'salt',    desc: 'Transforms dramatically — peppery raw becomes mellow, tangy, a little sweet.',            tags: ['peppery',  '3-5 days']  },
  { id: 'cabbage',     slug: 'cabbage',      name: 'Cabbage',      brineDefault: 'salt',    desc: 'The soul of fermented pickling tradition. Sauerkraut, kimchi, curtido — all start here.', tags: ['ferment',  '7-21 days'] },
  { id: 'garlic',      slug: 'garlic',       name: 'Garlic',       brineDefault: 'salt',    desc: 'Mellows from sharp and pungent into something nutty and buttery. Patience required.',      tags: ['nutty',    '30+ days']  },
  { id: 'asparagus',   slug: 'asparagus',    name: 'Asparagus',    brineDefault: 'vinegar', desc: 'Elegant, crunchy spears that make any bloody mary look like it came from a magazine.',     tags: ['elegant',  '5-10 days'] },
  { id: 'bellPepper',  slug: 'bell-peppers', name: 'Bell Peppers', brineDefault: 'vinegar', desc: 'Sweet, tangy, vibrantly colored. Great on sandwiches, in salads, straight from the jar.', tags: ['sweet',    '5-7 days']  },
];

export const homeIngredientsBySlug: Record<string, HomeIngredient> = Object.fromEntries(
  HOME_INGREDIENTS.map(ing => [ing.slug, ing]),
);
