const products = [
  { id: "chips", name: "Paprika chips", type: "snack", basePrice: 590, price: 590, baseCost: 170, color: "#d05f45", elasticity: 1.18 },
  { id: "bar", name: "Chocolate bar", type: "snack", basePrice: 490, price: 490, baseCost: 120, color: "#7c5f46", elasticity: 1.08 },
  { id: "nuts", name: "Nut mix", type: "snack", basePrice: 720, price: 720, baseCost: 225, color: "#e6b84c", elasticity: 0.95 },
  { id: "cola", name: "Cold cola", type: "drink", basePrice: 650, price: 650, baseCost: 175, color: "#426f9d", elasticity: 1.12 },
  { id: "water", name: "Mineral water", type: "drink", basePrice: 390, price: 390, baseCost: 65, color: "#207a81", elasticity: 1.28 },
  { id: "energy", name: "Energy drink", type: "drink", basePrice: 790, price: 790, baseCost: 250, color: "#2a3040", elasticity: 0.9 },
  { id: "espresso", name: "Espresso", type: "coffee", basePrice: 520, price: 520, baseCost: 58, color: "#5c4433", elasticity: 0.82 },
  { id: "latte", name: "Latte", type: "coffee", basePrice: 690, price: 690, baseCost: 118, color: "#b98b60", elasticity: 0.88 },
  { id: "sandwich", name: "Ham sandwich", type: "fresh", basePrice: 1190, price: 1190, baseCost: 350, color: "#4f9d78", elasticity: 1.05 },
  { id: "salad", name: "Fresh salad", type: "fresh", basePrice: 1390, price: 1390, baseCost: 430, color: "#6fa64d", elasticity: 1.0 }
];

const machineTypes = {
  snack: { label: "Snack machine", starter: "SnackBox 120", capacity: 20, buyCost: 56000, upkeep: 560, demand: 1.08 },
  drink: { label: "Drink machine", starter: "HydroVend 8", capacity: 18, buyCost: 64000, upkeep: 680, demand: 1.16 },
  coffee: { label: "Coffee machine", starter: "BeanStation", capacity: 24, buyCost: 72000, upkeep: 760, demand: 1.0 },
  fresh: { label: "Fresh food machine", starter: "FreshMate", capacity: 14, buyCost: 86000, upkeep: 980, demand: 0.92 }
};

const locations = {
  campus: { label: "Campus lobby", demand: 1.18, upkeep: 430, theft: 0.95, security: 72, clean: 1.18, eventBias: "crowd" },
  office: { label: "Office tower", demand: 1.0, upkeep: 760, theft: 0.7, security: 88, clean: 0.88, eventBias: "routine" },
  station: { label: "Train station", demand: 1.34, upkeep: 260, theft: 1.45, security: 42, clean: 1.45, eventBias: "chaos" },
  gym: { label: "Fitness club", demand: 1.08, upkeep: 620, theft: 0.78, security: 82, clean: 1.05, eventBias: "sport" },
  mall: { label: "Shopping mall", demand: 1.26, upkeep: 390, theft: 1.05, security: 64, clean: 1.16, eventBias: "crowd" }
};

const locationEvents = [
  { name: "Exam week", bias: "crowd", chance: 0.12, productIds: ["bar", "chips", "cola"], multiplier: 1.3, duration: 2, text: "Exam week: students buy more chocolate, chips, and cola while pretending this is a study plan." },
  { name: "Company remote week", bias: "routine", chance: 0.1, productIds: ["espresso", "latte", "sandwich"], multiplier: 0.74, duration: 2, text: "Remote week: fewer office workers means weaker coffee and lunch demand." },
  { name: "Train delay wave", bias: "chaos", chance: 0.13, productIds: ["cola", "water", "chips"], multiplier: 1.34, duration: 2, text: "Train delays: waiting passengers buy more drinks and small snacks." },
  { name: "Maintenance noise", bias: "chaos", chance: 0.08, productIds: ["espresso", "latte", "sandwich", "salad"], multiplier: 0.72, duration: 1, text: "Maintenance noise nearby reduces slow lunch and coffee purchases." },
  { name: "Sports tournament", bias: "sport", chance: 0.11, productIds: ["energy", "water", "nuts"], multiplier: 1.32, duration: 2, text: "Sports tournament: water, energy drinks, and nut mix demand rises." },
  { name: "Slow morning", bias: "any", chance: 0.05, productIds: ["espresso", "latte"], multiplier: 1.18, duration: 1, text: "Slow morning: coffee demand gets a small bump." },
  { name: "Mall family rush", bias: "crowd", chance: 0.08, productIds: ["chips", "bar", "cola"], multiplier: 1.24, duration: 1, text: "Family crowd at the mall lifts snack and cola demand." },
  { name: "Office wellness memo", bias: "routine", chance: 0.07, productIds: ["salad", "water", "nuts"], multiplier: 1.24, duration: 2, text: "Office wellness memo: salad, water, and nuts get a short demand lift." },
  { name: "Platform lunch chatter", bias: "chaos", chance: 0.07, productIds: ["sandwich"], multiplier: 1.26, duration: 1, text: "Good word of mouth at the platform increases sandwich demand." },
  { name: "Gym hydration board", bias: "sport", chance: 0.08, productIds: ["water"], multiplier: 1.38, duration: 2, text: "The gym highlights hydration, raising water demand." }
];

const supplyEvents = [
  { name: "Chip factory strike", productIds: ["chips"], multiplier: 1.45, duration: 3, chance: 0.1, text: "Chip factory strike: chips wholesale cost rises." },
  { name: "Coffee harvest surplus", productIds: ["espresso", "latte"], multiplier: 0.78, duration: 3, chance: 0.09, text: "Coffee harvest surplus: espresso and latte wholesale costs fall." },
  { name: "Bottle shortage", productIds: ["cola", "water", "energy"], multiplier: 1.24, duration: 2, chance: 0.08, text: "Bottle shortage: bottled drink wholesale costs rise." },
  { name: "Bakery overproduction", productIds: ["sandwich"], multiplier: 0.82, duration: 2, chance: 0.08, text: "Bakery overproduction: sandwich wholesale cost drops." },
  { name: "Leafy logistics delay", productIds: ["salad"], multiplier: 1.3, duration: 2, chance: 0.07, text: "Leafy logistics delay: salad wholesale cost rises." },
  { name: "Nut importer discount", productIds: ["nuts"], multiplier: 0.84, duration: 3, chance: 0.07, text: "Nut importer discount: nut mix wholesale cost drops." },
  { name: "Cocoa shortage", productIds: ["bar"], multiplier: 1.22, duration: 2, chance: 0.08, text: "Cocoa shortage: chocolate bar wholesale cost rises." },
  { name: "Snack supplier promotion", productIds: ["chips", "bar", "nuts"], multiplier: 0.88, duration: 2, chance: 0.07, text: "Snack supplier promotion: snack wholesale costs fall." },
  { name: "Refrigerated truck delay", productIds: ["sandwich", "salad"], multiplier: 1.35, duration: 2, chance: 0.07, text: "Refrigerated truck delay: fresh food wholesale costs rise." },
  { name: "Local roaster promo", productIds: ["espresso", "latte"], multiplier: 0.72, duration: 2, chance: 0.06, text: "Local roaster promo: coffee wholesale costs fall." },
  { name: "Sugar tax rumor", productIds: ["cola", "energy", "bar"], multiplier: 1.16, duration: 3, chance: 0.06, text: "Sugar tax rumor: sweet drink and chocolate wholesale costs rise." },
  { name: "Water plant maintenance", productIds: ["water"], multiplier: 1.4, duration: 2, chance: 0.06, text: "Water plant maintenance: water wholesale cost rises." },
  { name: "Clearance pallet sale", productIds: ["energy", "cola"], multiplier: 0.78, duration: 2, chance: 0.06, text: "Clearance pallet sale: cola and energy drink wholesale costs fall." },
  { name: "Packaging cost increase", productIds: ["chips", "nuts", "bar"], multiplier: 1.18, duration: 2, chance: 0.06, text: "Packaging cost increase: snack wholesale costs rise." },
  { name: "Farmers market glut", productIds: ["salad", "sandwich"], multiplier: 0.82, duration: 2, chance: 0.06, text: "Farmers market glut: fresh food wholesale costs fall." },
  { name: "Import paperwork delay", productIds: ["nuts", "espresso", "latte"], multiplier: 1.24, duration: 2, chance: 0.05, text: "Import paperwork delay: nut and coffee wholesale costs rise." }
];

const demandEvents = [
  { name: "Influencer crunch clip", productIds: ["chips"], multiplier: 1.55, duration: 2, chance: 0.09, text: "An influencer made a crunch-review video. Paprika chips are suddenly a personality trait." },
  { name: "Hydration challenge", productIds: ["water"], multiplier: 1.42, duration: 2, chance: 0.08, text: "A hydration challenge is trending. Water has become fashionable, briefly." },
  { name: "Energy drink scare", productIds: ["energy"], multiplier: 0.62, duration: 2, chance: 0.07, text: "A gloomy article about energy drinks is circulating. Demand takes a tiny nap." },
  { name: "Latte art microtrend", productIds: ["latte"], multiplier: 1.38, duration: 3, chance: 0.08, text: "Latte art is trending again. Nobody can draw a leaf, but everyone wants one." },
  { name: "Sandwich meme", productIds: ["sandwich"], multiplier: 1.45, duration: 2, chance: 0.08, text: "A sandwich meme escaped containment. Ham sandwich demand gets weirdly powerful." },
  { name: "Salad skepticism", productIds: ["salad"], multiplier: 0.7, duration: 2, chance: 0.06, text: "A viral post asks if salad is just crunchy weather. Salad demand wobbles." },
  { name: "Chocolate comfort wave", productIds: ["bar"], multiplier: 1.32, duration: 2, chance: 0.08, text: "The internet collectively needed a little chocolate. Bars move faster today." },
  { name: "Coffee backlash", productIds: ["espresso", "latte"], multiplier: 0.74, duration: 2, chance: 0.06, text: "A sleep guru said coffee is 'just bean anxiety'. Coffee demand dips." },
  { name: "Office all-nighter", productIds: ["espresso", "latte", "energy"], multiplier: 1.46, duration: 2, chance: 0.07, text: "An office all-nighter broke out. Coffee and energy drinks are suddenly essential infrastructure." },
  { name: "Snack review blog", productIds: ["nuts", "chips", "bar"], multiplier: 1.28, duration: 2, chance: 0.07, text: "A snack review blog ranked your category. Everyone is now a tiny critic with coins." },
  { name: "Dental awareness week", productIds: ["bar", "cola", "energy"], multiplier: 0.72, duration: 2, chance: 0.06, text: "Dental awareness week arrived. Sweet drinks and chocolate try to look innocent." },
  { name: "Heat wave", productIds: ["water", "cola"], multiplier: 1.5, duration: 2, chance: 0.08, text: "Heat wave: cold drinks are now basically treasure." },
  { name: "Cold snap", productIds: ["espresso", "latte"], multiplier: 1.36, duration: 2, chance: 0.07, text: "Cold snap: everyone suddenly respects warm cups." },
  { name: "Fitness challenge", productIds: ["salad", "water", "nuts"], multiplier: 1.3, duration: 3, chance: 0.06, text: "A fitness challenge is trending. Salads, water, and nuts get a halo effect." },
  { name: "Meme boycott", productIds: ["cola"], multiplier: 0.58, duration: 2, chance: 0.05, text: "A meme boycott targets cola. Nobody knows why, but the cans are nervous." },
  { name: "Lunch rush rumor", productIds: ["sandwich", "salad"], multiplier: 1.4, duration: 2, chance: 0.07, text: "A lunch rush rumor spread through chat. Fresh food demand perks up." },
  { name: "Minimalism trend", productIds: ["water", "espresso"], multiplier: 1.22, duration: 2, chance: 0.05, text: "Minimalism is trending. Water and espresso are called 'clean choices' by people in beige jackets." },
  { name: "Luxury snack fatigue", productIds: ["nuts", "latte"], multiplier: 0.78, duration: 2, chance: 0.05, text: "Luxury snack fatigue hits. Nuts and lattes are accused of being too fancy." }
];

