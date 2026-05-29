import type { Pet, Skill, ElementType, GuideSection, PvPTier } from '@/types';

export const elements: ElementType[] = [
  { id: 'fire', name: 'Fire', color: '#EF4444', bgColor: 'rgba(239,68,68,0.2)', icon: '🔥', strongAgainst: ['grass','ice','bug','steel'], weakAgainst: ['fire','water','rock','dragon'], immuneTo: [] },
  { id: 'water', name: 'Water', color: '#3B82F6', bgColor: 'rgba(59,130,246,0.2)', icon: '💧', strongAgainst: ['fire','rock','ground'], weakAgainst: ['water','grass','dragon'], immuneTo: [] },
  { id: 'grass', name: 'Grass', color: '#22C55E', bgColor: 'rgba(34,197,94,0.2)', icon: '🌿', strongAgainst: ['water','rock','ground'], weakAgainst: ['fire','grass','poison','flying','bug','dragon','steel'], immuneTo: [] },
  { id: 'electric', name: 'Electric', color: '#EAB308', bgColor: 'rgba(234,179,8,0.2)', icon: '⚡', strongAgainst: ['water','flying'], weakAgainst: ['electric','grass','dragon'], immuneTo: ['ground'] },
  { id: 'ice', name: 'Ice', color: '#67E8F9', bgColor: 'rgba(103,232,249,0.2)', icon: '❄️', strongAgainst: ['grass','ground','flying','dragon'], weakAgainst: ['fire','water','ice','steel'], immuneTo: [] },
  { id: 'dragon', name: 'Dragon', color: '#818CF8', bgColor: 'rgba(129,140,248,0.2)', icon: '🐉', strongAgainst: ['dragon'], weakAgainst: ['steel'], immuneTo: [] },
  { id: 'dark', name: 'Dark', color: '#7C3AED', bgColor: 'rgba(124,58,237,0.2)', icon: '🌑', strongAgainst: ['psychic','ghost'], weakAgainst: ['fighting','dark','fairy'], immuneTo: ['psychic'] },
  { id: 'psychic', name: 'Psychic', color: '#F472B6', bgColor: 'rgba(244,114,182,0.2)', icon: '🔮', strongAgainst: ['fighting','poison'], weakAgainst: ['psychic','steel'], immuneTo: [] },
  { id: 'fighting', name: 'Fighting', color: '#B45309', bgColor: 'rgba(180,83,9,0.2)', icon: '👊', strongAgainst: ['normal','ice','rock','dark','steel'], weakAgainst: ['poison','flying','psychic','bug','fairy'], immuneTo: [] },
  { id: 'ghost', name: 'Ghost', color: '#6D28D9', bgColor: 'rgba(109,40,217,0.2)', icon: '👻', strongAgainst: ['psychic','ghost'], weakAgainst: ['dark'], immuneTo: ['normal','fighting'] },
  { id: 'flying', name: 'Flying', color: '#A78BFA', bgColor: 'rgba(167,139,250,0.2)', icon: '🪶', strongAgainst: ['grass','fighting','bug'], weakAgainst: ['electric','rock','steel'], immuneTo: [] },
  { id: 'ground', name: 'Ground', color: '#B45309', bgColor: 'rgba(180,83,9,0.2)', icon: '🌍', strongAgainst: ['fire','electric','poison','rock','steel'], weakAgainst: ['grass','bug'], immuneTo: ['electric'] },
  { id: 'rock', name: 'Rock', color: '#78716C', bgColor: 'rgba(120,113,108,0.2)', icon: '🪨', strongAgainst: ['fire','ice','flying','bug'], weakAgainst: ['fighting','ground','steel'], immuneTo: [] },
  { id: 'bug', name: 'Bug', color: '#84CC16', bgColor: 'rgba(132,204,22,0.2)', icon: '🐛', strongAgainst: ['grass','psychic','dark'], weakAgainst: ['fire','fighting','poison','flying','ghost','steel','fairy'], immuneTo: [] },
  { id: 'poison', name: 'Poison', color: '#A855F7', bgColor: 'rgba(168,85,247,0.2)', icon: '☠️', strongAgainst: ['grass','fairy'], weakAgainst: ['poison','ground','rock','ghost'], immuneTo: [] },
  { id: 'steel', name: 'Steel', color: '#6B7280', bgColor: 'rgba(107,114,128,0.2)', icon: '⚙️', strongAgainst: ['ice','rock','fairy'], weakAgainst: ['fire','water','electric','steel'], immuneTo: ['poison'] },
  { id: 'fairy', name: 'Fairy', color: '#F9A8D4', bgColor: 'rgba(249,168,212,0.2)', icon: '✨', strongAgainst: ['fighting','dragon','dark'], weakAgainst: ['fire','poison','steel'], immuneTo: ['dragon'] },
  { id: 'normal', name: 'Normal', color: '#9CA3AF', bgColor: 'rgba(156,163,175,0.2)', icon: '⭕', strongAgainst: [], weakAgainst: ['rock','steel','ghost'], immuneTo: ['ghost'] },
  { id: 'light', name: 'Light', color: '#FDE047', bgColor: 'rgba(253,224,71,0.2)', icon: '☀️', strongAgainst: ['dark','ghost'], weakAgainst: ['fire','steel'], immuneTo: [] },
];

