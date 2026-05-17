export const MEAL_PAIRINGS: Record<string, {
  meals: Array<{ name: string; desc: string; emoji: string }>
  note: string
}> = {
  cucumber: {
    note: 'Dill pickles are one of the most versatile condiments in the world.',
    meals: [
      { emoji: '🍔', name: 'Burgers & Smash Burgers', desc: 'The classic pairing — tangy pickle cuts through the richness of beef.' },
      { emoji: '🥪', name: 'Deli Sandwiches', desc: 'Reuben, club, or BLT — a good pickle elevates any sandwich.' },
      { emoji: '🍸', name: 'Bloody Mary', desc: 'Use the pickle brine in your bloody mary. Trust us.' },
      { emoji: '🧀', name: 'Cheese Boards', desc: 'Sharp cheddar, pickles, and crackers — a timeless combination.' },
      { emoji: '🌭', name: 'Hot Dogs', desc: 'Relish is just chopped pickle. Go straight to the source.' },
    ],
  },
  carrot: {
    note: 'Pickled carrots add sweetness and crunch to almost any dish.',
    meals: [
      { emoji: '🌮', name: 'Tacos', desc: 'The tangy crunch is the perfect contrast to spiced meats.' },
      { emoji: '🥙', name: 'Bánh Mì', desc: 'The Vietnamese sandwich is built around pickled daikon and carrot.' },
      { emoji: '🥗', name: 'Grain Bowls', desc: 'Add brightness and acidity to rice or farro bowls.' },
      { emoji: '🍜', name: 'Ramen', desc: 'A pickled carrot topping adds freshness to rich broth.' },
      { emoji: '🫔', name: 'Wraps & Flatbreads', desc: 'Works beautifully with hummus, lamb, or grilled chicken.' },
    ],
  },
  jalapeno: {
    note: 'Fermented jalapeños are more complex than fresh — use them anywhere you want heat with depth.',
    meals: [
      { emoji: '🌮', name: 'Tacos & Burritos', desc: 'The natural home of pickled jalapeño.' },
      { emoji: '🍕', name: 'Pizza', desc: 'Pickled jalapeño on pizza is better than fresh — the acidity balances the cheese.' },
      { emoji: '🌭', name: 'Hot Dogs & Nachos', desc: 'A stadium classic, elevated.' },
      { emoji: '🥚', name: 'Eggs Any Style', desc: 'Pickled jalapeño with scrambled or fried eggs is a revelation.' },
      { emoji: '🫙', name: 'Use the Brine', desc: 'Add jalapeño brine to salad dressings, marinades, or cocktails.' },
    ],
  },
  redOnion: {
    note: 'Quick-pickled red onion is the simplest way to instantly upgrade a dish.',
    meals: [
      { emoji: '🌮', name: 'Tacos', desc: 'Carnitas, fish, or veggie tacos all benefit from pickled red onion.' },
      { emoji: '🥗', name: 'Salads', desc: 'Raw red onion is too sharp — pickled is milder, sweeter, and more complex.' },
      { emoji: '🍔', name: 'Burgers', desc: 'Adds a bright, tangy layer that cuts through fat perfectly.' },
      { emoji: '🐟', name: 'Smoked Salmon', desc: 'A classic Nordic combination — pickled onion with smoked fish on rye.' },
      { emoji: '🫔', name: 'Flatbreads & Wraps', desc: 'Works with falafel, shawarma, or any Mediterranean-style wrap.' },
    ],
  },
  beet: {
    note: 'Pickled beets are earthy, sweet, and deeply savoury — a natural with dairy and grains.',
    meals: [
      { emoji: '🥗', name: 'Goat Cheese Salad', desc: 'Beet and goat cheese is a classic pairing — the acidity cuts the creaminess.' },
      { emoji: '🍔', name: 'The Aussie Burger', desc: 'Beetroot on a burger is an Australian tradition. Excellent.' },
      { emoji: '🥪', name: 'Smørrebrød', desc: 'The Danish open-faced sandwich often features pickled beet.' },
      { emoji: '🫙', name: 'Grain Bowls', desc: 'Earthy beet with farro, quinoa, and feta is a power combination.' },
      { emoji: '🥚', name: 'Devilled Eggs', desc: 'Slice pickled beet alongside — the colour contrast is stunning.' },
    ],
  },
  greenBean: {
    note: 'Dilly beans are the snack pickle. They also make incredible bloody mary garnishes.',
    meals: [
      { emoji: '🍸', name: 'Bloody Mary', desc: 'A dilly bean in a bloody mary is the definitive garnish.' },
      { emoji: '🧀', name: 'Charcuterie Boards', desc: 'Their crunch and brine pairs perfectly with cured meats and cheese.' },
      { emoji: '🥗', name: 'Nicoise Salad', desc: 'Replace plain green beans with dilly beans for an upgrade.' },
      { emoji: '🍳', name: 'Brunch Boards', desc: 'Serve alongside eggs, smoked salmon, and good bread.' },
      { emoji: '🥜', name: 'As a Snack', desc: 'Eat them straight from the jar. No shame.' },
    ],
  },
  cauliflower: {
    note: 'Pickled cauliflower absorbs brine intensely — it pairs with rich, fatty dishes beautifully.',
    meals: [
      { emoji: '🫙', name: 'Antipasto Boards', desc: 'A staple of Italian antipasto alongside olives and cured meats.' },
      { emoji: '🥙', name: 'Shawarma & Wraps', desc: 'Middle Eastern pickled cauliflower is a traditional accompaniment.' },
      { emoji: '🍕', name: 'Pizza Topping', desc: 'Pickled cauliflower on white pizza with ricotta is underrated.' },
      { emoji: '🥗', name: 'Grain Salads', desc: 'Adds a punchy, crunchy element to any grain salad.' },
      { emoji: '🍔', name: 'Veggie Burgers', desc: 'The crunch and acidity balance a rich plant-based patty.' },
    ],
  },
  radish: {
    note: 'Pickled radish is a staple condiment across East and Southeast Asia.',
    meals: [
      { emoji: '🍜', name: 'Ramen & Noodles', desc: 'A traditional topping for ramen — adds brightness to rich broth.' },
      { emoji: '🌮', name: 'Korean Tacos', desc: 'Pickled radish is the essential topping for Korean fried chicken tacos.' },
      { emoji: '🥙', name: 'Bánh Mì', desc: 'Pickled daikon and radish are foundational to this sandwich.' },
      { emoji: '🍣', name: 'Sushi & Sashimi', desc: 'Takuan (pickled daikon) is a classic sushi accompaniment.' },
      { emoji: '🥗', name: 'Asian Slaws', desc: 'Shredded pickled radish in a slaw with sesame dressing.' },
    ],
  },
  cabbage: {
    note: 'Fermented cabbage is one of the oldest and most versatile fermented foods in the world.',
    meals: [
      { emoji: '🌭', name: 'Hot Dogs & Bratwurst', desc: 'Sauerkraut on a bratwurst is one of the great food pairings.' },
      { emoji: '🥪', name: 'Reuben Sandwich', desc: 'Sauerkraut is non-negotiable in a proper Reuben.' },
      { emoji: '🥣', name: 'Pork Dishes', desc: 'Slow-braised pork with sauerkraut is a Central European classic.' },
      { emoji: '🌮', name: 'Fish Tacos', desc: 'A quick vinegar-pickled cabbage slaw is the ideal fish taco topping.' },
      { emoji: '🫕', name: 'Soups & Stews', desc: 'Add sauerkraut to bean soups — it adds depth and complexity.' },
    ],
  },
  garlic: {
    note: 'Fermented garlic is milder and nuttier than raw — use it anywhere you\'d use roasted garlic.',
    meals: [
      { emoji: '🍕', name: 'Pizza', desc: 'Spread fermented garlic on pizza instead of garlic butter. Incredible.' },
      { emoji: '🥖', name: 'Bread & Butter', desc: 'Smash a clove onto crusty bread with good butter.' },
      { emoji: '🥗', name: 'Salad Dressings', desc: 'Blend into vinaigrettes — milder than raw, more complex than roasted.' },
      { emoji: '🍝', name: 'Pasta', desc: 'Toss fermented garlic cloves with pasta, olive oil, and parmesan.' },
      { emoji: '🧀', name: 'Cheese Boards', desc: 'A small bowl of fermented garlic cloves belongs on every cheese board.' },
    ],
  },
  asparagus: {
    note: 'Pickled asparagus is a sophisticated condiment — elegant but not fussy.',
    meals: [
      { emoji: '🍸', name: 'Bloody Mary', desc: 'The ultimate bloody mary garnish — spear it through the glass.' },
      { emoji: '🧀', name: 'Charcuterie & Cheese', desc: 'Pickled asparagus alongside prosciutto and manchego.' },
      { emoji: '🥚', name: 'Eggs Benedict', desc: 'Serve pickled asparagus alongside instead of plain asparagus.' },
      { emoji: '🐟', name: 'Smoked Fish', desc: 'Pairs beautifully with smoked trout or salmon on a platter.' },
      { emoji: '🥗', name: 'Spring Salads', desc: 'Chop and toss into a salad with shaved parmesan.' },
    ],
  },
  bellPepper: {
    note: 'Pickled bell peppers are sweet, tangy, and endlessly versatile.',
    meals: [
      { emoji: '🍕', name: 'Pizza & Flatbreads', desc: 'Adds sweetness and a pop of colour to any pizza.' },
      { emoji: '🥪', name: 'Italian Sandwiches', desc: 'A staple on Italian hoagies and submarine sandwiches.' },
      { emoji: '🫙', name: 'Antipasto', desc: 'A natural fit on any antipasto or charcuterie board.' },
      { emoji: '🥗', name: 'Pasta Salads', desc: 'Chop and toss into cold pasta salads with olives and capers.' },
      { emoji: '🫔', name: 'Wraps & Quesadillas', desc: 'Sweet pickled pepper in a quesadilla with grilled chicken.' },
    ],
  },

  sauerkraut: {
    note: 'Sauerkraut is one of the most useful fermented foods in any kitchen.',
    meals: [
      { emoji: '🌭', name: 'Bratwurst & Hot Dogs', desc: 'The definitive sauerkraut pairing — non-negotiable.' },
      { emoji: '🥪', name: 'Reuben Sandwich', desc: 'Corned beef, Swiss cheese, sauerkraut, Thousand Island — a classic.' },
      { emoji: '🥣', name: 'Pork & Potato', desc: 'Braised pork with sauerkraut and potatoes — Central European soul food.' },
      { emoji: '🫕', name: 'Bean Soup', desc: 'Stir into white bean or lentil soup for depth and acidity.' },
      { emoji: '🌮', name: 'Carnitas Tacos', desc: 'A German-Mexican crossover that genuinely works.' },
    ],
  },
  kimchi: {
    note: 'Kimchi is one of the most versatile fermented foods — fresh for crunch, aged for depth.',
    meals: [
      { emoji: '🍳', name: 'Kimchi Fried Rice', desc: 'The ultimate use for aged kimchi — the classic Korean comfort food.' },
      { emoji: '🥞', name: 'Kimchi Pancakes (Jeon)', desc: 'Pan-fried kimchi batter — crispy, sour, and deeply savoury.' },
      { emoji: '🍔', name: 'Smash Burgers', desc: 'Kimchi on a smash burger with gochujang mayo is exceptional.' },
      { emoji: '🌮', name: 'Korean Tacos', desc: 'The LA Korean taco truck tradition — bulgogi and kimchi in a tortilla.' },
      { emoji: '🧀', name: 'Grilled Cheese', desc: 'Kimchi grilled cheese is one of the great fusion foods.' },
    ],
  },
  'romanian-pink-cauliflower': {
    note: 'A spectacular winter pickle — visually stunning and deeply flavoured.',
    meals: [
      { emoji: '🥩', name: 'Roasted Meats', desc: 'Traditional alongside roast pork or chicken in Romanian cuisine.' },
      { emoji: '🫙', name: 'Antipasto Boards', desc: 'The pink colour makes it the star of any pickle platter.' },
      { emoji: '🥪', name: 'Sandwiches', desc: 'Adds a bright, tangy crunch to any sandwich or wrap.' },
      { emoji: '🥗', name: 'Winter Salads', desc: 'Chop and toss with chickpeas, olive oil, and parsley.' },
      { emoji: '🍳', name: 'Breakfast Boards', desc: 'Alongside eggs, good cheese, and bread — a Romanian breakfast tradition.' },
    ],
  },
  'ogorki-kiszone': {
    note: 'The real dill pickle — cloudy, sour, garlicky. Poles eat these with almost everything.',
    meals: [
      { emoji: '🥣', name: 'Żurek Soup', desc: 'Traditional Polish sour rye soup — use the pickle brine as a base.' },
      { emoji: '🥩', name: 'Pork Cutlets', desc: 'A natural pairing with breaded pork — the sourness cuts the fat.' },
      { emoji: '🥪', name: 'Polish Deli Sandwiches', desc: 'Alongside kielbasa and dark bread — a classic.' },
      { emoji: '🍺', name: 'Beer Snack', desc: 'Poles eat these straight from the jar with cold beer. Correct.' },
      { emoji: '🥗', name: 'Salatka (Polish Salad)', desc: 'Diced into a mayonnaise-based potato or egg salad.' },
    ],
  },
  takuan: {
    note: 'Takuan is one of Japan\'s most beloved pickles — sweet, crunchy, and deeply savoury.',
    meals: [
      { emoji: '🍱', name: 'Bento Boxes', desc: 'A staple in Japanese bento — adds colour, crunch, and umami.' },
      { emoji: '🍣', name: 'Sushi', desc: 'Served alongside sushi rolls as a palate cleanser.' },
      { emoji: '🍚', name: 'Rice Dishes', desc: 'Chop finely and mix into rice for a traditional Japanese preparation.' },
      { emoji: '🍜', name: 'Ramen', desc: 'A common ramen topping — adds sweetness and texture.' },
      { emoji: '🥢', name: 'As a Side', desc: 'Served as a small side dish alongside any Japanese meal.' },
    ],
  },
  curtido: {
    note: 'Curtido is the condiment that makes Salvadoran food complete.',
    meals: [
      { emoji: '🫓', name: 'Pupusas', desc: 'Non-negotiable — pupusas without curtido is incomplete.' },
      { emoji: '🌮', name: 'Tacos & Tostadas', desc: 'A natural fit with any Central American or Mexican food.' },
      { emoji: '🍔', name: 'Burgers', desc: 'A tangy, crunchy alternative to regular coleslaw.' },
      { emoji: '🥩', name: 'Grilled Meats', desc: 'Alongside carne asada or any grilled meat.' },
      { emoji: '🥗', name: 'Fish Dishes', desc: 'Excellent with fried or grilled fish — the acidity lifts it.' },
    ],
  },
  torshi: {
    note: 'Long-aged torshi develops extraordinary depth — a condiment that transforms a meal.',
    meals: [
      { emoji: '🫓', name: 'Flatbreads & Lavash', desc: 'Torshi alongside warm lavash and herbs is a Persian table staple.' },
      { emoji: '🥩', name: 'Grilled Meats (Kebab)', desc: 'The tangy, spiced pickle cuts through rich grilled meat perfectly.' },
      { emoji: '🫕', name: 'Rice Dishes', desc: 'A small amount alongside Persian rice elevates the whole meal.' },
      { emoji: '🧆', name: 'Mezze Spreads', desc: 'Essential on any Middle Eastern mezze table.' },
      { emoji: '🥗', name: 'Herb Salads', desc: 'Finely chop and dress a fresh herb salad with torshi brine.' },
    ],
  },
  'pao-cai': {
    note: 'Sichuan pao cai is alive — it gets better the longer you maintain the brine.',
    meals: [
      { emoji: '🥟', name: 'Dumplings & Dim Sum', desc: 'The tangy, numbing crunch is the perfect dumpling side.' },
      { emoji: '🍜', name: 'Dan Dan Noodles', desc: 'A natural side for any Sichuan noodle dish.' },
      { emoji: '🍚', name: 'Congee', desc: 'The classic Chinese breakfast pairing — pao cai alongside rice congee.' },
      { emoji: '🥢', name: 'Stir Fries', desc: 'Chop and add to stir fries for tang and crunch in the last minute.' },
      { emoji: '🫕', name: 'Mapo Tofu', desc: 'Pao cai alongside mapo tofu balances the richness and heat.' },
    ],
  },
  shibazuke: {
    note: 'Kyoto\'s most beautiful pickle — subtle, floral, and unlike anything else.',
    meals: [
      { emoji: '🍱', name: 'Kaiseki & Bento', desc: 'A traditional element of Kyoto-style refined Japanese meals.' },
      { emoji: '🍚', name: 'Rice & Ochazuke', desc: 'Serve alongside plain rice or in ochazuke (tea over rice).' },
      { emoji: '🥢', name: 'Tofu Dishes', desc: 'The mild flavour pairs beautifully with cold or silken tofu.' },
      { emoji: '🍣', name: 'Sushi', desc: 'A palate cleanser between sushi pieces — traditional and refined.' },
      { emoji: '🫖', name: 'Tea Ceremony Snack', desc: 'Historically served at tea ceremonies in Kyoto.' },
    ],
  },
  tursu: {
    note: 'Turşu is found on every Turkish table — the universal condiment of Anatolian cuisine.',
    meals: [
      { emoji: '🥙', name: 'Döner & Kebabs', desc: 'Turşu alongside döner or adana kebab is essential.' },
      { emoji: '🫓', name: 'Pide & Lahmacun', desc: 'A traditional side for Turkish flatbreads.' },
      { emoji: '🥚', name: 'Menemen', desc: 'Turkish scrambled eggs with tomato — turşu on the side is traditional.' },
      { emoji: '🫕', name: 'Lentil Soup', desc: 'A bowl of red lentil soup with turşu on the side — classic Turkish lunch.' },
      { emoji: '🍺', name: 'Rakı Table (Meze)', desc: 'A staple of the Turkish meze spread alongside rakı.' },
    ],
  },
  'gajar-gobhi-shalgam': {
    note: 'A North Indian winter staple — bold, mustardy, and warming.',
    meals: [
      { emoji: '🫓', name: 'Paratha & Roti', desc: 'The classic pairing — pickles alongside flatbread is foundational in North Indian cuisine.' },
      { emoji: '🍛', name: 'Dal & Curries', desc: 'A small amount of pickle alongside dal transforms the meal.' },
      { emoji: '🥗', name: 'Chaat', desc: 'Finely chop into chaat for a tangy, crunchy element.' },
      { emoji: '🥪', name: 'Kati Rolls', desc: 'Inside a kati roll with paneer or egg — a Kolkata street food tradition.' },
      { emoji: '🍚', name: 'Rice & Curd', desc: 'Curd rice with a spoonful of pickle is a South and North Indian comfort food.' },
    ],
  },
  'romanian-mixed-pickles': {
    note: 'Murături asortate are the pride of the Romanian winter table.',
    meals: [
      { emoji: '🥩', name: 'Sarmale (Cabbage Rolls)', desc: 'The traditional Romanian pairing — mixed pickles alongside stuffed cabbage.' },
      { emoji: '🍗', name: 'Roast Chicken', desc: 'A classic Sunday roast accompaniment in Romanian households.' },
      { emoji: '🫙', name: 'Holiday Spreads', desc: 'Essential on any Romanian Christmas or Easter table.' },
      { emoji: '🥪', name: 'Bread & Cheese', desc: 'Alongside fresh bread, telemea cheese, and cured meats.' },
      { emoji: '🍺', name: 'Ţuică Snacks', desc: 'Traditional alongside the Romanian plum brandy as an appetiser.' },
    ],
  },
}

export const DEFAULT_PAIRINGS = [
  { emoji: '🥗', name: 'Salads', desc: 'Adds brightness and acidity to any salad.' },
  { emoji: '🧀', name: 'Cheese Boards', desc: 'A natural fit on any cheese or charcuterie board.' },
  { emoji: '🥪', name: 'Sandwiches', desc: 'The tangy crunch elevates any sandwich.' },
  { emoji: '🍳', name: 'Eggs Any Style', desc: 'Pickles and eggs are a classic breakfast combination.' },
  { emoji: '🫙', name: 'As a Snack', desc: 'Eat straight from the jar — the best way.' },
]