const customerTypes = {
  nightZombie: { label: "Night Shift Zombie", products: ["energy", "cola", "espresso"], priceTolerance: 0.88, note: "Buys caffeine like it is rent." },
  gymBro: { label: "Gym Bro", products: ["water", "nuts", "salad", "energy"], priceTolerance: 0.98, note: "Respects hydration and dramatic nodding." },
  brokeStudent: { label: "Broke Student", products: ["bar", "chips", "water"], priceTolerance: 0.68, note: "Will notice a 10 Ft price change." },
  officeVampire: { label: "Office Vampire", products: ["espresso", "latte", "sandwich"], priceTolerance: 1.12, note: "Turns coffee into calendar invites." },
  commuter: { label: "Late Commuter", products: ["water", "cola", "sandwich", "espresso"], priceTolerance: 0.92, note: "Buys fast, leaves faster." },
  weirdGuy: { label: "Weird Guy", products: ["nuts", "latte", "bar"], priceTolerance: 1.2, note: "Rarely buys. Mostly studies slot B4." },
  casual: { label: "Casual Shopper", products: ["bar", "chips", "latte", "cola"], priceTolerance: 1.04, note: "Impulse purchases with emotional confidence." }
};

const locationCustomers = {
  campus: ["brokeStudent", "brokeStudent", "casual", "weirdGuy"],
  office: ["officeVampire", "officeVampire", "commuter", "casual"],
  station: ["commuter", "commuter", "nightZombie", "weirdGuy"],
  gym: ["gymBro", "gymBro", "casual", "commuter"],
  mall: ["casual", "casual", "brokeStudent", "officeVampire"]
};

const upgradeDefs = {
  capacity: { label: "Expanded Spirals", cost: 9000, max: 3, text: "+4 capacity per level" },
  efficiency: { label: "Low-Power Compressor", cost: 8500, max: 3, text: "-12% upkeep per level" },
  display: { label: "LED Signage", cost: 10500, max: 3, text: "+8% visibility demand per level" },
  camera: { label: "Anti-Theft Lock", cost: 9500, max: 3, text: "+10 effective security, tiny usage slowdown" },
  cooling: { label: "Freshness Fridge", cost: 10500, max: 2, text: "Fresh food lasts longer" },
  cardReader: { label: "Card Reader", cost: 12500, max: 2, text: "+5% average spending per level" },
  moodLighting: { label: "Mood Lighting", cost: 9800, max: 2, text: "+6% impulse demand per level" },
  voiceAssistant: { label: "Voice Assistant", cost: 11800, max: 1, text: "Greets customers, improves buzz, adds weird moments" },
  smartPricing: { label: "Smart Pricing Module", cost: 14000, max: 1, text: "Softer demand penalty above base price" }
};

const defaultUpgradeLevels = Object.fromEntries(Object.keys(upgradeDefs).map((id) => [id, 0]));

const absurdEvents = [
  {
    chance: 0.055,
    text: (machine) => `${machine.name}: a customer paid entirely in coins and looked personally victorious. The cash box is heavier, somehow.`,
    effect(machine) {
      machine.cash += 160;
      state.brandBuzz = clamp(state.brandBuzz + 0.6, 0, 100);
    }
  },
  {
    chance: 0.05,
    text: (machine) => `${machine.name}: someone became emotionally attached to slot B4. Demand for whatever is near it gets mysterious.`,
    effect(machine, events) {
      const stocked = Object.keys(machine.stock).filter((id) => machine.stock[id] > 0);
      const productId = stocked.length ? pick(stocked) : pick(productsForType(machine.type)).id;
      applyDemandEvent({
        name: "Slot B4 attachment",
        productIds: [productId],
        multiplier: 1.18,
        duration: 1,
        text: `${productById(productId).name} got a tiny demand lift from slot-based loyalty.`
      }, events, machine.name);
    }
  },
  {
    chance: 0.045,
    text: (machine) => `${machine.name}: local teens shook the machine for content. Condition dropped, but the clip did numbers.`,
    effect(machine) {
      machine.condition = clamp(machine.condition - 5, 0, 100);
      state.brandBuzz = clamp(state.brandBuzz + 1.2, 0, 100);
    }
  },
  {
    chance: 0.045,
    text: (machine) => `${machine.name}: the screen displayed 'HELLO VALUED SNACK PERSON' and customers were weirdly charmed.`,
    requires: (machine) => (machine.upgrades?.voiceAssistant || 0) > 0,
    effect() {
      state.brandBuzz = clamp(state.brandBuzz + 1.8, 0, 100);
    }
  },
  {
    chance: 0.04,
    text: (machine) => `${machine.name}: a tiny queue formed because the LED sign looked expensive. Impulse buying improved.`,
    requires: (machine) => (machine.upgrades?.display || 0) > 0,
    effect(machine, events) {
      applyDemandEvent({
        name: "LED impulse queue",
        productIds: productsForType(machine.type).map((product) => product.id),
        multiplier: 1.14,
        duration: 1,
        text: "LED signage gave this machine a short impulse-demand bump."
      }, events, machine.name);
    }
  },
  {
    chance: 0.045,
    text: (machine) => `${machine.name}: the exterior now smells faintly like old receipts. Cleanliness took a hit.`,
    effect(machine) {
      machine.clean = clamp(machine.clean - 7, 0, 100);
    }
  }
];

const weeklyGoals = [
  { type: "profit", target: 26000, reward: 8500, text: "Earn 26 000 Ft weekly profit" },
  { type: "reputation", target: 70, reward: 6500, text: "End the week with 70% reputation" },
  { type: "sales", target: 36, reward: 8000, text: "Sell 36 products this week" },
  { type: "coffee", target: 14, reward: 7000, text: "Sell 14 coffee products this week" },
  { type: "fresh", target: 10, reward: 7600, text: "Sell 10 fresh food products this week" }
];

const helpContent = {
  overview: {
    title: "How to play",
    text: "Run vending machines, stock products, set prices, pick locations, and survive random events. Your main loop is simple: order stock, refill machines, adjust prices, maintain machines, then run the next day."
  },
  cash: {
    title: "Cash",
    text: "This is money available to your company. You spend it on stock, cleaning, repairs, upgrades, moving machines, and buying new machines. Machine income stays inside each machine until you collect it."
  },
  warehouse: {
    title: "Warehouse",
    text: "Warehouse stock is your backup inventory. Machines can only be refilled from the warehouse. Fresh products lose freshness over time, so ordering too much can waste money."
  },
  day: {
    title: "Day",
    text: "Press Next day to simulate customers, sales, events, theft risk, maintenance wear, spoilage, and auto-restock. Some events last multiple days."
  },
  reputation: {
    title: "Reputation",
    text: "Reputation rises when machines are stocked, clean, working, and customers are happy. It falls when shelves are empty, machines are broken, theft happens, or fresh products spoil."
  },
  profit: {
    title: "Last profit",
    text: "Last profit is yesterday's revenue minus daily upkeep, theft losses, and spoilage. Stock purchases and upgrades are separate business investments paid immediately."
  },
  saves: {
    title: "Save slots",
    text: "Use three local save slots to store your current route. Saves stay in this browser on this computer. Load replaces the current game state."
  },
  machines: {
    title: "Machines",
    text: "Each machine has its own stock, cash box, location, condition, cleanliness, security, and upgrades. Select a machine to manage its products and settings."
  },
  locations: {
    title: "Locations",
    text: "Locations change demand, rent, cleanliness decay, random events, and security. Risky places are cheaper and often busier, while safe places cost more but reduce theft."
  },
  condition: {
    title: "Condition",
    text: "Low condition reduces sales and can cause breakdowns. Service machines before they get too low, especially in busy locations."
  },
  cleanliness: {
    title: "Cleanliness",
    text: "Dirty machines lose customer trust and reduce demand. Cleaning is cheap compared with losing reputation and sales."
  },
  security: {
    title: "Security",
    text: "Security mostly comes from the location. High-security locations almost never get robbed. Machine upgrades like Anti-Theft Lock improve effective security for that machine."
  },
  upgrades: {
    title: "Machine upgrades",
    text: "Upgrades make one selected machine better in tangible ways. LED Signage and Mood Lighting lift demand, Card Reader improves average spending, Anti-Theft Lock reduces theft, Freshness Fridge protects fresh food, and Smart Pricing softens high-price demand penalties."
  },
  locationProfile: {
    title: "Location personality",
    text: "Each location has a customer mix, rent, demand, cleanliness pressure, and security level. Cheaper risky locations can sell more, but require stronger machine upgrades and more attention."
  },
  products: {
    title: "Products and pricing",
    text: "Set product prices here. Higher prices increase margin but reduce demand. Lower prices can sell more units. Demand and supply events can make repricing very profitable."
  },
  autostock: {
    title: "Auto-restock",
    text: "Tick a product and set a minimum warehouse amount. Before each day, the game will buy enough to reach that minimum, up to 10 units, if you have enough cash. You can also order manually with each product's Order button."
  },
  stocktab: {
    title: "Warehouse details",
    text: "This section shows current warehouse stock and wholesale costs. Fresh food also shows average days left before it spoils."
  },
  stats: {
    title: "Stats",
    text: "Use stats to see where money goes and which machines earn the most. The income/expense and profit charts help you spot bad pricing, too much spoilage, or expensive locations."
  }
};