export const pets: Pet[] = [
  { id: 1, name: 'Spark', element: 'fire', elementColor: '#EF4444', elementBg: 'rgba(239,68,68,0.2)', rarity: 5, image: '/assets/pet-rajiji.png', stats: { hp: 85, attack: 92, defense: 78, speed: 88, magic: 95, resist: 72 }, description: 'One of the three starter pets. This fiery little creature radiates warmth and courage. Its flame burns brighter as it grows stronger.', skills: ['Fierce Impact', 'Flame Charge', 'Power Boost', 'Ember Barrage'], evolution: 'Spark → Inferno → Flame Emperor' },
  { id: 2, name: 'Water Drop', element: 'water', elementColor: '#3B82F6', elementBg: 'rgba(59,130,246,0.2)', rarity: 5, image: '/assets/pet-water-ball.png', stats: { hp: 92, attack: 75, defense: 85, speed: 78, magic: 105, resist: 90 }, description: 'One of the three starter pets. Born from the purest springs of the kingdom. Its crystalline water body shimmers in sunlight.', skills: ['Aqua Pulse', 'Tidal Force', 'Healing Water', 'Deep Vortex'], evolution: 'Water Drop → Aqua Spirit → Ocean Sovereign' },
  { id: 3, name: 'Kitty', element: 'grass', elementColor: '#22C55E', elementBg: 'rgba(34,197,94,0.2)', rarity: 5, image: '/assets/pet-spring-rabbit.png', stats: { hp: 88, attack: 72, defense: 82, speed: 95, magic: 90, resist: 85 }, description: 'One of the three starter pets. A nimble grass-type with leaf-shaped ears. Flowers bloom eternally across its body.', skills: ['Leech Seed', 'Petal Dance', 'Healing Wish', 'Solar Beam'], evolution: 'Kitty → Flora Cat → Magic Cat' },
  { id: 4, name: 'Dream', element: 'light', elementColor: '#FDE047', elementBg: 'rgba(253,224,71,0.2)', rarity: 5, image: '/assets/pet-dream.png', stats: { hp: 90, attack: 102, defense: 83, speed: 83, magic: 120, resist: 89 }, description: 'The iconic Light-type mascot. Known as the "Light Spirit," Dream is the loyal companion of protagonist Locke.', skills: ['Flash Impact', 'Light Cannon', 'Dazzle', 'Saint Light Awakening'], evolution: 'Dream → Saint Light Dream → Royal Saint Light' },
  { id: 5, name: 'Snow Fairy', element: 'ice', elementColor: '#67E8F9', elementBg: 'rgba(103,232,249,0.2)', rarity: 5, image: '/assets/pet-snow-fairy.png', stats: { hp: 88, attack: 85, defense: 82, speed: 95, magic: 110, resist: 90 }, description: 'An elegant ice-type that dances through winter blizzards. Its icy aura can freeze the air around it.', skills: ['Blizzard', 'Ice Fang', 'Absolute Zero', 'Arctic Spike'], evolution: 'Snow Doll → Snow Fairy → Ice Queen' },
  { id: 6, name: 'Inferno', element: 'fire', elementColor: '#EF4444', elementBg: 'rgba(239,68,68,0.2)', rarity: 5, image: '/assets/pet-huahuo.png', stats: { hp: 95, attack: 115, defense: 80, speed: 92, magic: 88, resist: 75 }, description: 'Spark\'s evolved form, cloaked in fierce flames. Its burning fists can melt steel. A top-tier PVP fire attacker.', skills: ['Fire Punch', 'Flame Wing', 'Flare Boost', 'Inferno Strike'], evolution: 'Spark → Inferno → Flame Emperor' },
  { id: 7, name: 'Magic Cat', element: 'grass', elementColor: '#22C55E', elementBg: 'rgba(34,197,94,0.2)', rarity: 5, image: '/assets/pet-magic-cat.png', stats: { hp: 100, attack: 78, defense: 90, speed: 88, magic: 105, resist: 92 }, description: 'Kitty\'s evolved form. A graceful feline with mystical powers. Its tail leaves trails of flower petals.', skills: ['Magic Leaf', 'Sleep Powder', 'Energy Drain', 'Forest Blessing'], evolution: 'Kitty → Magic Cat → Warlock Cat' },
  { id: 8, name: 'Saint Light Dream', element: 'light', elementColor: '#FDE047', elementBg: 'rgba(253,224,71,0.2)', rarity: 5, image: '/assets/pet-dream-evolved.png', stats: { hp: 105, attack: 110, defense: 88, speed: 90, magic: 125, resist: 95 }, description: 'Dream\'s awakened form with sacred light powers. Golden wings and blazing aura inspire hope across the kingdom.', skills: ['Holy Beam', 'Radiant Shield', 'Light Speed', 'Divine Judgment'], evolution: 'Dream → Saint Light Dream → Legendary Light' },
  { id: 9, name: 'Drowsy King', element: 'normal', elementColor: '#9CA3AF', elementBg: 'rgba(156,163,175,0.2)', rarity: 5, image: '/assets/pet-sleepy-king.png', stats: { hp: 130, attack: 105, defense: 95, speed: 45, magic: 60, resist: 92 }, description: 'A legendary Normal-type beast that spends most of its time sleeping. Despite its lazy demeanor, it packs devastating power.', skills: ['Heavy Slam', 'Sleep Talk', 'Snore Blast', 'Lazy Guard'], evolution: 'Drowsy Cub → Drowsy King → Ancient Titan' },
  { id: 10, name: 'Royal Griffin', element: 'flying', elementColor: '#A78BFA', elementBg: 'rgba(167,139,250,0.2)', rarity: 5, image: '/assets/pet-royal-griffin.png', stats: { hp: 92, attack: 108, defense: 78, speed: 115, magic: 82, resist: 80 }, description: 'A majestic Flying-type that rules the skies. Its golden talons and noble bearing make it a symbol of royalty.', skills: ['Sky Dive', 'Wind Blade', 'Royal Roar', 'Aerial Ace'], evolution: 'Griffin Chick → Royal Griffin → Sky Emperor' },
  { id: 11, name: 'Abu', element: 'dragon', elementColor: '#818CF8', elementBg: 'rgba(129,140,248,0.2)', rarity: 5, image: '/assets/pet-abu.png', stats: { hp: 95, attack: 88, defense: 85, speed: 102, magic: 115, resist: 88 }, description: 'A rare Dragon-type companion with mysterious origins. Abu is said to hold the key to ancient dragon powers.', skills: ['Dragon Breath', 'Dragon Claw', 'Dragon Dance', 'Draco Meteor'], evolution: 'Abu → Dragon Lord → Ancient Dragon King' },
  { id: 12, name: 'Sonic Dog', element: 'fire', elementColor: '#EF4444', elementBg: 'rgba(239,68,68,0.2)', rarity: 4, image: '/assets/pet-sonic-dog.png', stats: { hp: 80, attack: 95, defense: 72, speed: 118, magic: 85, resist: 70 }, description: 'An incredibly fast Fire-type runner. Its flaming paws leave scorch marks as it sprints across the open world.', skills: ['Flame Dash', 'Quick Attack', 'Heat Wave', 'Speed Boost'], evolution: 'Puppy → Sonic Dog → Blaze Hound' },
  { id: 13, name: 'Luoyin', element: 'rock', elementColor: '#78716C', elementBg: 'rgba(120,113,108,0.2)', rarity: 5, image: '/assets/pet-luoyin.png', stats: { hp: 110, attack: 125, defense: 105, speed: 55, magic: 65, resist: 95 }, description: 'A colossal Rock/Dark-type with terrifying 636 base stats. Its HP swap ability makes it a PVP nightmare.', skills: ['Stone Edge', 'Dark Pulse', 'HP Swap', 'Iron Defense'], evolution: 'Stone Spirit → Luoyin → Demon King' },
  { id: 14, name: 'Demon Wolf', element: 'dark', elementColor: '#7C3AED', elementBg: 'rgba(124,58,237,0.2)', rarity: 5, image: '/assets/pet-demon-wolf.png', stats: { hp: 85, attack: 120, defense: 70, speed: 110, magic: 95, resist: 68 }, description: 'A fearsome Dark-type whose attack rises by 20% for each fallen ally. In a 1v6, it reaches 100% bonus attack.', skills: ['Night Slash', 'Dark Howl', 'Revenge Fang', 'Shadow Strike'], evolution: 'Dark Pup → Demon Wolf → Alpha Demon' },
  { id: 15, name: 'Lantern Fish', element: 'water', elementColor: '#3B82F6', elementBg: 'rgba(59,130,246,0.2)', rarity: 4, image: '/assets/pet-lantern-fish.png', stats: { hp: 78, attack: 65, defense: 70, speed: 88, magic: 105, resist: 82 }, description: 'A deep-sea Water/Electric-type with bioluminescent abilities. Its electric field stuns prey before they know it.', skills: ['Hydro Pump', 'Thunder Wave', 'Deep Light', 'Spark Surge'], evolution: 'Tiny Fish → Lantern Fish → Abyss Leviathan' },
];

