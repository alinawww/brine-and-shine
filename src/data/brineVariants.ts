// src/data/brineVariants.ts
// Full brine variant content for all 12 custom ingredients
// Each entry includes: exact brine recipe, aromatics with ratios,
// hot vs cold method, and pro tip

export const BRINE_VARIANTS: Record<string, {
  salt: { brine: string; method: string; aromatics: string; timeline: string; proTip: string }
  vinegar: { brine: string; method: string; aromatics: string; timeline: string; proTip: string }
}> = {

  cucumber: {
    salt: {
      brine: `**For 1kg cucumbers:**
• 1L cold water
• 20g non-iodized salt (about 1 tbsp + 1 tsp)
Stir until fully dissolved. Do not heat — cold brine keeps them crunchier.`,
      method: `1. Wash cucumbers thoroughly. Cut off blossom ends (the non-stem end) — this removes enzymes that cause softening.
2. Pack tightly into a clean jar — standing upright is ideal.
3. Pour cold brine over until fully submerged.
4. Weigh down with a small zip-lock bag filled with brine, or a cabbage leaf tucked over the top.
5. Leave at room temperature (18–22°C), loosely covered. Taste from day 3.`,
      aromatics: `Per 1kg cucumbers:
• 4–5 garlic cloves, peeled and halved
• 1 large bunch fresh dill (or 2 tsp dried dill seeds)
• 1 tbsp black peppercorns
• 2–3 bay leaves
• Optional: 1 small piece horseradish root (5cm) — keeps them very crunchy`,
      timeline: 'Ready in 3–7 days at room temperature (18–22°C). Move to fridge once sour to your taste — cold stops fermentation.',
      proTip: 'A horseradish or grape leaf contains tannins that keep cucumbers crisp. Tuck one under the lid and notice the difference.',
    },
    vinegar: {
      brine: `**For 1kg cucumbers:**
• 500ml white vinegar (5% acidity)
• 500ml water
• 20g salt (1 tbsp + 1 tsp)
• 15g sugar (1 tbsp)
Heat until salt and sugar dissolve, then cool slightly before pouring.`,
      method: `1. Slice cucumbers into coins, spears, or leave whole if small.
2. Pack into clean jars with aromatics.
3. Pour hot brine (not boiling — around 80°C) directly over cucumbers.
4. Tap jar to release air bubbles. Seal immediately.
5. Let cool to room temperature, then refrigerate.`,
      aromatics: `Per 1kg cucumbers:
• 3–4 garlic cloves, thinly sliced
• 1 tsp mustard seeds
• 1 tsp black peppercorns
• 1 tsp dill seeds or a few sprigs of fresh dill
• Optional: ½ tsp chili flakes for heat`,
      timeline: 'Ready in 24–48 hours in the fridge. Better after 3 days. Keeps for up to 2 months refrigerated.',
      proTip: 'Pour the brine hot — it softens the cucumbers slightly and drives the aromatics deeper into the flesh. For crunchier results, let the brine cool to room temperature first.',
    },
  },

  carrot: {
    salt: {
      brine: `**For 1kg carrots:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved. No heating needed.`,
      method: `1. Peel and cut carrots into sticks (1cm wide, jar-height tall) or coins (5mm thick).
2. Pack tightly into jars — vertical sticks pack more efficiently.
3. Pour cold brine over until fully submerged.
4. Weigh down to keep carrots below the brine line.
5. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg carrots:
• 3–4 garlic cloves, peeled
• 1 tsp coriander seeds
• 1 tsp black peppercorns
• 1 small chili or ½ tsp chili flakes
• Optional: 2cm fresh ginger, sliced`,
      timeline: 'Ready in 5–10 days at room temperature. Taste from day 5 — they become tangier and more complex over time.',
      proTip: 'Coins ferment faster than sticks because of the greater surface area. Make half and half if you want to taste the difference.',
    },
    vinegar: {
      brine: `**For 1kg carrots:**
• 500ml apple cider vinegar
• 500ml water
• 20g salt (1 tbsp + 1 tsp)
• 30g honey or sugar (2 tbsp)
Heat gently until dissolved.`,
      method: `1. Peel and cut carrots into sticks or coins.
2. Pack into jars with aromatics.
3. Pour warm brine (not boiling) over carrots.
4. Cool to room temperature, then seal and refrigerate.`,
      aromatics: `Per 1kg carrots:
• 3 garlic cloves, sliced
• 1 tsp coriander seeds
• 1 tsp cumin seeds
• ½ tsp chili flakes
• Optional: 3cm fresh ginger, peeled and sliced`,
      timeline: 'Ready in 24 hours in the fridge. Best at 3–5 days. Keeps up to 2 months refrigerated.',
      proTip: 'Apple cider vinegar adds a natural sweetness that complements carrots better than white vinegar. The honey deepens this — don\'t skip it.',
    },
  },

  jalapeno: {
    salt: {
      brine: `**For 1kg jalapeños:**
• 1L cold water
• 30g non-iodized salt (2 tbsp)
Higher salt concentration slows fermentation and preserves heat better.`,
      method: `1. Wash jalapeños. Score each one with a small knife (2–3 shallow cuts) so brine penetrates.
2. Leave whole or slice into rings — rings ferment much faster.
3. Pack tightly into jars.
4. Pour cold brine over until fully submerged.
5. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg jalapeños:
• 4–5 garlic cloves, peeled
• 1 tsp black peppercorns
• 2–3 bay leaves
• Optional: a few sprigs of fresh oregano`,
      timeline: 'Ready in 5–7 days at room temperature. The heat mellows noticeably — fermented jalapeños have personality without the aggression.',
      proTip: 'Score the jalapeños rather than slicing — you get full brine penetration without them going mushy. A paring knife, three quick cuts, done.',
    },
    vinegar: {
      brine: `**For 1kg jalapeños:**
• 500ml white vinegar (5% acidity)
• 500ml water
• 20g salt (1 tbsp + 1 tsp)
• 10g sugar (2 tsp)
Heat until dissolved, then cool slightly.`,
      method: `1. Slice jalapeños into rings (5mm thick) or leave whole with scored sides.
2. Pack into jars with garlic.
3. Pour warm brine over jalapeños.
4. Cool, seal, refrigerate.`,
      aromatics: `Per 1kg jalapeños:
• 4 garlic cloves, sliced
• 1 tsp black peppercorns
• 1 tsp dried oregano
• Optional: a few slices of white onion`,
      timeline: 'Ready in 2–4 days in the fridge. Keeps up to 3 months — they actually improve over the first month.',
      proTip: 'Leave the seeds in for full heat. Remove them before packing for a milder result. The brine itself will be spicy either way — use it as a hot sauce.',
    },
  },

  redOnion: {
    salt: {
      brine: `**For 1kg red onions:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved. Cold brine preserves the magenta colour better.`,
      method: `1. Peel and slice onions into thin rings (3–4mm) or half-moons.
2. Pack loosely into jars — they compress as they ferment.
3. Pour cold brine over until fully submerged.
4. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg red onions:
• 2–3 garlic cloves, halved
• 1 tsp black peppercorns
• 2 bay leaves
• Optional: 1 tsp coriander seeds`,
      timeline: 'Ready in 2–3 days at room temperature. The colour turns bright magenta within 24 hours.',
      proTip: 'Slice as thinly and evenly as possible — a mandoline is ideal. Uniform thickness means every slice ferments at the same rate.',
    },
    vinegar: {
      brine: `**For 1kg red onions:**
• 500ml red wine vinegar
• 250ml water
• 25g sugar (2 tbsp)
• 10g salt (2 tsp)
Heat until dissolved. Pour while still hot.`,
      method: `1. Peel and slice onions very thinly into rings or half-moons.
2. Place in a heatproof jar or bowl with aromatics.
3. Pour HOT brine directly over onions — the heat is intentional, it triggers the colour change to magenta immediately.
4. Cool to room temperature. They're already edible at this point.
5. Transfer to jar, refrigerate.`,
      aromatics: `Per 1kg red onions:
• 3 garlic cloves, thinly sliced
• 1 tsp black peppercorns
• Optional: ½ tsp chili flakes
• Optional: a few sprigs of fresh thyme`,
      timeline: 'Ready in 1 hour in the fridge. Better after 24 hours. Best at 3 days. Keeps 3–4 weeks refrigerated.',
      proTip: 'Pour the brine while it\'s still hot — this is what triggers the brilliant magenta colour transformation. Don\'t let it cool first.',
    },
  },

  beet: {
    salt: {
      brine: `**For 1kg beets:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved.`,
      method: `1. Wear gloves — beet stains everything permanently.
2. Peel beets and cut into 5mm slices, wedges, or matchsticks.
3. Pack tightly into jars.
4. Pour cold brine over until fully submerged.
5. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg beets:
• 3–4 garlic cloves, peeled
• 1 tsp black peppercorns
• 2–3 cloves
• 1 tsp caraway seeds
• Optional: 1 small cinnamon stick`,
      timeline: 'Ready in 7–14 days at room temperature. The flavour deepens considerably after 10 days.',
      proTip: 'Add a small piece of fresh horseradish to the jar — it cuts through the earthiness beautifully and adds a subtle heat.',
    },
    vinegar: {
      brine: `**For 1kg beets:**
• 500ml apple cider vinegar
• 250ml water
• 50g sugar (4 tbsp)
• 10g salt (2 tsp)
Heat until dissolved. Pour warm.`,
      method: `1. Wear gloves.
2. Roast beets at 200°C for 45 minutes first (optional but recommended — deepens flavour).
3. Peel and slice into rounds or wedges.
4. Pack into jars with aromatics.
5. Pour warm brine over, cool, seal, refrigerate.`,
      aromatics: `Per 1kg beets:
• 3 garlic cloves, halved
• 1 tsp black peppercorns
• 3–4 cloves
• 1 small cinnamon stick
• Optional: zest of 1 orange`,
      timeline: 'Ready in 3–5 days in the fridge. Better at 1 week. Keeps up to 2 months refrigerated.',
      proTip: 'Roasting the beets before pickling concentrates their natural sugars and gives a much richer, deeper result. The extra hour is worth it.',
    },
  },

  greenBean: {
    salt: {
      brine: `**For 1kg green beans:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved. Cold brine keeps beans snappy.`,
      method: `1. Top and tail the green beans. Do not cut them — keep whole.
2. Pack vertically into tall jars, standing upright.
3. Tuck aromatics in between the beans.
4. Pour cold brine over until fully submerged.
5. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg green beans:
• 4–6 garlic cloves, peeled and halved
• 1 large bunch fresh dill (or 2 tsp dried dill seeds)
• 1 tsp black peppercorns
• 1 tsp mustard seeds
• Optional: 1–2 small dried chilies`,
      timeline: 'Ready in 5–7 days at room temperature. These are the famous "dilly beans" — garlicky, snappy, and addictive.',
      proTip: 'Pack them as tightly as possible, standing upright. Beans that float above the brine will go soft and may mould. A tight pack is a safe pack.',
    },
    vinegar: {
      brine: `**For 1kg green beans:**
• 500ml white vinegar (5% acidity)
• 500ml water
• 20g salt (1 tbsp + 1 tsp)
• 10g sugar (2 tsp)
Heat until dissolved.`,
      method: `1. Top and tail beans. Blanch in boiling water for 30 seconds, then immediately transfer to ice water — this locks in the green colour.
2. Drain and pack vertically into jars with aromatics.
3. Pour hot brine over beans.
4. Cool, seal, refrigerate.`,
      aromatics: `Per 1kg green beans:
• 4 garlic cloves, halved
• 1 tsp dill seeds
• 1 tsp black peppercorns
• ½ tsp chili flakes
• Optional: 1 tsp mustard seeds`,
      timeline: 'Ready in 3–5 days in the fridge. Keeps up to 2 months.',
      proTip: 'The 30-second blanch before pickling is the difference between vibrant green beans and dull olive ones. Ice bath immediately after — don\'t skip it.',
    },
  },

  cauliflower: {
    salt: {
      brine: `**For 1kg cauliflower:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved.`,
      method: `1. Break cauliflower into medium florets (3–4cm). Uniform size ferments evenly.
2. Pack tightly into jars.
3. Pour cold brine over until fully submerged.
4. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg cauliflower:
• 4 garlic cloves, peeled
• 1 tsp turmeric (turns it golden — beautiful)
• 1 tsp black peppercorns
• 1 tsp coriander seeds
• Optional: 1 small beetroot, sliced — turns the entire jar pink`,
      timeline: 'Ready in 7–14 days at room temperature. Cauliflower is porous and absorbs brine quickly — it gets very tangy.',
      proTip: 'Add one small beetroot to the jar. It turns the cauliflower a stunning magenta within 48 hours and adds a subtle earthiness. Romanian grandmothers have been doing this for centuries.',
    },
    vinegar: {
      brine: `**For 1kg cauliflower:**
• 500ml white vinegar (5% acidity)
• 500ml water
• 20g salt (1 tbsp + 1 tsp)
• 15g sugar (1 tbsp)
• 1 tsp turmeric (add directly to the brine)
Heat until dissolved. The turmeric turns the brine — and everything it touches — golden yellow.`,
      method: `1. Break into medium florets.
2. Pack into jars with aromatics.
3. Pour hot brine over florets.
4. Cool, seal, refrigerate.`,
      aromatics: `Per 1kg cauliflower:
• 4 garlic cloves, sliced
• 1 tsp mustard seeds
• 1 tsp black peppercorns
• ½ tsp chili flakes
• 2–3 bay leaves`,
      timeline: 'Ready in 5–7 days in the fridge. The golden colour deepens over the first 3 days.',
      proTip: 'Add the turmeric directly to the brine before heating — it distributes evenly and the colour is stunning. Wear an apron; turmeric stains are permanent.',
    },
  },

  radish: {
    salt: {
      brine: `**For 1kg radishes:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved.`,
      method: `1. Wash radishes. Trim tops and tails. Leave whole if small, halve if large.
2. Pack tightly into jars.
3. Pour cold brine over until fully submerged.
4. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg radishes:
• 3–4 garlic cloves, peeled
• 1 tsp black peppercorns
• 1 tsp coriander seeds
• Optional: a few sprigs of fresh dill`,
      timeline: 'Ready in 3–5 days at room temperature. The sharp peppery bite mellows dramatically — fermented radishes are almost sweet.',
      proTip: 'Mix radish varieties if you can — French breakfast, watermelon radish, daikon. Different sizes and colours make a visually beautiful jar.',
    },
    vinegar: {
      brine: `**For 1kg radishes:**
• 500ml rice vinegar (or white wine vinegar)
• 250ml water
• 20g sugar (1 tbsp + 1 tsp)
• 10g salt (2 tsp)
Heat gently until dissolved. Rice vinegar gives a lighter, cleaner result.`,
      method: `1. Slice radishes into thin rounds (3mm) or leave small ones whole.
2. Pack into jars with aromatics.
3. Pour warm brine over radishes.
4. Cool, seal, refrigerate.`,
      aromatics: `Per 1kg radishes:
• 2 garlic cloves, thinly sliced
• 1 tsp black peppercorns
• Optional: 1 tsp sesame seeds (add after pickling, before serving)
• Optional: a few slices of fresh ginger`,
      timeline: 'Ready in 1–2 days in the fridge. Keeps up to 3 weeks — they get more tender over time.',
      proTip: 'Rice vinegar is worth seeking out here — it\'s lighter and less sharp than white vinegar, which lets the natural sweetness of the radish come through.',
    },
  },

  cabbage: {
    salt: {
      brine: `**For 1kg cabbage:**
• No water needed
• 20g non-iodized salt (1 tbsp + 1 tsp) per 1kg shredded cabbage
The cabbage creates its own brine when massaged with salt.`,
      method: `1. Remove outer leaves. Quarter and finely shred (2–3mm strips).
2. Weigh the shredded cabbage. Add 20g salt per 1kg.
3. Massage vigorously for 8–10 minutes until cabbage releases enough liquid to fully submerge itself.
4. Pack tightly into jars, pressing down firmly after each handful. The brine should rise above the cabbage.
5. Weigh down to keep submerged. Cover loosely.
6. Ferment at room temperature, pressing down daily.`,
      aromatics: `Per 1kg cabbage:
• Optional: 1 tsp caraway seeds (classic German sauerkraut)
• Optional: 1 tsp juniper berries
• Optional: 200g grated carrot (adds colour and slight sweetness)
Note: Traditional sauerkraut uses only cabbage and salt — nothing else needed.`,
      timeline: 'Tangy after 7 days. Better at 14 days. Best at 3–4 weeks. Keeps for months in the fridge once fermented.',
      proTip: 'The most important thing: keep the cabbage submerged below the brine. Any cabbage above the liquid will mould. Press it down every day for the first week.',
    },
    vinegar: {
      brine: `**For 1kg cabbage:**
• 500ml apple cider vinegar
• 250ml water
• 20g sugar (1 tbsp + 1 tsp)
• 10g salt (2 tsp)
Heat until dissolved.`,
      method: `1. Finely shred cabbage.
2. Place in a large bowl, toss with aromatics.
3. Pack into jars.
4. Pour warm brine over cabbage, pressing down so it absorbs.
5. Cool, seal, refrigerate.`,
      aromatics: `Per 1kg cabbage:
• 1 tsp celery seeds
• 1 tsp mustard seeds
• ½ tsp black peppercorns
• Optional: ½ tsp chili flakes`,
      timeline: 'Ready in 24–48 hours in the fridge. Keeps up to 3 weeks. Great for slaws and tacos.',
      proTip: 'This is not sauerkraut — it\'s a quick-pickled slaw. It won\'t have live cultures, but it\'s crunchy, tangy, and ready in a day. Both have their place.',
    },
  },

  garlic: {
    salt: {
      brine: `**For 1kg garlic cloves:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved.`,
      method: `1. Separate and peel garlic cloves. Keep whole.
2. Pack tightly into jars.
3. Pour cold brine over until fully submerged.
4. Ferment at room temperature, loosely covered.
5. Burp the jar daily for the first week — fermented garlic is very active.`,
      aromatics: `Per 1kg garlic:
• 1 tsp black peppercorns
• 2–3 bay leaves
• Optional: 1 tsp mustard seeds
• Optional: a few sprigs of fresh thyme or rosemary
Note: Garlic is the aromatic here — let it be the star.`,
      timeline: 'Edible at 2 weeks. Good at 30 days. Exceptional at 60+ days. This is a long game pickle.',
      proTip: 'Fermented garlic turns slightly blue or green in the jar — this is completely normal. It\'s a chemical reaction between the allicin and the brine. It\'s safe, and the flavour is extraordinary.',
    },
    vinegar: {
      brine: `**For 1kg garlic cloves:**
• 500ml apple cider vinegar
• 250ml water
• 10g salt (2 tsp)
• 20g honey (1 tbsp)
Heat gently until dissolved.`,
      method: `1. Peel garlic cloves, keep whole.
2. Pack tightly into jars.
3. Pour warm brine over garlic.
4. Cool, seal, refrigerate.`,
      aromatics: `Per 1kg garlic:
• 1 tsp black peppercorns
• 2–3 bay leaves
• Optional: 1 small rosemary sprig
• Optional: ½ tsp chili flakes`,
      timeline: 'Ready in 2 weeks in the fridge. Better at 4 weeks. Keeps up to 6 months.',
      proTip: 'The honey-garlic brine becomes something remarkable after a month — slightly thick, deeply flavoured, and incredible drizzled on cheese or used in salad dressings.',
    },
  },

  asparagus: {
    salt: {
      brine: `**For 1kg asparagus:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved.`,
      method: `1. Wash asparagus. Snap off tough ends (bend until it naturally breaks).
2. Trim to jar height — they should stand upright with 2cm headroom.
3. Pack vertically into jars, tips pointing up.
4. Pour cold brine over until fully submerged.
5. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg asparagus:
• 4 garlic cloves, peeled and halved
• 1 tsp black peppercorns
• 1 tsp mustard seeds
• Optional: ½ tsp chili flakes
• Optional: a few sprigs of fresh tarragon`,
      timeline: 'Ready in 5–10 days at room temperature. Asparagus ferments quickly — taste from day 4.',
      proTip: 'Use a tall jar and pack them standing upright. They look spectacular, ferment evenly, and are easier to pull out without breaking.',
    },
    vinegar: {
      brine: `**For 1kg asparagus:**
• 500ml white vinegar (5% acidity)
• 500ml water
• 20g salt (1 tbsp + 1 tsp)
• 10g sugar (2 tsp)
Heat until dissolved.`,
      method: `1. Snap off tough ends, trim to jar height.
2. Pack vertically into jars with aromatics.
3. Pour hot brine over asparagus.
4. Cool, seal, refrigerate.`,
      aromatics: `Per 1kg asparagus:
• 4 garlic cloves, halved
• 1 tsp black peppercorns
• 1 tsp dill seeds or fresh dill
• ½ tsp chili flakes
• Optional: a few thin lemon slices`,
      timeline: 'Ready in 3–5 days in the fridge. Keeps up to 2 months. Makes an exceptional bloody mary garnish.',
      proTip: 'Add a few thin lemon slices to the jar — the citrus brightens the brine and the asparagus absorbs it beautifully. Magazine-worthy results.',
    },
  },

  bellPepper: {
    salt: {
      brine: `**For 1kg bell peppers:**
• 1L cold water
• 20g non-iodized salt (1 tbsp + 1 tsp)
Stir until dissolved.`,
      method: `1. Wash peppers. Remove core, seeds, and white pith.
2. Cut into strips (2cm wide) or rings.
3. Pack tightly into jars.
4. Pour cold brine over until fully submerged.
5. Ferment at room temperature, loosely covered.`,
      aromatics: `Per 1kg bell peppers:
• 3–4 garlic cloves, peeled and halved
• 1 tsp black peppercorns
• 1 tsp coriander seeds
• 2–3 bay leaves
• Optional: a few sprigs of fresh basil (add after fermentation)`,
      timeline: 'Ready in 5–7 days at room temperature. Mix red, yellow, and orange for a visually stunning jar.',
      proTip: 'Use a mix of colours — red, yellow, and orange peppers all ferment at the same rate and the jar looks incredible. Avoid green peppers alone as they become bitter.',
    },
    vinegar: {
      brine: `**For 1kg bell peppers:**
• 500ml white wine vinegar (or apple cider vinegar)
• 250ml water
• 20g sugar (1 tbsp + 1 tsp)
• 10g salt (2 tsp)
Heat until dissolved.`,
      method: `1. Remove core, seeds, and white pith. Cut into strips or rings.
2. Optional: briefly roast under grill for 5 minutes for smoky-sweet flavour.
3. Pack into jars with aromatics.
4. Pour warm brine over peppers.
5. Cool, seal, refrigerate.`,
      aromatics: `Per 1kg bell peppers:
• 3 garlic cloves, thinly sliced
• 1 tsp black peppercorns
• 1 tsp oregano (dried)
• Optional: ½ tsp chili flakes`,
      timeline: 'Ready in 3–5 days in the fridge. Keeps up to 2 months. Great on sandwiches, pizza, and antipasto boards.',
      proTip: 'A quick 5-minute roast under the grill before pickling transforms the flavour entirely — smoky, sweet, deeply savoury. The extra step is well worth it.',
    },
  },
}