const customerLooks = ["cap", "bag", "suit", "skate", "hat", "tiny"];
const customerLookByType = {
  nightZombie: "tiny",
  gymBro: "skate",
  brokeStudent: "cap",
  officeVampire: "suit",
  commuter: "bag",
  weirdGuy: "hat",
  casual: "bag"
};
const logBits = {
  dayStart: [
    "Opening time: locals have begun staring at vending machines with purpose.",
    "The sun rises and the machines pretend they did not beep dramatically all night.",
    "First customer of the day is already looking for the button nobody understands.",
    "The route is live. The cash boxes are empty, but emotionally prepared."
  ],
  noSale: [
    "No sales. This silence is now business intelligence.",
    "Customers only looked today. The machine took it personally.",
    "Zero sales. Someone nearby probably said, 'I have snacks at home.'"
  ],
  goodDay: [
    "Happy customers: reputation is doing a tiny victory dance.",
    "Good day: the machines jingled like a pocket-change concert.",
    "Customers did not complain, which is basically fan mail in vending."
  ],
  problem: [
    "issues hurt reputation: empty slots, grime, or sad machine noises.",
    "hiccups found: someone met an empty shelf and definitely had opinions.",
    "operations wobble detected: reputation looked away for a second."
  ],
  saleBubble: [
    "+1",
    "yum",
    "csipp",
    "again",
    "need"
  ]
};

const state = {
  cash: 58000,
  day: 1,
  selectedMachine: null,
  started: false,
  runningDay: false,
  brandBuzz: 48,
  lastProfit: 0,
  warehouse: {
    chips: 14,
    bar: 12,
    nuts: 8,
    cola: 12,
    water: 14,
    energy: 8,
    espresso: 16,
    latte: 10,
    sandwich: 6,
    salad: 5
  },
  warehouseBatches: {
    sandwich: [{ qty: 6, days: 3 }],
    salad: [{ qty: 5, days: 3 }]
  },
  machines: [],
  supplyModifiers: {},
  demandModifiers: {},
  autoRestock: {},
  weekly: {
    number: 1,
    goal: null,
    profit: 0,
    sales: 0,
    soldByType: {},
    revenue: 0,
    expenses: 0
  },
  reports: [],
  charts: {
    restock: true,
    service: true,
    cleaning: true,
    revenue: true
  },
  stats: {
    restockByProduct: {},
    maintenance: 0,
    cleaning: 0,
    security: 0,
    revenueByMachine: {},
    locationEvents: {},
    daily: []
  },
  log: ["Choose a machine type to start your vending route."]
};

const balance = {
  majorFaultBaseChance: 0.025,
  breakInBaseChance: 0.0015,
  freshSpoilChance: 0.32
};

const money = new Intl.NumberFormat("hu-HU", {
  style: "currency",
  currency: "HUF",
  maximumFractionDigits: 0
});

const el = {
  startScreen: document.querySelector("#startScreen"),
  starterChoices: document.querySelector("#starterChoices"),
  cash: document.querySelector("#cash"),
  warehouseCount: document.querySelector("#warehouseCount"),
  day: document.querySelector("#day"),
  reputation: document.querySelector("#reputation"),
  dailyProfit: document.querySelector("#dailyProfit"),
  machines: document.querySelector("#machines"),
  machineToBuy: document.querySelector("#machineToBuy"),
  saveSlots: document.querySelector("#saveSlots"),
  helpOverlay: document.querySelector("#helpOverlay"),
  helpTitle: document.querySelector("#helpTitle"),
  helpText: document.querySelector("#helpText"),
  helpClose: document.querySelector("#helpClose"),
  machineVisual: document.querySelector("#machineVisual"),
  machineArt: document.querySelector("#machineArt"),
  machineSign: document.querySelector("#machineSign"),
  productWindows: document.querySelector("#productWindows"),
  customerLane: document.querySelector("#customerLane"),
  actionBadge: document.querySelector("#actionBadge"),
  machineType: document.querySelector("#machineType"),
  machineName: document.querySelector("#machineName"),
  machineCash: document.querySelector("#machineCash"),
  machineLocation: document.querySelector("#machineLocation"),
  locationProfile: document.querySelector("#locationProfile"),
  conditionBar: document.querySelector("#conditionBar"),
  cleanBar: document.querySelector("#cleanBar"),
  securityBar: document.querySelector("#securityBar"),
  upgrades: document.querySelector("#upgrades"),
  upgradeHint: document.querySelector("#upgradeHint"),
  products: document.querySelector("#products"),
  warehouse: document.querySelector("#warehouse"),
  autoRestock: document.querySelector("#autoRestock"),
  stats: document.querySelector("#stats"),
  log: document.querySelector("#log"),
  buyMachine: document.querySelector("#buyMachine"),
  nextDay: document.querySelector("#nextDay"),
  collectCash: document.querySelector("#collectCash"),
  repair: document.querySelector("#repair"),
  clean: document.querySelector("#clean"),
};

function currentMachine() {
  return state.machines.find((machine) => machine.id === state.selectedMachine) || state.machines[0];
}

function productById(id) {
  return products.find((product) => product.id === id);
}

function locationById(id) {
  return locations[id] || locations.campus;
}

function effectiveCost(product) {
  const modifier = state.supplyModifiers[product.id];
  return Math.round(product.baseCost * (modifier ? modifier.multiplier : 1));
}

function priceDemandFactor(product, machine = currentMachine()) {
  const ratio = product.basePrice / Math.max(50, product.price);
  const smart = machine?.upgrades?.smartPricing ? 0.78 : 1;
  const modifier = state.demandModifiers[product.id];
  const eventBoost = modifier ? modifier.multiplier : 1;
  return clamp(Math.pow(ratio, product.elasticity * smart) * eventBoost, 0.18, 2.35);
}

function productMargin(product) {
  return product.price - effectiveCost(product);
}

function supplyTag(product) {
  const modifier = state.supplyModifiers[product.id];
  if (!modifier) return "";
  const sign = modifier.multiplier > 1 ? "up" : "down";
  const pct = Math.round(Math.abs(modifier.multiplier - 1) * 100);
  return ` <span class="supply-tag ${sign}">${modifier.multiplier > 1 ? "+" : "-"}${pct}% supply, ${modifier.daysLeft}d</span>`;
}

function demandTag(product) {
  const modifier = state.demandModifiers[product.id];
  if (!modifier) return "";
  const sign = modifier.multiplier > 1 ? "up" : "down";
  const pct = Math.round(Math.abs(modifier.multiplier - 1) * 100);
  return ` <span class="demand-tag ${sign}">${modifier.multiplier > 1 ? "+" : "-"}${pct}% demand, ${modifier.daysLeft}d</span>`;
}