export const skills: Skill[] = [
  { id: 1, name: 'Fierce Impact', element: 'normal', elementColor: '#9CA3AF', power: 40, pp: 30, accuracy: 100, type: 'Physical', description: 'Charge at the enemy with full force. A reliable starter move with consistent damage output.' },
  { id: 2, name: 'Flame Charge', element: 'fire', elementColor: '#EF4444', power: 85, pp: 15, accuracy: 100, type: 'Physical', description: 'Engulf yourself in flames and ram the target. 30% chance to boost Speed by one stage.' },
  { id: 3, name: 'Aqua Pulse', element: 'water', elementColor: '#3B82F6', power: 60, pp: 20, accuracy: 100, type: 'Special', description: 'Launch a pressurized water pulse. High accuracy makes it dependable in any situation.' },
  { id: 4, name: 'Solar Beam', element: 'grass', elementColor: '#22C55E', power: 120, pp: 10, accuracy: 100, type: 'Special', description: 'Gather sunlight and fire a devastating beam. Requires one turn to charge (skip next turn).' },
  { id: 5, name: 'Thunderbolt', element: 'electric', elementColor: '#EAB308', power: 90, pp: 15, accuracy: 100, type: 'Special', description: 'Strike with a powerful bolt of lightning. 10% chance to paralyze the target.' },
  { id: 6, name: 'Shadow Claw', element: 'dark', elementColor: '#7C3AED', power: 70, pp: 15, accuracy: 100, type: 'Physical', description: 'Slash with claws of pure darkness. High critical-hit ratio (increased crit chance).' },
  { id: 7, name: 'Dragon Claw', element: 'dragon', elementColor: '#818CF8', power: 80, pp: 15, accuracy: 100, type: 'Physical', description: 'Rend the target with sharp draconic claws. Staple Dragon-type coverage move.' },
  { id: 8, name: 'Flash Impact', element: 'light', elementColor: '#FDE047', power: 40, pp: 30, accuracy: 100, type: 'Physical', description: 'Strike with blinding speed using light energy. Signature move of Light-type pets.' },
  { id: 9, name: 'Light Cannon', element: 'light', elementColor: '#FDE047', power: 70, pp: 15, accuracy: 100, type: 'Special', description: 'Fire a concentrated beam of light. 10% chance to confuse the target.' },
  { id: 10, name: 'Blizzard', element: 'ice', elementColor: '#67E8F9', power: 110, pp: 5, accuracy: 70, type: 'Special', description: 'Unleash a howling blizzard. 10% chance to freeze the target solid.' },
  { id: 11, name: 'Sheer Cold', element: 'ice', elementColor: '#67E8F9', power: 0, pp: 5, accuracy: 30, type: 'Status', description: 'OHKO move — instantly defeats the target if it lands. Accuracy drops vs higher-level foes.' },
  { id: 12, name: 'Future Sight', element: 'psychic', elementColor: '#F472B6', power: 120, pp: 10, accuracy: 100, type: 'Special', description: 'Foresee and strike with a delayed psychic attack that hits two turns later.' },
  { id: 13, name: 'Dragon Ascent', element: 'dragon', elementColor: '#818CF8', power: 280, pp: 5, accuracy: 100, type: 'Special', description: 'Channel draconic energy for devastating damage. The ultimate Dragon-type nuke.' },
  { id: 14, name: 'Power Boost', element: 'normal', elementColor: '#9CA3AF', power: 0, pp: 20, accuracy: 100, type: 'Status', description: 'Sharply raise your Attack by two stages. Essential setup for physical sweepers.' },
  { id: 15, name: 'Leech Seed', element: 'grass', elementColor: '#22C55E', power: 0, pp: 10, accuracy: 90, type: 'Status', description: 'Plant a seed that drains 1/8 HP each turn and restores your own. Lasts until switch.' },
  { id: 16, name: 'HP Swap', element: 'dark', elementColor: '#7C3AED', power: 0, pp: 5, accuracy: 100, type: 'Status', description: 'Swap HP percentages with the target. Luoyin\'s signature move — a PVP game-changer.' },
  { id: 17, name: 'Flame Dash', element: 'fire', elementColor: '#EF4444', power: 65, pp: 20, accuracy: 100, type: 'Physical', description: 'A blazing charge that always goes first. Priority move for finishing weakened foes.' },
  { id: 18, name: 'Ice Soul Slash', element: 'ice', elementColor: '#67E8F9', power: 95, pp: 10, accuracy: 90, type: 'Physical', description: 'A freezing sword strike that may lower the target\'s Speed by one stage.' },
  { id: 19, name: 'Holy Beam', element: 'light', elementColor: '#FDE047', power: 100, pp: 10, accuracy: 95, type: 'Special', description: 'Unleash a beam of sacred light. Super effective against Dark and Ghost types.' },
  { id: 20, name: 'Snore Blast', element: 'normal', elementColor: '#9CA3AF', power: 100, pp: 10, accuracy: 100, type: 'Special', description: 'A loud snore attack that only works while asleep. Drowsy King\'s devastating secret weapon.' },
];

