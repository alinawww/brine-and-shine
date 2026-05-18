export type MilestoneType = 'fact' | 'action' | 'ready'

export interface Milestone {
  day: number
  type: MilestoneType
  title: string
  desc: string
  action?: string
}

export const MILESTONES: Record<string, Milestone[]> = {

  // ─── CUSTOM INGREDIENTS ───────────────────────────────────────────

  cucumber: [
    {
      day: 1,
      type: 'fact',
      title: 'Fermentation has begun 🫧',
      desc: 'Tiny bubbles should be forming around the cucumbers. This is CO2 from lactobacillus bacteria — a sign your ferment is alive and active.',
    },
    {
      day: 2,
      type: 'action',
      title: 'Check the brine level',
      desc: 'Cucumbers can float above the brine as fermentation gets active. Make sure everything is still submerged.',
      action: 'Press cucumbers down and ensure they are fully below the brine line. Top up with 2% salt brine if needed.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'The brine is turning cloudy ☁️',
      desc: 'A cloudy brine is a great sign — it means lactobacillus bacteria are thriving. This is completely normal and very different from the clear brine of a vinegar pickle.',
    },
    {
      day: 4,
      type: 'action',
      title: 'First taste test 👅',
      desc: 'Your cucumbers are entering their prime pickling window. Time to see how they\'re developing.',
      action: 'Fish out one cucumber and taste it. It should be pleasantly sour and still crunchy. If too mild, leave for another 2 days.',
    },
    {
      day: 5,
      type: 'fact',
      title: 'Peak fermentation smell 👃',
      desc: 'Your jar smells tangy, garlicky, and a little funky right now. This is normal — the smell mellows once you refrigerate.',
    },
    {
      day: 7,
      type: 'ready',
      title: 'Your dill pickles are ready! 🥒',
      desc: 'Classic fermentation time is up. Move to the fridge to stop fermentation and preserve that perfect sourness.',
    },
  ],

  carrot: [
    {
      day: 1,
      type: 'fact',
      title: 'Fermentation begins 🫧',
      desc: 'Your carrots have started their transformation. The natural sugars in carrot make it a reliable, active ferment.',
    },
    {
      day: 3,
      type: 'action',
      title: 'Check the brine level',
      desc: 'Carrot sticks can rise above the brine. Keep them submerged for even fermentation.',
      action: 'Press carrots down firmly. If any brine has evaporated, top up with 2% salt water (20g salt per 1L).',
    },
    {
      day: 5,
      type: 'fact',
      title: 'The carrots are softening slightly 🥕',
      desc: 'Raw carrots are very firm — fermented carrots should still have a good crunch but with a slight give. This is the texture you\'re aiming for.',
    },
    {
      day: 7,
      type: 'action',
      title: 'Taste test time 👅',
      desc: 'Your carrots should be pleasantly sour and deeply flavoured from the aromatics by now.',
      action: 'Taste one carrot stick. If pleasantly sour and crunchy — move to the fridge. If still too mild, leave 2–3 more days.',
    },
    {
      day: 10,
      type: 'ready',
      title: 'Your fermented carrots are ready! 🥕',
      desc: 'Maximum flavour reached. Refrigerate now to lock in the sourness and preserve the crunch.',
    },
  ],

  jalapeno: [
    {
      day: 1,
      type: 'fact',
      title: 'The brine is already changing colour 🌶️',
      desc: 'Jalapeños release their colour quickly — your brine may already be taking on a green tint. Completely normal.',
    },
    {
      day: 2,
      type: 'action',
      title: 'Burp the jar',
      desc: 'Jalapeños ferment actively and produce significant CO2. The pressure needs releasing.',
      action: 'Open the jar lid briefly to release built-up gas. Do this over the sink — brine may bubble up. Re-seal loosely.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'The heat is already mellowing 🔥',
      desc: 'Fermentation breaks down capsaicin compounds, reducing the raw heat. Your jalapeños will taste spicy but more complex — fruity heat rather than sharp heat.',
    },
    {
      day: 4,
      type: 'action',
      title: 'Burp the jar again + taste test',
      desc: 'Day 4 is usually when jalapeños hit their sweet spot — spicy, sour, garlicky.',
      action: 'Release gas, then taste one slice. The heat should be present but mellowed. If you like it — refrigerate now.',
    },
    {
      day: 6,
      type: 'ready',
      title: 'Your fermented jalapeños are ready! 🌶️',
      desc: 'The fermentation has done its work. Move to the fridge — they\'ll keep improving over the next month.',
    },
  ],

  redOnion: [
    {
      day: 0.04,
      type: 'fact',
      title: 'The colour is already changing 💜',
      desc: 'Red onion reacts almost instantly with acid — your brine is already turning pink within the first hour.',
    },
    {
      day: 1,
      type: 'fact',
      title: 'Brilliant magenta achieved ✨',
      desc: 'By now your onions and brine should be a vivid magenta. The colour comes from anthocyanins in the red onion reacting with the acid.',
    },
    {
      day: 1,
      type: 'action',
      title: 'Ready for a taste test',
      desc: 'Quick-pickled red onions are already good after 24 hours.',
      action: 'Taste a few slices. They should be tangy, slightly sweet, and have lost their raw sharpness. Ready to use immediately.',
    },
    {
      day: 3,
      type: 'ready',
      title: 'Your pickled red onions are at peak flavour! 🧅',
      desc: 'After 3 days the flavour is fully developed — sweet, tangy, deeply pink. Keep refrigerated for up to 3 weeks.',
    },
  ],

  beet: [
    {
      day: 1,
      type: 'fact',
      title: 'Your brine is turning red 🔴',
      desc: 'Beet releases its vivid pigment (betalain) within hours. Your entire jar — brine, garlic, everything — will slowly turn deep ruby red.',
    },
    {
      day: 3,
      type: 'action',
      title: 'Check submersion',
      desc: 'Beet slices can float up and oxidise. Keep them under the brine.',
      action: 'Press beet slices down firmly. Any beet exposed to air will lose its colour and may go soft. Top up brine if needed.',
    },
    {
      day: 5,
      type: 'fact',
      title: 'The garlic has turned pink 🧄',
      desc: 'The garlic cloves in your jar are now pink or even red. This is just beet pigment — they taste incredible and make for a stunning jar.',
    },
    {
      day: 7,
      type: 'action',
      title: 'Taste test 👅',
      desc: 'Fermented beet develops a deep, earthy-sweet sourness unlike anything you can buy.',
      action: 'Taste a slice. It should be tender but not mushy, earthy, sweet, and pleasantly sour. Refrigerate if happy with the flavour.',
    },
    {
      day: 14,
      type: 'ready',
      title: 'Your fermented beets are ready! 🫙',
      desc: 'Full fermentation complete. The colour is deep ruby, the flavour is complex. Refrigerate and enjoy for up to 2 months.',
    },
  ],

  greenBean: [
    {
      day: 1,
      type: 'fact',
      title: 'The dill is doing its thing 🌿',
      desc: 'Your jar already smells like a proper deli — garlicky, herby, and tangy. The dill releases its flavour almost immediately into the brine.',
    },
    {
      day: 2,
      type: 'action',
      title: 'Check that beans are submerged',
      desc: 'Green beans float easily and any exposed bean will go soft and possibly mould.',
      action: 'Press beans down firmly. They should all be below the brine line. If any are floating, tuck them back under or add a weight.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'Tiny bubbles around the beans 🫧',
      desc: 'Your dilly beans are actively fermenting. The bubbles you see around the beans are CO2 — a sign the lactobacillus bacteria are alive and working.',
    },
    {
      day: 5,
      type: 'action',
      title: 'First taste test 👅',
      desc: 'Dilly beans are best when they still have significant crunch.',
      action: 'Pull out one bean and snap it. It should break cleanly (not bend). Taste — garlicky, sour, with a dill finish. If good, refrigerate.',
    },
    {
      day: 7,
      type: 'ready',
      title: 'Your dilly beans are ready! 🫘',
      desc: 'Classic lacto-fermented dilly beans at peak flavour. Refrigerate immediately — they\'ll keep for 2 months.',
    },
  ],

  cauliflower: [
    {
      day: 1,
      type: 'fact',
      title: 'The beet is starting to bleed 🩷',
      desc: 'If you added beetroot, the pink colour has already started to leach into the brine and the nearest cauliflower florets. Watch this space.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'The cauliflower is turning pink 🌸',
      desc: 'By day 2, the beetroot anthocyanins have started turning the cauliflower a soft blush pink. The colour will deepen significantly over the next few days.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'Deep magenta achieved ✨',
      desc: 'Your cauliflower should now be a vivid, deep pink-magenta. This is the Romanian pink cauliflower moment — exactly as intended. Take a photo.',
    },
    {
      day: 5,
      type: 'action',
      title: 'Check the brine level',
      desc: 'Cauliflower florets are porous and absorb significant amounts of brine.',
      action: 'Check that all florets are submerged. Top up with 2% salt brine (20g salt per 1L water) if the level has dropped.',
    },
    {
      day: 7,
      type: 'action',
      title: 'Taste test time 👅',
      desc: 'Fermented cauliflower at day 7 should be deeply sour and intensely flavoured from the brine.',
      action: 'Taste a floret. It should be pleasantly sour, still have some crunch, and taste of all the aromatics. Refrigerate if happy.',
    },
    {
      day: 14,
      type: 'ready',
      title: 'Your pink cauliflower is ready! 🌸',
      desc: 'Full fermentation complete. The colour is stunning, the flavour is complex and sour. Refrigerate for up to 2 months.',
    },
  ],

  radish: [
    {
      day: 1,
      type: 'fact',
      title: 'Fermentation begins 🫧',
      desc: 'Radishes ferment quickly due to their high water content. You may already see small bubbles forming within the first 24 hours.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'The peppery bite is mellowing 🌶️',
      desc: 'Raw radish is aggressively peppery. Fermentation is already breaking down the compounds responsible — by day 3 they\'ll taste completely different.',
    },
    {
      day: 3,
      type: 'action',
      title: 'Taste test — notice the transformation 👅',
      desc: 'This is one of the most dramatic flavour transformations in pickling.',
      action: 'Taste a radish. Compare it to a raw one. The sharp pepper has become mellow, tangy, and almost sweet. If you love it — refrigerate.',
    },
    {
      day: 5,
      type: 'ready',
      title: 'Your fermented radishes are ready! 🌸',
      desc: 'Peak flavour and texture. Refrigerate to stop fermentation. They\'ll keep for 3 weeks in the fridge.',
    },
  ],

  cabbage: [
    {
      day: 1,
      type: 'action',
      title: 'Press the cabbage down',
      desc: 'During the first few days, cabbage rises above its brine as CO2 lifts it. This is the most important daily task.',
      action: 'Press the cabbage down firmly with clean hands or a spoon until brine covers it completely. Do this once a day for the first week.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'Active fermentation is underway 🫧',
      desc: 'You\'ll see bubbles rising and the cabbage smells sharply tangy. This is peak CO2 production — the lactobacillus bacteria are working hard.',
    },
    {
      day: 3,
      type: 'action',
      title: 'Daily press + burp check',
      desc: 'The most active fermentation phase. Press daily, check for any cabbage above the brine.',
      action: 'Press down firmly. If using a sealed jar, open briefly to release gas. Check that no cabbage is exposed to air — this is where mould starts.',
    },
    {
      day: 5,
      type: 'fact',
      title: 'The smell is intense right now 👃',
      desc: 'Your sauerkraut smells powerfully funky at this stage. This is normal — the volatile compounds producing the smell will mellow once refrigerated.',
    },
    {
      day: 7,
      type: 'action',
      title: 'First taste test 👅',
      desc: 'Week one sauerkraut is young and lightly sour — some people love this stage.',
      action: 'Taste the cabbage. If pleasantly sour and you like the flavour — refrigerate now. For deeper, more complex sauerkraut, leave for another week.',
    },
    {
      day: 14,
      type: 'action',
      title: 'Two-week taste test 👅',
      desc: 'Two-week sauerkraut is significantly more sour and complex than week one.',
      action: 'Taste again. This is the classic sauerkraut flavour. Refrigerate if happy — or leave up to 4 weeks for a deeply sour, traditional style.',
    },
    {
      day: 21,
      type: 'ready',
      title: 'Your sauerkraut is ready! 🥬',
      desc: 'Three weeks gives you deeply sour, complex, traditionally flavoured sauerkraut. Refrigerate and it will keep for months.',
    },
  ],

  garlic: [
    {
      day: 3,
      type: 'fact',
      title: 'The brine is turning cloudy ☁️',
      desc: 'Garlic ferments slowly but steadily. A cloudy brine means the lactobacillus bacteria are active — exactly what you want.',
    },
    {
      day: 7,
      type: 'fact',
      title: 'Some cloves may be turning blue or green 💙',
      desc: 'Don\'t panic — this is a well-documented reaction between garlic\'s allicin and the acidic brine. It\'s completely safe and the flavour is unaffected. Many fermenters consider it a sign of a healthy ferment.',
    },
    {
      day: 14,
      type: 'action',
      title: 'Two-week check',
      desc: 'Garlic ferments slowly — don\'t be tempted to rush it.',
      action: 'Taste one clove. It should still taste strongly of raw garlic but with a slight sourness. This is still early. Leave it.',
    },
    {
      day: 30,
      type: 'action',
      title: 'One-month taste test 👅',
      desc: 'At 30 days, the transformation has really begun.',
      action: 'Taste a clove. The sharpness should be significantly mellowed — nuttier, more mellow, with a sour depth. It\'s good now. But wait longer if you can.',
    },
    {
      day: 45,
      type: 'fact',
      title: 'Getting close to extraordinary 🧄',
      desc: 'At 45 days, fermented garlic is approaching something genuinely special. The allicin has broken down, leaving a complex, nutty, deeply savoury flavour.',
    },
    {
      day: 60,
      type: 'ready',
      title: 'Your fermented garlic is ready! 🧄',
      desc: '60-day fermented garlic is extraordinary — nutty, mellow, and deeply complex. Refrigerate now and use within 6 months.',
    },
  ],

  asparagus: [
    {
      day: 1,
      type: 'fact',
      title: 'The brine is taking on colour 💚',
      desc: 'Asparagus releases chlorophyll into the brine quickly — by day 1 your brine may have a slight green tint.',
    },
    {
      day: 3,
      type: 'action',
      title: 'Check submersion',
      desc: 'Asparagus tips are delicate and can go soft if they float above the brine.',
      action: 'Make sure all spears are fully submerged, tips included. Add a weight if needed. The tips are the most delicious part — protect them.',
    },
    {
      day: 5,
      type: 'action',
      title: 'First taste test 👅',
      desc: 'Asparagus pickles relatively quickly and is best when still firm.',
      action: 'Snap a spear — it should break cleanly. Taste the tip. It should be tangy, garlicky, and still crunchy. If good, refrigerate.',
    },
    {
      day: 10,
      type: 'ready',
      title: 'Your pickled asparagus is ready! 🌱',
      desc: 'Peak fermentation. The spears are sour, garlicky, and deeply flavoured. Refrigerate immediately — they\'re perfect for bloody marys.',
    },
  ],

  bellPepper: [
    {
      day: 1,
      type: 'fact',
      title: 'The brine is already colouring 🌈',
      desc: 'Bell peppers release their pigments quickly — red peppers will already be tinting your brine orange-red within the first day.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'The sweetness is transforming 🫑',
      desc: 'Raw bell pepper is sweet and slightly grassy. Fermentation is breaking down those sugars — the result will be a more complex, deeper sweetness with added tang.',
    },
    {
      day: 3,
      type: 'action',
      title: 'Check submersion',
      desc: 'Pepper slices float easily and oxidise quickly when exposed to air.',
      action: 'Press pepper slices down firmly. Add a small weight if needed. Any pepper above the brine will go soft and grey.',
    },
    {
      day: 5,
      type: 'action',
      title: 'Taste test 👅',
      desc: 'Fermented bell pepper at day 5 should be sweet, tangy, and deeply flavoured.',
      action: 'Taste a strip. It should be tender but not mushy, sweet-sour, and taste of all the aromatics. If good — refrigerate.',
    },
    {
      day: 7,
      type: 'ready',
      title: 'Your fermented bell peppers are ready! 🫑',
      desc: 'Full fermentation complete. Refrigerate now — they\'ll keep for 2 months and improve further over the first week in the fridge.',
    },
  ],

  // ─── READY MADE RECIPES ───────────────────────────────────────────

  sauerkraut: [
    {
      day: 1,
      type: 'action',
      title: 'Press the cabbage down',
      desc: 'The most critical daily task in week one. CO2 lifts the cabbage above the brine — keep it submerged.',
      action: 'Press cabbage down firmly until brine covers it. Check that no cabbage is exposed to air. Do this every day for the first week.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'The smell is getting funky 👃',
      desc: 'That sharp, tangy, slightly sulfurous smell is perfectly normal. Your sauerkraut is fermenting actively. It will mellow significantly once refrigerated.',
    },
    {
      day: 3,
      type: 'action',
      title: 'Daily press — most important week',
      desc: 'Days 2–5 are peak CO2 production. Daily pressing is essential.',
      action: 'Press down firmly. If any surface mould appears (white/grey film on top), scrape it off — the sauerkraut underneath is fine.',
    },
    {
      day: 7,
      type: 'action',
      title: 'One week taste test 👅',
      desc: 'Week-one sauerkraut is lightly sour and still quite crunchy.',
      action: 'Taste a small amount. If you like the flavour at this stage, refrigerate now. For classic sauerkraut, continue for another week.',
    },
    {
      day: 14,
      type: 'action',
      title: 'Two week taste test 👅',
      desc: 'Two-week sauerkraut is noticeably more sour and complex.',
      action: 'Taste again. This is classic sauerkraut territory. Refrigerate if happy, or continue to 3–4 weeks for a deeply sour traditional style.',
    },
    {
      day: 28,
      type: 'ready',
      title: 'Your sauerkraut is ready! 🥬',
      desc: 'Four weeks of fermentation gives you a deeply sour, traditionally flavoured sauerkraut. Refrigerate and it will keep for months.',
    },
  ],

  kimchi: [
    {
      day: 1,
      type: 'action',
      title: 'Burp the jar',
      desc: 'Kimchi ferments very actively in the first 48 hours and produces significant CO2.',
      action: 'Open the jar and press the kimchi down firmly — brine should rise above the vegetables. Close loosely to allow gas to escape.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'The gochugaru is deepening 🌶️',
      desc: 'The chili colour is intensifying throughout the jar. The garlic and ginger are starting to ferment together — this is where kimchi\'s complex flavour begins.',
    },
    {
      day: 2,
      type: 'action',
      title: 'Burp and press again',
      desc: 'Peak CO2 production day — press firmly to keep vegetables submerged.',
      action: 'Press kimchi down until brine rises above vegetables. Taste a small amount — it should already be slightly sour and fizzy on the tongue.',
    },
    {
      day: 5,
      type: 'fact',
      title: 'Your kimchi is now "geotjeori" age 🥬',
      desc: 'Fresh (geotjeori) kimchi is lightly fermented, still crunchy, with a bright flavour. Many Koreans prefer this stage for eating with rice.',
    },
    {
      day: 7,
      type: 'action',
      title: 'Move to the fridge',
      desc: 'For fresh kimchi with crunch and bright flavour, refrigerate now.',
      action: 'If you prefer fresh-style kimchi, refrigerate at day 7. For deeper, more sour aged kimchi (ideal for cooking), leave at room temperature for up to 14 days.',
    },
    {
      day: 14,
      type: 'ready',
      title: 'Your kimchi is fully fermented! 🌶️',
      desc: 'Two-week kimchi is deeply sour and perfect for kimchi fried rice, jjigae (stew), and pancakes. Refrigerate immediately.',
    },
  ],

  'romanian-pink-cauliflower': [
    {
      day: 1,
      type: 'fact',
      title: 'The beet is starting to bleed 🩷',
      desc: 'The beetroot is already releasing its anthocyanins into the brine. The liquid around the beet slices will be distinctly pink within hours.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'The cauliflower is blushing 🌸',
      desc: 'The florets closest to the beet are already turning pink. Over the next 2 days the entire jar will transform into something visually spectacular.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'Deep magenta — take a photo 📸',
      desc: 'This is the Romanian pink cauliflower moment. The entire jar — cauliflower, garlic, celery — is now a vivid magenta. This is exactly right.',
    },
    {
      day: 5,
      type: 'action',
      title: 'Check the brine level',
      desc: 'Cauliflower is very porous and absorbs brine quickly.',
      action: 'Check that all florets are submerged. Top up with 2% salt brine if the level has dropped. The colour indicates good fermentation.',
    },
    {
      day: 7,
      type: 'action',
      title: 'Taste test 👅',
      desc: 'At day 7, Romanian pink cauliflower should be pleasantly sour and deeply flavoured.',
      action: 'Taste a floret. It should be pleasantly sour, still have some crunch, and be beautifully pink all the way through. Refrigerate if happy.',
    },
    {
      day: 14,
      type: 'ready',
      title: 'Your Romanian pink cauliflower is ready! 🌸',
      desc: 'Full fermentation complete. The colour is stunning, the flavour is complex. Refrigerate and it keeps for 2 months.',
    },
  ],

  'ogorki-kiszone': [
    {
      day: 1,
      type: 'fact',
      title: 'The dill and garlic are infusing 🌿',
      desc: 'The aromatics are already releasing into the brine — you can smell the dill and garlic working. This is the foundation of the classic Polish dill pickle.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'The brine is turning cloudy ☁️',
      desc: 'Cloudy brine is a hallmark of authentic lacto-fermented pickles. This is what separates ogórki kiszone from a vinegar pickle — it\'s alive.',
    },
    {
      day: 3,
      type: 'action',
      title: 'Check submersion + taste test',
      desc: 'Day 3 ogórki kiszone is already at a young pickle stage — tangy and garlicky.',
      action: 'Press cucumbers down. Taste one — if you like young, lightly sour pickles (małosolne style), refrigerate now. For classic sour pickle, continue.',
    },
    {
      day: 5,
      type: 'action',
      title: 'Classic sourness check 👅',
      desc: 'Day 5 is when ogórki kiszone reaches traditional sourness.',
      action: 'Taste a cucumber. It should be sour, garlicky, with a dill finish — and still very crunchy. This is the classic Polish dill pickle. Refrigerate.',
    },
    {
      day: 7,
      type: 'ready',
      title: 'Your ogórki kiszone are ready! 🥒',
      desc: 'Traditional Polish dill pickles at full flavour. Refrigerate immediately — they keep for months and improve further in the fridge.',
    },
  ],

  takuan: [
    {
      day: 2,
      type: 'fact',
      title: 'The daikon is changing colour 💛',
      desc: 'Turmeric in the brine is already working — the daikon is starting to turn yellow. Traditional takuan gets its colour from gardenia fruit, but turmeric is the modern approach.',
    },
    {
      day: 4,
      type: 'fact',
      title: 'Deep golden yellow achieved ☀️',
      desc: 'Your takuan is now a vivid yellow — this is exactly right. The colour will continue to deepen over the next week.',
    },
    {
      day: 7,
      type: 'action',
      title: 'First taste test 👅',
      desc: 'Takuan at one week should be starting to develop its characteristic sweet-sour flavour.',
      action: 'Taste a piece. It should be firm, slightly sweet, and gently sour. If still too mild, leave for another week.',
    },
    {
      day: 14,
      type: 'ready',
      title: 'Your takuan is ready! 💛',
      desc: 'Two-week takuan has developed its classic flavour — sweet, sour, and deeply savoury. Refrigerate and enjoy with rice or bento.',
    },
  ],

  curtido: [
    {
      day: 0.5,
      type: 'fact',
      title: 'Already wilting and smelling great 🥬',
      desc: 'The salt and acid are drawing water out of the cabbage and carrots within hours. The jar is already starting to smell like a proper Salvadoran accompaniment.',
    },
    {
      day: 1,
      type: 'action',
      title: 'Ready for a taste test',
      desc: 'Curtido can be eaten after just 24 hours for a fresh, crunchy result.',
      action: 'Taste a small amount. For fresh-style curtido (like most Salvadoran restaurants serve), it\'s ready now. For more fermented depth, leave for 2 more days.',
    },
    {
      day: 3,
      type: 'ready',
      title: 'Your curtido is ready! 🌮',
      desc: 'Three-day curtido has developed a pleasant sourness while retaining crunch. Perfect with pupusas, tacos, or grilled meats.',
    },
  ],

  torshi: [
    {
      day: 7,
      type: 'fact',
      title: 'The spices are infusing 🌿',
      desc: 'After one week, the fenugreek, mint, and coriander have begun to deeply infuse the vegetables. The aroma from the jar should already be remarkable.',
    },
    {
      day: 14,
      type: 'fact',
      title: 'The vegetables are softening and deepening in colour',
      desc: 'Two-week torshi vegetables are taking on the colour of the turmeric and herbs. The flavour is starting to develop but still young.',
    },
    {
      day: 21,
      type: 'action',
      title: 'Three-week taste test 👅',
      desc: 'Torshi is traditionally aged for much longer, but a three-week taste test shows you the direction.',
      action: 'Taste a piece of cauliflower. It should be tangy, herby, and starting to develop the complexity that makes torshi so special. Leave for much longer.',
    },
    {
      day: 42,
      type: 'action',
      title: 'Six-week taste test 👅',
      desc: 'Six-week torshi is approaching the minimum traditional aging time.',
      action: 'Taste again. The flavour has deepened considerably — herby, sour, complex. If you like it now, refrigerate. For traditional torshi, leave for 2–3 more months.',
    },
    {
      day: 56,
      type: 'ready',
      title: 'Your torshi is ready! 🏺',
      desc: 'Eight weeks gives you a genuinely traditional torshi. Refrigerate — or leave to age further. Persian families age theirs for 6–12 months.',
    },
  ],

  'pao-cai': [
    {
      day: 1,
      type: 'fact',
      title: 'The Sichuan peppercorns are numbing the brine 🌶️',
      desc: 'Hydroxy-alpha-sanshool from the Sichuan peppercorns is already infusing the brine. Your pao cai will have the characteristic mala (numbing-spicy) quality.',
    },
    {
      day: 2,
      type: 'action',
      title: 'First taste test',
      desc: 'Pao cai can be eaten young — fresh vegetables in a mala brine is already excellent.',
      action: 'Taste a piece of radish or carrot. It should be crunchy, tangy, and numbing. This is the young pao cai stage — delicious. Add new vegetables as you remove some.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'The living brine is established 🫙',
      desc: 'By day 3, the brine is alive with beneficial bacteria. This is the foundation of the Sichuan pao cai tradition — the brine is the real treasure, passed down for generations.',
    },
    {
      day: 5,
      type: 'ready',
      title: 'Your pao cai is ready — and the brine lives on! 🥢',
      desc: 'Remove and eat the vegetables. Add new ones — they\'ll be ready in 1–2 days in the established brine. Never let the brine go empty.',
    },
  ],

  shibazuke: [
    {
      day: 1,
      type: 'fact',
      title: 'The red shiso is working its magic 💜',
      desc: 'Red shiso leaves contain anthocyanins that are already turning the brine purple. Within 48 hours the entire jar will be a vivid purple-magenta.',
    },
    {
      day: 2,
      type: 'fact',
      title: 'Spectacular purple achieved 🫙',
      desc: 'Your shibazuke is now the colour of Kyoto\'s famous purple pickles. The cucumber and eggplant have absorbed the shiso pigment. This is exactly right.',
    },
    {
      day: 5,
      type: 'action',
      title: 'Taste test 👅',
      desc: 'Shibazuke should be delicate, slightly sour, and deeply purple.',
      action: 'Taste a piece of cucumber. It should be tender, subtly sour, with the distinctive floral quality of red shiso. Refrigerate if happy.',
    },
    {
      day: 14,
      type: 'ready',
      title: 'Your shibazuke is ready! 💜',
      desc: 'Kyoto-style shibazuke at its best — purple, delicate, and unlike anything else. Refrigerate and enjoy within 2 weeks.',
    },
  ],

  tursu: [
    {
      day: 1,
      type: 'fact',
      title: 'The chickpeas are working 🫘',
      desc: 'Traditional Turkish turşu uses chickpeas to kickstart fermentation — they release wild yeasts and bacteria that jump-start the lacto-fermentation process.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'Actively fermenting 🫧',
      desc: 'You should see good bubble activity by day 3. The garlic and chili are infusing the brine — the smell should be garlicky, tangy, and inviting.',
    },
    {
      day: 5,
      type: 'action',
      title: 'Taste test 👅',
      desc: 'Turşu is traditionally eaten at various stages — young and crunchy is popular.',
      action: 'Taste a cucumber or pepper. It should be pleasantly sour, garlicky, and crunchy. If you like it — refrigerate. For more sourness, leave up to 14 days.',
    },
    {
      day: 14,
      type: 'ready',
      title: 'Your turşu is ready! 🧄',
      desc: 'Two-week turşu has developed classic Turkish pickle flavour — garlicky, sour, slightly spicy. Refrigerate and enjoy for up to 2 months.',
    },
  ],

  'gajar-gobhi-shalgam': [
    {
      day: 1,
      type: 'fact',
      title: 'The mustard oil is doing its thing 🌿',
      desc: 'Mustard oil creates a protective layer that prevents bad bacteria while allowing beneficial fermentation. The smell is pungent and distinctive — this is traditional.',
    },
    {
      day: 2,
      type: 'action',
      title: 'Move to sunlight',
      desc: 'Traditional gajar gobhi shalgam is sun-fermented — the warmth accelerates fermentation dramatically.',
      action: 'Place the jar in direct sunlight for 4–6 hours today. Bring inside at night. Repeat for the next 2 days.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'The turmeric is deepening everything golden ☀️',
      desc: 'Turmeric has turned the mustard oil and vegetables a vivid golden yellow. The colour is stunning and the anti-inflammatory compounds are infusing throughout.',
    },
    {
      day: 5,
      type: 'action',
      title: 'Taste test 👅',
      desc: 'Sun-fermented North Indian pickle at day 5 should be tangy, mustardy, and warming.',
      action: 'Taste a piece of carrot. It should be tangy, pungent with mustard, and have a warming heat from the chili. Refrigerate if happy.',
    },
    {
      day: 5,
      type: 'ready',
      title: 'Your gajar gobhi shalgam is ready! ☀️',
      desc: 'Traditional North Indian winter pickle at full flavour. The mustard oil and turmeric have done their work. Refrigerate and enjoy.',
    },
  ],

  'romanian-mixed-pickles': [
    {
      day: 1,
      type: 'fact',
      title: 'The horseradish is already pungent 🌿',
      desc: 'Horseradish releases its characteristic sharp compounds quickly — your brine already smells powerfully of horseradish and dill. This is the foundation of murături.',
    },
    {
      day: 3,
      type: 'fact',
      title: 'The watermelon rind is changing 🍉',
      desc: 'Watermelon rind goes from bright white to slightly translucent as it ferments. It absorbs the brine beautifully and becomes one of the most interesting elements in the jar.',
    },
    {
      day: 5,
      type: 'action',
      title: 'Check all vegetables are submerged',
      desc: 'Mixed pickles with many different vegetables can create uneven submersion.',
      action: 'Press everything down firmly. Check the green tomatoes especially — they float easily. Top up with 2% salt brine if the level has dropped.',
    },
    {
      day: 10,
      type: 'action',
      title: 'First taste test 👅',
      desc: 'Ten-day murături is developing the classic Romanian mixed pickle flavour.',
      action: 'Taste a piece of cauliflower and a green tomato. Both should be pleasantly sour and deeply flavoured with horseradish and dill. Refrigerate if happy.',
    },
    {
      day: 14,
      type: 'fact',
      title: 'The green tomatoes are fully transformed 🍅',
      desc: 'Green tomatoes are one of the great pickling vegetables — firm enough to hold their shape but deeply sour and complex after two weeks. They\'re the star of murături.',
    },
    {
      day: 21,
      type: 'ready',
      title: 'Your murături asortate are ready! 🫙',
      desc: 'Three weeks gives you traditional Romanian mixed winter pickles at full flavour. Refrigerate — they keep for months and are a true taste of Romanian tradition.',
    },
  ],
}