function formatMoney(value) {
  return money.format(value).replace(/\s/g, " ");
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function addLog(message) {
  state.log.unshift(`Day ${state.day}: ${message}`);
  state.log = state.log.slice(0, 14);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function machineStockTotal(machine) {
  return Object.values(machine.stock).reduce((sum, amount) => sum + amount, 0);
}

function machineCapacity(machine) {
  return machineTypes[machine.type].capacity + (machine.upgrades?.capacity || 0) * 4;
}

function effectiveSecurity(machine) {
  const location = locationById(machine.location);
  return clamp(location.security + (machine.upgrades?.camera || 0) * 10, 0, 98);
}

function normalizeMachineUpgrades(machine) {
  machine.upgrades = { ...defaultUpgradeLevels, ...(machine.upgrades || {}) };
}

function machineFill(machine) {
  return machineStockTotal(machine) / machineCapacity(machine);
}

function reputation() {
  if (state.machines.length === 0) return state.brandBuzz;
  const machineScore = state.machines.reduce((sum, machine) => {
    const fill = machineFill(machine);
    return sum + (machine.condition * 0.32 + machine.clean * 0.24 + fill * 100 * 0.28 + state.brandBuzz * 0.16);
  }, 0);
  return Math.round(clamp(machineScore / state.machines.length, 0, 100));
}

function stockCount() {
  return Object.values(state.warehouse).reduce((sum, amount) => sum + amount, 0);
}

function productsForType(type) {
  return products.filter((product) => product.type === type);
}

function makeStock(type, filled) {
  const stock = {};
  productsForType(type).forEach((product, index) => {
    stock[product.id] = filled ? (index === 0 ? 7 : 5) : 0;
  });
  return stock;
}

function makeMachine(type, freeStarter = false) {
  const count = state.machines.filter((machine) => machine.type === type).length + 1;
  const info = machineTypes[type];
  const machine = {
    id: `m${Date.now()}${Math.round(Math.random() * 999)}`,
    name: freeStarter ? info.starter : `${info.label.split(" ")[0]} ${count + state.machines.length}`,
    type,
    condition: freeStarter ? 92 : 88,
    clean: freeStarter ? 94 : 90,
    security: freeStarter ? 34 : 25,
    location: "campus",
    broken: false,
    cash: 0,
    stock: makeStock(type, freeStarter),
    batches: {},
    upgrades: { ...defaultUpgradeLevels }
  };
  if (freeStarter) {
    Object.entries(machine.stock).forEach(([productId, amount]) => addBatch(machine, productId, amount));
  }
  return machine;
}

function startGame(type) {
  const machine = makeMachine(type, true);
  state.machines = [machine];
  state.selectedMachine = machine.id;
  state.started = true;
  state.weekly.goal = pick(weeklyGoals);
  state.log = [`Day 1: ${machine.name} is online. The first customer is already staring with intent.`];
  el.startScreen.classList.add("hidden");
  render();
}

function render() {
  renderStarterChoices();
  renderBuyOptions();
  renderLocationOptions();
  renderSaveSlots();
  renderWeeklyGoal();

  const machine = currentMachine();
  el.cash.textContent = formatMoney(state.cash);
  el.warehouseCount.textContent = `${stockCount()} pcs`;
  el.day.textContent = state.day;
  el.reputation.textContent = `${reputation()}%`;
  el.dailyProfit.textContent = formatMoney(state.lastProfit);

  if (!machine) {
    renderLog();
    return;
  }

  const type = machineTypes[machine.type];
  el.machineType.textContent = type.label;
  el.machineName.textContent = machine.name;
  el.machineSign.textContent = machine.name;
  el.machineCash.textContent = formatMoney(machine.cash);
  el.machineLocation.value = machine.location;
  el.conditionBar.style.width = `${machine.condition}%`;
  el.cleanBar.style.width = `${machine.clean}%`;
  const security = effectiveSecurity(machine);
  el.securityBar.style.width = `${security}%`;
  el.conditionBar.style.background = meterColor(machine.condition);
  el.cleanBar.style.background = meterColor(machine.clean);
  el.securityBar.style.background = meterColor(security);
  el.machineArt.className = machineArtClasses(machine);
  el.machineArt.classList.toggle("broken", machine.broken);

  renderMachines();
  renderLocationProfile(machine);
  renderMachineProducts(machine);
  renderProductWindows(machine);
  renderUpgrades(machine);
  renderWarehouse();
  renderAutoRestock();
  renderStats();
  renderLog();
  setBusy(state.runningDay);
}

function machineArtClasses(machine) {
  const classes = ["machine-art", machine.type];
  if (machine.condition < 65) classes.push("condition-worn");
  if (machine.condition < 35) classes.push("condition-bad");
  if (machine.clean < 55) classes.push("dirty");
  if ((machine.upgrades?.display || 0) > 0) classes.push("led-sign");
  if ((machine.upgrades?.moodLighting || 0) > 0) classes.push("mood-lit");
  if ((machine.upgrades?.voiceAssistant || 0) > 0) classes.push("voice-ready");
  return classes.join(" ");
}

function meterColor(value) {
  if (value < 35) return "#d05f45";
  if (value < 65) return "#e6b84c";
  return "#4f9d78";
}

function renderStarterChoices() {
  if (state.started || el.starterChoices.children.length > 0) return;
  Object.entries(machineTypes).forEach(([type, info]) => {
    const card = document.createElement("button");
    card.className = "starter-card";
    card.innerHTML = `
      <span class="mini-machine ${type}"></span>
      <strong>${info.label}</strong>
      <span>Capacity: ${info.capacity} pcs</span>
      <span>Daily upkeep: ${formatMoney(info.upkeep)}</span>
    `;
    card.addEventListener("click", () => startGame(type));
    el.starterChoices.append(card);
  });
}

function renderBuyOptions() {
  el.machineToBuy.innerHTML = "";
  Object.entries(machineTypes).forEach(([type, info]) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = `${info.label} - ${formatMoney(info.buyCost)}`;
    el.machineToBuy.append(option);
  });
}

function renderSaveSlots() {
  el.saveSlots.innerHTML = "";
  for (let slot = 1; slot <= 3; slot += 1) {
    const save = readSave(slot);
    const card = document.createElement("div");
    card.className = "save-slot";
    card.innerHTML = `
      <div>
        <strong>Slot ${slot}</strong>
        <span>${save ? `Day ${save.state.day} - ${formatMoney(save.state.cash)}` : "Empty slot"}</span>
      </div>
    `;
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.disabled = state.runningDay;
    saveButton.addEventListener("click", () => saveGame(slot));
    const loadButton = document.createElement("button");
    loadButton.textContent = "Load";
    loadButton.disabled = !save || state.runningDay;
    loadButton.addEventListener("click", () => loadGame(slot));
    card.append(saveButton, loadButton);
    el.saveSlots.append(card);
  }
}

function renderWeeklyGoal() {
  const goal = state.weekly.goal;
  const progress = goal ? weeklyGoalProgress(goal) : { label: "Start a route", pct: 0 };
  document.querySelector("#weeklyGoal").innerHTML = `
    <div>
      <p class="eyebrow">Weekly goal</p>
      <h2>${goal ? goal.text : "Choose a machine to receive your first goal"}</h2>
    </div>
    <div class="goal-progress">
      <span>${progress.label}</span>
      <div class="bar-track"><i style="width: ${progress.pct}%"></i></div>
      <strong>${goal ? `Reward ${formatMoney(goal.reward)}` : ""}</strong>
    </div>
  `;
}

function weeklyGoalProgress(goal) {
  if (goal.type === "profit") return { label: `${formatMoney(state.weekly.profit)} / ${formatMoney(goal.target)}`, pct: clamp((state.weekly.profit / goal.target) * 100, 0, 100) };
  if (goal.type === "reputation") return { label: `${reputation()}% / ${goal.target}%`, pct: clamp((reputation() / goal.target) * 100, 0, 100) };
  if (goal.type === "sales") return { label: `${state.weekly.sales} / ${goal.target} sold`, pct: clamp((state.weekly.sales / goal.target) * 100, 0, 100) };
  const sold = state.weekly.soldByType[goal.type] || 0;
  return { label: `${sold} / ${goal.target} ${goal.type}`, pct: clamp((sold / goal.target) * 100, 0, 100) };
}

function readSave(slot) {
  try {
    return JSON.parse(localStorage.getItem(`wending-save-${slot}`));
  } catch {
    return null;
  }
}

function saveGame(slot) {
  const payload = {
    savedAt: Date.now(),
    state: JSON.parse(JSON.stringify(state)),
    prices: products.reduce((prices, product) => {
      prices[product.id] = product.price;
      return prices;
    }, {})
  };
  localStorage.setItem(`wending-save-${slot}`, JSON.stringify(payload));
  addLog(`Saved route to slot ${slot}.`);
  render();
}

function loadGame(slot) {
  const save = readSave(slot);
  if (!save) return;
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, save.state);
  normalizeLoadedState();
  products.forEach((product) => {
    product.price = save.prices?.[product.id] ?? product.basePrice;
  });
  el.startScreen.classList.toggle("hidden", state.started);
  addLog(`Loaded route from slot ${slot}.`);
  render();
}

function normalizeLoadedState() {
  state.autoRestock ||= {};
  state.warehouseBatches ||= {};
  state.supplyModifiers ||= {};
  state.demandModifiers ||= {};
  state.reports ||= [];
  state.weekly ||= {
    number: 1,
    goal: pick(weeklyGoals),
    profit: 0,
    sales: 0,
    soldByType: {},
    revenue: 0,
    expenses: 0
  };
  state.weekly.goal ||= pick(weeklyGoals);
  state.machines.forEach((machine) => {
    machine.batches ||= {};
    normalizeMachineUpgrades(machine);
  });
}

function renderLocationOptions() {
  el.machineLocation.innerHTML = "";
  Object.entries(locations).forEach(([id, location]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `${location.label} - rent ${formatMoney(location.upkeep)}/day`;
    el.machineLocation.append(option);
  });
}

function renderMachines() {
  el.machines.innerHTML = "";
  state.machines.forEach((machine) => {
    const button = document.createElement("button");
    button.className = `machine-card ${machine.id === state.selectedMachine ? "active" : ""}`;
    button.innerHTML = `
      <span class="mini-machine ${machine.type}"></span>
      <span>
        <span class="card-name">
          <span>${machine.name}</span>
          <span>${machineStockTotal(machine)}/${machineCapacity(machine)}</span>
        </span>
        <span class="card-meta">${locationById(machine.location).label} - ${machine.broken ? "offline" : `${Math.round(machine.condition)}% condition`} - ${Math.round(effectiveSecurity(machine))}% sec.</span>
      </span>
    `;
    button.addEventListener("click", () => {
      state.selectedMachine = machine.id;
      render();
    });
    el.machines.append(button);
  });
}

function renderLocationProfile(machine) {
  const location = locationById(machine.location);
  const mix = locationCustomers[machine.location] || ["casual"];
  const counts = mix.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});
  const customerLines = Object.entries(counts).map(([id, count]) => {
    const customer = customerTypes[id] || customerTypes.casual;
    return `<span title="${customer.note}">${customer.label} x${count}</span>`;
  }).join("");
  const risk = location.security >= 80 ? "safe and pricey" : location.security >= 60 ? "balanced" : "cheap but risky";
  el.locationProfile.innerHTML = `
    <div>
      <strong>${location.label}</strong>
      <span>${risk} - demand ${Math.round(location.demand * 100)}% - rent ${formatMoney(location.upkeep)}/day</span>
    </div>
    <div class="location-tags">
      ${customerLines}
    </div>
  `;
}

function renderMachineProducts(machine) {
  el.products.innerHTML = "";
  productsForType(machine.type).forEach((product) => {
    const amount = machine.stock[product.id] || 0;
    const demand = Math.round(priceDemandFactor(product, machine) * 100);
    const margin = productMargin(product);
    const row = document.createElement("div");
    row.className = "product-row";
    row.innerHTML = `
      <div>
        <div class="product-title">${product.name}</div>
        <div class="product-meta">
          loaded: ${amount} pcs - warehouse: ${state.warehouse[product.id] || 0} pcs - demand ${demand}% - margin ${formatMoney(margin)}
          ${supplyTag(product)}${demandTag(product)}
        </div>
        <label class="price-control">
          Price
          <input type="number" min="${Math.round(product.basePrice * 0.45)}" step="10" value="${product.price}" data-price-product="${product.id}">
        </label>
      </div>
    `;
    const button = document.createElement("button");
    button.textContent = "Restock";
    button.disabled = amount >= machineCapacity(machine) || (state.warehouse[product.id] || 0) <= 0 || state.runningDay;
    button.addEventListener("click", () => refillProduct(machine.id, product.id));
    row.append(button);
    el.products.append(row);
  });

  el.products.querySelectorAll("[data-price-product]").forEach((input) => {
    input.addEventListener("change", () => updateProductPrice(input.dataset.priceProduct, input.value));
  });
}