export const pvpTiers: PvPTier[] = [
  {
    tier: 'S',
    tierName: 'S-Tier: Meta Dominators',
    color: '#EF4444',
    pets: [
      { name: 'Flame Emperor', role: 'Fire Sweeper', element: 'fire', elementColor: '#EF4444', why: 'Highest Fire ATK in game. Permanent dual-attack buff after using fire skills. Mountain Flame Strike one-shots most Water/Ground tanks after stacking.' },
      { name: 'Luoyin', role: 'HP Swap Tank', element: 'rock', elementColor: '#78716C', why: '636 base stats with insane HP/ATK. HP Swap creates impossible situations for opponents. Iron Defense + Stone Edge combo is nearly unbreakable.' },
      { name: 'Sky Emperor', role: 'Speed Sweeper', element: 'flying', elementColor: '#A78BFA', why: '125 base Speed with Gale Rush. Low-cost skills allow buffing and attacking in the same turn. Becomes unstoppable with Wet Mark.' },
    ]
  },
  {
    tier: 'A',
    tierName: 'A-Tier: Strong Picks',
    color: '#F59E0B',
    pets: [
      { name: 'Demon Wolf', role: 'Late-Game Cleaner', element: 'dark', elementColor: '#7C3AED', why: '+20% ATK per fallen ally, up to 100% in 1v6. Priority move ensures it always strikes first. Can one-shot with Revenge Fang at max stacks.' },
      { name: 'Seal Captain', role: 'Fighting Tank', element: 'fighting', elementColor: '#B45309', why: 'Left Hand cuts status skills, Right Hand counters with 100% damage reflection. Hard Gate interrupts attack skills. Gains +20% power per ally reaction.' },
      { name: 'Chess Queen', role: 'Ground Wall', element: 'ground', elementColor: '#B45309', why: 'Absurd defense with Infiltrate ability — gains +5% ATK/DEF for each Ground/Fighting skill used by allies. Evolves to 761 stat Chess King.' },
      { name: 'Saint Light Dream', role: 'Light Nuker', element: 'light', elementColor: '#FDE047', why: '125 base SpA with Holy Beam. Radiant Shield blocks one hit. Divine Judgment deals massive damage to Dark/Ghost meta picks.' },
    ]
  },
  {
    tier: 'B',
    tierName: 'B-Tier: Solid Options',
    color: '#3B82F6',
    pets: [
      { name: 'Blaze Hound', role: 'Fire Scout', element: 'fire', elementColor: '#EF4444', why: 'Extreme Speed lets it scout and finish. Fastest Fire-type runner for open world traversal.' },
      { name: 'Ancient Dragon King', role: 'Dragon Tank', element: 'dragon', elementColor: '#818CF8', why: 'Immortality trait revives after 3 turns. Great defensive pivot with Dragon Breath chip damage.' },
      { name: 'Drowsy King', role: 'Normal Wall', element: 'normal', elementColor: '#9CA3AF', why: '130 base HP with 105 ATK. Snore Blast while asleep catches opponents off guard. Lazy Guard halves incoming damage.' },
      { name: 'Alpha Demon', role: 'Dark Revenge', element: 'dark', elementColor: '#7C3AED', why: 'Night Howl boosts all stats. Shadow Strike has perfect coverage. Frail but hits like a truck.' },
    ]
  },
];