function renderUpgrades(machine) {
  el.upgradeHint.textContent = `Weekly goal: ${state.weekly.goal?.text || "start a route first"}`;
  el.upgrades.innerHTML = "";
  Object.entries(upgradeDefs).forEach(([id, upgrade]) => {
    const level = machine.upgrades?.[id] || 0;
    const cost = upgrade.cost * (level + 1);
    const button = document.createElement("button");
    button.className = "upgrade-card";
    button.disabled = level >= upgrade.max || state.cash < cost || state.runningDay;
    button.innerHTML = `
      <strong>${upgrade.label}</strong>
      <span>Lv ${level}/${upgrade.max} - ${formatMoney(cost)}</span>
      <small>${upgrade.text}</small>
    `;
    button.addEventListener("click", () => buyUpgrade(id));
    el.upgrades.append(button);
  });
}

function renderAutoRestock() {
  el.autoRestock.innerHTML = "";
  products.forEach((product) => {
    const policy = state.autoRestock[product.id] || { enabled: false, min: 5 };
    const row = document.createElement("label");
    row.className = "auto-row";
    row.innerHTML = `
      <span>${product.name}</span>
      <small>${state.warehouse[product.id] || 0} in warehouse</small>
      <input type="checkbox" data-auto-enabled="${product.id}" ${policy.enabled ? "checked" : ""}>
      <input type="number" min="0" max="30" value="${policy.min}" data-auto-min="${product.id}">
    `;
    const orderButton = document.createElement("button");
    orderButton.type = "button";
    orderButton.textContent = `Order 10 (${formatMoney(effectiveCost(product) * 10)})`;
    orderButton.disabled = state.cash < effectiveCost(product) * 10 || state.runningDay;
    orderButton.addEventListener("click", () => orderStock(product.id, 10));
    row.append(orderButton);
    el.autoRestock.append(row);
  });
  el.autoRestock.querySelectorAll("[data-auto-enabled]").forEach((input) => {
    input.addEventListener("change", () => updateAutoRestock(input.dataset.autoEnabled, input.checked, null));
  });
  el.autoRestock.querySelectorAll("[data-auto-min]").forEach((input) => {
    input.addEventListener("change", () => updateAutoRestock(input.dataset.autoMin, null, input.value));
  });
}

function renderProductWindows(machine) {
  el.productWindows.innerHTML = "";
  Object.entries(machine.stock).forEach(([id, amount]) => {
    const product = productById(id);
    const tile = document.createElement("div");
    tile.className = `product-sprite ${amount < 3 ? "low" : ""}`;
    tile.style.background = product.color;
    tile.textContent = product.name.split(" ")[0];
    el.productWindows.append(tile);
  });
}

function renderWarehouse() {
  el.warehouse.innerHTML = "";
  products.forEach((product) => {
    const condition = warehouseCondition(product);
    const row = document.createElement("div");
    row.className = "stock-row";
    row.innerHTML = `
      <div>
        <div class="product-title">${product.name}</div>
        <div class="stock-meta">Wholesale: ${formatMoney(effectiveCost(product))} - base ${formatMoney(product.baseCost)} - warehouse: ${state.warehouse[product.id] || 0} pcs${supplyTag(product)}</div>
        <div class="freshness-line">${condition}</div>
      </div>
      <strong>${product.type}</strong>
    `;
    el.warehouse.append(row);
  });
}

function renderStats() {
  const blocks = [];
  if (state.charts.restock) {
    const items = products.map((product) => ({
      label: product.name,
      value: state.stats.restockByProduct[product.id] || 0
    }));
    blocks.push(chartBlock("Restocking cost by product", "restockChart", "bar", items));
  }
  if (state.charts.service) {
    blocks.push(chartBlock("Service and machine upgrade spend", "serviceChart", "donut", [
      { label: "Service", value: state.stats.maintenance },
      { label: "Upgrades", value: state.stats.security }
    ]));
  }
  if (state.charts.cleaning) {
    blocks.push(chartBlock("Cleaning spend", "cleaningChart", "bar", [{ label: "Cleaning", value: state.stats.cleaning }]));
  }
  if (state.charts.revenue) {
    const machineRows = state.machines.map((machine) => ({
      label: machine.name,
      value: state.stats.revenueByMachine[machine.id] || 0
    }));
    blocks.push(chartBlock("Revenue by machine", "revenueChart", "bar", machineRows));
  }

  blocks.push(`
    <section class="chart-block">
      <h3>Weekly goal</h3>
      <p class="empty-note">${state.weekly.goal?.text || "Start a route to receive a goal."}</p>
      <p class="empty-note">Current week profit: ${formatMoney(state.weekly.profit)} - sales: ${state.weekly.sales}</p>
    </section>
  `);

  if (state.reports.length > 0) {
    blocks.push(`
      <section class="chart-block">
        <h3>Weekly reports</h3>
        <div class="daily-list">
          ${state.reports.slice(0, 4).map((report) => `
            <div class="daily-row">
              <span>W${report.week}</span>
              <strong>${formatMoney(report.profit)}</strong>
              <small>${report.success ? "Goal cleared" : "Goal missed"} - ${report.bestMachine}</small>
            </div>
          `).join("")}
        </div>
      </section>
    `);
  }

  const latest = state.stats.daily.slice(-5).reverse();
  blocks.push(`
    <section class="chart-block">
      <h3>Daily profit trend</h3>
      <canvas id="profitChart" class="chart-canvas" width="520" height="220" aria-label="Daily profit trend"></canvas>
    </section>
    <section class="chart-block">
      <h3>Income and expenses trend</h3>
      <canvas id="incomeExpenseChart" class="chart-canvas" width="520" height="220" aria-label="Income and expenses trend"></canvas>
      <div class="chart-legend">
        <span><i class="income-dot"></i>Income</span>
        <span><i class="expense-dot"></i>Expenses</span>
      </div>
    </section>
    <section class="chart-block">
      <h3>Customer mix</h3>
      <div class="customer-mix">
        ${renderCustomerMix()}
      </div>
    </section>
    <section class="chart-block">
      <h3>Recent daily briefs</h3>
      <div class="daily-list">
        ${latest.length ? latest.map((day) => `
          <div class="daily-row">
            <span>Day ${day.day}</span>
            <strong>${formatMoney(day.profit)}</strong>
            <small>${day.sold} sold - ${day.events} events</small>
          </div>
        `).join("") : "<p class=\"empty-note\">No completed days yet.</p>"}
      </div>
    </section>
  `);
  el.stats.innerHTML = blocks.join("");
  drawVisibleCharts();
}

function renderCustomerMix() {
  const totals = {};
  state.stats.daily.slice(-7).forEach((day) => {
    Object.entries(day.customers || {}).forEach(([id, amount]) => {
      totals[id] = (totals[id] || 0) + amount;
    });
  });
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return "<p class=\"empty-note\">No customer data yet.</p>";
  const max = Math.max(...entries.map(([, amount]) => amount));
  return entries.map(([id, amount]) => {
    const customer = customerTypes[id] || customerTypes.casual;
    return `
      <div class="mix-row">
        <span>${customer.label}</span>
        <div class="mix-bar"><i style="width:${Math.max(8, (amount / max) * 100)}%"></i></div>
        <strong>${amount}</strong>
      </div>
    `;
  }).join("");
}

function chartBlock(title, id, type, items) {
  const legend = items.map((item) => `
    <span><i></i>${item.label}: ${formatMoney(item.value)}</span>
  `).join("");
  return `
    <section class="chart-block">
      <h3>${title}</h3>
      <canvas id="${id}" class="chart-canvas" width="520" height="220" data-chart-type="${type}" aria-label="${title}"></canvas>
      <div class="chart-legend">${legend || "<span>No data</span>"}</div>
    </section>
  `;
}

function drawVisibleCharts() {
  if (state.charts.restock) {
    drawBarChart("restockChart", products.map((product) => ({
      label: product.name,
      value: state.stats.restockByProduct[product.id] || 0
    })), "#207a81");
  }
  if (state.charts.service) {
    drawDonutChart("serviceChart", [
      { label: "Service", value: state.stats.maintenance, color: "#426f9d" },
      { label: "Upgrades", value: state.stats.security, color: "#26352c" }
    ]);
  }
  if (state.charts.cleaning) {
    drawBarChart("cleaningChart", [{ label: "Cleaning", value: state.stats.cleaning }], "#4f9d78");
  }
  if (state.charts.revenue) {
    drawBarChart("revenueChart", state.machines.map((machine) => ({
      label: machine.name,
      value: state.stats.revenueByMachine[machine.id] || 0
    })), "#d05f45");
  }
  drawLineChart("profitChart", state.stats.daily.map((day) => ({
    label: `N${day.day}`,
    value: day.profit
  })));
  drawMultiLineChart("incomeExpenseChart", state.stats.daily.map((day) => ({
    label: `N${day.day}`,
    income: day.revenue,
    expenses: day.expenses
  })));
}

function chartContext(id) {
  const canvas = document.querySelector(`#${id}`);
  if (!canvas) return null;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { canvas, ctx };
}

function drawBarChart(id, items, color) {
  const chart = chartContext(id);
  if (!chart) return;
  const { canvas, ctx } = chart;
  const data = items.length ? items : [{ label: "No data", value: 0 }];
  const max = Math.max(1, ...data.map((item) => item.value));
  const left = 38;
  const bottom = 184;
  const width = canvas.width - 58;
  const barGap = 8;
  const barWidth = Math.max(12, (width - barGap * (data.length - 1)) / data.length);
  drawChartFrame(ctx, canvas);
  data.forEach((item, index) => {
    const height = Math.max(4, (item.value / max) * 132);
    const x = left + index * (barWidth + barGap);
    const y = bottom - height;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, barWidth, height);
    ctx.fillStyle = "#65726b";
    ctx.font = "11px system-ui";
    ctx.save();
    ctx.translate(x + barWidth / 2, 202);
    ctx.rotate(-0.55);
    ctx.textAlign = "right";
    ctx.fillText(item.label.slice(0, 14), 0, 0);
    ctx.restore();
  });
  ctx.fillStyle = "#17211b";
  ctx.font = "12px system-ui";
  ctx.fillText(formatMoney(max), left, 28);
}