export const guideSections: GuideSection[] = [
  {
    id: 'starter', title: 'Starter Choice', icon: '🥚',
    content: [
      { subtitle: 'Spark (Fire) — The Sweeper', text: 'Highest Attack among starters. Evolves into Flame Emperor with permanent dual-ATK buffs. Recommended natures: Adamant (+ATK -SpA) or Jolly (+Speed -SpA). Best for players who want fast-paced offensive gameplay. Counter: Water and Ground types.' },
      { subtitle: 'Kitty (Grass) — The Sustain', text: 'Best survivability with Leech Seed and Healing Wish. Evolves into Magic Cat with Sleep Powder control. Recommended natures: Modest (+SpA -ATK) or Timid (+Speed -ATK). Ideal for long explorations where healing items are scarce.' },
      { subtitle: 'Water Drop (Water) — The Nuker', text: 'Highest Special Attack among starters. Evolves into Ocean Sovereign with weather-changing skills. Recommended natures: Modest (+SpA -ATK) or Calm (+SpD -ATK). Great for tactical players who like controlling battle conditions.' },
      { subtitle: 'Pro Tip: Catch All Three', text: 'While you can only choose one starter, the other two can be caught in the wild later. Spark appears near Volcano Ridge, Kitty in Whispering Forest, and Water Drop at Sapphire Coast. Visit these areas as soon as you unlock them!' },
    ]
  },
  {
    id: 'pvp', title: 'PVP Strategy', icon: '⚔️',
    content: [
      { subtitle: 'Core Meta Teams', text: 'Sandstorm Martial Team: Luoyin + Seal Captain + Chess Queen. Focus on defense stacking and counter-attacking. Black Horse Spirit Team: Demon Wolf + Shadow Fox + Dark support. Sacrifice early, sweep late. Unicorn System: Saint Light Dream + support pets. Pure Light-type pressure against Dark-heavy meta.' },
      { subtitle: 'Speed Control is Everything', text: 'The turn order determines who buffs first, who attacks first, and who gets to switch. Always check your pet\'s Speed stat against common threats. A Speed advantage of just 1 point can flip an entire match. Use Speed-boosting moves or natures on your sweepers.' },
      { subtitle: 'Switching & Prediction', text: 'Switching costs a turn but can save a pet from a super-effective hit. Good players predict opponent switches and use setup moves (Power Boost, Dragon Dance) during the free turn. Baiting switches by showing a weak pet then swapping to a counter is a high-level technique.' },
      { subtitle: 'Energy Management', text: 'Each skill costs Energy (PP). High-power skills cost more. Running out of energy forces you to use weak Struggle moves. Carry Energy-restoring items and balance high-cost nukes with low-cost spammable moves on each pet.' },
    ]
  },
  {
    id: 'explore', title: 'Open World Secrets', icon: '🗺️',
    content: [
      { subtitle: '25 Hidden Dungeons', text: 'Area 1 (Beginner): Star Bridge Dungeon (walk across the marked bridge), Whisper Barrier (fly directly to the barrier), Box Monster Island (open all boxes on the river island). Area 2: Sea Branch Guardian (near Academy warp), Snow Fairy Boss Dungeon (warp to Snow Fairy boss). Area 3: Blackwater Swamp (fly to the marked circle), Royal Griffin Peak (fly to mountaintop), Dawn Mountain Ore Cave (break the giant crystal with a large pet).' },
      { subtitle: '22 Perfect Talent Eggs', text: 'Store Street Alchemy: Arrange bottles in 3-5 pattern. Crystal House: Find 5 crystal balls in the plaza-facing house. These eggs hatch pets with guaranteed 31 IVs in all stats — the ultimate starting point for competitive breeding!' },
      { subtitle: 'Hidden Pet Spawns', text: 'Duduo Pot: Spawns randomly near alchemy cauldrons — change servers to farm. Memory Stone: Dream Beast Forest — hit the book on the ground. Box Imp: Sanctuary Outpost — interact with boxes on the ground. Flower Butterfly: Fungus Valley — throw a Water pet at the stone statue.' },
      { subtitle: 'Weather & Time Events', text: 'Thunderstorm: Electric-type pets spawn 3x more frequently. Nighttime: Ghost and Dark types emerge. Full Moon: Rare Fairy-type events activate. Use weather-changing skills (Rain Dance, Sunny Day) to force spawns in an area!' },
    ]
  },
  {
    id: 'progression', title: 'Fast Progression', icon: '📈',
    content: [
      { subtitle: 'Level 1-30 in 48 Hours', text: 'Step 1: Rush main story + Magic Handbook courses (biggest early EXP). Step 2: Catch EVERY new pet — each new catch gives +100 EXP, "amazing talent" gives +100 more, evolution gives +600. Step 3: Use Rare Beast Seeds in the Magic Handbook — prioritize pets you haven\'t caught yet. Step 4: Challenge boss pets on the map for massive EXP and rare eggs.' },
      { subtitle: 'Daily Must-Do Checklist', text: '1. Boss challenges (stamina) — best EXP and egg drops. 2. Magic Handbook quests — consistent EXP income. 3. Home battles — 20 daily fights for 5000-6000 EXP each. 4. Roco Grand Voyage — huge洛克贝 rewards. 5. Exchange materials at Jump Market for洛克贝 with Merchant Joba.' },
      { subtitle: 'Breeding Perfect Pets', text: 'Step 1: Catch 2 pets with high IVs in complementary stats. Step 2: Use Perfect Eggs (from hidden dungeons) as base. Step 3: Breed using Nature Fruits to get ideal nature (+10% in key stat). Step 4: Train EVs by battling specific wild pets (each type gives different EVs). Step 5: Equip gear sets — complete sets give powerful passives like heal-per-turn or damage reduction.' },
      { subtitle: 'Currency & Resource Tips', text: '洛克贝: Earn via Grand Voyage, daily quests, and selling crops to Merchant Joba. Pro tip: Farm Energy Hearts in Thunder Canyon and trade them for massive洛克贝. Stamina: Prioritize boss fights and rare pet encounters. Don\'t waste stamina on common pets once caught. VIP: First purchase gives permanent EXP boost — highly recommended for serious players.' },
    ]
  },
];

export const categoryCards = [
  { id: 'pokedex', title: 'Pet Index', subtitle: 'Pokédex', description: '376+ creatures to discover', image: '/assets/pet-dream.png', icon: '🔥', color: '#EF4444' },
  { id: 'skills', title: 'Skill Index', subtitle: 'Skills', description: 'Master every technique', image: '/assets/magic-book.png', icon: '❄️', color: '#67E8F9' },
  { id: 'types', title: 'Type Chart', subtitle: 'Types', description: '20-element matchup system', image: '/assets/element-gem.png', icon: '💎', color: '#818CF8' },
  { id: 'guide', title: 'Game Guide', subtitle: 'Guide', description: 'Pro strategies & secrets', image: '/assets/frost-sword.png', icon: '⚔️', color: '#A78BFA' },
];