function drawLineChart(id, items) {
  const chart = chartContext(id);
  if (!chart) return;
  const { canvas, ctx } = chart;
  drawChartFrame(ctx, canvas);
  if (items.length === 0) {
    ctx.fillStyle = "#65726b";
    ctx.font = "14px system-ui";
    ctx.fillText("No completed days yet.", 42, 108);
    return;
  }
  const values = items.map((item) => item.value);
  const min = Math.min(0, ...values);
  const max = Math.max(1, ...values);
  const span = Math.max(1, max - min);
  const left = 42;
  const top = 26;
  const width = canvas.width - 72;
  const height = 136;
  ctx.strokeStyle = "#207a81";
  ctx.lineWidth = 3;
  ctx.beginPath();
  items.forEach((item, index) => {
    const x = left + (items.length === 1 ? width / 2 : (index / (items.length - 1)) * width);
    const y = top + height - ((item.value - min) / span) * height;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  items.forEach((item, index) => {
    const x = left + (items.length === 1 ? width / 2 : (index / (items.length - 1)) * width);
    const y = top + height - ((item.value - min) / span) * height;
    ctx.fillStyle = item.value >= 0 ? "#4f9d78" : "#d05f45";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#65726b";
    ctx.font = "11px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(item.label, x, 202);
  });
}

function drawMultiLineChart(id, items) {
  const chart = chartContext(id);
  if (!chart) return;
  const { canvas, ctx } = chart;
  drawChartFrame(ctx, canvas);
  if (items.length === 0) {
    ctx.fillStyle = "#65726b";
    ctx.font = "14px system-ui";
    ctx.fillText("No completed days yet.", 42, 108);
    return;
  }
  const values = items.flatMap((item) => [item.income, item.expenses]);
  const max = Math.max(1, ...values);
  const left = 42;
  const top = 26;
  const width = canvas.width - 72;
  const height = 136;
  drawSeries(ctx, items, "income", "#4f9d78", left, top, width, height, max);
  drawSeries(ctx, items, "expenses", "#d05f45", left, top, width, height, max);
  items.forEach((item, index) => {
    const x = left + (items.length === 1 ? width / 2 : (index / (items.length - 1)) * width);
    ctx.fillStyle = "#65726b";
    ctx.font = "11px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(item.label, x, 202);
  });
}

function drawSeries(ctx, items, key, color, left, top, width, height, max) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  items.forEach((item, index) => {
    const x = left + (items.length === 1 ? width / 2 : (index / (items.length - 1)) * width);
    const y = top + height - (item[key] / max) * height;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  items.forEach((item, index) => {
    const x = left + (items.length === 1 ? width / 2 : (index / (items.length - 1)) * width);
    const y = top + height - (item[key] / max) * height;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawDonutChart(id, items) {
  const chart = chartContext(id);
  if (!chart) return;
  const { canvas, ctx } = chart;
  const total = items.reduce((sum, item) => sum + item.value, 0);
  drawChartFrame(ctx, canvas);
  if (total <= 0) {
    ctx.fillStyle = "#65726b";
    ctx.font = "14px system-ui";
    ctx.fillText("No spending data yet.", 42, 108);
    return;
  }
  let start = -Math.PI / 2;
  items.forEach((item) => {
    const angle = (item.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(260, 108);
    ctx.arc(260, 108, 74, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    start += angle;
  });
  ctx.beginPath();
  ctx.arc(260, 108, 42, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.fillStyle = "#17211b";
  ctx.font = "bold 13px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(formatMoney(total), 260, 113);
}

function drawChartFrame(ctx, canvas) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#d9e0d6";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
  ctx.strokeStyle = "#eef2ec";
  for (let y = 40; y < 180; y += 35) {
    ctx.beginPath();
    ctx.moveTo(32, y);
    ctx.lineTo(canvas.width - 18, y);
    ctx.stroke();
  }
}

function renderLog() {
  el.log.innerHTML = "";
  state.log.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    el.log.append(li);
  });
}

function setBusy(isBusy) {
  [el.nextDay, el.collectCash, el.repair, el.clean, el.buyMachine, el.machineLocation].forEach((button) => {
    button.disabled = isBusy;
  });
}

function showAction(text, className) {
  el.actionBadge.className = "action-badge";
  el.machineArt.classList.remove("service-pulse", "cash-pulse", "repair-pulse", "clean-pulse");
  void el.machineArt.offsetWidth;
  el.machineArt.classList.add(className);
  el.actionBadge.textContent = text;
  el.actionBadge.classList.add("show");
  window.setTimeout(() => {
    el.actionBadge.classList.remove("show");
    el.machineArt.classList.remove(className);
  }, 900);
}

function showEventToast(text) {
  return new Promise((resolve) => {
    el.actionBadge.className = "action-badge event-toast show";
    el.actionBadge.innerHTML = `<span>${text}</span><button type="button">OK</button>`;
    const ok = el.actionBadge.querySelector("button");
    ok.addEventListener("click", () => {
      el.actionBadge.classList.remove("show", "event-toast");
      el.actionBadge.textContent = "";
      resolve();
    }, { once: true });
  });
}

function openHelp(topic) {
  const content = helpContent[topic] || helpContent.overview;
  el.helpTitle.textContent = content.title;
  el.helpText.textContent = content.text;
  el.helpOverlay.classList.add("show");
  el.helpOverlay.setAttribute("aria-hidden", "false");
}

function closeHelp() {
  el.helpOverlay.classList.remove("show");
  el.helpOverlay.setAttribute("aria-hidden", "true");
}

function refillProduct(machineId, productId) {
  const machine = state.machines.find((item) => item.id === machineId);
  const freeSpace = machineCapacity(machine) - machineStockTotal(machine);
  const amount = Math.min(6, freeSpace, state.warehouse[productId] || 0);
  if (amount <= 0) return;
  machine.stock[productId] = (machine.stock[productId] || 0) + amount;
  addBatch(machine, productId, amount);
  state.warehouse[productId] -= amount;
  state.brandBuzz = clamp(state.brandBuzz + 0.8, 0, 100);
  addLog(`${machine.name} restocked: ${productById(productId).name} +${amount} pcs.`);
  render();
  showAction(`+${amount} restock`, "service-pulse");
}

function shelfLifeFor(machine, product) {
  if (product.type !== "fresh") return 999;
  return 3 + (machine.upgrades?.cooling || 0);
}

function warehouseShelfLife(product) {
  return product.type === "fresh" ? 3 : 999;
}

function addWarehouseBatch(productId, amount) {
  const product = productById(productId);
  if (product.type !== "fresh") return;
  state.warehouseBatches ||= {};
  state.warehouseBatches[productId] ||= [];
  state.warehouseBatches[productId].push({ qty: amount, days: warehouseShelfLife(product) });
}

function addBatch(machine, productId, amount) {
  const product = productById(productId);
  if (product.type !== "fresh") return;
  machine.batches ||= {};
  machine.batches[productId] ||= [];
  const transferred = takeWarehouseFreshBatches(productId, amount);
  if (transferred.length) {
    transferred.forEach((batch) => machine.batches[productId].push(batch));
  } else {
    machine.batches[productId].push({ qty: amount, days: shelfLifeFor(machine, product) });
  }
}

function takeWarehouseFreshBatches(productId, amount) {
  const product = productById(productId);
  if (product.type !== "fresh") return [];
  state.warehouseBatches ||= {};
  state.warehouseBatches[productId] ||= [];
  const moved = [];
  let remaining = amount;
  const batches = state.warehouseBatches[productId];
  while (remaining > 0 && batches.length) {
    const batch = batches[0];
    const qty = Math.min(batch.qty, remaining);
    moved.push({ qty, days: batch.days });
    batch.qty -= qty;
    remaining -= qty;
    if (batch.qty <= 0) batches.shift();
  }
  return moved;
}

function warehouseCondition(product) {
  if (product.type !== "fresh") return "Shelf stable - no freshness decay.";
  const batches = state.warehouseBatches?.[product.id] || [];
  const total = batches.reduce((sum, batch) => sum + batch.qty, 0);
  if (total <= 0) return "No fresh stock in warehouse.";
  const avg = batches.reduce((sum, batch) => sum + batch.qty * batch.days, 0) / total;
  const label = avg >= 2.4 ? "Fresh" : avg >= 1.3 ? "Use soon" : "At risk";
  return `${label} - avg ${avg.toFixed(1)} days left across ${total} pcs.`;
}

function consumeStock(machine, productId) {
  machine.stock[productId] -= 1;
  const product = productById(productId);
  if (product.type !== "fresh" || !machine.batches?.[productId]) return;
  const batches = machine.batches[productId];
  while (batches.length && batches[0].qty <= 0) batches.shift();
  if (batches.length) {
    batches[0].qty -= 1;
    if (batches[0].qty <= 0) batches.shift();
  }
}

function updateProductPrice(productId, rawValue) {
  const product = productById(productId);
  const nextPrice = clamp(Math.round(Number(rawValue) || product.basePrice), Math.round(product.basePrice * 0.45), Math.round(product.basePrice * 2.8));
  product.price = nextPrice;
  const demand = Math.round(priceDemandFactor(product) * 100);
  addLog(`${product.name} price set to ${formatMoney(nextPrice)}. Estimated demand index: ${demand}%.`);
  render();
}

function buyUpgrade(upgradeId) {
  const machine = currentMachine();
  const upgrade = upgradeDefs[upgradeId];
  const level = machine.upgrades?.[upgradeId] || 0;
  if (level >= upgrade.max) return;
  const cost = upgrade.cost * (level + 1);
  if (state.cash < cost) {
    addLog(`${upgrade.label} needs ${formatMoney(cost)}.`);
    render();
    return;
  }
  state.cash -= cost;
  machine.upgrades[upgradeId] = level + 1;
  state.stats.security += cost;
  addLog(`${machine.name} upgraded: ${upgrade.label} level ${level + 1}.`);
  render();
  showAction("upgrade!", "repair-pulse");
}

function updateAutoRestock(productId, enabled, min) {
  const policy = state.autoRestock[productId] || { enabled: false, min: 5 };
  if (enabled !== null) policy.enabled = enabled;
  if (min !== null) policy.min = clamp(Math.round(Number(min) || 0), 0, 30);
  state.autoRestock[productId] = policy;
  render();
}

function collectCash() {
  const machine = currentMachine();
  if (machine.cash <= 0) {
    addLog(`${machine.name} had an empty cash box. Very minimalist.`);
    render();
    return;
  }
  state.cash += machine.cash;
  addLog(`Collected ${formatMoney(machine.cash)} from ${machine.name}.`);
  machine.cash = 0;
  render();
  showAction("cash collected", "cash-pulse");
}

function repairMachine() {
  const machine = currentMachine();
  const missing = 100 - machine.condition;
  const cost = Math.max(1500, Math.round(missing * 105) + (machine.broken ? 3200 : 0));
  if (state.cash < cost) {
    addLog(`Not enough cash for service. You need ${formatMoney(cost)}.`);
    render();
    return;
  }
  state.cash -= cost;
  machine.condition = clamp(machine.condition + 38, 0, 100);
  machine.broken = false;
  state.brandBuzz = clamp(state.brandBuzz + 1.3, 0, 100);
  state.stats.maintenance += cost;
  addLog(`${machine.name} serviced for ${formatMoney(cost)}.`);
  render();
  showAction("serviced", "repair-pulse");
}

function cleanMachine() {
  const machine = currentMachine();
  const cost = 900;
  if (state.cash < cost) {
    addLog(`Not enough cash for cleaning. You need ${formatMoney(cost)}.`);
    render();
    return;
  }
  state.cash -= cost;
  machine.clean = clamp(machine.clean + 46, 0, 100);
  state.brandBuzz = clamp(state.brandBuzz + 1.1, 0, 100);
  state.stats.cleaning += cost;
  addLog(`${machine.name} cleaned until it looked almost proud.`);
  render();
  showAction("sparkly", "clean-pulse");
}

function orderStock(productId, units = 10) {
  const product = productById(productId);
  const cost = effectiveCost(product) * units;
  if (state.cash < cost) {
    addLog(`Ordering ${product.name} needs ${formatMoney(cost)}.`);
    render();
    return;
  }
  state.cash -= cost;
  state.warehouse[product.id] = (state.warehouse[product.id] || 0) + units;
  addWarehouseBatch(product.id, units);
  state.stats.restockByProduct[product.id] = (state.stats.restockByProduct[product.id] || 0) + cost;
  addLog(`Ordered ${units} pcs of ${product.name}.`);
  render();
}

function runAutoRestock(events) {
  products.forEach((product) => {
    const policy = state.autoRestock[product.id];
    if (!policy?.enabled) return;
    const current = state.warehouse[product.id] || 0;
    if (current >= policy.min) return;
    const units = Math.min(10, policy.min - current);
    const cost = effectiveCost(product) * units;
    if (state.cash < cost) return;
    state.cash -= cost;
    state.warehouse[product.id] = current + units;
    addWarehouseBatch(product.id, units);
    state.stats.restockByProduct[product.id] = (state.stats.restockByProduct[product.id] || 0) + cost;
    events.push(`Auto-restock ordered ${units} pcs of ${product.name} for ${formatMoney(cost)}.`);
  });
}

function ageWarehouseFreshStock(events) {
  state.warehouseBatches ||= {};
  Object.entries(state.warehouseBatches).forEach(([productId, batches]) => {
    const product = productById(productId);
    if (!product || product.type !== "fresh") return;
    let lost = 0;
    batches.forEach((batch) => {
      batch.days -= 1;
      if (batch.days <= 0) lost += batch.qty;
    });
    state.warehouseBatches[productId] = batches.filter((batch) => batch.days > 0 && batch.qty > 0);
    if (lost > 0) {
      state.warehouse[productId] = Math.max(0, (state.warehouse[productId] || 0) - lost);
      events.push(`${product.name} spoiled in the warehouse: ${lost} pcs removed.`);
    }
  });
}

function changeLocation() {
  const machine = currentMachine();
  if (!machine) return;
  const nextLocation = el.machineLocation.value;
  if (machine.location === nextLocation) return;
  const movingCost = 2200 + state.machines.length * 350;
  if (state.cash < movingCost) {
    addLog(`Moving location costs ${formatMoney(movingCost)}, and the budget is making a tiny sad face.`);
    render();
    return;
  }
  state.cash -= movingCost;
  machine.location = nextLocation;
  state.brandBuzz = clamp(state.brandBuzz + 0.8, 0, 100);
  addLog(`${machine.name} moved to ${locationById(nextLocation).label}. Relocation cost: ${formatMoney(movingCost)}.`);
  render();
}

function buyMachine() {
  const type = el.machineToBuy.value;
  const info = machineTypes[type];
  if (state.cash < info.buyCost) {
    addLog(`A new ${info.label.toLowerCase()} costs ${formatMoney(info.buyCost)}.`);
    render();
    return;
  }

  const machine = makeMachine(type);
  state.cash -= info.buyCost;
  state.machines.push(machine);
  state.selectedMachine = machine.id;
  state.brandBuzz = clamp(state.brandBuzz + 4, 0, 100);
  addLog(`Bought a new machine: ${machine.name}. Stock it before the tiny crowd forms.`);
  render();
  showAction("new machine", "service-pulse");
}

function planDay() {
  const rep = reputation();
  const sales = [];
  let revenue = 0;
  let sold = 0;
  let upkeep = 0;
  let missed = 0;
  let theftLoss = 0;
  let spoilLoss = 0;
  const customerBreakdown = {};
  const events = [];

  runAutoRestock(events);
  ageWarehouseFreshStock(events);
  tickSupplyModifiers(events);
  rollSupplyEvent(events);
  tickDemandModifiers(events);
  rollDemandEvent(events);

  state.machines.forEach((machine) => {
    const typeInfo = machineTypes[machine.type];
    const location = locationById(machine.location);
    applyMachineRisks(machine, events);
    const event = rollLocationEvent(location);
    if (event.active) applyDemandEvent(event, events, `${machine.name} / ${location.label}`);
    const canSell = !machine.broken;
    const fill = machineFill(machine);
    const health = machine.condition < 18 || machine.broken ? 0.08 : machine.condition / 100;
    const clean = machine.clean < 25 ? 0.42 : machine.clean / 100;
    const productVariety = Object.values(machine.stock).filter((amount) => amount > 0).length;
    const varietyBoost = 0.85 + productVariety * 0.12;
    const priceBoost = averageMachinePriceDemand(machine);
    const displayBoost = 1 + (machine.upgrades?.display || 0) * 0.08;
    const impulseBoost = 1 + (machine.upgrades?.moodLighting || 0) * 0.06 + (machine.upgrades?.voiceAssistant || 0) * 0.03;
    const lockSlowdown = 1 - (machine.upgrades?.camera || 0) * 0.025;
    const repDemand = 2 + rep / 9;
    const dailyVisitors = canSell
      ? Math.max(0, Math.round(repDemand * typeInfo.demand * location.demand * health * clean * fill * varietyBoost * priceBoost * displayBoost * impulseBoost * lockSlowdown * (0.82 + Math.random() * 0.32)))
      : 0;

    upkeep += Math.round(typeInfo.upkeep * (1 - (machine.upgrades?.efficiency || 0) * 0.12)) + location.upkeep;
    for (let i = 0; i < dailyVisitors; i += 1) {
      const available = Object.keys(machine.stock).filter((id) => machine.stock[id] > 0);
      if (available.length === 0) {
        missed += 1;
        break;
      }
      const customer = pick(locationCustomers[machine.location] || ["casual"]);
      customerBreakdown[customer] = (customerBreakdown[customer] || 0) + 1;
      const id = weightedProductPick(available, customer, machine);
      const product = productById(id);
      const saleValue = Math.round(product.price * (1 + (machine.upgrades?.cardReader || 0) * 0.05));
      consumeStock(machine, id);
      machine.cash += saleValue;
      revenue += saleValue;
      state.stats.revenueByMachine[machine.id] = (state.stats.revenueByMachine[machine.id] || 0) + saleValue;
      sold += 1;
      state.weekly.sales += 1;
      state.weekly.soldByType[product.type] = (state.weekly.soldByType[product.type] || 0) + 1;
      sales.push({ machineId: machine.id, machineName: machine.name, product: product.name, value: saleValue, customer });
    }

    const wear = 1.6 + dailyVisitors * 0.32 + Math.random() * 2.8 + (machine.broken ? 2.4 : 0);
    machine.condition = clamp(machine.condition - wear, 0, 100);
    machine.clean = clamp(machine.clean - ((1.8 + dailyVisitors * 0.3 + Math.random() * 2.6) * location.clean), 0, 100);
    if (machine.type === "fresh") spoilLoss += spoilFreshStock(machine, events);
    rollAbsurdEvent(machine, events);
    if (machineStockTotal(machine) <= 2) missed += 1;
    if (machine.broken) missed += 2;
    if (machine.condition < 20 && !machine.broken) missed += 1;
    if (machine.cash > 0 && Math.random() < breakInChance(machine)) {
      const stolen = Math.max(0, Math.round(machine.cash * (0.45 + Math.random() * 0.45)));
      machine.cash -= stolen;
      theftLoss += stolen;
      missed += 3;
      state.brandBuzz = clamp(state.brandBuzz - 4, 0, 100);
      events.push(`${machine.name} was cracked open: ${formatMoney(stolen)} vanished from the cash box.`);
    }
  });

  state.cash -= upkeep;
  const expenses = upkeep + theftLoss + spoilLoss;
  state.lastProfit = revenue - expenses;
  state.weekly.profit += state.lastProfit;
  state.weekly.revenue += revenue;
  state.weekly.expenses += expenses;
  state.brandBuzz = clamp(state.brandBuzz + sold * 0.36 - missed * 1.65 + (state.lastProfit > 0 ? 1.1 : -2.8), 0, 100);
  state.stats.daily.push({ day: state.day, revenue, expenses, profit: state.lastProfit, sold, events: events.length, customers: customerBreakdown });
  state.stats.daily = state.stats.daily.slice(-30);
  return { sales, revenue, sold, upkeep, missed, theftLoss, spoilLoss, events, customerBreakdown };
}

function rollAbsurdEvent(machine, events) {
  for (const event of absurdEvents) {
    if (event.requires && !event.requires(machine)) continue;
    if (Math.random() >= event.chance) continue;
    const text = typeof event.text === "function" ? event.text(machine) : event.text;
    events.push(text);
    event.effect?.(machine, events);
    return;
  }
}

function rollLocationEvent(location) {
  const candidates = locationEvents.filter((event) => event.bias === "any" || event.bias === location.eventBias);
  for (const event of candidates) {
    if (Math.random() < event.chance) return { ...event, active: true };
  }
  return { name: "Normal day", productIds: [], multiplier: 1, duration: 0, text: "", active: false };
}

function averageMachinePriceDemand(machine) {
  const stocked = Object.keys(machine.stock).filter((id) => machine.stock[id] > 0).map(productById);
  if (stocked.length === 0) return 0.35;
  const average = stocked.reduce((sum, product) => sum + priceDemandFactor(product, machine), 0) / stocked.length;
  return clamp(average, 0.32, 1.55);
}

function weightedProductPick(productIds, customerId = "casual", machine = currentMachine()) {
  const customer = customerTypes[customerId] || customerTypes.casual;
  const weights = productIds.map((id) => {
    const product = productById(id);
    const preference = customer.products.includes(id) ? 1.65 : 0.65;
    const tolerance = product.price > product.basePrice ? customer.priceTolerance : 1;
    return Math.max(0.05, priceDemandFactor(product, machine) * preference * tolerance);
  });
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < productIds.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) return productIds[i];
  }
  return productIds[productIds.length - 1];
}

function tickSupplyModifiers(events) {
  Object.entries(state.supplyModifiers).forEach(([productId, modifier]) => {
    modifier.daysLeft -= 1;
    if (modifier.daysLeft <= 0) {
      const product = productById(productId);
      delete state.supplyModifiers[productId];
      events.push(`${product.name} supply prices normalized. The accountant stopped squinting.`);
    }
  });
}

function rollSupplyEvent(events) {
  for (const event of supplyEvents) {
    if (Math.random() >= event.chance) continue;
    event.productIds.forEach((productId) => {
      state.supplyModifiers[productId] = {
        multiplier: event.multiplier,
        daysLeft: event.duration,
        name: event.name
      };
    });
    events.push(event.text);
    return;
  }
}

function tickDemandModifiers(events) {
  Object.entries(state.demandModifiers).forEach(([productId, modifier]) => {
    modifier.daysLeft -= 1;
    if (modifier.daysLeft <= 0) {
      const product = productById(productId);
      delete state.demandModifiers[productId];
      events.push(`${product.name} demand returned to normal. The trend moved on, as trends rudely do.`);
    }
  });
}

function rollDemandEvent(events) {
  for (const event of demandEvents) {
    if (Math.random() >= event.chance) continue;
    applyDemandEvent(event, events);
    return;
  }
}

function applyDemandEvent(event, events, prefix = "") {
  event.productIds.forEach((productId) => {
    state.demandModifiers[productId] = {
      multiplier: event.multiplier,
      daysLeft: event.duration,
      name: event.name
    };
  });
  state.stats.locationEvents[event.name] = (state.stats.locationEvents[event.name] || 0) + 1;
  events.push(`${prefix ? `${prefix}: ` : ""}${event.text}`);
}

function majorFaultChance(machine) {
  const conditionRisk = machine.condition < 35 ? (35 - machine.condition) / 260 : 0;
  const ageRisk = state.day > 8 ? Math.min(0.035, (state.day - 8) * 0.002) : 0;
  return balance.majorFaultBaseChance + conditionRisk + ageRisk;
}

function breakInChance(machine) {
  const location = locationById(machine.location);
  const security = effectiveSecurity(machine);
  if (security >= 90) return 0.00001;
  const insecurity = (100 - security) / 100;
  const cashTemptation = Math.min(0.018, machine.cash / 320000);
  const lateGameNoise = state.day > 14 ? 0.002 : 0;
  return (balance.breakInBaseChance + Math.pow(insecurity, 2.35) * 0.105 + cashTemptation + lateGameNoise) * location.theft;
}

function applyMachineRisks(machine, events) {
  if (machine.broken) return;
  if (Math.random() < majorFaultChance(machine)) {
    const drop = 22 + Math.random() * 28;
    machine.condition = clamp(machine.condition - drop, 0, 100);
    machine.broken = machine.condition < 28 || Math.random() < 0.45;
    state.brandBuzz = clamp(state.brandBuzz - 3.5, 0, 100);
    events.push(`${machine.name} started the day with a serious fault. Without service, it mostly sighs.`);
  }
}

function spoilFreshStock(machine, events) {
  let lostValue = 0;
  Object.keys(machine.stock).forEach((id) => {
    const product = productById(id);
    if (product.type !== "fresh" || machine.stock[id] <= 0) return;
    machine.batches ||= {};
    machine.batches[id] ||= machine.stock[id] ? [{ qty: machine.stock[id], days: shelfLifeFor(machine, product) }] : [];
    let lost = 0;
    machine.batches[id].forEach((batch) => {
      batch.days -= 1;
      if (batch.days <= 0) lost += batch.qty;
    });
    machine.batches[id] = machine.batches[id].filter((batch) => batch.days > 0 && batch.qty > 0);
    if (lost === 0 && Math.random() < balance.freshSpoilChance * (1 - (machine.upgrades?.cooling || 0) * 0.22)) {
      lost = Math.min(machine.stock[id], 1);
    }
    if (lost <= 0) return;
    machine.stock[id] = Math.max(0, machine.stock[id] - lost);
    lostValue += lost * effectiveCost(product);
  });
  if (lostValue > 0) {
    state.brandBuzz = clamp(state.brandBuzz - 1.6, 0, 100);
    events.push(`${machine.name} had fresh goods spoil: ${formatMoney(lostValue)} wholesale loss.`);
  }
  return lostValue;
}

async function nextDay() {
  if (state.runningDay) return;
  state.runningDay = true;
  setBusy(true);
  addLog(pick(logBits.dayStart));
  renderLog();

  const result = planDay();
  const animationCount = Math.min(Math.max(result.sold, 4), 18);
  const liveEvents = [...result.events];
  for (let i = 0; i < animationCount; i += 1) {
    spawnCustomer(i, result.sales[i % Math.max(result.sales.length, 1)]);
    if (liveEvents.length > 0 && (i === 1 || i % 4 === 0)) {
      await showEventToast(liveEvents.shift());
    }
    await wait(170);
  }
  while (liveEvents.length > 0) {
    await showEventToast(liveEvents.shift());
  }
  await wait(850);

  state.day += 1;
  result.events.forEach((event) => addLog(event));
  if (result.sold > 0) {
    addLog(`${result.sold} items sold, ${formatMoney(result.revenue)} revenue, ${formatMoney(state.lastProfit)} profit/loss. The cash box jingled with quiet confidence.`);
  } else {
    addLog(pick(logBits.noSale));
  }
  if (result.missed > 0) addLog(`${result.missed} ${pick(logBits.problem)}`);
  if (result.theftLoss > 0) addLog(`Break-in losses: ${formatMoney(result.theftLoss)}. The security screwdriver was missed today.`);
  if (result.spoilLoss > 0) addLog(`Spoilage loss: ${formatMoney(result.spoilLoss)}. A few sandwiches entered a philosophical state.`);
  if (result.missed === 0 && result.sold > 5) addLog(pick(logBits.goodDay));
  if ((state.day - 1) % 7 === 0) {
    const report = closeWeek();
    await showEventToast(report.text);
  }

  state.runningDay = false;
  render();
}

function closeWeek() {
  const goal = state.weekly.goal || pick(weeklyGoals);
  const success = goalReached(goal);
  if (success) {
    state.cash += goal.reward;
    state.brandBuzz = clamp(state.brandBuzz + 5, 0, 100);
  } else {
    state.brandBuzz = clamp(state.brandBuzz - 3, 0, 100);
  }
  const bestMachine = bestMachineName();
  const report = {
    week: state.weekly.number,
    profit: state.weekly.profit,
    revenue: state.weekly.revenue,
    expenses: state.weekly.expenses,
    sales: state.weekly.sales,
    goal: goal.text,
    success,
    bestMachine
  };
  state.reports.unshift(report);
  state.reports = state.reports.slice(0, 8);
  const text = `Week ${report.week} report: ${success ? "Goal cleared!" : "Goal missed."} ${goal.text}. Profit: ${formatMoney(report.profit)}. Top machine: ${bestMachine}. ${success ? `Bonus: ${formatMoney(goal.reward)}.` : "Reputation took a tiny sigh."}`;
  addLog(text);
  state.weekly = {
    number: state.weekly.number + 1,
    goal: pick(weeklyGoals),
    profit: 0,
    sales: 0,
    soldByType: {},
    revenue: 0,
    expenses: 0
  };
  return { text };
}

function goalReached(goal) {
  if (goal.type === "profit") return state.weekly.profit >= goal.target;
  if (goal.type === "reputation") return reputation() >= goal.target;
  if (goal.type === "sales") return state.weekly.sales >= goal.target;
  return (state.weekly.soldByType[goal.type] || 0) >= goal.target;
}

function bestMachineName() {
  let best = null;
  state.machines.forEach((machine) => {
    const value = state.stats.revenueByMachine[machine.id] || 0;
    if (!best || value > best.value) best = { name: machine.name, value };
  });
  return best?.name || "none yet";
}

function spawnCustomer(index, sale) {
  const customer = document.createElement("div");
  const look = sale?.customer ? customerLookByType[sale.customer] || "bag" : customerLooks[index % customerLooks.length];
  customer.className = `customer ${look}`;
  customer.style.setProperty("--delay", `${index * 22}ms`);
  customer.style.setProperty("--lane", `${20 + (index % 5) * 13}px`);
  customer.innerHTML = `
    <span class="head"></span>
    <span class="body"></span>
    <span class="legs"></span>
    <span class="bubble">${sale ? pick(logBits.saleBubble) : "?"}</span>
  `;
  el.customerLane.append(customer);
  window.setTimeout(() => customer.remove(), 1800);
}

function switchTab(name) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === name);
  });
  document.querySelectorAll(".tab-page").forEach((page) => {
    page.classList.remove("active");
  });
  document.querySelector(`#${name}Tab`).classList.add("active");
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

document.querySelectorAll("[data-chart]").forEach((input) => {
  input.addEventListener("change", () => {
    state.charts[input.dataset.chart] = input.checked;
    renderStats();
  });
});

document.querySelectorAll("[data-help]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openHelp(button.dataset.help);
  });
});

el.helpClose.addEventListener("click", closeHelp);
el.helpOverlay.addEventListener("click", (event) => {
  if (event.target === el.helpOverlay) closeHelp();
});

el.collectCash.addEventListener("click", collectCash);
el.repair.addEventListener("click", repairMachine);
el.clean.addEventListener("click", cleanMachine);
el.machineLocation.addEventListener("change", changeLocation);
el.buyMachine.addEventListener("click", buyMachine);
el.nextDay.addEventListener("click", nextDay);

render();
