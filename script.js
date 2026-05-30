const products = [
  { id: "chips", name: "Paprika chips", displayName: "Crunch Liability Chips", categoryName: "Paprika chips", type: "snack", basePrice: 590, price: 590, baseCost: 170, color: "#d05f45", elasticity: 1.18 },
  { id: "bar", name: "Chocolate bar", displayName: "Mood Brick Chocolate", categoryName: "Chocolate bar", type: "snack", basePrice: 490, price: 490, baseCost: 120, color: "#7c5f46", elasticity: 1.08 },
  { id: "nuts", name: "Nut mix", displayName: "Desk Drawer Nuts", categoryName: "Nut mix", type: "snack", basePrice: 720, price: 720, baseCost: 225, color: "#e6b84c", elasticity: 0.95 },
  { id: "cola", name: "Cold cola", displayName: "Cold Cola With Intent", categoryName: "Cold cola", type: "drink", basePrice: 650, price: 650, baseCost: 175, color: "#426f9d", elasticity: 1.12 },
  { id: "water", name: "Mineral water", displayName: "Mineral Water, Allegedly", categoryName: "Mineral water", type: "drink", basePrice: 390, price: 390, baseCost: 65, color: "#207a81", elasticity: 1.28 },
  { id: "energy", name: "Energy drink", displayName: "Dr. Skorpio Energy Liquid", categoryName: "Energy drink", type: "drink", basePrice: 790, price: 790, baseCost: 250, color: "#2a3040", elasticity: 0.9 },
  { id: "espresso", name: "Espresso", displayName: "Saint Bean Espresso", categoryName: "Espresso", type: "coffee", basePrice: 520, price: 520, baseCost: 58, color: "#5c4433", elasticity: 0.82 },
  { id: "latte", name: "Latte", displayName: "Managerial Foam Latte", categoryName: "Latte", type: "coffee", basePrice: 690, price: 690, baseCost: 118, color: "#b98b60", elasticity: 0.88 },
  { id: "sandwich", name: "Ham sandwich", displayName: "Lunch Rectangle", categoryName: "Ham sandwich", type: "fresh", basePrice: 1190, price: 1190, baseCost: 350, color: "#4f9d78", elasticity: 1.05 },
  { id: "salad", name: "Fresh salad", displayName: "Compliance Greens", categoryName: "Fresh salad", type: "fresh", basePrice: 1390, price: 1390, baseCost: 430, color: "#6fa64d", elasticity: 1.0 },
  { id: "beer", name: "Beer", displayName: "Civic Lager", categoryName: "Beer", type: "alcohol", basePrice: 1290, price: 1290, baseCost: 390, color: "#d6a53f", elasticity: 0.74 },
  { id: "wine", name: "Canned wine", displayName: "Boardroom Rose", categoryName: "Canned wine", type: "alcohol", basePrice: 1590, price: 1590, baseCost: 520, color: "#b85f78", elasticity: 0.8 },
  { id: "seltzer", name: "Hard seltzer", displayName: "Regret Bubbles", categoryName: "Hard seltzer", type: "alcohol", basePrice: 1390, price: 1390, baseCost: 430, color: "#8f7bd8", elasticity: 0.88 }
];

const SAVE_VERSION = 4;
const DEFAULT_COMPANY_NAME = "Unregistered Snack Concern";
const currencyName = "Crumbs";
const currencyCode = "Cr";
const DEFAULT_OPERATOR_PROFILE = {
  classificationId: "WND-UN-00-A",
  primaryArchetype: "UNCLASSIFIED",
  secondaryTags: [],
  scores: {},
  behaviorTags: [],
  identityPath: {
    id: "unformed",
    label: "Unformed operator",
    score: 0,
    emergedDay: null
  }
};

const operatorArchetypeMeta = {
  UNCLASSIFIED: { code: "UN", scoreKey: "premiumBehavior", flavor: "This profile is not a moral judgement. Legal insisted we say that." },
  CAFFEINE_INFRASTRUCTURE_VENDOR: { code: "CF", scoreKey: "caffeineBias", flavor: "Operator monetizes exhaustion efficiently." },
  MINIMALIST_BEVERAGE_TYRANT: { code: "BV", scoreKey: "hydrationBias", flavor: "Operator understands thirst as a scalable weakness." },
  LOW_MARGIN_SNACK_EXPANSIONIST: { code: "SN", scoreKey: "snackBias", flavor: "Operator prefers volume, crumbs, and plausible deniability." },
  FRESH_FOOD_LIABILITY_DISTRIBUTOR: { code: "FR", scoreKey: "freshFoodBias", flavor: "Operator believes perishable goods are a personality test." },
  AUDIT_HEAT_ENTHUSIAST: { code: "AH", scoreKey: "auditRisk", flavor: "Operator treats legality as a negotiable subscription tier." },
  CORPORATE_COMPLIANCE_PET: { code: "CP", scoreKey: "corporateCompliance", flavor: "Operator is boring, profitable, and therefore loved." },
  NEGLECTFUL_ROUTE_GOBLIN: { code: "NG", scoreKey: "maintenanceNeglect", flavor: "Operator has discovered that machines can suffer quietly." },
  STATION_CHAOS_OPERATOR: { code: "SC", scoreKey: "locationRisk", flavor: "Operator turns public disorder into foot traffic." },
  PREMIUM_MICRO_EMPIRE: { code: "PR", scoreKey: "premiumBehavior", flavor: "Operator sells convenience with a decorative moral injury." },
  COMPETITOR_BAIT: { code: "CB", scoreKey: "competitorPressure", flavor: "Operator attracts hostile corporate attention with admirable consistency." }
};

const machineTypes = {
  snack: { label: "Snack machine", starter: "SnackBox 120", capacity: 20, buyCost: 56000, upkeep: 560, demand: 1.08 },
  drink: { label: "Drink machine", starter: "HydroVend 8", capacity: 18, buyCost: 64000, upkeep: 680, demand: 1.16 },
  coffee: { label: "Coffee machine", starter: "BeanStation", capacity: 24, buyCost: 72000, upkeep: 760, demand: 1.0 },
  fresh: { label: "Fresh food machine", starter: "FreshMate", capacity: 14, buyCost: 86000, upkeep: 980, demand: 0.92 },
  alcohol: { label: "Alcohol machine", starter: "Nightlife Compliance Dispenser", capacity: 16, buyCost: 98000, upkeep: 1180, demand: 0.96 }
};

const machineProgression = {
  snack: { rep: 0, minCashAfterPurchase: -12000, contract: null, text: "Open snack license" },
  drink: { rep: 45, minCashAfterPurchase: -8000, contract: "beverage", text: "Requires Beverage Dispensing License and 45% reputation" },
  coffee: { rep: 52, minCashAfterPurchase: 0, contract: "coffee", text: "Requires Hot Beverage Permit, 52% reputation, and non-negative cash after purchase" },
  fresh: { rep: 60, minCashAfterPurchase: 8000, contract: "fresh", text: "Requires Fresh Food Liability Waiver, 60% reputation, and 8 000 Cr cash buffer" },
  alcohol: { rep: 64, minCashAfterPurchase: 12000, contract: "alcohol", maxHeat: 44, text: "Requires Alcohol Retail License, 64% reputation, audit heat under 45%, and 12 000 Cr cash buffer" }
};

const contractDefs = {
  beverage: {
    label: "Beverage Dispensing License",
    machineType: "drink",
    cost: 14000,
    rep: 42,
    debtLimit: 42000,
    upkeepFactor: 1.04,
    demandFactor: 1.03,
    text: "Unlocks drink machines. Adds minor sanitation paperwork overhead."
  },
  coffee: {
    label: "Hot Beverage Permit",
    machineType: "coffee",
    cost: 18000,
    rep: 50,
    debtLimit: 32000,
    upkeepFactor: 1.06,
    demandFactor: 1.04,
    text: "Unlocks coffee machines. Better demand, higher inspection-grade upkeep."
  },
  fresh: {
    label: "Fresh Food Liability Waiver",
    machineType: "fresh",
    cost: 24000,
    rep: 58,
    debtLimit: 18000,
    upkeepFactor: 1.09,
    demandFactor: 1.05,
    text: "Unlocks fresh food machines. Stronger lunch potential, stricter compliance costs."
  },
  alcohol: {
    label: "Alcohol Retail License",
    machineType: "alcohol",
    cost: 32000,
    rep: 62,
    debtLimit: 14000,
    maxHeat: 38,
    upkeepFactor: 1.14,
    demandFactor: 1.09,
    text: "Unlocks alcohol machines. Higher margins, louder paperwork, more inspection attention."
  }
};

const financeDefaults = {
  debt: 0,
  principal: 0,
  interestRate: 0.05,
  totalInterestPaid: 0,
  totalRepaid: 0,
  emergencyLoans: 0,
  loansTaken: 0,
  lastPrincipalPayment: 0
};

const BANKRUPTCY_BASE_THRESHOLD = -35000;

const loanOffers = {
  payday: {
    label: "Payday Float",
    amount: 12000,
    interestRate: 0.095,
    maxDebtFactor: 0.72,
    minRep: 0,
    minMachines: 1,
    text: "Small, fast, expensive. Finance calls it a snack-sized mistake."
  },
  equipment: {
    label: "Equipment Loan",
    amount: 42000,
    interestRate: 0.068,
    maxDebtFactor: 0.62,
    minRep: 42,
    minMachines: 1,
    minCompanyValue: 64000,
    text: "Medium equipment capital. Requires the route to look like a business on purpose."
  },
  expansion: {
    label: "Expansion Credit Line",
    amount: 85000,
    interestRate: 0.052,
    maxDebtFactor: 0.54,
    minRep: 58,
    minMachines: 2,
    minCompanyValue: 145000,
    maxHeat: 55,
    text: "Larger growth money with calmer interest. The paperwork smells like ambition."
  },
  corporateGrowth: {
    label: "Corporate Growth Loan",
    amount: 160000,
    interestRate: 0.041,
    maxDebtFactor: 0.46,
    minRep: 72,
    minMachines: 4,
    minCompanyValue: 285000,
    maxHeat: 34,
    maxHostility: 68,
    text: "Very large, very watched. Low rate for operators who look profitable and containable."
  }
};

const STARTUP_FINANCING_DEFAULT = "standard";
const startupFinancingOptions = {
  safe: {
    label: "Safe Start",
    cash: 76000,
    debt: 28000,
    interestRate: 0.042,
    stockKit: 9,
    warehouseKit: 4,
    text: "Low-risk paperwork. Enough capital for a basic route, modest debt, slower opening pressure."
  },
  standard: {
    label: "Standard Loan",
    cash: 98000,
    debt: 52000,
    interestRate: 0.05,
    stockKit: 10,
    warehouseKit: 6,
    text: "Normal small-operator financing. Comfortable first machine choice, normal debt service."
  },
  aggressive: {
    label: "Aggressive Expansion Loan",
    cash: 138000,
    debt: 88000,
    interestRate: 0.067,
    stockKit: 12,
    warehouseKit: 10,
    text: "Big cash, expensive confidence. Better opening flexibility, higher interest and attention."
  },
  hard: {
    label: "Minimal Debt / Hard Start",
    cash: 64000,
    debt: 0,
    interestRate: 0.05,
    stockKit: 7,
    warehouseKit: 2,
    text: "Very little cushion. Snack machines only at the start unless the budget performs a miracle."
  }
};

const locations = {
  campus: { label: "Campus lobby", demand: 1.18, upkeep: 430, theft: 0.95, security: 72, clean: 1.18, eventBias: "crowd" },
  office: { label: "Office tower", demand: 1.0, upkeep: 760, theft: 0.7, security: 88, clean: 0.88, eventBias: "routine" },
  station: { label: "Train station", demand: 1.34, upkeep: 260, theft: 1.45, security: 42, clean: 1.45, eventBias: "chaos" },
  gym: { label: "Fitness club", demand: 1.08, upkeep: 620, theft: 0.78, security: 82, clean: 1.05, eventBias: "sport" },
  mall: { label: "Shopping mall", demand: 1.26, upkeep: 390, theft: 1.05, security: 64, clean: 1.16, eventBias: "crowd" }
};

const districtProfiles = {
  campus: {
    identity: "Student district",
    strategy: "cheap snacks, water, and stress purchases",
    risk: "trend-sensitive demand and messy crowds",
    cityLine: "Campus vending culture remains one group project away from snack dependency."
  },
  office: {
    identity: "Corporate district",
    strategy: "coffee, lunch, and tidy machines",
    risk: "higher rent, lower chaos, more paperwork energy",
    cityLine: "Office towers continue converting fatigue into authorized caffeine."
  },
  station: {
    identity: "Commuter district",
    strategy: "fast drinks, cheap snacks, and chaos tolerance",
    risk: "low security, theft, and sudden traffic swings",
    cityLine: "Station foot traffic rises whenever the timetable loses confidence."
  },
  gym: {
    identity: "Fitness district",
    strategy: "water, nuts, salads, and disciplined pricing",
    risk: "weak junk-food fit and judgemental mirrors",
    cityLine: "Fitness district customers continue buying hydration with moral posture."
  },
  mall: {
    identity: "Impulse district",
    strategy: "snacks, cola, lattes, and nightlife-adjacent cans",
    risk: "crowds, trends, and private-security mood swings",
    cityLine: "Mall customers remain vulnerable to anything cold, shiny, or near an escalator."
  }
};

const locationProductSynergy = {
  campus: { bar: 1.18, chips: 1.12, water: 1.08, espresso: 0.92, salad: 0.86, beer: 1.04, wine: 0.82, seltzer: 1.08 },
  office: { espresso: 1.28, latte: 1.2, sandwich: 1.14, energy: 1.08, chips: 0.88, cola: 0.92, beer: 0.78, wine: 1.04, seltzer: 0.92 },
  station: { water: 1.18, cola: 1.14, chips: 1.1, sandwich: 1.08, salad: 0.82, latte: 0.9, beer: 1.24, wine: 0.88, seltzer: 1.16 },
  gym: { water: 1.36, nuts: 1.22, salad: 1.16, energy: 1.12, chips: 0.72, bar: 0.78, cola: 0.84, beer: 0.54, wine: 0.48, seltzer: 0.62 },
  mall: { chips: 1.18, bar: 1.18, cola: 1.12, latte: 1.08, salad: 0.88, beer: 1.08, wine: 1.18, seltzer: 1.22 }
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
  { name: "Gym hydration board", bias: "sport", chance: 0.08, productIds: ["water"], multiplier: 1.38, duration: 2, text: "The gym highlights hydration, raising water demand." },
  { name: "Campus budget panic", bias: "crowd", chance: 0.06, productIds: ["bar", "water"], multiplier: 1.22, duration: 1, text: "Campus budget panic: students downgrade dinner plans to chocolate bars and water with academic seriousness." },
  { name: "Office compliance seminar", bias: "routine", chance: 0.055, productIds: ["espresso", "latte"], multiplier: 1.26, duration: 1, text: "Office compliance seminar: coffee demand rises as employees learn three new ways to say 'noted'." },
  { name: "Station platform freeze", bias: "chaos", chance: 0.055, productIds: ["espresso", "latte"], multiplier: 1.28, duration: 1, text: "Platform heating underperforms. Warm coffee becomes unofficial infrastructure." },
  { name: "Mall escalator outage", bias: "crowd", chance: 0.055, productIds: ["water", "cola"], multiplier: 1.2, duration: 1, text: "Mall escalator outage: shoppers discover stairs and immediately purchase liquids." },
  { name: "Gym mirror audit", bias: "sport", chance: 0.05, productIds: ["salad", "water"], multiplier: 1.2, duration: 1, text: "Gym mirror audit: everyone makes one responsible purchase under fluorescent accountability." },
  { name: "Station after-hours drift", bias: "chaos", chance: 0.045, productIds: ["beer", "seltzer"], multiplier: 1.24, duration: 1, text: "Station after-hours drift: alcohol demand rises while the timetable develops plausible deniability." },
  { name: "Mall tasting rumor", bias: "crowd", chance: 0.045, productIds: ["wine", "seltzer"], multiplier: 1.18, duration: 1, text: "Mall tasting rumor: canned wine and hard seltzer demand rises despite no official tasting existing." },
  { name: "Office morale annex", bias: "routine", chance: 0.04, productIds: ["wine"], multiplier: 1.16, duration: 1, text: "Office morale annex: canned wine demand improves after HR calls it 'post-meeting hydration'." }
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
  { name: "Import paperwork delay", productIds: ["nuts", "espresso", "latte"], multiplier: 1.24, duration: 2, chance: 0.05, text: "Import paperwork delay: nut and coffee wholesale costs rise." },
  { name: "Carbonated logistics memo", productIds: ["cola"], multiplier: 1.2, duration: 2, chance: 0.045, text: "Carbonated logistics memo: cola now requires more forms per bubble. Wholesale cost rises." },
  { name: "Institutional espresso rebate", productIds: ["espresso"], multiplier: 0.8, duration: 2, chance: 0.045, text: "Institutional espresso rebate: bean costs fall after a supplier discovers the word 'partnership'." },
  { name: "Fresh label audit", productIds: ["sandwich", "salad"], multiplier: 1.18, duration: 2, chance: 0.045, text: "Fresh label audit: sandwiches and salads cost more while labels become aggressively legible." },
  { name: "Brewery compliance delay", productIds: ["beer", "seltzer"], multiplier: 1.22, duration: 2, chance: 0.045, text: "Brewery compliance delay: beer and hard seltzer cost more while inspectors learn the word 'carbonation'." },
  { name: "Canned wine surplus", productIds: ["wine"], multiplier: 0.82, duration: 2, chance: 0.04, text: "Canned wine surplus: wholesale prices drop after a warehouse admits it has too much optimism." },
  { name: "Excise stamp backlog", productIds: ["beer", "wine", "seltzer"], multiplier: 1.18, duration: 2, chance: 0.035, text: "Excise stamp backlog: alcohol wholesale costs rise because every can now needs a tiny apology." }
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
  { name: "Luxury snack fatigue", productIds: ["nuts", "latte"], multiplier: 0.78, duration: 2, chance: 0.05, text: "Luxury snack fatigue hits. Nuts and lattes are accused of being too fancy." },
  { name: "Quiet quitting lunch", productIds: ["sandwich", "cola"], multiplier: 1.26, duration: 1, chance: 0.055, text: "A quiet quitting lunch trend spreads. Sandwich and cola demand rises with minimal enthusiasm." },
  { name: "Public water confidence", productIds: ["water"], multiplier: 1.24, duration: 2, chance: 0.05, text: "A city poster says water is 'operationally correct'. Demand improves in a very official way." },
  { name: "Protein-adjacent rumor", productIds: ["nuts", "salad"], multiplier: 1.22, duration: 2, chance: 0.05, text: "A protein-adjacent rumor lifts nut mix and salad demand. Nobody checks the math." },
  { name: "Caffeine restraint week", productIds: ["espresso", "latte", "energy"], multiplier: 0.76, duration: 1, chance: 0.045, text: "Caffeine restraint week begins. Participation is mostly performative, but demand dips." },
  { name: "After-work denial hour", productIds: ["beer", "wine", "seltzer"], multiplier: 1.32, duration: 2, chance: 0.05, text: "After-work denial hour trends citywide. Alcohol demand rises under the category 'not coping'." },
  { name: "Police advisory pamphlet", productIds: ["beer", "wine", "seltzer"], multiplier: 0.72, duration: 2, chance: 0.04, text: "A police advisory pamphlet makes alcohol purchases feel supervised. Demand dips." },
  { name: "Hard seltzer rebrand", productIds: ["seltzer"], multiplier: 1.34, duration: 2, chance: 0.045, text: "Hard seltzer is rebranded as 'sparkling accountability'. Demand improves for reasons unavailable to science." },
  { name: "Civic lager meme", productIds: ["beer"], multiplier: 1.24, duration: 1, chance: 0.04, text: "A Civic Lager meme spreads. Nobody laughs, but several people buy beer." }
];

const customerTypes = {
  nightZombie: { label: "Night Shift Zombie", products: ["energy", "cola", "espresso", "beer"], priceTolerance: 0.88, note: "Buys caffeine like it is rent." },
  gymBro: { label: "Gym Bro", products: ["water", "nuts", "salad", "energy"], priceTolerance: 0.98, note: "Respects hydration and dramatic nodding." },
  brokeStudent: { label: "Broke Student", products: ["bar", "chips", "water", "beer"], priceTolerance: 0.68, note: "Will notice a 10 Cr price change." },
  officeVampire: { label: "Office Vampire", products: ["espresso", "latte", "sandwich", "wine"], priceTolerance: 1.12, note: "Turns coffee into calendar invites." },
  commuter: { label: "Late Commuter", products: ["water", "cola", "sandwich", "espresso", "seltzer"], priceTolerance: 0.92, note: "Buys fast, leaves faster." },
  weirdGuy: { label: "Weird Guy", products: ["nuts", "latte", "bar", "wine"], priceTolerance: 1.2, note: "Rarely buys. Mostly studies slot B4." },
  casual: { label: "Casual Shopper", products: ["bar", "chips", "latte", "cola", "seltzer"], priceTolerance: 1.04, note: "Impulse purchases with emotional confidence." }
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
  },
  {
    chance: 0.035,
    text: (machine) => `${machine.name}: a customer whispered 'best department in this building' to the card reader. Morale improved without documentation.`,
    effect() {
      state.brandBuzz = clamp(state.brandBuzz + 0.9, 0, 100);
    }
  },
  {
    chance: 0.032,
    text: (machine) => `${machine.name}: somebody left a sticky note reading 'PLEASE RESTOCK HOPE'. Cleaning standards objected.`,
    effect(machine) {
      machine.clean = clamp(machine.clean - 3, 0, 100);
    }
  },
  {
    chance: 0.028,
    text: (machine) => `${machine.name}: the machine printed a blank receipt with alarming confidence. No one could prove intent.`,
    requires: (machine) => (machine.upgrades?.cardReader || 0) > 0,
    effect() {
      state.brandBuzz = clamp(state.brandBuzz + 0.5, 0, 100);
    }
  },
  {
    chance: 0.03,
    text: (machine) => `${machine.name}: a customer accepted the product and released judgement. The transaction felt reciprocal, unfortunately.`,
    effect() {
      state.brandBuzz = clamp(state.brandBuzz + 0.7, 0, 100);
    }
  },
  {
    chance: 0.026,
    text: (machine) => `${machine.name}: someone asked if the machine takes loyalty cards. It took their optimism instead.`,
    effect(machine) {
      machine.cash += 70;
    }
  },
  {
    chance: 0.022,
    text: (machine) => `${machine.name}: an after-hours purchaser saluted the alcohol license before buying. Compliance felt seen.`,
    requires: (machine) => machine.type === "alcohol",
    effect() {
      state.corporate.heat = clamp((state.corporate.heat || 0) + 0.5, 0, 100);
      state.brandBuzz = clamp(state.brandBuzz + 0.8, 0, 100);
    }
  }
];

const rareEncounters = [
  {
    chance: 0.012,
    text: (machine) => `${machine.name}: a regional vending inspector silently nodded at the glass, then left. This is legally considered praise.`,
    effect() {
      state.brandBuzz = clamp(state.brandBuzz + 2.2, 0, 100);
    }
  },
  {
    chance: 0.01,
    text: (machine) => `${machine.name}: a retired accountant bought one item and rearranged the coins by fiscal quarter.`,
    effect(machine) {
      machine.cash += 90;
    }
  },
  {
    chance: 0.009,
    text: (machine) => `${machine.name}: local rumor claims the machine rejects despair. Sales impact remains unverified by management.`,
    effect() {
      state.brandBuzz = clamp(state.brandBuzz + 1.4, 0, 100);
    }
  },
  {
    chance: 0.008,
    text: (machine) => `${machine.name}: a customer spent four minutes reading every label, bought nothing, and submitted a five-star review of the interface.`,
    effect() {
      state.brandBuzz = clamp(state.brandBuzz + 1, 0, 100);
    }
  },
  {
    chance: 0.007,
    text: (machine) => `${machine.name}: a rival employee bought one water, photographed the receipt, and looked professionally disappointed.`,
    effect(machine) {
      state.brandBuzz = clamp(state.brandBuzz + 0.8, 0, 100);
      addMachineIncident(machine, "Rival receipt reconnaissance observed.");
    }
  },
  {
    chance: 0.006,
    text: (machine) => `${machine.name}: someone left a thank-you note for the machine, not the company. HR has no policy for this.`,
    effect(machine) {
      state.brandBuzz = clamp(state.brandBuzz + 1.6, 0, 100);
      addMachineIncident(machine, "Received direct customer appreciation.");
    }
  },
  {
    chance: 0.005,
    text: (machine) => `${machine.name}: a person in a silver coat asked whether the machine remembers the first price war. It did not answer on record.`,
    effect(machine) {
      addMachineIncident(machine, "Silver-coat memory inquiry logged.");
      state.brandBuzz = clamp(state.brandBuzz + 1.1, 0, 100);
    }
  },
  {
    chance: 0.0045,
    text: (machine) => `${machine.name}: someone left a folded legal notice in the change tray. It was addressed to 'The Snack Entity'.`,
    effect(machine) {
      addMachineIncident(machine, "Misaddressed legal stationery found.");
      state.corporate.heat = clamp((state.corporate.heat || 0) + 0.6, 0, 100);
    }
  },
  {
    chance: 0.005,
    text: (machine) => `${machine.name}: somebody scratched NEX// into the side panel, then covered half of it with a price label.`,
    effect(machine) {
      addMachineIncident(machine, "NEX// side-panel graffiti logged.");
      state.brandBuzz = clamp(state.brandBuzz + 0.4, 0, 100);
    }
  },
  {
    chance: 0.0055,
    text: (machine) => `${machine.name}: anti-corporate graffiti appeared overnight. It somehow improved the machine's trust metrics.`,
    effect(machine) {
      addMachineIncident(machine, "Anti-corporate graffiti logged as accidental brand alignment.");
      state.brandBuzz = clamp(state.brandBuzz + 0.8, 0, 100);
      state.world.hostility = clamp((state.world.hostility || 0) + 0.8, 0, 100);
    }
  },
  {
    chance: 0.0048,
    text: (machine) => `${machine.name}: maintenance found a sticker reading 'ROUTE REMEMBERS'. It was under a screw nobody removed.`,
    effect(machine) {
      addMachineIncident(machine, "Sticker under screw: ROUTE REMEMBERS.");
      state.brandBuzz = clamp(state.brandBuzz + 0.5, 0, 100);
    }
  },
  {
    chance: 0.0044,
    text: (machine) => `${machine.name}: a customer left three coins in a triangle and refused change.`,
    effect(machine) {
      machine.cash += 90;
      addMachineIncident(machine, "Triangular coin offering accepted by accounting.");
    }
  }
];

const humorEventPacks = [
  {
    chance: 0.018,
    text: () => `City bulletin: local man survives exclusively on vending machine tuna. No tuna supplier has been approved, and Finance would like that in writing.`
  },
  {
    chance: 0.016,
    text: () => `Corporation denies machine sentience rumors, confirms all beeps are 'stakeholder-aligned notifications'.`
  },
  {
    chance: 0.015,
    text: () => `A mall focus group describes vending machines as 'less judgmental than checkout lanes'. Retail analysts call this a sector signal.`
  },
  {
    chance: 0.014,
    text: () => `Office rumor: one machine knows who really booked the 8:00 meeting. No operational impact has been authorized.`
  },
  {
    chance: 0.013,
    text: () => `The city briefly considered compassion, then filed it under unpaid infrastructure.`
  },
  {
    chance: 0.012,
    text: () => `A rival corporation called your expansion unethical, then copied it badly.`
  },
  {
    chance: 0.011,
    text: () => `The finance desk describes your debt as emotionally textured. Analysts declined to touch it.`
  }
];

const competitorTemplates = [
  { id: "quickSnack", label: "QuickSnack Co.", name: "QuickSnack Co.", rep: 54, style: "aggressive", personality: "predatory", archetype: "Cheap aggressive snack monopoly", hostility: 28, marketShare: 18, tactics: ["priceWar", "landlord", "smear"], weaknesses: ["legal"], resistances: ["price"], status: "active", color: "#d05f45" },
  { id: "Vendora", label: "Vendora Group", name: "Vendora Group", rep: 62, style: "premium", personality: "polished", archetype: "Premium wellness vending chain", hostility: 18, marketShare: 22, tactics: ["credit", "reputation", "supplier"], weaknesses: ["undercut"], resistances: ["legal"], status: "active", color: "#426f9d" },
  { id: "BudgetBite", label: "BudgetBite Ltd.", name: "BudgetBite Ltd.", rep: 46, style: "cheap", personality: "frugal", archetype: "Failing legacy vending company", hostility: 22, marketShare: 14, tactics: ["priceWar", "security"], weaknesses: ["reputation"], resistances: ["dirty"], status: "active", color: "#e6b84c" },
  { id: "nightGlass", label: "NightGlass Distribution", name: "NightGlass Distribution", rep: 50, style: "front", personality: "nocturnal", archetype: "Alcohol distribution front", hostility: 34, marketShare: 12, tactics: ["inspection", "security", "dirty"], weaknesses: ["legal"], resistances: ["dirty"], status: "active", color: "#8f7bd8" },
  { id: "civicSnack", label: "CivicSnack Partners", name: "CivicSnack Partners", rep: 58, style: "logistics", personality: "bureaucratic", archetype: "Security-backed logistics operator", hostility: 20, marketShare: 16, tactics: ["landlord", "supplier", "credit"], weaknesses: ["public"], resistances: ["landlord"], status: "active", color: "#4f9d78" }
];

const corporationPersonalityLines = {
  predatory: [
    "{company} calls this 'healthy competition' while measuring your hallway.",
    "{company} has the confidence of a company with too many lawyers and not enough shame."
  ],
  polished: [
    "{company} released a tasteful statement about buttons, trust, and margins.",
    "{company} prefers pressure with rounded corners and a premium font."
  ],
  frugal: [
    "{company} reduced costs by printing threats on thinner paper.",
    "{company} discovered a discount supplier for corporate menace."
  ],
  nocturnal: [
    "{company} operates mostly after sensible paperwork hours.",
    "{company} insists nightlife logistics are a civic service with louder margins."
  ],
  bureaucratic: [
    "{company} weaponized a filing cabinet and called it infrastructure.",
    "{company} believes every hallway can be owned if the form is beige enough."
  ]
};

const competitorEvents = [
  {
    name: "Competitor opening",
    chance: 0.12,
    text: (company, location) => `${company.label} opened a machine near ${location.label}. Location pressure increased.`,
    apply(company, locationId, competition) {
      const pressure = competitionLocation(locationId);
      pressure.companyId = company.id;
      pressure.level = clamp((pressure.level || 0) + 1, 0, 6);
      pressure.daysLeft = Math.max(pressure.daysLeft || 0, 5);
    }
  },
  {
    name: "Price war",
    chance: 0.09,
    text: (company, location, productType) => `${company.label} started a ${productType} price war at ${location.label}. Overpriced ${productType} products will sell worse for a few days.`,
    apply(company, locationId, competition) {
      const pressure = competitionLocation(locationId);
      const types = ["snack", "drink", "coffee", "fresh"];
      pressure.companyId = company.id;
      pressure.level = clamp((pressure.level || 0) + 1, 0, 6);
      pressure.daysLeft = Math.max(pressure.daysLeft || 0, 4);
      pressure.priceWar = { type: pick(types), daysLeft: 3, companyId: company.id };
    }
  },
  {
    name: "Reputation campaign",
    chance: 0.08,
    text: (company) => `${company.label} launched a painfully glossy reputation campaign. Their brand score climbed.`,
    apply(company) {
      company.rep = clamp(company.rep + 3 + Math.random() * 4, 0, 100);
    }
  },
  {
    name: "Competitor mishap",
    chance: 0.06,
    text: (company) => `${company.label} had a public vending mishap involving a receipt printer and too much confidence. Their reputation dipped.`,
    apply(company) {
      company.rep = clamp(company.rep - (3 + Math.random() * 5), 0, 100);
    }
  }
];

const corporationActions = [
  {
    name: "Corporate scouting",
    chance: 0.055,
    text: (company, location) => `${company.label} sent a scouting intern to ${location.label}. They took notes, bought nothing, and called it research.`,
    apply(company, locationId, events) {
      const pressure = competitionLocation(locationId);
      pressure.companyId = company.id;
      pressure.level = clamp((pressure.level || 0) + 1, 0, 6);
      pressure.daysLeft = Math.max(pressure.daysLeft || 0, 3);
    }
  },
  {
    name: "Landlord pressure",
    chance: 0.04,
    text: (company, location) => `${company.label} had lunch with the landlord near ${location.label}. Rent has developed opinions.`,
    apply(company, locationId, events) {
      const pressure = competitionLocation(locationId);
      pressure.companyId = company.id;
      pressure.landlordDays = Math.max(pressure.landlordDays || 0, 3);
      pressure.level = clamp((pressure.level || 0) + 1, 0, 6);
    }
  },
  {
    name: "Location blocking",
    chance: 0.032,
    text: (company, location) => `${company.label} filed temporary exclusivity paperwork at ${location.label}. The hallway now has a legal mood.`,
    apply(company, locationId, events) {
      const pressure = competitionLocation(locationId);
      pressure.companyId = company.id;
      pressure.blockedDays = Math.max(pressure.blockedDays || 0, 2);
      pressure.level = clamp((pressure.level || 0) + 1, 0, 6);
    }
  },
  {
    name: "Soft sabotage",
    chance: 0.028,
    text: (company, location) => `${company.label} denies involvement after a machine at ${location.label} receives a very targeted smudge.`,
    apply(company, locationId, events) {
      const machine = pick(state.machines.filter((item) => item.location === locationId) || []);
      if (!machine) return;
      machine.clean = clamp(machine.clean - 8, 0, 100);
      addMachineIncident(machine, "Suspicious smudge logged after competitor proximity.");
    }
  },
  {
    name: "Interference memo",
    chance: 0.026,
    text: (company, location) => `${company.label} launched a 'consumer choice awareness' memo near ${location.label}. It is somehow about your buttons.`,
    apply(company, locationId, events) {
      const pressure = competitionLocation(locationId);
      pressure.companyId = company.id;
      pressure.interferenceDays = Math.max(pressure.interferenceDays || 0, 2);
    }
  }
];

const machineQuirkDefs = [
  { id: "LOCAL_FIXTURE", label: "Local fixture", minDays: 5, text: "Regulars trust it more than signage.", demand: 1.04 },
  { id: "BUTTON_STUBBORN", label: "Button stubborn", minDays: 4, text: "The interface has opinions. Usage slows slightly.", demand: 0.98, wear: 0.94 },
  { id: "COIN_WHISPERER", label: "Coin whisperer", minDays: 6, text: "The cash box attracts small loyal purchases.", demand: 1.02 },
  { id: "GLASS_SAGE", label: "Glass sage", minDays: 8, text: "Customers stare longer, then buy like it was their idea.", demand: 1.03 },
  { id: "MILDLY_HAUNTED_LEDGER", label: "Mildly haunted ledger", minDays: 7, text: "Auditors dislike the vibe. Customers respect the efficiency.", demand: 1.02, audit: 0.4 },
  { id: "RELIABILITY_RUMOR", label: "Reliability rumor", minDays: 10, text: "Customers believe it never fails. The machine tries not to embarrass them.", demand: 1.03, wear: 0.9 },
  { id: "EXPENSIVE_AURA", label: "Expensive aura", minDays: 12, text: "People assume the prices are intentional. This is dangerous but useful.", demand: 1.04 },
  { id: "MAINTENANCE_PRIMA_DONNA", label: "Maintenance prima donna", minDays: 9, text: "Runs beautifully when serviced, sulks harder when ignored.", demand: 1.03, wear: 1.08 },
  { id: "LOCAL_MYTH", label: "Local myth", minDays: 16, text: "Someone started a rumor that it remembers loyal customers.", demand: 1.06, audit: 0.2 },
  { id: "WARM_COIN_SLOT", label: "Warm coin slot", minDays: 11, text: "No one likes this, but repeat customers keep checking.", demand: 1.02, audit: 0.25 },
  { id: "SHELF_STARE", label: "Shelf stare", minDays: 13, text: "The rows look organized in a way that makes shoppers feel evaluated.", demand: 1.035 },
  { id: "LICENSE_AURA", label: "License aura", minDays: 8, text: "The machine projects licensed adulthood. Inspectors project interest.", demand: 1.04, audit: 0.35 },
  { id: "SEX_MACHINE", label: "Sex Machine", minDays: 14, text: "GET UP-A protocol active. The LED got brown, James.", demand: 1.02 },
  { id: "SCHROEDINGER", label: "Schroedinger", minDays: 9, text: "Nobody knows if it has stock until a customer checks.", demand: 1.01, wear: 1.02 },
  { id: "LACTOSE_NOT_FREE", label: "Lactose Is Not Free", minDays: 10, text: "Gives you massive diarrhea.", demand: 0.99, audit: 0.2 },
  { id: "BEEP_BOOP", label: "Beep-boop", minDays: 6, text: "Please restart your wending machine.", demand: 1, wear: 0.98 },
  { id: "MICROWAVE_SOUL", label: "Microwave Soul", minDays: 8, text: "Cold drinks arrive spiritually warm.", demand: 0.99, wear: 0.99 },
  { id: "TAX_EVASION_AURA", label: "Tax Evasion Aura", minDays: 16, text: "Looks innocent during inspections.", demand: 1.01, audit: -0.25 },
  { id: "CORPORATE_JAZZ", label: "Corporate Jazz", minDays: 12, text: "Emits smooth music during financial collapse.", demand: 1.02 },
  { id: "BONE_STORAGE", label: "Bone Storage", minDays: 18, text: "Probably metaphorical.", demand: 1.005, audit: 0.15 },
  { id: "WETWARE", label: "Wetware", minDays: 10, text: "The machine sweats during summer.", demand: 0.995, wear: 1.03 },
  { id: "EMOTIONAL_OVERFLOW", label: "Emotional Overflow", minDays: 13, text: "Dispenses extra snacks after midnight.", demand: 1.025 },
  { id: "VANDAL_RESISTANT", label: "Vandal Resistant", minDays: 11, text: "The graffiti improves customer trust.", demand: 1.025, wear: 0.94 },
  { id: "LOYALTY_ORGAN", label: "Loyalty Organ", minDays: 15, text: "Customers return without remembering why.", demand: 1.04 },
  { id: "MANAGERIAL_PRESENCE", label: "Managerial Presence", minDays: 9, text: "Breaks less often while observed.", demand: 1.01, wear: 0.9 },
  { id: "PUBLIC_TRANSIT_SOUL", label: "Public Transit Soul", minDays: 17, text: "Smells faintly of old stations.", demand: 1.015 },
  { id: "AUDIT_FRIENDLY", label: "Audit Friendly", minDays: 14, text: "The machine becomes honest near inspectors.", demand: 1.005, audit: -0.3 },
  { id: "CRUMB_ENGINE", label: "Crumb Engine", minDays: 16, text: "Converts debt into operational sadness.", demand: 1.02 },
  { id: "MUNICIPAL_RELIC", label: "Municipal Relic", minDays: 24, text: "Older than most districts.", demand: 1.03, wear: 0.96 },
  { id: "NIGHT_SHIFT_CERTIFIED", label: "Night Shift Certified", minDays: 12, text: "Customers stop making eye contact.", demand: 1.025 },
  { id: "PLASTIC_GOSPEL", label: "Plastic Gospel", minDays: 15, text: "Preaches hydration through static.", demand: 1.02 },
  { id: "RESIDUAL_HEAT", label: "Residual Heat", minDays: 10, text: "Still warm after shutdown.", demand: 1.01, wear: 1.01 },
  { id: "DEBT_RESONANCE", label: "Debt Resonance", minDays: 13, text: "Hum gets louder near loan due dates.", demand: 1.015, audit: 0.1 },
  { id: "CONSUMER_GRADE_ENLIGHTENMENT", label: "Consumer Grade Enlightenment", minDays: 19, text: "One customer cried after buying water.", demand: 1.035 },
  { id: "SNACKHOLE", label: "Snackhole", minDays: 18, text: "Products disappear faster than mathematically possible.", demand: 1.05, wear: 1.04 },
  { id: "PAID_ACTOR", label: "Paid Actor", minDays: 7, text: "One customer applauds every purchase.", demand: 1.02 },
  { id: "ROUTE_HAUNTING", label: "Route Haunting", minDays: 22, text: "Remembers previous operators.", demand: 1.02, audit: 0.2 },
  { id: "SELF_ESTEEM_LEAK", label: "Self-Esteem Leak", minDays: 9, text: "Machine confidence visibly declining.", demand: 0.995, wear: 0.98 },
  { id: "THIRD_COIN_SLOT", label: "The Third Coin Slot", minDays: 21, text: "There are only supposed to be two.", demand: 1.025, audit: 0.25 },
  { id: "YRNTRLNTLYBRK", label: "YRNTRLNTLYBRK mode", minDays: 18, text: "This machine behaves differently after breakdowns.", demand: 1.02, wear: 0.97 },
  { id: "SILENTSCREAM", label: "SILENTSCREAM", minDays: 22, text: "Emits sounds that customer support denies hearing.", demand: 1.015, audit: 0.2 },
  { id: "AFTER_2AM", label: "After 2AM", minDays: 12, text: "The machine's neon lights are buzzing in a depressed tune.", demand: 1.02 }
];

const blackMarketSuppliers = [
  { id: "clean", label: "Unmarked but tidy", chance: 0.44, stockFactor: 1.0, heat: 4, scandal: 0.04, text: "The crate is suspiciously organized." },
  { id: "cheap", label: "Deep discount pallet", chance: 0.32, stockFactor: 1.35, heat: 8, scandal: 0.11, text: "Great quantity. Worrying invoice typography." },
  { id: "premiumLeak", label: "Premium leakage", chance: 0.16, stockFactor: 0.85, heat: 6, scandal: 0.06, text: "Looks premium. Arrived through a side door." },
  { id: "scandal", label: "Scandal-adjacent", chance: 0.08, stockFactor: 1.55, heat: 15, scandal: 0.24, text: "The box says 'do not mention procurement'." }
];

const lateGameIdentityDefs = [
  { id: "corporateSellout", label: "Corporate sellout", minDay: 12, key: "sellout" },
  { id: "undergroundChain", label: "Underground vending chain", minDay: 10, key: "underground" },
  { id: "luxuryEmpire", label: "Luxury empire", minDay: 12, key: "luxury" },
  { id: "chaosStrategy", label: "Chaos strategy", minDay: 10, key: "chaos" },
  { id: "monopolyRoute", label: "Monopoly route", minDay: 14, key: "monopoly" },
  { id: "ethicalRoute", label: "Ethical route", minDay: 10, key: "ethical" },
  { id: "dystopianMegacorp", label: "Dystopian megacorp", minDay: 18, key: "megacorp" }
];

const behaviorEventChains = [
  {
    id: "undergroundWhispers",
    tag: "BLACK_MARKET_SIGNAL",
    minRep: 0,
    stages: [
      "Unmarked suppliers now know your route name. Procurement pretends this is networking.",
      "A late-night logistics broker offers loyalty pricing with no vowels in the contract.",
      "City auditors detect a pattern of rectangles arriving after dark."
    ],
    effect(stage, events) {
      state.corporate.heat = clamp((state.corporate.heat || 0) + 1.8 + stage, 0, 100);
      events.push("Underground supply chain attention increased audit heat.");
    }
  },
  {
    id: "luxuryScrutiny",
    tag: "PREMIUM_POSITIONING",
    minRep: 68,
    stages: [
      "Lifestyle blogs describe your machines as 'surprisingly curated'. Rent notices become more confident.",
      "A boutique landlord asks if your vending route has a brand deck. Nobody likes where this is going.",
      "Premium customers expect premium uptime. Minor dirt now feels like betrayal."
    ],
    effect(stage, events) {
      state.brandBuzz = clamp(state.brandBuzz + 1.2, 0, 100);
      events.push("Luxury positioning improved buzz, but expectation pressure is rising.");
    }
  },
  {
    id: "monopolyComplaint",
    tag: "ROUTE_DOMINANCE",
    minRep: 55,
    stages: [
      "A competitor files a corridor fairness complaint written entirely in business nouns.",
      "Location managers start asking why every hallway smells faintly like your pricing strategy.",
      "The city vending board opens a non-investigation investigation."
    ],
    effect(stage, events) {
      const locationId = pick(Object.keys(locations));
      const pressure = competitionLocation(locationId);
      pressure.level = clamp((pressure.level || 0) + 1, 0, 6);
      pressure.daysLeft = Math.max(pressure.daysLeft || 0, 3);
      events.push(`${locationById(locationId).label} gained pressure from route dominance scrutiny.`);
    }
  },
  {
    id: "ethicalProcurement",
    tag: "LOW_HEAT_OPERATOR",
    minRep: 60,
    stages: [
      "A local paper praises your boring invoices. This is the highest form of civic affection.",
      "Suppliers offer cleaner paperwork after noticing your alarming commitment to legitimacy.",
      "A contract office quietly moves your forms to the 'less suspicious' tray."
    ],
    effect(stage, events) {
      state.corporate.heat = clamp((state.corporate.heat || 0) - (1.4 + stage * 0.3), 0, 100);
      events.push("Ethical procurement cooled audit heat slightly.");
    }
  }
];

const corporateWarfareActions = {
  scout: {
    label: "Scout district plans",
    cost: 4200,
    heat: 1.2,
    cooldown: 3,
    text: "Pays for corridor research. Reveals and slightly delays rival attention in the current location.",
    run(machine, events) {
      const pressure = competitionLocation(machine.location);
      pressure.scoutedDays = Math.max(pressure.scoutedDays || 0, 4);
      pressure.daysLeft = Math.max(pressure.daysLeft || 0, 2);
      events.push(`${machine.name}: scouting filed for ${locationById(machine.location).label}. Rival placement rumors became measurable.`);
    }
  },
  bribe: {
    label: "Landlord hospitality",
    cost: 9800,
    heat: 5.5,
    cooldown: 5,
    failure: 0.18,
    text: "Temporary lease protection. Compliance calls it 'hospitality' while sweating.",
    run(machine, events) {
      const pressure = competitionLocation(machine.location);
      pressure.blockedDays = 0;
      pressure.landlordDays = 0;
      pressure.protectedDays = Math.max(pressure.protectedDays || 0, 3);
      pressure.level = Math.max(0, pressure.level - 1);
      events.push(`${locationById(machine.location).label}: landlord hospitality bought three days of suspicious calm.`);
    },
    backlash(machine, events) {
      state.corporate.heat = clamp((state.corporate.heat || 0) + 4, 0, 100);
      events.push(`${locationById(machine.location).label}: landlord hospitality leaked. Audit heat rose because everyone learned the word hospitality.`);
    }
  },
  hygiene: {
    label: "Fake hygiene complaint",
    cost: 7200,
    heat: 4.2,
    cooldown: 4,
    failure: 0.24,
    text: "Hits rival pressure, but false cleanliness paperwork can stain your shoes.",
    run(machine, events) {
      const pressure = competitionLocation(machine.location);
      pressure.level = Math.max(0, pressure.level - 2);
      pressure.interferenceDays = 0;
      events.push(`${locationById(machine.location).label}: a rival hygiene complaint became everyone's problem but mostly theirs.`);
    },
    backlash(machine, events) {
      machine.clean = clamp(machine.clean - 10, 0, 100);
      events.push(`${machine.name}: fake hygiene complaint backfired. Customers inspected your glass with new emotional tools.`);
    }
  },
  adBlitz: {
    label: "Temporary ad blitz",
    cost: 8600,
    heat: 0.8,
    cooldown: 4,
    text: "Boosts local demand, but landlords notice successful foot traffic.",
    run(machine, events) {
      const pressure = competitionLocation(machine.location);
      pressure.adBlitzDays = Math.max(pressure.adBlitzDays || 0, 2);
      pressure.landlordDays = Math.max(pressure.landlordDays || 0, 1);
      events.push(`${locationById(machine.location).label}: ad blitz approved. Demand rose; rent developed ambition.`);
    }
  },
  intimidation: {
    label: "Market intimidation",
    cost: 11800,
    heat: 7,
    cooldown: 6,
    failure: 0.2,
    text: "Suppresses competitor pressure. Subtlety budget not included.",
    run(machine, events) {
      const pressure = competitionLocation(machine.location);
      pressure.level = Math.max(0, pressure.level - 3);
      pressure.daysLeft = Math.max(pressure.daysLeft || 0, 2);
      events.push(`${locationById(machine.location).label}: market intimidation reduced rival confidence and increased everyone's legal vocabulary.`);
    },
    backlash(machine, events) {
      const pressure = competitionLocation(machine.location);
      pressure.level = clamp((pressure.level || 0) + 2, 0, 6);
      pressure.daysLeft = Math.max(pressure.daysLeft || 0, 4);
      events.push(`${locationById(machine.location).label}: intimidation backfired. A rival sent lawyers with matching folders.`);
    }
  },
  deescalate: {
    label: "De-escalation paperwork",
    cost: 7600,
    heat: -2.8,
    cooldown: 5,
    text: "Pays lawyers to look boring. Reduces hostility and softens local pressure without creating a miracle.",
    run(machine, events) {
      const pressure = competitionLocation(machine.location);
      pressure.level = Math.max(0, pressure.level - 1);
      pressure.interferenceDays = Math.max(0, pressure.interferenceDays - 1);
      state.world.hostility = clamp((state.world.hostility || 0) - 14, 0, 100);
      events.push(`${locationById(machine.location).label}: de-escalation paperwork filed. Hostility cooled, at least on paper.`);
    }
  },
  reputationCampaign: {
    label: "Reputation campaign",
    cost: 10200,
    heat: 0.6,
    cooldown: 5,
    text: "Slow public pressure against the selected corporation. Ethical, expensive, and annoyingly measurable.",
    run(machine, events, target) {
      if (target) {
        target.rep = clamp((target.rep || 50) - 3.2, 0, 100);
        target.hostility = clamp((target.hostility || 0) + 2, 0, 100);
      }
      state.brandBuzz = clamp(state.brandBuzz + 2.8, 0, 100);
      events.push(`${target?.label || "A rival"} lost public confidence after a very calm reputation campaign.`);
    }
  },
  undercut: {
    label: "Undercut pricing",
    cost: 6800,
    heat: 1.4,
    cooldown: 4,
    text: "Temporary local counter-marketing. Helps if your prices are not already performing acrobatics.",
    run(machine, events, target) {
      const pressure = competitionLocation(machine.location);
      pressure.priceWar = { type: machine.type, daysLeft: 2, companyId: target?.id || pressure.companyId };
      pressure.level = Math.max(0, (pressure.level || 0) - 1);
      if (target) target.rep = clamp((target.rep || 50) - 1.5, 0, 100);
      events.push(`${locationById(machine.location).label}: undercutting campaign filed. Rival margins made a small legal sound.`);
    }
  },
  legalComplaint: {
    label: "Legal complaint",
    cost: 12400,
    heat: -0.8,
    cooldown: 7,
    failure: 0.16,
    text: "Safer than sabotage, slower than greed. Can reduce target market share and hostility.",
    run(machine, events, target) {
      if (target) {
        target.rep = clamp((target.rep || 50) - 2.8, 0, 100);
        target.marketShare = clamp((target.marketShare || 0) - 1.4, 0, 100);
        target.hostility = clamp((target.hostility || 0) - 2, 0, 100);
      }
      state.world.hostility = clamp((state.world.hostility || 0) - 3, 0, 100);
      events.push(`${target?.label || "A rival"} received a legal complaint written in professionally disappointed paragraphs.`);
    },
    backlash(machine, events) {
      state.world.hostility = clamp((state.world.hostility || 0) + 5, 0, 100);
      events.push("Legal complaint backfired. The response used the phrase 'vexatious rectangle conduct'.");
    }
  },
  supplierPoach: {
    label: "Supplier poaching",
    cost: 14800,
    heat: 3.2,
    cooldown: 6,
    failure: 0.18,
    text: "Disrupts a rival and may improve short-term supply posture. Procurement calls it networking with teeth.",
    run(machine, events, target) {
      if (target) target.marketShare = clamp((target.marketShare || 0) - 1.8, 0, 100);
      addCorporateEffect({ type: "supplier", source: "Supplier poaching", daysLeft: 2, productType: machine.type, value: 0.94, text: `${machineTypes[machine.type]?.label || "Machine"} supply costs softened after supplier poaching.` });
      events.push(`${target?.label || "A rival"} lost a supplier meeting. Your invoices briefly smell victorious.`);
    },
    backlash(machine, events) {
      addCorporateEffect({ type: "supplier", source: "Poaching backlash", daysLeft: 2, productType: machine.type, value: 1.08, text: `${machineTypes[machine.type]?.label || "Machine"} supply costs rose after procurement got loud.` });
      events.push("Supplier poaching backfired. The vendor discovered loyalty, then invoiced it.");
    }
  },
  dirtyPR: {
    label: "Dirty PR leak",
    cost: 9200,
    heat: 6.8,
    cooldown: 7,
    failure: 0.28,
    text: "Damages the selected corporation hard if it lands. Backlash is not decorative.",
    run(machine, events, target) {
      if (target) {
        target.rep = clamp((target.rep || 50) - 6, 0, 100);
        target.hostility = clamp((target.hostility || 0) + 8, 0, 100);
      }
      state.world.hostility = clamp((state.world.hostility || 0) + 4, 0, 100);
      events.push(`${target?.label || "A rival"} was hit by a leak scandal. Nobody asked where the folder came from.`);
    },
    backlash(machine, events) {
      state.brandBuzz = clamp(state.brandBuzz - 5, 0, 100);
      state.corporate.heat = clamp((state.corporate.heat || 0) + 5, 0, 100);
      events.push("Dirty PR leaked sideways. Customers smelled paperwork on your hands.");
    }
  },
  nonAggression: {
    label: "Non-aggression pact",
    cost: 11200,
    heat: -1.5,
    cooldown: 9,
    text: "Buys a temporary ceasefire with the selected corporation. The handshake has teeth marks.",
    run(machine, events, target) {
      if (target) target.hostility = clamp((target.hostility || 0) - 14, 0, 100);
      state.world.hostility = clamp((state.world.hostility || 0) - 8, 0, 100);
      addCorporateEffect({ type: "diplomacy", source: "Non-aggression pact", daysLeft: 4, corporationId: target?.id, value: 0.9, text: `${target?.label || "A rival"} has a temporary non-aggression pact with your route.` });
      events.push(`${target?.label || "A rival"} signed a non-aggression pact. Legal described it as 'temporary adulthood'.`);
    }
  },
  buyout: {
    label: "Buyout attempt",
    cost: 52000,
    heat: 2.4,
    cooldown: 12,
    failure: 0.22,
    text: "Late-route attempt to buy out a weakened corporation. Requires scale and a straight face.",
    requires(target) {
      return isLateGame() && companyValue() >= 240000 && target && (target.rep || 100) <= 32;
    },
    run(machine, events, target) {
      if (!target) return;
      target.rep = clamp((target.rep || 0) - 14, 0, 100);
      target.marketShare = clamp((target.marketShare || 0) - 5, 0, 100);
      target.status = (target.rep <= 8) ? "collapsed" : "retreating";
      state.world.milestoneMemory ||= {};
      state.world.milestoneMemory.monopolyRoute = true;
      state.brandBuzz = clamp(state.brandBuzz + 3, 0, 100);
      events.push(`${target.label} received a buyout offer shaped like a trapdoor. Status: ${target.status}.`);
    },
    backlash(machine, events) {
      state.world.hostility = clamp((state.world.hostility || 0) + 10, 0, 100);
      events.push("Buyout attempt failed. Rival boards briefly united around the phrase 'absolutely not'.");
    }
  }
};

const cityImpactEvents = [
  {
    id: "steelShortage",
    chance: 0.045,
    duration: 4,
    text: "Steel shortage linked to transit procurement. Machine prices increased temporarily.",
    apply(modifier) {
      modifier.machineCost = 1.16;
    }
  },
  {
    id: "vandalismWave",
    chance: 0.038,
    duration: 3,
    text: "Downtown vandalism wave raises insurance and maintenance expectations.",
    apply(modifier) {
      modifier.upkeep = 1.1;
      modifier.theft = 1.12;
      modifier.securityByLocation.station = -4;
      modifier.securityByLocation.mall = -3;
    }
  },
  {
    id: "premiumBeanPanic",
    chance: 0.035,
    duration: 3,
    text: "Luxury coffee trend inflates premium bean costs. Caffeine now has a lobby.",
    apply(modifier) {
      modifier.supplyByType.coffee = 1.18;
    }
  },
  {
    id: "stationInvestigation",
    chance: 0.032,
    duration: 2,
    text: "Transit station investigation reduces district traffic and increases official staring.",
    apply(modifier) {
      modifier.locationDemand.station = 0.82;
      modifier.audit = 2.2;
    }
  },
  {
    id: "gridSurcharge",
    chance: 0.034,
    duration: 3,
    text: "Rolling power surcharge hits refrigerated and coffee equipment hardest.",
    apply(modifier) {
      modifier.upkeepByType.coffee = 1.14;
      modifier.upkeepByType.fresh = 1.16;
    }
  },
  {
    id: "policePatrolWeek",
    chance: 0.03,
    duration: 4,
    text: "Police patrol week improves street security. Theft risk drops while everyone pretends this was planned.",
    apply(modifier) {
      modifier.securityByLocation.campus = 5;
      modifier.securityByLocation.station = 8;
      modifier.theftByLocation.campus = 0.86;
      modifier.theftByLocation.station = 0.78;
    }
  },
  {
    id: "mallGuardStrike",
    chance: 0.028,
    duration: 3,
    text: "Mall private guards strike. Mall security drops and insurance forms become more emotional.",
    apply(modifier) {
      modifier.securityByLocation.mall = -12;
      modifier.theftByLocation.mall = 1.22;
      modifier.upkeepByType.snack = 1.04;
    }
  },
  {
    id: "stationSurveillanceUpgrade",
    chance: 0.026,
    duration: 4,
    text: "Station surveillance upgrade reduces theft near platforms. Cameras are now watching the cameras.",
    apply(modifier) {
      modifier.securityByLocation.station = 14;
      modifier.theftByLocation.station = 0.68;
    }
  },
  {
    id: "campusFestival",
    chance: 0.03,
    duration: 3,
    text: "Campus festival lifts demand but worsens cleanliness and security pressure.",
    apply(modifier) {
      modifier.locationDemand.campus = 1.16;
      modifier.securityByLocation.campus = -7;
      modifier.cleanByLocation.campus = 1.18;
    }
  },
  {
    id: "nightlifeComplianceSweep",
    chance: 0.024,
    duration: 3,
    text: "Nightlife compliance sweep raises alcohol audit attention and briefly improves station security.",
    apply(modifier) {
      modifier.supplyByType.alcohol = 1.08;
      modifier.upkeepByType.alcohol = 1.1;
      modifier.securityByLocation.station = 5;
      modifier.audit = 1.6;
    }
  }
];

const corporateAttackEvents = [
  {
    id: "landlordPressure",
    tactic: "landlord",
    type: "rent",
    duration: 3,
    value: 1.16,
    text: (corp, location) => `${corp.label} applied landlord pressure at ${location.label}. Rent and local demand both got less friendly.`
  },
  {
    id: "creditSabotage",
    tactic: "credit",
    type: "credit",
    duration: 4,
    value: 0.018,
    text: (corp) => `${corp.label} circulated credit-risk doubts. Loan offers became colder and more expensive.`
  },
  {
    id: "reputationSmear",
    tactic: "smear",
    type: "smear",
    duration: 3,
    value: 0.9,
    text: (corp, location) => `${corp.label} launched a reputation smear near ${location.label}. Demand and public patience dropped.`
  },
  {
    id: "inspectionTip",
    tactic: "inspection",
    type: "inspection",
    duration: 3,
    value: 1.6,
    text: (corp) => `${corp.label} filed a health inspection tip-off. Audit heat is now wearing a little hat.`
  },
  {
    id: "supplierInterference",
    tactic: "supplier",
    type: "supplier",
    duration: 3,
    value: 1.12,
    text: (corp) => `${corp.label} pressured suppliers. Wholesale costs rose in the affected category.`
  },
  {
    id: "securityIntimidation",
    tactic: "security",
    type: "security",
    duration: 3,
    value: 1.18,
    text: (corp, location) => `${corp.label} staged security intimidation at ${location.label}. Vandalism and theft risk increased.`
  }
];

const diplomacyPrompts = [
  {
    id: "nonAggressionOffer",
    minStage: "early",
    cooldown: 10,
    title: (corp) => `${corp.label} requests a corridor understanding`,
    text: (corp) => `${corp.label} offers a temporary non-aggression pact. The document smells like toner and threat management.`,
    choices: [
      { label: "Accept the pact", consequence: "Pay a fee, reduce hostility, slightly reduce reputation.", locked: () => state.cash < 9000, apply(corp) { state.cash -= 9000; state.brandBuzz = clamp(state.brandBuzz - 1.5, 0, 100); corp.hostility = clamp((corp.hostility || 0) - 14, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) - 10, 0, 100); addOperatorChoiceSignal("diplomatic", 1.2); return `${corp.label} pact accepted. Peace has been purchased in a narrow font.`; } },
      { label: "Decline politely", consequence: "Small reputation gain, small hostility increase.", apply(corp) { state.brandBuzz = clamp(state.brandBuzz + 1.6, 0, 100); corp.hostility = clamp((corp.hostility || 0) + 4, 0, 100); addOperatorChoiceSignal("cautious", 0.8); return `${corp.label} was declined politely. Legal saved the punctuation.`; } },
      { label: "Mock the offer", consequence: "Anti-corporate signal, higher hostility.", apply(corp) { state.brandBuzz = clamp(state.brandBuzz + 2.4, 0, 100); corp.hostility = clamp((corp.hostility || 0) + 10, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 6, 0, 100); addOperatorChoiceSignal("antiCorporate", 1.5); return `${corp.label} received your response and updated the threat spreadsheet.`; } }
    ]
  },
  {
    id: "territorialDispute",
    minStage: "early",
    cooldown: 9,
    title: (corp) => `${corp.label} disputes your district footprint`,
    text: (corp) => `${corp.label} claims your route density is harming the local button ecosystem. Their counsel used the word ecosystem twice.`,
    choices: [
      { label: "Offer district boundaries", consequence: "Reduce hostility, lose a little reputation.", apply(corp) { state.brandBuzz = clamp(state.brandBuzz - 1.2, 0, 100); corp.hostility = clamp((corp.hostility || 0) - 10, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) - 5, 0, 100); addOperatorChoiceSignal("diplomatic", 1.1); return `${corp.label} accepted soft boundaries. The city called it cooperation because surrender sounded expensive.`; } },
      { label: "Counter-market the district", consequence: "Gain demand signal, increase pressure.", apply(corp) { state.brandBuzz = clamp(state.brandBuzz + 1.8, 0, 100); corp.hostility = clamp((corp.hostility || 0) + 7, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 4, 0, 100); addOperatorChoiceSignal("aggressiveExpansion", 1.2); return `${corp.label} saw the counter-campaign and began pricing eye contact separately.`; } },
      { label: "File an antitrust memo", consequence: "Safer legal posture, small audit heat.", apply(corp) { corp.rep = clamp((corp.rep || 0) - 2.5, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 1.5, 0, 100); addOperatorChoiceSignal("legalistic", 1.2); return `Antitrust memo filed against ${corp.label}. The clerk sighed with professional intimacy.`; } }
    ]
  },
  {
    id: "intimidationCall",
    minStage: "early",
    cooldown: 8,
    title: (corp) => `${corp.label} sends a compliance warning`,
    text: (corp) => `${corp.label} warns that your expansion may trigger 'procedural correction.' The phrase arrives wearing a suit.`,
    choices: [
      { label: "Request formal evidence", consequence: "Lower audit exposure, modest hostility.", apply(corp) { state.corporate.heat = clamp((state.corporate.heat || 0) - 1, 0, 100); corp.hostility = clamp((corp.hostility || 0) + 3, 0, 100); addOperatorChoiceSignal("legalistic", 1); return `${corp.label} produced a document with many headers and very little evidence.`; } },
      { label: "Quietly de-escalate", consequence: "Pay to reduce hostility.", locked: () => state.cash < 6500, apply(corp) { state.cash -= 6500; corp.hostility = clamp((corp.hostility || 0) - 9, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) - 5, 0, 100); addOperatorChoiceSignal("cautious", 0.9); return `Quiet de-escalation paid. ${corp.label} filed peace under temporary inconvenience.`; } },
      { label: "Publish the threat", consequence: "Reputation up, hostility up.", apply(corp) { state.brandBuzz = clamp(state.brandBuzz + 2.8, 0, 100); corp.hostility = clamp((corp.hostility || 0) + 9, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 6, 0, 100); addOperatorChoiceSignal("antiCorporate", 1.3); return `${corp.label}'s warning leaked. The public enjoyed the formatting more than the threat.`; } }
    ]
  },
  {
    id: "failingChainRequest",
    minStage: "early",
    cooldown: 12,
    title: (corp) => `${corp.label} requests operational mercy`,
    text: (corp) => `${corp.label} is weakening and asks you to stop pressing its weakest district. The request arrives with a coupon attached.`,
    choices: [
      { label: "Grant breathing room", consequence: "Ethical signal, lower hostility.", apply(corp) { corp.hostility = clamp((corp.hostility || 0) - 12, 0, 100); corp.rep = clamp((corp.rep || 0) + 2, 0, 100); state.brandBuzz = clamp(state.brandBuzz + 1.5, 0, 100); addOperatorChoiceSignal("ethical", 1.4); return `${corp.label} receives breathing room. A local columnist calls restraint 'commercially suspicious'.`; } },
      { label: "Demand route data", consequence: "Dirty leverage, rival weaker.", apply(corp) { corp.rep = clamp((corp.rep || 0) - 5, 0, 100); corp.marketShare = clamp((corp.marketShare || 0) - 2, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 3, 0, 100); addOperatorChoiceSignal("dirtyTactics", 1.3); return `${corp.label} handed over route data. The spreadsheet looked afraid of daylight.`; } },
      { label: "Offer a buyout note", consequence: "Late-game buyout posture.", locked: () => !isLateGame("deep") && companyValue() < 220000, apply(corp) { corp.hostility = clamp((corp.hostility || 0) - 6, 0, 100); corp.rep = clamp((corp.rep || 0) - 3, 0, 100); addOperatorChoiceSignal("corporateCompliance", 1); return `${corp.label} received your buyout note and briefly resembled a wounded invoice.`; } }
    ]
  },
  {
    id: "prThreat",
    minStage: "early",
    cooldown: 10,
    title: (corp) => `${corp.label} threatens a public relations campaign`,
    text: (corp) => `${corp.label} says customers deserve 'responsible vending alternatives.' They mean themselves, badly.`,
    choices: [
      { label: "Preempt with transparency", consequence: "Reputation up, small cost.", locked: () => state.cash < 4200, apply(corp) { state.cash -= 4200; state.brandBuzz = clamp(state.brandBuzz + 2.6, 0, 100); corp.hostility = clamp((corp.hostility || 0) + 2, 0, 100); addOperatorChoiceSignal("ethical", 1); return `Transparency memo published. ${corp.label} hated the footnotes most.`; } },
      { label: "Ignore the campaign", consequence: "Low risk, smear may linger.", apply(corp) { corp.hostility = clamp((corp.hostility || 0) - 2, 0, 100); state.brandBuzz = clamp(state.brandBuzz - 0.8, 0, 100); addOperatorChoiceSignal("cautious", 0.6); return `${corp.label}'s PR threat was ignored. The city forgot half of it by lunch.`; } },
      { label: "Seed a counter-rumor", consequence: "Dirty tactics, rival damage.", apply(corp) { corp.rep = clamp((corp.rep || 0) - 4.5, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 4, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 5, 0, 100); addOperatorChoiceSignal("dirtyTactics", 1.5); return `Counter-rumor seeded against ${corp.label}. Nobody is proud, which means it worked a little.`; } }
    ]
  },
  {
    id: "suspiciousPartnership",
    minStage: "deep",
    cooldown: 14,
    title: (corp) => `${corp.label} offers a partnership`,
    text: (corp) => `${corp.label} proposes a suspicious operational partnership. The benefit is real. So is the smell.`,
    choices: [
      { label: "Take the deal", consequence: "Cash now, audit heat and WENDING sellout signal.", apply(corp) { state.cash += 18000; state.corporate.heat = clamp((state.corporate.heat || 0) + 7, 0, 100); corp.hostility = clamp((corp.hostility || 0) - 8, 0, 100); addOperatorChoiceSignal("corporateCompliance", 1.2); return `${corp.label} partnership accepted. The money arrived before the ethics did.`; } },
      { label: "Demand cleaner terms", consequence: "Lower gain, lower risk.", apply(corp) { state.cash += 6000; state.brandBuzz = clamp(state.brandBuzz + 1, 0, 100); corp.rep = clamp((corp.rep || 0) - 1, 0, 100); addOperatorChoiceSignal("legalistic", 1); return `Cleaner terms filed. ${corp.label} looked briefly inconvenienced by legitimacy.`; } },
      { label: "Leak the offer", consequence: "Damage rival, raise hostility.", apply(corp) { corp.rep = clamp((corp.rep || 0) - 5, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 8, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 3, 0, 100); addOperatorChoiceSignal("dirtyTactics", 1.4); return `${corp.label}'s offer leaked. The city enjoyed the scandal and learned nothing.`; } }
    ]
  },
  {
    id: "supplierTruce",
    minStage: "early",
    cooldown: 11,
    title: (corp) => `${corp.label} proposes a supplier quiet period`,
    text: (corp) => `${corp.label} suggests both sides stop squeezing suppliers for one week. The supplier lobby pretends not to cry.`,
    choices: [
      { label: "Agree to quiet procurement", consequence: "Lower hostility, lower audit heat.", apply(corp) { corp.hostility = clamp((corp.hostility || 0) - 8, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) - 4, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) - 1.8, 0, 100); addOperatorChoiceSignal("diplomatic", 1); return `Supplier quiet period accepted. Everyone agrees not to call it mercy.`; } },
      { label: "Exploit the pause", consequence: "Cheaper stock signal, dirty tactics.", apply(corp) { corp.rep = clamp((corp.rep || 0) - 2, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 3.5, 0, 100); addOperatorChoiceSignal("dirtyTactics", 1.2); return `You exploited the procurement pause. Suppliers learned a new kind of silence.`; } },
      { label: "Refuse supplier diplomacy", consequence: "Hostility rises.", apply(corp) { corp.hostility = clamp((corp.hostility || 0) + 6, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 4, 0, 100); addOperatorChoiceSignal("aggressiveExpansion", 0.8); return `${corp.label} marked your refusal as aggressive procurement posture.`; } }
    ]
  },
  {
    id: "districtSwap",
    minStage: "deep",
    cooldown: 13,
    title: (corp) => `${corp.label} offers a district swap`,
    text: (corp) => `${corp.label} wants informal district boundaries. Nothing is signed, which makes it feel more illegal than it is.`,
    choices: [
      { label: "Accept informal boundaries", consequence: "Lower pressure, lower monopoly signal.", apply(corp) { state.world.hostility = clamp((state.world.hostility || 0) - 8, 0, 100); corp.hostility = clamp((corp.hostility || 0) - 10, 0, 100); addOperatorChoiceSignal("diplomatic", 1.3); return `Informal district boundaries accepted. The city enjoys invisible fences.`; } },
      { label: "Demand exit from hot districts", consequence: "Rival weakens, hostility rises.", apply(corp) { corp.rep = clamp((corp.rep || 0) - 4, 0, 100); corp.marketShare = clamp((corp.marketShare || 0) - 2, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 7, 0, 100); addOperatorChoiceSignal("aggressiveExpansion", 1.4); return `${corp.label} rejected your demand, then quietly recalculated rent exposure.`; } },
      { label: "Publish the map", consequence: "Public trust up, corporate heat up.", apply(corp) { state.brandBuzz = clamp(state.brandBuzz + 3, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 2, 0, 100); addOperatorChoiceSignal("antiCorporate", 1.2); return `The district map leaked. Customers enjoyed understanding the cage.`; } }
    ]
  }
];

const pressInterviewPrompts = [
  {
    id: "disputedLocations",
    title: "Municipal vending outlet requests comment",
    text: "Your machines have appeared in several disputed locations. How do you respond?",
    choices: [
      { label: "We serve underserved districts.", consequence: "Reputation up, audit posture steadier.", apply() { state.brandBuzz = clamp(state.brandBuzz + 3, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) - 1.5, 0, 100); state.world.pressTone = "civic"; addOperatorChoiceSignal("ethical", 1.1); return "Press quote filed as civic service. The city pretended to believe in nuance."; } },
      { label: "No comment.", consequence: "Low risk, no major gain.", apply() { state.world.pressTone = "neutral"; addOperatorChoiceSignal("cautious", 0.5); return "No comment recorded. The article filled the silence with a hallway photo."; } },
      { label: "We go where demand exists.", consequence: "Demand signal up, hostility up.", apply() { state.brandBuzz = clamp(state.brandBuzz + 1.4, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 4, 0, 100); state.world.pressTone = "market"; addOperatorChoiceSignal("aggressiveExpansion", 1.1); return "Press quote filed as market realism. Landlords clipped it for later."; } },
      { label: "The city is already owned.", consequence: "Anti-corporate signal, higher hostility.", apply() { state.brandBuzz = clamp(state.brandBuzz + 4, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 8, 0, 100); state.world.pressTone = "antiCorporate"; addOperatorChoiceSignal("antiCorporate", 1.6); return "The quote traveled quickly. Corporate counsel described it as 'unhelpfully accurate'."; } }
    ]
  },
  {
    id: "alcoholRegulation",
    title: "Licensing desk requests alcohol-route comment",
    text: "Your alcohol machines are drawing permit attention. What is the company position?",
    requires: () => (state.machines || []).some((machine) => machine.type === "alcohol"),
    choices: [
      { label: "We verify compliance carefully.", consequence: "Audit heat down, reputation steadier.", apply() { state.corporate.heat = clamp((state.corporate.heat || 0) - 2.5, 0, 100); state.brandBuzz = clamp(state.brandBuzz + 1.4, 0, 100); state.world.pressTone = "compliance"; addOperatorChoiceSignal("legalistic", 1.2); return "Alcohol compliance statement filed. The permit office nodded without unclenching."; } },
      { label: "Adults can press buttons.", consequence: "Demand tone up, hostility up.", apply() { state.brandBuzz = clamp(state.brandBuzz + 2.1, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 5, 0, 100); state.world.pressTone = "market"; addOperatorChoiceSignal("aggressiveExpansion", 1); return "The quote became popular with nightlife customers and unpopular with laminated offices."; } },
      { label: "No comment on cans.", consequence: "Low-risk evasion.", apply() { state.world.pressTone = "neutral"; addOperatorChoiceSignal("cautious", 0.8); return "No comment on cans recorded. The headline did the rest, poorly."; } }
    ]
  },
  {
    id: "laborConcerns",
    title: "Business weekly asks about labor concerns",
    text: "Your route is expanding while machines do unpaid emotional labor. How do you respond?",
    choices: [
      { label: "We invest in maintenance.", consequence: "Reputation up, ethical signal.", apply() { state.brandBuzz = clamp(state.brandBuzz + 2.2, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) - 1, 0, 100); state.world.pressTone = "civic"; addOperatorChoiceSignal("ethical", 1.1); return "Maintenance commitment quoted. Mechanics everywhere felt briefly seen."; } },
      { label: "Machines are assets, not staff.", consequence: "Corporate signal, modest hostility.", apply() { state.world.hostility = clamp((state.world.hostility || 0) + 3, 0, 100); state.world.pressTone = "corporate"; addOperatorChoiceSignal("corporateCompliance", 1); return "Asset language published. Investors liked it. Customers looked at the coin slots differently."; } },
      { label: "Ask the machines.", consequence: "Public likes it, auditors do not.", apply() { state.brandBuzz = clamp(state.brandBuzz + 3, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 2, 0, 100); state.world.pressTone = "antiCorporate"; addOperatorChoiceSignal("antiCorporate", 1.2); return "The quote made the machines seem more sympathetic than intended."; } }
    ]
  },
  {
    id: "vandalismResponse",
    title: "Local station asks about vending vandalism",
    text: "Several machines have been damaged or threatened. What should the public understand?",
    choices: [
      { label: "We will repair and stay.", consequence: "Reputation up, hostility slightly up.", apply() { state.brandBuzz = clamp(state.brandBuzz + 2.5, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 2, 0, 100); state.world.pressTone = "resilient"; addOperatorChoiceSignal("ethical", 0.8); return "Repair-and-stay quote aired. Damaged machines acquired tragic dignity."; } },
      { label: "Security will increase.", consequence: "Audit posture steadier, customers wary.", apply() { state.corporate.heat = clamp((state.corporate.heat || 0) - 1, 0, 100); state.brandBuzz = clamp(state.brandBuzz - 0.6, 0, 100); state.world.pressTone = "compliance"; addOperatorChoiceSignal("legalistic", 0.9); return "Security statement aired. Everyone pretended cameras are comforting."; } },
      { label: "Vandalism proves demand.", consequence: "Aggressive expansion signal.", apply() { state.brandBuzz = clamp(state.brandBuzz + 1.2, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 5, 0, 100); state.world.pressTone = "market"; addOperatorChoiceSignal("aggressiveExpansion", 1.4); return "The quote was called ruthless by people with ad budgets."; } }
    ]
  },
  {
    id: "publicTrust",
    title: "Consumer trust bureau requests comment",
    text: "Customers are reviewing your route as if the machines can hear them. Why should they trust you?",
    choices: [
      { label: "Clean machines, clear prices.", consequence: "Reputation up, ethical signal.", apply() { state.brandBuzz = clamp(state.brandBuzz + 2.8, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) - 1.2, 0, 100); state.world.pressTone = "civic"; addOperatorChoiceSignal("ethical", 1.3); return "Trust statement published. The phrase clear prices caused mild discomfort in competitors."; } },
      { label: "Trust is measured in sales.", consequence: "Demand tone up, hostility up.", apply() { state.brandBuzz = clamp(state.brandBuzz + 1.4, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 4, 0, 100); state.world.pressTone = "market"; addOperatorChoiceSignal("aggressiveExpansion", 1); return "Trust-as-sales quote circulated. Economists nodded too quickly."; } },
      { label: "Machines do not lie. People do.", consequence: "Anti-corporate signal, audit attention.", apply() { state.brandBuzz = clamp(state.brandBuzz + 3.2, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 2, 0, 100); state.world.pressTone = "antiCorporate"; addOperatorChoiceSignal("antiCorporate", 1.4); return "The quote became graffiti-adjacent within hours."; } }
    ]
  },
  {
    id: "operatorPhilosophy",
    title: "Route philosophy interview",
    text: "A small magazine asks what vending operations should mean in the modern district network.",
    choices: [
      { label: "Reliable food near tired people.", consequence: "Reputation up.", apply() { state.brandBuzz = clamp(state.brandBuzz + 2.4, 0, 100); state.world.pressTone = "civic"; addOperatorChoiceSignal("ethical", 1); return "The magazine called it modest. The machines accepted this as praise."; } },
      { label: "Convenience is infrastructure.", consequence: "Corporate and expansion signal.", apply() { state.brandBuzz = clamp(state.brandBuzz + 1.5, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 3, 0, 100); state.world.pressTone = "corporate"; addOperatorChoiceSignal("corporateCompliance", 0.8); addOperatorChoiceSignal("aggressiveExpansion", 0.6); return "Infrastructure quote filed. Landlords heard opportunity in the walls."; } },
      { label: "The city already outsourced hunger.", consequence: "Anti-corporate identity signal.", apply() { state.brandBuzz = clamp(state.brandBuzz + 3.8, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 7, 0, 100); state.world.pressTone = "antiCorporate"; addOperatorChoiceSignal("antiCorporate", 1.6); return "The quote spread through operator forums with concerning speed."; } }
    ]
  },
  {
    id: "expansionEthics",
    title: "Commercial ethics panel wants a statement",
    text: "Your network growth is making rivals and district managers nervous. Is expansion the point?",
    choices: [
      { label: "Growth follows service quality.", consequence: "Reputation up, hostility down slightly.", apply() { state.brandBuzz = clamp(state.brandBuzz + 2, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) - 2, 0, 100); state.world.pressTone = "civic"; addOperatorChoiceSignal("ethical", 1); return "Service-quality answer published. It sounded less threatening than the machine map looked."; } },
      { label: "Expansion prevents worse operators.", consequence: "Hostility up, WENDING notices.", apply() { state.brandBuzz = clamp(state.brandBuzz + 1.8, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 6, 0, 100); state.world.pressTone = "market"; addOperatorChoiceSignal("aggressiveExpansion", 1.4); return "The answer made competitors furious because parts of it were useful."; } },
      { label: "Ask the corporations.", consequence: "Anti-corporate signal, audit attention.", apply() { state.brandBuzz = clamp(state.brandBuzz + 3.4, 0, 100); state.corporate.heat = clamp((state.corporate.heat || 0) + 2.5, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 5, 0, 100); state.world.pressTone = "antiCorporate"; addOperatorChoiceSignal("antiCorporate", 1.5); return "The panel moved on quickly. Corporate representatives did not."; } }
    ]
  },
  {
    id: "debtCulture",
    title: "Finance column asks about debt-led growth",
    text: "Your route has taken on notable debt. Is this expansion, survival, or a cry for invoices?",
    requires: () => loanPrincipal() >= 45000,
    choices: [
      { label: "Debt funds infrastructure.", consequence: "Corporate signal, hostility steady.", apply() { state.world.pressTone = "corporate"; state.brandBuzz = clamp(state.brandBuzz + 1.3, 0, 100); addOperatorChoiceSignal("corporateCompliance", 1); addOperatorChoiceSignal("debtGrowth", 0.8); return "Debt-as-infrastructure quote published. Banks placed it in a small frame."; } },
      { label: "We repay what we owe.", consequence: "Cautious WENDING signal.", apply() { state.world.pressTone = "civic"; state.brandBuzz = clamp(state.brandBuzz + 1.8, 0, 100); addOperatorChoiceSignal("cautious", 1.2); return "Repayment discipline quoted. Finance briefly stopped breathing through its teeth."; } },
      { label: "Money is rented time.", consequence: "Anti-corporate signal, audit curiosity.", apply() { state.world.pressTone = "antiCorporate"; state.corporate.heat = clamp((state.corporate.heat || 0) + 1.8, 0, 100); addOperatorChoiceSignal("antiCorporate", 1.1); return "The quote confused lenders and delighted three tired operators."; } }
    ]
  },
  {
    id: "customerMixQuestion",
    title: "District reporter asks about customer targeting",
    text: "Locals noticed machines that seem unusually tuned to their habits. How intentional is the route?",
    choices: [
      { label: "We listen to district needs.", consequence: "Reputation up, ethical signal.", apply() { state.brandBuzz = clamp(state.brandBuzz + 2.4, 0, 100); state.world.pressTone = "civic"; addOperatorChoiceSignal("ethical", 1); return "District-needs answer filed. Customers accepted the comforting version."; } },
      { label: "Patterns are profitable.", consequence: "Demand posture, hostility up.", apply() { state.brandBuzz = clamp(state.brandBuzz + 1.2, 0, 100); state.world.hostility = clamp((state.world.hostility || 0) + 4, 0, 100); state.world.pressTone = "market"; addOperatorChoiceSignal("aggressiveExpansion", 1.1); return "Pattern-profit quote circulated. The city heard the quiet part clearly."; } },
      { label: "The machines decide.", consequence: "Folklore tone, WENDING anomaly.", apply() { state.brandBuzz = clamp(state.brandBuzz + 2.8, 0, 100); addOperatorChoiceSignal("antiCorporate", 0.8); state.world.pressTone = "uncanny"; return "The machines-decide quote became folklore before lunch."; } }
    ]
  }
];

const nexMachineFailureLines = [
  "YOU'RE NOT REAL UNTIL YOU BREAK.",
  "Machine integrity collapsed during DIRTY RESET.",
  "A technician described the failure as a SILENTSCREAM.",
  "This machine survived two DIRTY RESETS already.",
  "Recovery attempt flagged as IMFUCKINFINE."
];

const nexRepairLines = [
  "DIRTY RESET residue cleared from the maintenance notes.",
  "Repair log mentions SILENTSCREAM, then deletes itself.",
  "Recovery attempt accepted. The route did not ask why.",
  "A technician wrote YRNTRLNTLYBRK on the service form, then crossed it out."
];

const nexCityFeedLines = [
  "One operator reportedly performed a DIRTY RESET on a failing district route.",
  "Anti-corporate graffiti reading 'YOU'RE NOT REAL UNTIL YOU BREAK' appeared near several damaged machines.",
  "A damaged machine looped distorted audio before shutdown. Witnesses described it as a 'SILENTSCREAM.'",
  "Maintenance crews found NEX// scratched under a corporate lease notice. No one filed ownership."
];

const nexReviewLines = [
  "The machine looked broken but somehow worked better afterward.",
  "Somebody scratched NEX// into the side panel.",
  "The machine displayed 'DIRTY RESET COMPLETE' before dispensing the drink.",
  "It sounded wrong after the repair, but the cola came out colder."
];

const lateGameCrises = [
  {
    id: "districtLockdown",
    minPressure: 0.38,
    chance: 0.034,
    text: (location) => `${location.label}: district lockdown for 2 days. Foot traffic dropped and leases got colder.`,
    effect(locationId, events) {
      state.world.lockdowns[locationId] = Math.max(state.world.lockdowns[locationId] || 0, 2);
      const pressure = competitionLocation(locationId);
      pressure.blockedDays = Math.max(pressure.blockedDays || 0, 2);
      events.push(`${locationById(locationId).label}: demand is heavily reduced and relocation is blocked for 2 days.`);
    }
  },
  {
    id: "supplierCollapse",
    minPressure: 0.44,
    chance: 0.028,
    text: () => "A supplier collapsed into voicemail. One product category gets a 2-day wholesale spike.",
    effect(locationId, events) {
      const type = pick(["snack", "drink", "coffee", "fresh", "alcohol"]);
      products.filter((product) => product.type === type).forEach((product) => {
        state.supplyModifiers[product.id] = { multiplier: 1.22, daysLeft: 2, name: "Supplier collapse" };
      });
      events.push(`Supplier collapse created a two-day wholesale spike for ${type} products.`);
    }
  },
  {
    id: "inspectionShutdown",
    minPressure: 0.5,
    chance: 0.024,
    text: (location) => `${location.label}: inspection shutdown. Affected machines are offline until serviced; audit heat rises immediately.`,
    effect(locationId, events) {
      state.machines.filter((machine) => machine.location === locationId).forEach((machine) => {
        machine.broken = true;
        machine.condition = clamp(machine.condition - 12, 0, 100);
        addMachineIncident(machine, "Inspection shutdown caused forced downtime.");
      });
      state.corporate.heat = clamp((state.corporate.heat || 0) + 5, 0, 100);
      events.push(`${locationById(locationId).label}: affected machines lost condition and must be serviced before normal operation.`);
    }
  },
  {
    id: "machineSeizure",
    minPressure: 0.58,
    chance: 0.018,
    text: () => "A machine seizure notice arrived. One affected machine may lose cash, condition, and uptime immediately.",
    effect(locationId, events) {
      const candidates = state.machines.filter((machine) => machine.location === locationId && state.machines.length > 1);
      const machine = pick(candidates);
      if (!machine) return;
      machine.cash = Math.max(0, Math.round(machine.cash * 0.35));
      machine.condition = clamp(machine.condition - 24, 0, 100);
      machine.broken = true;
      addMachineIncident(machine, "Seizure attempt: machine returned damaged and quiet.");
      events.push(`${machine.name} was briefly seized and returned damaged. Service is required; some cash was lost.`);
    }
  }
];

const chaosEvents = [
  {
    chance: 0.022,
    text: "City inspection drill: every vending machine in town briefly becomes a compliance conversation.",
    effect(events) {
      state.corporate.heat = clamp((state.corporate.heat || 0) + 2.2, 0, 100);
      events.push("Audit heat rose slightly. The drill was described as voluntary with mandatory undertones.");
    }
  },
  {
    chance: 0.018,
    text: "A commuter forum ranked buttons by emotional reliability. Nobody requested this dataset.",
    effect(events) {
      const machine = pick(state.machines);
      if (!machine) return;
      state.brandBuzz = clamp(state.brandBuzz + 1.1, 0, 100);
      addMachineIncident(machine, "Mentioned in a button reliability thread.");
      events.push(`${machine.name} received tiny unpaid publicity from button discourse.`);
    }
  },
  {
    chance: 0.016,
    text: "A landlord association newsletter warns about 'independent snack operators with ambition'.",
    effect(events) {
      const locationId = pick(Object.keys(locations));
      const pressure = competitionLocation(locationId);
      pressure.landlordDays = Math.max(pressure.landlordDays || 0, 2);
      events.push(`${locationById(locationId).label} rent risk increased for two days.`);
    }
  },
  {
    chance: 0.014,
    text: "A spreadsheet consultant called vending machines 'micro-retail endpoints' and several investors nodded too hard.",
    effect(events) {
      const company = pick(activeCorporations().length ? activeCorporations() : state.competition.companies);
      company.rep = clamp(company.rep + 1.8, 0, 100);
      events.push(`${company.label} gained a small reputation bump from terminology exposure.`);
    }
  },
  {
    chance: 0.013,
    text: "Transit strike: commuters are trapped near machines and suddenly describe snacks as infrastructure.",
    effect(events) {
      applyDemandEvent({ name: "Transit strike", productIds: ["water", "cola", "chips", "sandwich"], multiplier: 1.28, duration: 2, text: "Transit strike: station-adjacent demand rises for fast food and drinks." }, events);
      const pressure = competitionLocation("station");
      pressure.level = clamp((pressure.level || 0) + 1, 0, 6);
      pressure.daysLeft = Math.max(pressure.daysLeft || 0, 3);
      events.push("Train station pressure increased for 3 days. Everyone discovered waiting as a business model.");
    }
  },
  {
    chance: 0.012,
    text: "Municipal street festival: foot traffic blooms, hygiene expectations quietly collapse.",
    effect(events) {
      applyDemandEvent({ name: "Street festival", productIds: ["water", "cola", "bar", "seltzer"], multiplier: 1.22, duration: 2, text: "Street festival: impulse food, drinks, and hard seltzer demand rises." }, events);
      state.world.modifierDays.vandalismWave = Math.max(state.world.modifierDays.vandalismWave || 0, 2);
      rebuildWorldModifiers();
      events.push("Festival cleanup pressure increases theft and dirt risk for 2 days.");
    }
  },
  {
    chance: 0.011,
    text: "Corporate scandal: a rival executive called vending customers 'button livestock' near a microphone.",
    effect(events) {
      const company = pick(activeCorporations());
      if (!company) return;
      company.rep = clamp((company.rep || 0) - 6, 0, 100);
      company.hostility = clamp((company.hostility || 0) + 4, 0, 100);
      state.brandBuzz = clamp(state.brandBuzz + 2.4, 0, 100);
      events.push(`${company.label} lost reputation. Your route gained trust by not saying that, yet.`);
    }
  },
  {
    chance: 0.01,
    text: "Grid instability: half the district learns which machines have spiritual resilience.",
    effect(events) {
      const locationId = pick(Object.keys(locations));
      state.world.lockdowns[locationId] = Math.max(state.world.lockdowns[locationId] || 0, 1);
      events.push(`${locationById(locationId).label}: partial infrastructure failure reduces traffic for 1 day.`);
    }
  }
];

const employeeTypes = {
  stocker: { label: "Route Stocker", cost: 8200, wage: 1450, max: 3, text: "Improves auto-restock reliability and reduces damaged deliveries in transit." },
  mechanic: { label: "Field Mechanic", cost: 11000, wage: 1850, max: 2, text: "Slows condition decay and reduces serious faults." },
  cleaner: { label: "Cleaning Crew", cost: 7600, wage: 1250, max: 2, text: "Slows cleanliness decay and protects reputation." },
  accountant: { label: "Nervous Accountant", cost: 13500, wage: 2100, max: 1, text: "Reduces tax audit risk and fines." },
  lawyer: { label: "Legal Counsel", cost: 22000, wage: 3400, max: 1, text: "Reduces lawsuit and audit-pressure penalties. Expensive, fluent in envelopes." }
};

const securityContracts = {
  none: { label: "No contract", dailyCost: 0, security: 0, audit: 0, text: "Cheapest, but every location is on its own." },
  budget: { label: "Budget Patrol", dailyCost: 900, security: 5, audit: 0, text: "Small security boost for all machines." },
  premium: { label: "Premium Security", dailyCost: 2300, security: 13, audit: -0.01, text: "Strong security boost and cleaner paperwork." },
  questionable: { label: "Questionable Guards", dailyCost: 1200, security: 16, audit: 0.018, text: "Strong security, but inspectors hate the invoices." }
};

const supplierModes = {
  normal: { label: "Normal suppliers", costFactor: 1, audit: 0, rep: 0, text: "Reliable, boring, taxable." },
  shady: { label: "Shady suppliers", costFactor: 0.72, audit: 0.035, rep: -0.28, text: "Cheap wholesale, ugly paperwork, reputation slowly leaks." },
  premium: { label: "Premium suppliers", costFactor: 1.14, audit: -0.012, rep: 0.22, text: "Costs more, improves trust, lowers audit risk." }
};

const corporateIncidents = [
  {
    chance: 0.08,
    minHeat: 18,
    text: "A tax inspector asked why three receipts say 'miscellaneous beverage rectangle'.",
    effect(events) {
      const accountant = state.corporate.employees.accountant || 0;
      const fine = Math.round((5200 + state.corporate.heat * 120 + Math.random() * 4600) * (1 - accountant * 0.35));
      state.corporate.fines += fine;
      state.stats.corporate += fine;
      state.brandBuzz = clamp(state.brandBuzz - 2.6, 0, 100);
      events.push(`Tax inspection fine: ${formatMoney(fine)}. The paperwork learned a lesson.`);
      return fine;
    }
  },
  {
    chance: 0.07,
    minHeat: 10,
    text: "A questionable substitute got noticed by exactly the kind of customer who writes long reviews.",
    effect(events) {
      state.brandBuzz = clamp(state.brandBuzz - 3.5, 0, 100);
      events.push("Questionable product substitute backlash: reputation dropped.");
    }
  },
  {
    chance: 0.055,
    minHeat: 5,
    text: "A black market crate arrived with one corner labeled 'probably snacks'.",
    effect(events) {
      const product = pick(products);
      const units = 3 + Math.floor(Math.random() * 5);
      state.warehouse[product.id] = (state.warehouse[product.id] || 0) + units;
      addWarehouseBatch(product.id, units);
      events.push(`Black market bonus stock: ${units} pcs of ${productDisplayName(product)}. Nobody asked follow-up questions.`);
    }
  },
  {
    chance: 0.045,
    minHeat: 12,
    text: "A compliance consultant praised your receipts as 'haunting but searchable'.",
    effect(events) {
      state.corporate.heat = clamp(state.corporate.heat - 3, 0, 100);
      events.push("Compliance heat cooled slightly. The consultant billed in fifteen-minute increments.");
    }
  },
  {
    chance: 0.04,
    minHeat: 16,
    text: "A security contractor submitted an invoice with the word 'vibes' under services rendered.",
    effect(events) {
      const fee = 700 + Math.round(Math.random() * 900);
      state.stats.corporate += fee;
      events.push(`Questionable contractor fee: ${formatMoney(fee)}. It has been categorized as atmosphere control.`);
      return fee;
    }
  }
];

const legalPressureEvents = [
  {
    id: "rivalLawsuit",
    label: "Rival lawsuit",
    minHostility: 50,
    minHeat: 12,
    baseCost: 7200,
    text: "A rival corporation filed a lawsuit alleging hostile corridor behavior. The corridor declined comment.",
    effect(cost, events) {
      state.world.hostility = clamp((state.world.hostility || 0) - 4, 0, 100);
      events.push(`Legal settlement cost: ${formatMoney(cost)}. Hostility cooled slightly because money moved through lawyers.`);
    }
  },
  {
    id: "regulatoryAudit",
    label: "Regulatory audit",
    minHostility: 35,
    minHeat: 28,
    baseCost: 6200,
    text: "A regulatory audit requested supplier documentation with the confidence of a closed door.",
    effect(cost, events) {
      state.corporate.heat = clamp((state.corporate.heat || 0) - 7, 0, 100);
      events.push(`Audit response cost: ${formatMoney(cost)}. Audit heat dropped after several forms were sacrificed.`);
    }
  },
  {
    id: "leaseCompliance",
    label: "Lease compliance investigation",
    minHostility: 45,
    minHeat: 0,
    baseCost: 5600,
    text: "Lease compliance investigators asked whether one hallway needs this many snacks. Dangerous question.",
    effect(cost, events) {
      const locationId = highestDominanceLocation();
      const pressure = competitionLocation(locationId);
      pressure.landlordDays = Math.max(pressure.landlordDays || 0, 2);
      events.push(`${locationById(locationId).label}: lease pressure rose for 2 days. Compliance cost: ${formatMoney(cost)}.`);
    }
  },
  {
    id: "monopolyInquiry",
    label: "Monopoly inquiry",
    minHostility: 62,
    minHeat: 8,
    baseCost: 9400,
    requires() {
      return state.machines.length >= 5 && districtDominance(highestDominanceLocation()) >= 0.42;
    },
    text: "A monopoly inquiry arrived in neutral language and expensive paper.",
    effect(cost, events) {
      state.world.hostility = clamp((state.world.hostility || 0) + 2, 0, 100);
      state.brandBuzz = clamp(state.brandBuzz - 2, 0, 100);
      events.push(`Monopoly inquiry response cost: ${formatMoney(cost)}. Reputation winced in a legally distinct way.`);
    }
  },
  {
    id: "alcoholLicenseReview",
    label: "Alcohol license review",
    minHostility: 38,
    minHeat: 18,
    baseCost: 6800,
    requires() {
      return (state.machines || []).some((machine) => machine.type === "alcohol");
    },
    text: "Licensing inspectors reviewed your alcohol route and found several profitable reasons to keep reviewing it.",
    effect(cost, events) {
      state.corporate.heat = clamp((state.corporate.heat || 0) - 4, 0, 100);
      state.world.hostility = clamp((state.world.hostility || 0) + 1, 0, 100);
      events.push(`Alcohol compliance filing cost: ${formatMoney(cost)}. The license remains valid, but more supervised.`);
    }
  },
  {
    id: "supplierReluctanceReview",
    label: "Supplier reluctance review",
    minHostility: 58,
    minHeat: 6,
    baseCost: 4800,
    text: "A supplier asked for risk premiums after hearing your company name from three different lawyers.",
    effect(cost, events) {
      const product = pick(products);
      state.supplyModifiers[product.id] = { multiplier: 1.16, daysLeft: 2, name: "Supplier risk premium" };
      events.push(`${productDisplayName(product)} supply cost increased for 2 days. Legal expense: ${formatMoney(cost)}.`);
    }
  }
];

const weeklyGoals = [
  { type: "profit", target: 26000, reward: 8500, text: "Earn 26 000 Cr weekly profit" },
  { type: "reputation", target: 70, reward: 6500, text: "End the week with 70% reputation" },
  { type: "sales", target: 36, reward: 8000, text: "Sell 36 products this week" },
  { type: "coffee", target: 14, reward: 7000, text: "Sell 14 coffee products this week" },
  { type: "fresh", target: 10, reward: 7600, text: "Sell 10 fresh food products this week" },
  { type: "cleanDays", target: 4, reward: 9200, text: "Keep average cleanliness at 90% for 4 days" },
  { type: "breakdownFree", target: 5, reward: 8800, text: "Avoid machine breakdowns for 5 days" },
  { type: "pressureSurvival", target: 2, reward: 9400, text: "Operate through 2 days of active corporation pressure" },
  { type: "lowHeatDays", target: 5, reward: 8200, text: "Keep audit heat under 18% for 5 days" },
  { type: "noSubstituteDays", target: 6, reward: 7800, text: "Complete 6 days without substitute ingredients" },
  { type: "stationDrinks", target: 12, reward: 9000, text: "Sell 12 drinks from station machines" }
];

const firstWeekGuidance = {
  1: {
    title: "Day 1 filing note",
    text: "Set prices before trusting the hallway economy. Your first machine is not free; Finance is already awake."
  },
  2: {
    title: "Day 2 stock memo",
    text: "Empty slots do not create scarcity. They create customers with opinions."
  },
  3: {
    title: "Day 3 cash reminder",
    text: "Machine cash is not company cash until collected. The money is close, which is legally different from available."
  },
  4: {
    title: "Day 4 maintenance note",
    text: "Service and cleaning are cheaper before the machine starts expressing itself through failure."
  },
  5: {
    title: "Day 5 debt notice",
    text: "Debt is survivable. Interest is the part that keeps asking if you have a minute."
  },
  6: {
    title: "Day 6 expansion review",
    text: "Expansion is attractive. So are rent, stock costs, and other proof that ambition has invoices."
  },
  7: {
    title: "Day 7 external pressure",
    text: "The city and competitors are beginning to notice your rectangles. This is not approval."
  },
  10: {
    title: "Day 10 operator training",
    text: "Customer mix is not decoration. District habits change what sells, what rots, and what gets reviewed."
  },
  14: {
    title: "Day 14 corporate desk note",
    text: "Corporate pressure is a cost forecast wearing a tie. De-escalate before it becomes rent, audits, or supplier reluctance."
  },
  21: {
    title: "Day 21 route restructuring",
    text: "Machines can now be sold if the route needs a cleaner shape. Depreciation is rude, but reversible mistakes are healthy."
  },
  30: {
    title: "Day 30 public narrative",
    text: "Press requests and corporate diplomacy become part of the route record. Your answers shape WENDING classification."
  }
};

const machineFlavorLines = {
  snack: [
    "A compact cabinet of shelf-stable negotiations.",
    "Glass-fronted optimism with a paprika-forward portfolio.",
    "This machine understands impulse margins and says nothing."
  ],
  drink: [
    "Cold liquidity, vertically integrated into buttons.",
    "A refrigerated hydration argument with a coin slot.",
    "The display promises refreshment with municipal restraint."
  ],
  coffee: [
    "A bean-funded productivity appliance with limited empathy.",
    "Dispenses caffeine and plausible deniability before meetings.",
    "The steam wand has seen the quarterly forecast."
  ],
  fresh: [
    "Perishable confidence behind glass.",
    "A refrigerated lunch committee with expiration dates.",
    "Freshness is monitored, audited, and quietly losing time."
  ],
  alcohol: [
    "A nightlife compliance dispenser with very serious paperwork.",
    "Liquid margin behind glass, watched by imaginary inspectors.",
    "The license is valid. The vibe is under review."
  ]
};

const identityMachineFlavorLines = {
  corporateSellout: "The machine now feels less like a machine and more like a quarterly initiative.",
  undergroundChain: "Its inventory history has the emotional texture of a sealed envelope.",
  luxuryEmpire: "Customers approach it like the buttons may have a dress code.",
  chaosStrategy: "The machine appears to thrive where planning goes to become expensive.",
  monopolyRoute: "This cabinet knows it is part of a larger hallway argument.",
  ethicalRoute: "The receipts are boring in a way auditors find almost moving.",
  dystopianMegacorp: "It emits the quiet confidence of infrastructure that has learned ambition."
};

const customerReviewLines = [
  { minSold: 0, rating: 1, tone: "very negative", text: "One star. The machine stared at me with an empty shelf and I learned nothing." },
  { minSold: 0, rating: 2, tone: "negative", text: "Two stars. Convenient location, inconvenient absence of purchasable joy." },
  { minSold: 1, rating: 4, tone: "positive", text: "Four stars. It accepted my money faster than most institutions." },
  { minSold: 1, rating: 5, tone: "very positive", text: "Five stars. The machine did not ask how my day was." },
  { minSold: 3, rating: 3, tone: "neutral", text: "Three stars. Convenient, mildly fluorescent, emotionally neutral." },
  { minSold: 4, rating: 4, tone: "positive", text: "Four stars. I came for convenience and left with a receipt-shaped memory." },
  { minSold: 5, rating: 4, tone: "positive", text: "Four stars. Management has clearly weaponized accessibility." },
  { minSold: 6, rating: 4, tone: "positive", text: "Four stars. The purchase was quick and the existential burden was manageable." },
  { minSold: 8, rating: 5, tone: "very positive", text: "Five stars. This machine has better availability than our HR portal." },
  { minSold: 3, rating: 4, tone: "positive", text: "Four stars. The machine insulted my outfit through silence. Good selection." },
  { minSold: 5, rating: 5, tone: "very positive", text: "Five stars. I blacked out for fourteen minutes. Probably coffee." },
  { minSold: 7, rating: 3, tone: "mixed", text: "Three stars. Bought something. Received capitalism in a smaller package." },
  { minSold: 9, rating: 5, tone: "very positive", text: "Five stars. The machine understands lunch better than my manager." }
];

const helpContent = {
  overview: {
    title: "Operator briefing",
    text: "Run vending machines, stock products, set prices, pick locations, and survive route events. Rare flavor may use local session context such as time of day, tab focus, or save/load count. No personal files, location, camera, microphone, clipboard, or browser history are accessed."
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
    text: "Press Next day to simulate customers, sales, events, theft risk, maintenance wear, spoilage, and auto-restock. The expense preview shows predictable estimated costs before you commit."
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
    text: "Use three local save slots to store your current route. Export creates a JSON backup. Import validates the file, migrates older compatible saves where possible, and refuses broken files without replacing your current route."
  },
  weekly: {
    title: "Weekly goal",
    text: "Weekly goals give short-term direction and bonus cash. They reward profit, sales, reputation, or specific product categories. Missing a goal hurts reputation a little, but the route continues."
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
  actions: {
    title: "Daily actions",
    text: "Next day runs the simulation. Collect cash moves money from the selected machine into company cash. Service repairs condition and broken machines. Clean restores cleanliness and protects demand."
  },
  expenses: {
    title: "Projected expenses",
    text: "This estimate includes predictable upkeep, planned auto-restock, corporate overhead, known pressure reserves, and a safe placeholder for future loan interest. Random events can still change the final result."
  },
  locationProfile: {
    title: "Location personality",
    text: "Each location has a customer mix, rent, demand, cleanliness pressure, and security level. Cheaper risky locations can sell more, but require stronger machine upgrades and more attention."
  },
  products: {
    title: "Products and pricing",
    text: "Set product prices here. Higher prices increase margin but reduce demand. Lower prices can sell more units. Watch the demand index and margin together, especially during supply, demand, and price-war events."
  },
  manualRestock: {
    title: "Manual restocking",
    text: "Choose the exact quantity to move from warehouse into the selected machine. The suggestion is only a recommendation based on recent sales, location, machine type, and active demand events. Your entered quantity always wins."
  },
  autostock: {
    title: "Auto-restock",
    text: "Tick a product and set a minimum warehouse amount. Before each day, the route buys toward that minimum if you have cash. Auto-deliveries can lose a few damaged units in transit; Route Stockers reduce that risk. Manual machine stock is unaffected."
  },
  stocktab: {
    title: "Warehouse details",
    text: "This section shows current warehouse stock and wholesale costs. Fresh food also shows average days left before it spoils."
  },
  stats: {
    title: "Progress",
    text: "Use Progress to see where money goes and which machines earn the most. The income/expense and profit charts help you spot bad pricing, too much spoilage, or expensive locations."
  },
  competition: {
    title: "Competition",
    text: "Rival companies can pressure locations, start price wars, challenge leases, and trigger legal trouble. Corporate hostility is the pressure meter: higher tiers increase audit, lawsuit, retaliation, and lease risks. De-escalation paperwork and lower-heat choices cool it."
  },
  corporate: {
    title: "Corporate descent",
    text: "Advanced corporate systems add leverage with consequences. Employees reduce operational pain, security contracts lower theft, shady suppliers and black market stock cut costs, and substitutes improve margin while raising audit heat and reputation risk."
  },
  advisor: {
    title: "Route advisor",
    text: "This checklist points at the next practical problem: collect cash, refill empty machines, repair, clean, reduce audit heat, or respond to competition. It is not mandatory, but it helps connect the systems."
  },
  employees: {
    title: "Employees",
    text: "Employees cost a hiring fee and daily wages. Stockers reduce damaged auto-restock deliveries, mechanics reduce wear and faults, cleaners slow dirt buildup, accountants reduce tax inspection risk, and Legal Counsel softens lawsuit and audit-pressure costs."
  },
  suppliers: {
    title: "Supplier policy",
    text: "Normal suppliers are stable. Shady suppliers lower wholesale costs but raise audit heat and slowly hurt reputation. Premium suppliers cost more but improve trust and reduce audit pressure."
  },
  contracts: {
    title: "Security contracts",
    text: "Security contracts add effective security to every machine. Better security lowers theft risk, but daily contract costs hit profit. Questionable guards are strong but create audit heat."
  },
  blackMarket: {
    title: "Black market inventory",
    text: "Mystery crates are cheap surprise stock, but they raise audit heat. Useful in a cash crunch, dangerous if you already have hot paperwork."
  },
  substitutes: {
    title: "Questionable substitutes",
    text: "Substitutes lower wholesale cost for a product, improving margin. They also reduce demand and raise audit heat because customers and inspectors eventually notice things."
  },
  log: {
    title: "Operations log",
    text: "The log explains what happened after each day: sales, events, spoilage, theft, tax issues, competition pressure, and weekly reports. Use it to understand why profit or reputation moved."
  },
  cityFeed: {
    title: "City feed",
    text: "A lightweight news strip with economy, vending culture, and corporate headlines. Most headlines are flavor-only. Operational changes appear as events or active City Impact modifiers."
  },
  cityImpact: {
    title: "City impact modifiers",
    text: "City Impact shows temporary modifiers that actively change operations: machine prices, demand, upkeep, theft, security, audit heat, or cleanliness pressure. They expire after the listed number of days."
  },
  hostility: {
    title: "Corporate hostility",
    text: "Hostility measures how angry the rival/corporate ecosystem is with your route. Higher tiers increase retaliation, legal pressure, audits, lease trouble, and interference. De-escalation paperwork and lower-heat choices can cool it."
  },
  deadInventory: {
    title: "Dead inventory",
    text: "Dead inventory is stock sitting in a machine where location fit or current demand is weak. It creates a small daily drag because shelf space, freshness, and customer attention are being wasted."
  },
  operatorClassification: {
    title: "WENDING operator classification",
    text: "The classification is a quiet internal profile generated from your route behavior: products sold, locations, pricing, maintenance, corporate heat, and rival pressure. It is flavor-forward now, but designed for future world reactions."
  },
  legalPressure: {
    title: "Lawsuits and audits",
    text: "Legal and audit events can appear when hostility, audit heat, dominance, or questionable procurement rise. Legal Counsel reduces the financial damage, but the city still enjoys paperwork."
  },
  routeStockers: {
    title: "Route Stockers",
    text: "Route Stockers reduce damaged goods during auto-restock deliveries. They do not protect manual stock already placed in machines; they make the warehouse delivery process less tragic."
  },
  finance: {
    title: "Debt and licenses",
    text: "Loans add cash and increase principal. Daily interest is a cost and does not reduce principal. Manual repayments reduce principal. If cash falls too far below zero, bankruptcy can end the route."
  },
  reviews: {
    title: "Customer reviews",
    text: "Reviews are separate from the event digest and react to real route behavior: stock, cleanliness, condition, pricing, alcohol, corporate pressure, and customer fit. Star ratings match the experience."
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
    "sip",
    "again",
    "need"
  ]
};

const state = {
  cash: 58000,
  finance: { ...financeDefaults },
  contracts: {},
  companyName: DEFAULT_COMPANY_NAME,
  startupFinancingId: STARTUP_FINANCING_DEFAULT,
  operatorProfile: defaultOperatorProfile(),
  day: 1,
  selectedMachine: null,
  started: false,
  runningDay: false,
  gameOver: null,
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
    salad: 5,
    beer: 0,
    wine: 0,
    seltzer: 0
  },
  warehouseBatches: {
    sandwich: [{ qty: 6, days: 3 }],
    salad: [{ qty: 5, days: 3 }]
  },
  machines: [],
  competition: {
    companies: competitorTemplates.map((company) => normalizeCorporation(company, company)),
    locations: {}
  },
  world: {
    eventChains: {},
    reactionMemory: [],
    modifiers: {},
    modifierDays: {},
    lockdowns: {},
    warfareCooldowns: {},
    hostility: 0,
    crisisDays: 0,
    eventCooldowns: {},
    corporateEffects: [],
    targetCorporationId: competitorTemplates[0].id,
    choiceSignals: {},
    diplomacyCooldown: 0,
    pressCooldown: 0,
    lastDiplomacyDay: 0,
    lastPressDay: 0,
    lastCorporateAttackDay: 0,
    lastInfightingDay: 0,
    lastDiplomacyPrompt: "",
    lastPressPrompt: "",
    pressTone: "unfiled",
    milestoneMemory: {},
    digestMemory: [],
    fourthWallMemory: {
      lastDay: -99,
      lastCategory: "",
      signatures: []
    }
  },
  argPortal: {
    schema: "wending.portal.v1",
    enabled: false,
    lastManifestDay: null,
    hooks: []
  },
  corporate: {
    employees: {
      stocker: 0,
      mechanic: 0,
      cleaner: 0,
      accountant: 0,
      lawyer: 0
    },
    supplierMode: "normal",
    securityContract: "none",
    substitutes: {},
    heat: 0,
    fines: 0,
    wagesPaid: 0,
    blackMarketSpend: 0,
    blackMarketScandals: 0,
    lastBlackMarketSupplier: null
  },
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
    expenses: 0,
    cleanDays: 0,
    breakdownFreeDays: 0,
    pressureDays: 0,
    lowHeatDays: 0,
    noSubstituteDays: 0,
    stationDrinkSales: 0,
    crisisProfitDays: 0
  },
  reports: [],
  reviews: [],
  reviewMemory: [],
  finalMachineCriticalDays: 0,
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
    corporate: 0,
    revenueByMachine: {},
    locationEvents: {},
    daily: []
  },
  cityFeed: [],
  pendingOperations: [],
  guidanceDismissed: {},
  freePlacementMachineId: null,
  log: ["Choose a machine type to start your vending route."]
};

const balance = {
  majorFaultBaseChance: 0.025,
  breakInBaseChance: 0.0015,
  freshSpoilChance: 0.32
};

const money = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});

const el = {
  startScreen: document.querySelector("#startScreen"),
  companyNameInput: document.querySelector("#companyNameInput"),
  companyName: document.querySelector("#companyName"),
  startupFinancing: document.querySelector("#startupFinancing"),
  startLoadSlots: document.querySelector("#startLoadSlots"),
  startImportSave: document.querySelector("#startImportSave"),
  startImportSaveFile: document.querySelector("#startImportSaveFile"),
  starterChoices: document.querySelector("#starterChoices"),
  cash: document.querySelector("#cash"),
  warehouseCount: document.querySelector("#warehouseCount"),
  day: document.querySelector("#day"),
  reputation: document.querySelector("#reputation"),
  dailyProfit: document.querySelector("#dailyProfit"),
  machines: document.querySelector("#machines"),
  financePanel: document.querySelector("#financePanel"),
  firstWeekGuidance: document.querySelector("#firstWeekGuidance"),
  reviewsPanel: document.querySelector("#reviewsPanel"),
  machineToBuy: document.querySelector("#machineToBuy"),
  contractPanel: document.querySelector("#contractPanel"),
  saveSlots: document.querySelector("#saveSlots"),
  exportSave: document.querySelector("#exportSave"),
  importSave: document.querySelector("#importSave"),
  importSaveFile: document.querySelector("#importSaveFile"),
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
  machineRename: document.querySelector("#machineRename"),
  machineCash: document.querySelector("#machineCash"),
  machineLocation: document.querySelector("#machineLocation"),
  locationProfile: document.querySelector("#locationProfile"),
  advisorPanel: document.querySelector("#advisorPanel"),
  expensePreview: document.querySelector("#expensePreview"),
  conditionBar: document.querySelector("#conditionBar"),
  cleanBar: document.querySelector("#cleanBar"),
  securityBar: document.querySelector("#securityBar"),
  upgrades: document.querySelector("#upgrades"),
  upgradeHint: document.querySelector("#upgradeHint"),
  products: document.querySelector("#products"),
  warehouse: document.querySelector("#warehouse"),
  autoRestock: document.querySelector("#autoRestock"),
  corporate: document.querySelector("#corporate"),
  cityFeed: document.querySelector("#cityFeed"),
  cityImpact: document.querySelector("#cityImpact"),
  stats: document.querySelector("#stats"),
  log: document.querySelector("#log"),
  buyMachine: document.querySelector("#buyMachine"),
  nextDay: document.querySelector("#nextDay"),
  collectCash: document.querySelector("#collectCash"),
  repair: document.querySelector("#repair"),
  clean: document.querySelector("#clean"),
  sellMachine: document.querySelector("#sellMachine"),
  gameOverOverlay: document.querySelector("#gameOverOverlay"),
  gameOverTitle: document.querySelector("#gameOverTitle"),
  gameOverReason: document.querySelector("#gameOverReason"),
  gameOverNew: document.querySelector("#gameOverNew"),
  gameOverLoad: document.querySelector("#gameOverLoad"),
  gameOverExport: document.querySelector("#gameOverExport"),
};

function currentMachine() {
  return state.machines.find((machine) => machine.id === state.selectedMachine) || state.machines[0];
}

function productById(id) {
  return products.find((product) => product.id === id);
}

function productDisplayName(productOrId) {
  const product = typeof productOrId === "string" ? productById(productOrId) : productOrId;
  return product?.displayName || product?.name || (typeof productOrId === "string" && productOrId ? productOrId : "Unknown product");
}

function productCategoryName(productOrId) {
  const product = typeof productOrId === "string" ? productById(productOrId) : productOrId;
  return product?.categoryName || product?.name || productDisplayName(product);
}

function locationById(id) {
  return locations[id] || locations.campus;
}

function competitionLocation(locationId) {
  state.competition ||= {};
  state.competition.locations ||= {};
  const pressure = state.competition.locations[locationId] ||= {
    level: 0,
    daysLeft: 0,
    companyId: null,
    takeoverRisk: 0,
    priceWar: null,
    blockedDays: 0,
    landlordDays: 0,
    interferenceDays: 0,
    protectedDays: 0,
    adBlitzDays: 0,
    scoutedDays: 0,
    smearDays: 0,
    supplierInterferenceDays: 0,
    securityIntimidationDays: 0
  };
  pressure.level = clamp(Number(pressure.level) || 0, 0, 6);
  pressure.daysLeft = Math.max(0, Math.round(Number(pressure.daysLeft) || 0));
  pressure.takeoverRisk = Math.max(0, Number(pressure.takeoverRisk) || 0);
  pressure.blockedDays = Math.max(0, Math.round(Number(pressure.blockedDays) || 0));
  pressure.landlordDays = Math.max(0, Math.round(Number(pressure.landlordDays) || 0));
  pressure.interferenceDays = Math.max(0, Math.round(Number(pressure.interferenceDays) || 0));
  pressure.protectedDays = Math.max(0, Math.round(Number(pressure.protectedDays) || 0));
  pressure.adBlitzDays = Math.max(0, Math.round(Number(pressure.adBlitzDays) || 0));
  pressure.scoutedDays = Math.max(0, Math.round(Number(pressure.scoutedDays) || 0));
  pressure.smearDays = Math.max(0, Math.round(Number(pressure.smearDays) || 0));
  pressure.supplierInterferenceDays = Math.max(0, Math.round(Number(pressure.supplierInterferenceDays) || 0));
  pressure.securityIntimidationDays = Math.max(0, Math.round(Number(pressure.securityIntimidationDays) || 0));
  return pressure;
}

function competitorById(id) {
  return state.competition?.companies?.find((company) => company.id === id) || state.competition?.companies?.[0] || competitorTemplates[0];
}

function normalizeCorporation(company, template = competitorTemplates[0]) {
  const source = { ...template, ...(company || {}) };
  const rep = clamp(Number(source.rep) || template.rep || 45, 0, 100);
  const hostility = clamp(Number(source.hostility) || template.hostility || 18, 0, 100);
  const marketShare = clamp(Number(source.marketShare) || template.marketShare || 12, 0, 100);
  return {
    ...source,
    id: sanitizeName(source.id, template.id, 32),
    label: sanitizeName(source.label || source.name, template.label, 42),
    name: sanitizeName(source.name || source.label, template.label, 42),
    rep,
    style: sanitizeName(source.style, template.style || "aggressive", 24),
    personality: sanitizeName(source.personality, template.personality || "predatory", 24),
    archetype: sanitizeName(source.archetype, template.archetype || "Vending corporation", 56),
    hostility,
    marketShare,
    tactics: Array.isArray(source.tactics) ? source.tactics.map((item) => sanitizeName(item, "", 24)).filter(Boolean).slice(0, 6) : [...(template.tactics || [])],
    weaknesses: Array.isArray(source.weaknesses) ? source.weaknesses.map((item) => sanitizeName(item, "", 24)).filter(Boolean).slice(0, 5) : [...(template.weaknesses || [])],
    resistances: Array.isArray(source.resistances) ? source.resistances.map((item) => sanitizeName(item, "", 24)).filter(Boolean).slice(0, 5) : [...(template.resistances || [])],
    status: sanitizeName(source.status, corporationStatusFromRep(rep), 24),
    color: sanitizeName(source.color, template.color || "#426f9d", 16)
  };
}

function corporationStatusFromRep(rep) {
  if (rep <= 5) return "collapsed";
  if (rep <= 14) return "retreating";
  if (rep <= 30) return "weakened";
  if (rep >= 76) return "entrenched";
  return "active";
}

function activeCorporations() {
  return (state.competition?.companies || []).filter((company) => !["collapsed", "merged"].includes(company.status));
}

function selectedCorporation() {
  state.world ||= {};
  const active = activeCorporations();
  if (!active.length) return state.competition?.companies?.[0] || competitorTemplates[0];
  if (!active.some((company) => company.id === state.world.targetCorporationId)) {
    state.world.targetCorporationId = active[0].id;
  }
  return active.find((company) => company.id === state.world.targetCorporationId) || active[0];
}

function effectiveCost(product) {
  if (!product) return 0;
  const modifier = state.supplyModifiers[product.id];
  const supplier = supplierModes[state.corporate?.supplierMode || "normal"] || supplierModes.normal;
  const substitute = state.corporate?.substitutes?.[product.id] ? 0.7 : 1;
  return Math.round(product.baseCost * (modifier ? modifier.multiplier : 1) * supplier.costFactor * substitute * worldSupplyFactor(product));
}

function priceDemandFactor(product, machine = currentMachine()) {
  if (!product) return 1;
  const ratio = product.basePrice / Math.max(50, product.price);
  const smart = machine?.upgrades?.smartPricing ? 0.78 : 1;
  const modifier = state.demandModifiers[product.id];
  const eventBoost = modifier ? modifier.multiplier : 1;
  const substitutePenalty = state.corporate?.substitutes?.[product.id] ? 0.86 : 1;
  return clamp(Math.pow(ratio, product.elasticity * smart) * eventBoost * priceWarFactor(product, machine) * substitutePenalty, 0.18, 2.35);
}

function priceWarFactor(product, machine = currentMachine()) {
  if (!machine) return 1;
  const pressure = competitionLocation(machine.location);
  const war = pressure.priceWar;
  if (!war || war.daysLeft <= 0 || war.type !== product.type) return 1;
  const overBase = Math.max(0, product.price / product.basePrice - 1);
  return clamp(1 - 0.32 * (pressure.level / 6) - overBase * 0.55, 0.38, 1);
}

function locationCompetitionFactor(machine) {
  const pressure = competitionLocation(machine.location);
  if (!pressure.level && !pressure.interferenceDays) return 1;
  const ownAdvantage = clamp((reputation() - competitorById(pressure.companyId)?.rep) / 100, -0.28, 0.22);
  const interference = pressure.interferenceDays > 0 ? 0.92 : 1;
  const protection = pressure.protectedDays > 0 ? 1.08 : 1;
  return clamp((1 - pressure.level * 0.045 + ownAdvantage) * interference * protection, 0.58, 1.18);
}

function locationSaturationFactor(machine) {
  const sameLocationType = state.machines.filter((item) => item.location === machine.location && item.type === machine.type).length;
  if (sameLocationType <= 1) return 1;
  const dominancePenalty = districtDominance(machine.location) > 0.5 ? 0.92 : 1;
  return clamp((1 - (sameLocationType - 1) * 0.15) * dominancePenalty, 0.48, 1);
}

function worldModifier() {
  return {
    machineCost: 1,
    upkeep: 1,
    demand: 1,
    theft: 1,
    audit: 0,
    loanInterest: 0,
    companyValue: 1,
    supplyByType: {},
    upkeepByType: {},
    locationUpkeep: {},
    locationDemand: {},
    securityByLocation: {},
    theftByLocation: {},
    cleanByLocation: {},
    ...(state.world?.modifiers || {})
  };
}

function worldSupplyFactor(product) {
  const modifier = worldModifier();
  return modifier.supplyByType?.[product.type] || 1;
}

function worldUpkeepFactor(machine) {
  const modifier = worldModifier();
  return (modifier.upkeep || 1) * (modifier.upkeepByType?.[machine.type] || 1);
}

function worldLocationDemandFactor(locationId) {
  const modifier = worldModifier();
  const lockdown = (state.world?.lockdowns?.[locationId] || 0) > 0 ? 0.46 : 1;
  return (modifier.demand || 1) * (modifier.locationDemand?.[locationId] || 1) * lockdown;
}

function worldLocationUpkeepFactor(locationId) {
  return worldModifier().locationUpkeep?.[locationId] || 1;
}

function worldTheftFactor() {
  return worldModifier().theft || 1;
}

function worldLocationTheftFactor(locationId) {
  return worldTheftFactor() * (worldModifier().theftByLocation?.[locationId] || 1);
}

function worldLocationCleanFactor(locationId) {
  return worldModifier().cleanByLocation?.[locationId] || 1;
}

function districtDominance(locationId) {
  if (!state.machines.length) return 0;
  return state.machines.filter((machine) => machine.location === locationId).length / state.machines.length;
}

function locationProductFactor(locationId, productId) {
  return locationProductSynergy[locationId]?.[productId] || 1;
}

function productMargin(product) {
  if (!product) return 0;
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
  return `${money.format(Math.round(Number(value) || 0))} ${currencyCode}`;
}

function sanitizeName(value, fallback = DEFAULT_COMPANY_NAME, maxLength = 42) {
  const clean = String(value || "").replace(/[<>"`]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
  return clean || fallback;
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function weightedPick(items, weightKey = "chance") {
  const total = items.reduce((sum, item) => sum + Math.max(0, Number(item[weightKey]) || 0), 0);
  if (total <= 0) return pick(items);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= Math.max(0, Number(item[weightKey]) || 0);
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

function safeStorageGet(storage, key) {
  try {
    return storage?.getItem(key) || "";
  } catch {
    return "";
  }
}

function safeStorageSet(storage, key, value) {
  try {
    storage?.setItem(key, value);
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function safeStorageNumber(storage, key, fallback = 0) {
  const value = Number(safeStorageGet(storage, key));
  return Number.isFinite(value) ? value : fallback;
}

function incrementLocalCounter(key) {
  const next = safeStorageNumber(window.localStorage, key, 0) + 1;
  safeStorageSet(window.localStorage, key, String(next));
  return next;
}

function createSessionAwareness() {
  const key = "wending-session-awareness-v1";
  const now = Date.now();
  let data = {};
  try {
    data = JSON.parse(safeStorageGet(window.sessionStorage, key) || "{}") || {};
  } catch {
    data = {};
  }
  const hadSession = Boolean(data.sessionStart);
  data = {
    sessionStart: Number(data.sessionStart) || now,
    lastActivityAt: Number(data.lastActivityAt) || now,
    focusLost: Math.max(0, Math.round(Number(data.focusLost) || 0)),
    focusReturns: Math.max(0, Math.round(Number(data.focusReturns) || 0)),
    longIdleCount: Math.max(0, Math.round(Number(data.longIdleCount) || 0)),
    maxIdleMs: Math.max(0, Math.round(Number(data.maxIdleMs) || 0)),
    saveCount: Math.max(0, Math.round(Number(data.saveCount) || 0)),
    loadCount: Math.max(0, Math.round(Number(data.loadCount) || 0)),
    importCount: Math.max(0, Math.round(Number(data.importCount) || 0)),
    sameDayRetries: Math.max(0, Math.round(Number(data.sameDayRetries) || 0)),
    lastLoadedDay: Math.max(0, Math.round(Number(data.lastLoadedDay) || 0)),
    routeReloads: Math.max(0, Math.round(Number(data.routeReloads) || 0)) + (hadSession ? 1 : 0),
    fullscreenChanges: Math.max(0, Math.round(Number(data.fullscreenChanges) || 0)),
    fourthWallShown: Boolean(data.fourthWallShown),
    lastFourthWallCategory: sanitizeName(data.lastFourthWallCategory, "", 32)
  };
  safeStorageSet(window.sessionStorage, key, JSON.stringify(data));
  incrementLocalCounter("wending-total-visits");
  return {
    key,
    data,
    save() {
      safeStorageSet(window.sessionStorage, key, JSON.stringify(this.data));
    },
    record(kind, detail = {}) {
      updateIdleTelemetry();
      if (kind === "save") this.data.saveCount += 1;
      if (kind === "load") {
        this.data.loadCount += 1;
        const day = Math.max(0, Math.round(Number(detail.day) || 0));
        if (day && this.data.lastLoadedDay === day) this.data.sameDayRetries += 1;
        if (day) this.data.lastLoadedDay = day;
      }
      if (kind === "import") this.data.importCount += 1;
      if (kind === "fullscreen") this.data.fullscreenChanges += 1;
      this.save();
    }
  };
}

const sessionAwareness = createSessionAwareness();

function updateIdleTelemetry() {
  const now = Date.now();
  const idleMs = now - (sessionAwareness.data.lastActivityAt || now);
  if (idleMs > 180000) sessionAwareness.data.longIdleCount += 1;
  sessionAwareness.data.maxIdleMs = Math.max(sessionAwareness.data.maxIdleMs || 0, idleMs);
  sessionAwareness.data.lastActivityAt = now;
  sessionAwareness.save();
}

function sessionMetrics() {
  const now = new Date();
  const hour = now.getHours();
  const width = window.innerWidth || 1024;
  const height = window.innerHeight || 768;
  const durationMs = Date.now() - (sessionAwareness.data.sessionStart || Date.now());
  const hourBucket = hour < 5 ? "late night" : hour < 9 ? "early morning" : hour < 18 ? "daytime" : "evening";
  return {
    durationMs,
    durationMinutes: Math.round(durationMs / 60000),
    hour,
    hourBucket,
    weekday: now.toLocaleDateString(undefined, { weekday: "long" }),
    time: `${hour}:${String(now.getMinutes()).padStart(2, "0")}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "your timezone",
    language: typeof navigator !== "undefined" && navigator.language ? navigator.language : "your browser language",
    viewport: width < 760 ? "compact" : width > 1400 ? "wide" : height < 620 ? "short" : "standard",
    focusLost: sessionAwareness.data.focusLost || 0,
    focusReturns: sessionAwareness.data.focusReturns || 0,
    longIdleCount: sessionAwareness.data.longIdleCount || 0,
    maxIdleMinutes: Math.round((sessionAwareness.data.maxIdleMs || 0) / 60000),
    saveLoadCount: (sessionAwareness.data.saveCount || 0) + (sessionAwareness.data.loadCount || 0) + (sessionAwareness.data.importCount || 0),
    loads: sessionAwareness.data.loadCount || 0,
    imports: sessionAwareness.data.importCount || 0,
    saves: sessionAwareness.data.saveCount || 0,
    routeReloads: sessionAwareness.data.routeReloads || 0,
    sameDayRetries: sessionAwareness.data.sameDayRetries || 0,
    fullscreenChanges: sessionAwareness.data.fullscreenChanges || 0,
    totalVisits: safeStorageNumber(window.localStorage, "wending-total-visits", 0),
    gameOvers: safeStorageNumber(window.localStorage, "wending-game-overs", 0)
  };
}

function addLog(message) {
  state.log.unshift(`Day ${state.day}: ${message}`);
  state.log = state.log.slice(0, 14);
}

function defaultOperatorProfile() {
  return JSON.parse(JSON.stringify(DEFAULT_OPERATOR_PROFILE));
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
  const contract = securityContracts[state.corporate?.securityContract || "none"] || securityContracts.none;
  const citySecurity = worldModifier().securityByLocation?.[machine.location] || 0;
  return clamp(location.security + citySecurity + (machine.upgrades?.camera || 0) * 10 + contract.security, 0, 98);
}

function normalizeMachineUpgrades(machine) {
  machine.upgrades = { ...defaultUpgradeLevels, ...(machine.upgrades || {}) };
  Object.entries(upgradeDefs).forEach(([id, upgrade]) => {
    machine.upgrades[id] = clamp(Math.round(Number(machine.upgrades[id]) || 0), 0, upgrade.max);
  });
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

function getReviewableMachines() {
  return (state.machines || []).filter((machine) => machine && machineTypes[machine.type] && !machine.destroyed);
}

function getCompatibleReviewProducts(machine) {
  if (!machine || !machineTypes[machine.type]) return [];
  const compatible = productsForType(machine.type);
  const stockedIds = Object.keys(machine.stock || {}).filter((id) => (machine.stock[id] || 0) > 0);
  const stockedCompatible = stockedIds.map(productById).filter((product) => product && product.type === machine.type);
  return stockedCompatible.length ? stockedCompatible : compatible;
}

function getMachineReviewCategory(machine) {
  const type = machine?.type || "snack";
  const labels = {
    snack: { singular: "snack", plural: "snacks", stock: "chips, chocolate, and salty things" },
    drink: { singular: "drink", plural: "drinks", stock: "water, cola, and energy drinks" },
    coffee: { singular: "coffee", plural: "hot drinks", stock: "espresso, latte, and warm caffeine" },
    fresh: { singular: "meal", plural: "fresh food", stock: "sandwiches, salads, and lunch rectangles" },
    alcohol: { singular: "licensed can", plural: "alcohol", stock: "beer, canned wine, and hard seltzer" }
  };
  return labels[type] || labels.snack;
}

function sampleReviewProduct(machine) {
  const compatible = getCompatibleReviewProducts(machine);
  return compatible.length ? productDisplayName(pick(compatible)) : getMachineReviewCategory(machine).singular;
}

function makeStock(type, filled) {
  const stock = {};
  productsForType(type).forEach((product, index) => {
    stock[product.id] = filled ? (index === 0 ? 7 : 5) : 0;
  });
  return stock;
}

function ensureMachineHistory(machine) {
  machine.history ||= {};
  machine.history.daysActive = Math.max(0, Math.round(Number(machine.history.daysActive) || 0));
  machine.history.lifetimeSales = Math.max(0, Math.round(Number(machine.history.lifetimeSales) || 0));
  machine.history.quirks = Array.isArray(machine.history.quirks)
    ? machine.history.quirks.filter((id) => machineQuirkDefs.some((quirk) => quirk.id === id)).slice(0, 4)
    : [];
  machine.history.incidents = Array.isArray(machine.history.incidents)
    ? machine.history.incidents.map((text) => sanitizeName(text, "", 96)).filter(Boolean).slice(0, 6)
    : [];
  return machine.history;
}

function trimMachineStockToCapacity(machine) {
  let overflow = machineStockTotal(machine) - machineCapacity(machine);
  if (overflow <= 0) return;
  const ids = Object.keys(machine.stock).sort((a, b) => (machine.stock[b] || 0) - (machine.stock[a] || 0));
  for (const id of ids) {
    if (overflow <= 0) break;
    const removed = Math.min(machine.stock[id] || 0, overflow);
    machine.stock[id] -= removed;
    overflow -= removed;
  }
}

function addMachineIncident(machine, text) {
  const history = ensureMachineHistory(machine);
  history.incidents.unshift(sanitizeName(text, "Incident filed without useful detail.", 96));
  history.incidents = history.incidents.slice(0, 6);
}

function machineQuirkFactor(machine, key) {
  const history = ensureMachineHistory(machine);
  return history.quirks.reduce((factor, id) => {
    const quirk = machineQuirkDefs.find((item) => item.id === id);
    return factor * (Number(quirk?.[key]) || 1);
  }, 1);
}

function rollMachineQuirk(machine, events) {
  const history = ensureMachineHistory(machine);
  if (history.quirks.length >= 3 || history.daysActive < 4) return;
  const candidates = machineQuirkDefs.filter((quirk) => history.daysActive >= quirk.minDays && !history.quirks.includes(quirk.id));
  if (candidates.length === 0 || Math.random() >= 0.055) return;
  const quirk = pick(candidates);
  history.quirks.push(quirk.id);
  if (quirk.audit) state.corporate.heat = clamp((state.corporate.heat || 0) + quirk.audit, 0, 100);
  events.push(`${machine.name} developed a quirk: ${quirk.label}. ${quirk.text}`);
  addMachineIncident(machine, `Quirk acquired: ${quirk.label}.`);
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
    upgrades: { ...defaultUpgradeLevels },
    history: {
      daysActive: 0,
      lifetimeSales: 0,
      quirks: [],
      incidents: []
    }
  };
  if (freeStarter) {
    Object.entries(machine.stock).forEach(([productId, amount]) => addBatch(machine, productId, amount));
  }
  return machine;
}

function selectedStartupFinancing() {
  return startupFinancingOptions[state.startupFinancingId] || startupFinancingOptions[STARTUP_FINANCING_DEFAULT];
}

function resetNewGameState(option) {
  state.cash = option.cash;
  state.finance = {
    ...financeDefaults,
    debt: option.debt,
    principal: option.debt,
    interestRate: option.interestRate
  };
  state.contracts = {};
  state.day = 1;
  state.brandBuzz = 48;
  state.lastProfit = 0;
  state.machines = [];
  state.selectedMachine = null;
  state.started = false;
  state.gameOver = null;
  state.warehouse = products.reduce((stock, product) => ({ ...stock, [product.id]: 0 }), {});
  state.warehouseBatches = {};
  state.autoRestock = {};
  state.supplyModifiers = {};
  state.demandModifiers = {};
  state.competition = { companies: competitorTemplates.map((company) => normalizeCorporation(company, company)), locations: {} };
  state.world = { eventChains: {}, reactionMemory: [], modifiers: {}, modifierDays: {}, lockdowns: {}, warfareCooldowns: {}, hostility: 0, crisisDays: 0, eventCooldowns: {}, corporateEffects: [], targetCorporationId: competitorTemplates[0].id, choiceSignals: {}, diplomacyCooldown: 0, pressCooldown: 0, lastDiplomacyDay: 0, lastPressDay: 0, lastCorporateAttackDay: 0, lastInfightingDay: 0, lastDiplomacyPrompt: "", lastPressPrompt: "", pressTone: "unfiled", milestoneMemory: {}, digestMemory: [], fourthWallMemory: { lastDay: -99, lastCategory: "", signatures: [] } };
  state.corporate = {
    employees: { stocker: 0, mechanic: 0, cleaner: 0, accountant: 0, lawyer: 0 },
    supplierMode: "normal",
    securityContract: "none",
    substitutes: {},
    heat: 0,
    fines: 0,
    wagesPaid: 0,
    blackMarketSpend: 0,
    blackMarketScandals: 0,
    lastBlackMarketSupplier: null
  };
  state.stats = { restockByProduct: {}, maintenance: 0, cleaning: 0, security: 0, corporate: 0, revenueByMachine: {}, locationEvents: {}, daily: [] };
  state.weekly = { number: 1, goal: null, profit: 0, sales: 0, soldByType: {}, revenue: 0, expenses: 0, cleanDays: 0, breakdownFreeDays: 0, pressureDays: 0, lowHeatDays: 0, noSubstituteDays: 0, stationDrinkSales: 0, crisisProfitDays: 0 };
  state.reports = [];
  state.reviews = [];
  state.reviewMemory = [];
  state.finalMachineCriticalDays = 0;
  state.cityFeed = [];
  state.pendingOperations = [];
  state.guidanceDismissed = {};
  state.freePlacementMachineId = null;
  state.operatorProfile = defaultOperatorProfile();
}

function starterMachineCost(type) {
  return machineTypes[type]?.buyCost || 0;
}

function starterEligibility(type, option = selectedStartupFinancing()) {
  if (type === "alcohol") return { ok: false, reason: "Requires Alcohol Retail License after the route proves it can behave." };
  const cost = starterMachineCost(type);
  const postPurchaseCash = option.cash - cost;
  const minimumBuffer = Math.max(3600, option.stockKit * 220);
  if (postPurchaseCash < minimumBuffer) return { ok: false, reason: `Needs ${formatMoney(cost + minimumBuffer)} startup cash.` };
  return { ok: true, reason: `${formatMoney(postPurchaseCash)} after machine purchase.` };
}

function applyStarterStock(machine, option) {
  const compatible = productsForType(machine.type);
  const loaded = distributeStarterKit(option.stockKit, compatible.length, machineCapacity(machine));
  const warehouse = distributeStarterKit(option.warehouseKit, compatible.length, 99);
  compatible.forEach((product, index) => {
    const amount = loaded[index] || 0;
    machine.stock[product.id] = amount;
    if (amount > 0) addBatch(machine, product.id, amount);
    const warehouseAmount = warehouse[index] || 0;
    if (warehouseAmount > 0) {
      state.warehouse[product.id] = (state.warehouse[product.id] || 0) + warehouseAmount;
      addWarehouseBatch(product.id, warehouseAmount);
    }
  });
}

function distributeStarterKit(total, slots, capacity) {
  const safeTotal = Math.min(Math.max(0, Math.round(Number(total) || 0)), capacity);
  if (slots <= 0 || safeTotal <= 0) return [];
  const base = Math.floor(safeTotal / slots);
  let remainder = safeTotal % slots;
  return Array.from({ length: slots }, () => {
    const amount = base + (remainder > 0 ? 1 : 0);
    remainder -= 1;
    return amount;
  });
}

function startGame(type) {
  const option = selectedStartupFinancing();
  const eligibility = starterEligibility(type, option);
  if (!eligibility.ok) {
    addLog(`Startup denied: ${eligibility.reason}`);
    render();
    return;
  }
  resetNewGameState(option);
  const machine = makeMachine(type, false);
  state.companyName = sanitizeName(el.companyNameInput?.value, DEFAULT_COMPANY_NAME);
  machine.name = sanitizeName(machine.name, machineTypes[type].starter);
  state.cash -= starterMachineCost(type);
  applyStarterStock(machine, option);
  state.machines = [machine];
  state.selectedMachine = machine.id;
  state.started = true;
  state.freePlacementMachineId = machine.id;
  state.startupFinancingId = Object.entries(startupFinancingOptions).find(([, item]) => item === option)?.[0] || STARTUP_FINANCING_DEFAULT;
  const foundingContract = machineProgression[type]?.contract;
  if (foundingContract) state.contracts[foundingContract] = { acquiredDay: state.day, founding: true };
  state.weekly.goal = pick(weeklyGoals);
  state.log = [`Day 1: ${state.companyName} buys ${machine.name} using ${option.label}. Startup principal: ${formatMoney(loanPrincipal())} at ${Math.round(state.finance.interestRate * 1000) / 10}%. Starter stock kit installed.`];
  addCityHeadline(makeCityHeadline("startup", { machine }));
  el.startScreen.classList.add("hidden");
  render();
}

function render() {
  renderStartupFinancing();
  renderStarterChoices();
  renderStartLoadSlots();
  renderBuyOptions();
  renderLocationOptions();
  renderSaveSlots();
  renderWeeklyGoal();
  renderFinancePanel();
  renderFirstWeekGuidance();
  renderReviewsPanel();
  renderGameOverOverlay();

  const machine = currentMachine();
  el.cash.textContent = formatMoney(state.cash);
  el.warehouseCount.textContent = `${stockCount()} pcs`;
  el.day.textContent = state.day;
  el.reputation.textContent = `${reputation()}%`;
  el.dailyProfit.textContent = formatMoney(state.lastProfit);

  if (!machine) {
    renderLog();
    setBusy(state.runningDay || Boolean(state.gameOver));
    return;
  }

  const type = machineTypes[machine.type];
  el.machineType.textContent = type.label;
  el.companyName.textContent = sanitizeName(state.companyName, DEFAULT_COMPANY_NAME);
  el.machineName.textContent = safeMachineName(machine);
  el.machineSign.textContent = safeMachineName(machine);
  el.machineRename.value = safeMachineName(machine);
  el.machineCash.textContent = formatMoney(machine.cash);
  if (el.sellMachine) {
    el.sellMachine.textContent = `Sell ${formatMoney(resaleValue(machine))}`;
    el.sellMachine.disabled = state.runningDay || state.machines.length <= 1 || Boolean(state.gameOver);
    el.sellMachine.title = state.machines.length <= 1 ? "Route continuity requires at least one machine." : "Sell selected machine for depreciated resale value.";
  }
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
  renderContracts();
  renderLocationProfile(machine);
  renderAdvisor(machine);
  renderExpensePreview();
  renderMachineProducts(machine);
  renderProductWindows(machine);
  renderUpgrades(machine);
  renderWarehouse();
  renderAutoRestock();
  renderCorporate();
  renderStats();
  renderCityFeed();
  renderCityImpact();
  renderLog();
  setBusy(state.runningDay || Boolean(state.gameOver));
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

function safeMachineName(machine) {
  const fallback = machineTypes[machine?.type]?.starter || "Unnamed machine";
  return sanitizeName(machine?.name, fallback);
}

function meterColor(value) {
  if (value < 35) return "#d05f45";
  if (value < 65) return "#e6b84c";
  return "#4f9d78";
}

function renderStarterChoices() {
  if (state.started) return;
  el.starterChoices.innerHTML = "";
  const financing = selectedStartupFinancing();
  Object.entries(machineTypes).forEach(([type, info]) => {
    const eligibility = starterEligibility(type, financing);
    const card = document.createElement("button");
    card.className = "starter-card";
    card.disabled = !eligibility.ok;
    card.innerHTML = `
      <span class="mini-machine ${type}"></span>
      <strong>${info.label}</strong>
      <span>Purchase cost: ${formatMoney(starterMachineCost(type))}</span>
      <span>Capacity: ${info.capacity} pcs</span>
      <span>Daily upkeep: ${formatMoney(info.upkeep)}</span>
      <span>${eligibility.ok ? eligibility.reason : eligibility.reason}</span>
    `;
    card.addEventListener("click", () => startGame(type));
    el.starterChoices.append(card);
  });
}

function renderStartupFinancing() {
  if (!el.startupFinancing || state.started) return;
  el.startupFinancing.innerHTML = "";
  Object.entries(startupFinancingOptions).forEach(([id, option]) => {
    const button = document.createElement("button");
    button.className = `financing-card ${state.startupFinancingId === id ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <strong>${option.label}</strong>
      <span>Cash ${formatMoney(option.cash)} - Debt ${formatMoney(option.debt)}</span>
      <span>Interest ${Math.round(option.interestRate * 1000) / 10}% - stock kit ${option.stockKit} loaded / ${option.warehouseKit} warehouse</span>
      <small>${option.text}</small>
    `;
    button.addEventListener("click", () => {
      state.startupFinancingId = id;
      render();
    });
    el.startupFinancing.append(button);
  });
}

function renderBuyOptions() {
  el.machineToBuy.innerHTML = "";
  Object.entries(machineTypes).forEach(([type, info]) => {
    const eligibility = machinePurchaseEligibility(type);
    const option = document.createElement("option");
    option.value = type;
    option.disabled = !eligibility.ok;
    option.textContent = `${info.label} - ${formatMoney(effectiveMachineBuyCost(type))}${eligibility.ok ? "" : " - locked"}`;
    el.machineToBuy.append(option);
  });
}

function renderFinancePanel() {
  if (!el.financePanel) return;
  const debt = loanPrincipal();
  const interest = estimateLoanInterest();
  const standing = financialStanding();
  const pressure = debtPressureRatio();
  const legalReserve = estimateLegalExpenseReserve();
  const legalEffects = corporatePressureGameplayEffects();
  el.financePanel.innerHTML = `
    <div>
      <p class="eyebrow">Finance desk <button class="help-button small" data-help="finance" aria-label="Finance help">?</button></p>
      <h2>${debt > 0 ? `${formatMoney(debt)} principal outstanding` : "No active debt"}</h2>
      <span>${Math.round((state.finance?.interestRate || financeDefaults.interestRate) * 1000) / 10}% blended annual rate. Next interest estimate: ${formatMoney(interest)}. Debt pressure: ${Math.round(pressure * 100)}%. Standing: ${standing.label}.</span>
    </div>
    <div class="finance-actions">
      <button data-repay="5000" ${debt <= 0 || state.cash <= 0 || state.runningDay || state.gameOver ? "disabled" : ""}>Repay ${formatMoney(Math.min(5000, debt, Math.max(0, state.cash)))}</button>
      <button data-repay="15000" ${debt <= 0 || state.cash <= 0 || state.runningDay || state.gameOver ? "disabled" : ""}>Repay ${formatMoney(Math.min(15000, debt, Math.max(0, state.cash)))}</button>
      <button data-repay="max" ${debt <= 0 || state.cash <= 0 || state.runningDay || state.gameOver ? "disabled" : ""}>Repay max</button>
      <input class="repay-input" type="number" min="0" step="1000" placeholder="Custom" data-repay-custom>
      <button data-repay-submit ${debt <= 0 || state.cash <= 0 || state.runningDay || state.gameOver ? "disabled" : ""}>Repay custom</button>
    </div>
    <div class="legal-expense-box">
      <strong>Legal expenses</strong>
      <span>Projected reserve: ${formatMoney(legalReserve)}. Fines paid: ${formatMoney(state.corporate?.fines || 0)}.</span>
      <small>Current pressure adds audit chance +${Math.round(legalEffects.auditChanceBonus * 1000) / 10}% and takeover risk +${legalEffects.takeoverBonus}%. Legal Counsel reduces actual event costs.</small>
    </div>
    <div class="loan-offers">
      ${Object.entries(loanOffers).map(([id, offer]) => {
        const status = loanEligibility(id);
        return `
          <div class="loan-card ${status.ok ? "" : "locked"}">
            <strong>${offer.label}</strong>
            <span>${formatMoney(offer.amount)} cash - ${Math.round(offer.interestRate * 1000) / 10}% rate</span>
            <small>${offer.text}</small>
            <small>${status.ok ? "Eligible. Principal increases immediately; interest is paid daily and does not reduce principal." : status.reason}</small>
            <button data-take-loan="${id}" ${!status.ok || state.runningDay || state.gameOver ? "disabled" : ""}>Take loan</button>
          </div>
        `;
      }).join("")}
    </div>
  `;
  el.financePanel.querySelectorAll("[data-repay]").forEach((button) => {
    button.addEventListener("click", () => repayLoan(button.dataset.repay));
  });
  el.financePanel.querySelector("[data-repay-submit]")?.addEventListener("click", () => {
    repayLoan(el.financePanel.querySelector("[data-repay-custom]")?.value || "0");
  });
  el.financePanel.querySelectorAll("[data-take-loan]").forEach((button) => {
    button.addEventListener("click", () => takeLoan(button.dataset.takeLoan));
  });
  bindHelpButtons(el.financePanel);
}

function renderReviewsPanel() {
  if (!el.reviewsPanel) return;
  const reviews = Array.isArray(state.reviews) ? state.reviews.slice(0, 3) : [];
  el.reviewsPanel.innerHTML = `
    <div class="mini-heading">
      <span>Customer reviews</span>
      <button class="help-button small" data-help="reviews" aria-label="Customer reviews help">?</button>
      <small>Recent public sentiment generated from route behavior, machine state, pricing, stock, and pressure.</small>
    </div>
    <div class="review-list">
      ${reviews.length ? reviews.map((review) => `
        <article class="review-card rating-${review.rating}">
          <div>
            <strong>${reviewStars(review.rating)}</strong>
            <span>Day ${review.day} - ${sanitizeName(review.machineName, "Anonymous machine", 42)}</span>
          </div>
          <p>${review.text}</p>
          ${review.tags?.length ? `<small>${review.tags.slice(0, 3).join(" / ")}</small>` : ""}
        </article>
      `).join("") : "<p class=\"empty-note\">No reviews yet. The public is conserving judgement.</p>"}
    </div>
  `;
  bindHelpButtons(el.reviewsPanel);
}

function reviewStars(rating) {
  const safeRating = clamp(Math.round(Number(rating) || 3), 1, 5);
  return Array.from({ length: 5 }, (_, index) => index < safeRating ? "&#9733;" : "&#9734;").join("");
}

function renderContracts() {
  if (!el.contractPanel) return;
  const rows = Object.entries(contractDefs).map(([id, contract]) => {
    const status = contractEligibility(id);
    const note = contractWorldNote(id, contract);
    return `
      <div class="contract-row ${state.contracts?.[id] ? "active" : ""}">
        <div>
          <strong>${contract.label}</strong>
          <span>${contract.text}</span>
          <small>${state.contracts?.[id] ? `Licensed. ${note}` : `${status.reason} ${note}`}</small>
        </div>
        <button data-contract="${id}" ${state.contracts?.[id] || !status.ok || state.runningDay ? "disabled" : ""}>${state.contracts?.[id] ? "Active" : formatMoney(contract.cost)}</button>
      </div>
    `;
  }).join("");
  el.contractPanel.innerHTML = `
    <div class="mini-heading">
      <span>Contracts</span>
      <small>Licenses unlock categories, with overhead.</small>
    </div>
    ${rows}
  `;
  el.contractPanel.querySelectorAll("[data-contract]").forEach((button) => {
    button.addEventListener("click", () => buyContract(button.dataset.contract));
  });
}

function contractWorldNote(id, contract) {
  const profile = ensureOperatorProfile();
  if (profile.identityPath?.id === "ethicalRoute") return "Clean operators receive fewer suspicious glances.";
  if (profile.identityPath?.id === "undergroundChain") return "Your supplier history makes this paperwork stare back.";
  if (profile.behaviorTags?.includes("ROUTE_DOMINANCE")) return "Large routes make licensors more attentive.";
  if ((state.corporate?.heat || 0) > 45) return "Audit heat may make all permits feel heavier.";
  return `${contract.label.split(" ")[0]} paperwork remains commercially survivable.`;
}

function renderSaveSlots() {
  el.saveSlots.innerHTML = "";
  for (let slot = 1; slot <= 3; slot += 1) {
    const save = readSave(slot);
    const card = document.createElement("div");
    card.className = "save-slot";
    const saveCompany = save ? sanitizeName(save.state?.companyName, DEFAULT_COMPANY_NAME) : "";
    const saveDay = save ? Math.max(1, Math.round(Number(save.state?.day) || 1)) : 1;
    const saveCash = save ? Number(save.state?.cash) || 0 : 0;
    card.innerHTML = `
      <div>
        <strong>Slot ${slot}</strong>
        <span>${save ? `${saveCompany} - Day ${saveDay} - ${formatMoney(saveCash)}` : "Empty slot"}</span>
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

function renderStartLoadSlots() {
  if (!el.startLoadSlots) return;
  el.startLoadSlots.innerHTML = "";
  for (let slot = 1; slot <= 3; slot += 1) {
    const save = readSave(slot);
    const card = document.createElement("div");
    card.className = "save-slot";
    const saveCompany = save ? sanitizeName(save.state?.companyName, DEFAULT_COMPANY_NAME) : "";
    const saveDay = save ? Math.max(1, Math.round(Number(save.state?.day) || 1)) : 1;
    const saveCash = save ? Number(save.state?.cash) || 0 : 0;
    card.innerHTML = `
      <div>
        <strong>Slot ${slot}</strong>
        <span>${save ? `${saveCompany} - Day ${saveDay} - ${formatMoney(saveCash)}` : "Empty slot"}</span>
      </div>
    `;
    const loadButton = document.createElement("button");
    loadButton.textContent = "Load";
    loadButton.disabled = !save || state.runningDay;
    loadButton.addEventListener("click", () => loadGame(slot));
    card.append(loadButton);
    el.startLoadSlots.append(card);
  }
}

function renameCurrentMachine(rawName) {
  const machine = currentMachine();
  if (!machine) return;
  machine.name = sanitizeName(rawName, machineTypes[machine.type]?.starter || "Unnamed machine");
  addLog(`Machine renamed to ${machine.name}. Branding assures us this matters.`);
  render();
}

function exportCurrentSave() {
  const payload = createSavePayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeName(state.companyName, DEFAULT_COMPANY_NAME, 28).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "wending-save"}-day-${state.day}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  addLog("Exported JSON save. Compliance describes this as portable anxiety.");
  render();
}

function importSaveFile(file, input = el.importSaveFile) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = normalizeSavePayload(JSON.parse(String(reader.result || "")));
      if (!payload?.state) throw new Error("Invalid save payload");
      sessionAwareness.record("import", { day: payload.state?.day });
      applySavePayload(payload);
      addLog(`Imported JSON save version ${payload.saveVersion}. Older paperwork was stamped where needed.`);
      const fourthWall = maybeFourthWallMoment("import");
      if (fourthWall) addLog(fourthWall.text);
      render();
    } catch {
      addLog("Import failed gracefully. The JSON did not survive due diligence.");
      render();
    } finally {
      if (input) input.value = "";
    }
  });
  reader.addEventListener("error", () => {
    addLog("Import failed gracefully. The file refused to testify.");
    if (input) input.value = "";
    render();
  });
  reader.readAsText(file);
}

function renderWeeklyGoal() {
  const goal = state.weekly.goal;
  const progress = goal ? weeklyGoalProgress(goal) : { label: "Start a route", pct: 0 };
  document.querySelector("#weeklyGoal").innerHTML = `
    <div>
      <p class="eyebrow">Weekly goal <button class="help-button small" data-help="weekly" aria-label="Weekly goal help">?</button></p>
      <h2>${goal ? goal.text : "Choose a machine to receive your first goal"}</h2>
    </div>
    <div class="goal-progress">
      <span>${progress.label}</span>
      <div class="bar-track"><i style="width: ${progress.pct}%"></i></div>
      <strong>${goal ? `Reward ${formatMoney(goal.reward)}` : ""}</strong>
    </div>
  `;
  bindHelpButtons(document.querySelector("#weeklyGoal"));
}

function renderFirstWeekGuidance() {
  if (!el.firstWeekGuidance) return;
  const note = firstWeekGuidance[state.day];
  const dismissed = Boolean(state.guidanceDismissed?.[state.day]);
  if (!state.started || !note || dismissed) {
    el.firstWeekGuidance.classList.add("hidden");
    el.firstWeekGuidance.innerHTML = "";
    return;
  }
  el.firstWeekGuidance.classList.remove("hidden");
  el.firstWeekGuidance.innerHTML = `
    <div>
      <p class="eyebrow">Operator guidance</p>
      <h2>${note.title}</h2>
      <span>${note.text}</span>
    </div>
    <button id="dismissGuidance" aria-label="Dismiss first week guidance">Dismiss</button>
  `;
  el.firstWeekGuidance.querySelector("#dismissGuidance")?.addEventListener("click", () => {
    state.guidanceDismissed ||= {};
    state.guidanceDismissed[state.day] = true;
    render();
  });
}

function weeklyGoalProgress(goal) {
  if (goal.type === "profit") return { label: `${formatMoney(state.weekly.profit)} / ${formatMoney(goal.target)}`, pct: clamp((state.weekly.profit / goal.target) * 100, 0, 100) };
  if (goal.type === "reputation") return { label: `${reputation()}% / ${goal.target}%`, pct: clamp((reputation() / goal.target) * 100, 0, 100) };
  if (goal.type === "sales") return { label: `${state.weekly.sales} / ${goal.target} sold`, pct: clamp((state.weekly.sales / goal.target) * 100, 0, 100) };
  if (goal.type === "cleanDays") return { label: `${state.weekly.cleanDays || 0} / ${goal.target} clean days`, pct: clamp(((state.weekly.cleanDays || 0) / goal.target) * 100, 0, 100) };
  if (goal.type === "breakdownFree") return { label: `${state.weekly.breakdownFreeDays || 0} / ${goal.target} stable days`, pct: clamp(((state.weekly.breakdownFreeDays || 0) / goal.target) * 100, 0, 100) };
  if (goal.type === "pressureSurvival") return { label: `${state.weekly.pressureDays || 0} / ${goal.target} pressure days`, pct: clamp(((state.weekly.pressureDays || 0) / goal.target) * 100, 0, 100) };
  if (goal.type === "lowHeatDays") return { label: `${state.weekly.lowHeatDays || 0} / ${goal.target} low-heat days`, pct: clamp(((state.weekly.lowHeatDays || 0) / goal.target) * 100, 0, 100) };
  if (goal.type === "noSubstituteDays") return { label: `${state.weekly.noSubstituteDays || 0} / ${goal.target} clean ingredient days`, pct: clamp(((state.weekly.noSubstituteDays || 0) / goal.target) * 100, 0, 100) };
  if (goal.type === "stationDrinks") return { label: `${state.weekly.stationDrinkSales || 0} / ${goal.target} station drinks`, pct: clamp(((state.weekly.stationDrinkSales || 0) / goal.target) * 100, 0, 100) };
  const sold = state.weekly.soldByType[goal.type] || 0;
  return { label: `${sold} / ${goal.target} ${goal.type}`, pct: clamp((sold / goal.target) * 100, 0, 100) };
}

function readSave(slot) {
  try {
    return normalizeSavePayload(JSON.parse(localStorage.getItem(`wending-save-${slot}`)));
  } catch {
    return null;
  }
}

function createSavePayload() {
  updateOperatorProfile();
  state.argPortal ||= {};
  state.argPortal.lastManifestDay = state.day;
  const payload = {
    saveVersion: SAVE_VERSION,
    savedAt: Date.now(),
    state: JSON.parse(JSON.stringify(state)),
    prices: products.reduce((prices, product) => {
      prices[product.id] = product.price;
      return prices;
    }, {})
  };
  payload.state.companyName = sanitizeName(payload.state.companyName, DEFAULT_COMPANY_NAME);
  payload.state.operatorProfile = normalizeOperatorProfile(payload.state.operatorProfile);
  payload.argPortal = buildArgPortalManifest(payload.state);
  payload.exportSummary = {
    companyName: payload.argPortal.companyName,
    machineNames: payload.argPortal.machineNames,
    operatorProfile: payload.argPortal.operatorProfile,
    archetypeTags: payload.argPortal.archetypeTags
  };
  return payload;
}

function saveGame(slot) {
  const payload = createSavePayload();
  localStorage.setItem(`wending-save-${slot}`, JSON.stringify(payload));
  sessionAwareness.record("save", { day: state.day });
  addLog(`Saved route to slot ${slot}.`);
  const fourthWall = maybeFourthWallMoment("save");
  if (fourthWall) addLog(fourthWall.text);
  render();
}

function loadGame(slot) {
  const save = readSave(slot);
  if (!save?.state) {
    addLog(`Slot ${slot} could not be loaded. The file cabinet denied all knowledge.`);
    render();
    return;
  }
  sessionAwareness.record("load", { day: save.state?.day });
  applySavePayload(save);
  addLog(`Loaded route from slot ${slot}.`);
  const fourthWall = maybeFourthWallMoment("load");
  if (fourthWall) addLog(fourthWall.text);
  render();
}

function applySavePayload(save) {
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, save.state);
  normalizeLoadedState();
  products.forEach((product) => {
    const importedPrice = Number(save.prices?.[product.id]);
    product.price = clamp(
      Math.round(Number.isFinite(importedPrice) ? importedPrice : product.basePrice),
      Math.round(product.basePrice * 0.45),
      Math.round(product.basePrice * 2.8)
    );
  });
  el.startScreen.classList.toggle("hidden", state.started);
}

function normalizeLoadedState() {
  state.cash = Number.isFinite(Number(state.cash)) ? Number(state.cash) : 58000;
  state.finance = { ...financeDefaults, ...(state.finance || {}) };
  const migratedDebt = Math.max(0, Number(state.finance.principal ?? state.finance.debt) || 0);
  state.finance.principal = migratedDebt;
  state.finance.debt = migratedDebt;
  state.finance.interestRate = clamp(Number(state.finance.interestRate) || financeDefaults.interestRate, 0.035, 0.12);
  state.finance.totalInterestPaid = Math.max(0, Number(state.finance.totalInterestPaid) || 0);
  state.finance.totalRepaid = Math.max(0, Number(state.finance.totalRepaid) || 0);
  state.finance.emergencyLoans = Math.max(0, Math.round(Number(state.finance.emergencyLoans) || 0));
  state.finance.loansTaken = Math.max(0, Math.round(Number(state.finance.loansTaken) || 0));
  state.finance.lastPrincipalPayment = Math.max(0, Math.round(Number(state.finance.lastPrincipalPayment) || 0));
  setLoanPrincipal(state.finance.principal);
  state.contracts = state.contracts && typeof state.contracts === "object" && !Array.isArray(state.contracts) ? state.contracts : {};
  state.day = Math.max(1, Math.round(Number(state.day) || 1));
  state.started = Boolean(state.started);
  state.runningDay = false;
  state.gameOver = normalizeGameOver(state.gameOver);
  state.companyName = sanitizeName(state.companyName, DEFAULT_COMPANY_NAME);
  state.startupFinancingId = startupFinancingOptions[state.startupFinancingId] ? state.startupFinancingId : STARTUP_FINANCING_DEFAULT;
  state.operatorProfile = normalizeOperatorProfile(state.operatorProfile);
  state.cityFeed = Array.isArray(state.cityFeed) ? state.cityFeed.slice(0, 16) : [];
  state.pendingOperations = Array.isArray(state.pendingOperations) ? state.pendingOperations.map((item) => sanitizeName(item, "", 140)).filter(Boolean).slice(0, 8) : [];
  state.guidanceDismissed = state.guidanceDismissed && typeof state.guidanceDismissed === "object" && !Array.isArray(state.guidanceDismissed) ? state.guidanceDismissed : {};
  state.warehouse = { ...products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {}), ...(state.warehouse || {}) };
  products.forEach((product) => {
    state.warehouse[product.id] = Math.max(0, Math.round(Number(state.warehouse[product.id]) || 0));
  });
  state.autoRestock = state.autoRestock && typeof state.autoRestock === "object" && !Array.isArray(state.autoRestock) ? state.autoRestock : {};
  products.forEach((product) => {
    const policy = state.autoRestock[product.id];
    state.autoRestock[product.id] = {
      enabled: Boolean(policy?.enabled),
      min: clamp(Math.round(Number(policy?.min) || 0), 0, 99)
    };
  });
  state.warehouseBatches = state.warehouseBatches && typeof state.warehouseBatches === "object" && !Array.isArray(state.warehouseBatches) ? state.warehouseBatches : {};
  products.forEach((product) => {
    state.warehouseBatches[product.id] = Array.isArray(state.warehouseBatches[product.id])
      ? state.warehouseBatches[product.id].map((batch) => ({
        qty: Math.max(0, Math.round(Number(batch.qty) || 0)),
        days: Math.max(0, Math.round(Number(batch.days) || 0))
      })).filter((batch) => batch.qty > 0 && batch.days > 0).slice(0, 24)
      : [];
  });
  state.supplyModifiers = sanitizeProductModifiers(state.supplyModifiers);
  state.demandModifiers = sanitizeProductModifiers(state.demandModifiers);
  state.competition ||= {};
  state.competition.companies = Array.isArray(state.competition.companies) ? state.competition.companies : competitorTemplates.map((company) => ({ ...company }));
  state.competition.companies = competitorTemplates.map((template) => normalizeCorporation(state.competition.companies.find((company) => company.id === template.id), template));
  state.competition.locations = state.competition.locations && typeof state.competition.locations === "object" && !Array.isArray(state.competition.locations) ? state.competition.locations : {};
  Object.keys(locations).forEach((locationId) => competitionLocation(locationId));
  state.world ||= {};
  state.world.eventChains = state.world.eventChains && typeof state.world.eventChains === "object" && !Array.isArray(state.world.eventChains) ? state.world.eventChains : {};
  state.world.reactionMemory = Array.isArray(state.world.reactionMemory) ? state.world.reactionMemory.slice(0, 20) : [];
  state.world.modifiers = state.world.modifiers && typeof state.world.modifiers === "object" && !Array.isArray(state.world.modifiers) ? state.world.modifiers : {};
  state.world.modifierDays = state.world.modifierDays && typeof state.world.modifierDays === "object" && !Array.isArray(state.world.modifierDays) ? state.world.modifierDays : {};
  state.world.lockdowns = state.world.lockdowns && typeof state.world.lockdowns === "object" && !Array.isArray(state.world.lockdowns) ? state.world.lockdowns : {};
  state.world.warfareCooldowns = state.world.warfareCooldowns && typeof state.world.warfareCooldowns === "object" && !Array.isArray(state.world.warfareCooldowns) ? state.world.warfareCooldowns : {};
  state.world.eventCooldowns = state.world.eventCooldowns && typeof state.world.eventCooldowns === "object" && !Array.isArray(state.world.eventCooldowns) ? state.world.eventCooldowns : {};
  state.world.corporateEffects = Array.isArray(state.world.corporateEffects)
    ? state.world.corporateEffects.map((effect) => ({
      id: sanitizeName(effect?.id, "corporate-effect", 64),
      type: sanitizeName(effect?.type, "pressure", 32),
      source: sanitizeName(effect?.source, "Corporate pressure", 64),
      text: sanitizeName(effect?.text, "Corporate pressure changed operating conditions.", 180),
      daysLeft: Math.max(0, Math.round(Number(effect?.daysLeft) || 0)),
      locationId: locations[effect?.locationId] ? effect.locationId : null,
      productType: sanitizeName(effect?.productType, "", 24),
      corporationId: sanitizeName(effect?.corporationId, "", 32),
      value: Number(effect?.value) || 1
    })).filter((effect) => effect.daysLeft > 0).slice(0, 12)
    : [];
  state.world.targetCorporationId = activeCorporations().some((company) => company.id === state.world.targetCorporationId) ? state.world.targetCorporationId : activeCorporations()[0]?.id || competitorTemplates[0].id;
  state.world.choiceSignals = state.world.choiceSignals && typeof state.world.choiceSignals === "object" && !Array.isArray(state.world.choiceSignals) ? state.world.choiceSignals : {};
  state.world.diplomacyCooldown = Math.max(0, Math.round(Number(state.world.diplomacyCooldown) || 0));
  state.world.pressCooldown = Math.max(0, Math.round(Number(state.world.pressCooldown) || 0));
  state.world.lastDiplomacyDay = Math.max(0, Math.round(Number(state.world.lastDiplomacyDay) || 0));
  state.world.lastPressDay = Math.max(0, Math.round(Number(state.world.lastPressDay) || 0));
  state.world.lastCorporateAttackDay = Math.max(0, Math.round(Number(state.world.lastCorporateAttackDay) || 0));
  state.world.lastInfightingDay = Math.max(0, Math.round(Number(state.world.lastInfightingDay) || 0));
  state.world.lastDiplomacyPrompt = sanitizeName(state.world.lastDiplomacyPrompt, "", 48);
  state.world.lastPressPrompt = sanitizeName(state.world.lastPressPrompt, "", 48);
  state.world.pressTone = sanitizeName(state.world.pressTone, "unfiled", 32);
  state.world.milestoneMemory = state.world.milestoneMemory && typeof state.world.milestoneMemory === "object" && !Array.isArray(state.world.milestoneMemory) ? state.world.milestoneMemory : {};
  state.world.digestMemory = Array.isArray(state.world.digestMemory)
    ? state.world.digestMemory.map((item) => ({
      signature: sanitizeName(item?.signature, "", 96),
      day: Math.max(0, Math.round(Number(item?.day) || 0))
    })).filter((item) => item.signature && state.day - item.day <= 5).slice(0, 40)
    : [];
  state.world.fourthWallMemory = normalizeFourthWallMemory(state.world.fourthWallMemory);
  Object.keys(state.world.eventCooldowns).forEach((id) => {
    state.world.eventCooldowns[id] = Math.max(0, Math.round(Number(state.world.eventCooldowns[id]) || 0));
    if (state.world.eventCooldowns[id] <= 0) delete state.world.eventCooldowns[id];
  });
  Object.keys(state.world.warfareCooldowns).forEach((id) => {
    state.world.warfareCooldowns[id] = Math.max(0, Math.round(Number(state.world.warfareCooldowns[id]) || 0));
    if (!corporateWarfareActions[id]) delete state.world.warfareCooldowns[id];
  });
  Object.keys(state.world.modifierDays).forEach((id) => {
    state.world.modifierDays[id] = Math.max(0, Math.round(Number(state.world.modifierDays[id]) || 0));
    if (state.world.modifierDays[id] <= 0 || !cityImpactEvents.some((event) => event.id === id)) delete state.world.modifierDays[id];
  });
  state.world.hostility = clamp(Number(state.world.hostility) || 0, 0, 100);
  state.world.crisisDays = Math.max(0, Math.round(Number(state.world.crisisDays) || 0));
  Object.keys(locations).forEach((locationId) => {
    state.world.lockdowns[locationId] = Math.max(0, Math.round(Number(state.world.lockdowns[locationId]) || 0));
  });
  rebuildWorldModifiers();
  state.argPortal ||= {};
  state.argPortal.schema ||= "wending.portal.v1";
  state.argPortal.enabled = Boolean(state.argPortal.enabled);
  state.argPortal.lastManifestDay = Number.isFinite(Number(state.argPortal.lastManifestDay)) ? Number(state.argPortal.lastManifestDay) : null;
  state.argPortal.hooks = Array.isArray(state.argPortal.hooks) ? state.argPortal.hooks.map((hook) => sanitizeName(hook, "", 48)).filter(Boolean).slice(0, 12) : [];
  state.corporate ||= {};
  state.corporate.employees ||= {};
  Object.keys(employeeTypes).forEach((id) => {
    state.corporate.employees[id] = clamp(Math.round(Number(state.corporate.employees[id]) || 0), 0, employeeTypes[id].max);
  });
  state.corporate.supplierMode ||= "normal";
  if (!supplierModes[state.corporate.supplierMode]) state.corporate.supplierMode = "normal";
  state.corporate.securityContract ||= "none";
  if (!securityContracts[state.corporate.securityContract]) state.corporate.securityContract = "none";
  state.corporate.substitutes = state.corporate.substitutes && typeof state.corporate.substitutes === "object" && !Array.isArray(state.corporate.substitutes) ? state.corporate.substitutes : {};
  products.forEach((product) => {
    state.corporate.substitutes[product.id] = Boolean(state.corporate.substitutes[product.id]);
  });
  state.corporate.heat = clamp(Number(state.corporate.heat) || 0, 0, 100);
  state.corporate.fines = Math.max(0, Math.round(Number(state.corporate.fines) || 0));
  state.corporate.wagesPaid = Math.max(0, Math.round(Number(state.corporate.wagesPaid) || 0));
  state.corporate.blackMarketSpend = Math.max(0, Math.round(Number(state.corporate.blackMarketSpend) || 0));
  state.corporate.blackMarketScandals = Math.max(0, Math.round(Number(state.corporate.blackMarketScandals) || 0));
  state.corporate.lastBlackMarketSupplier ||= null;
  state.charts = { restock: true, service: true, cleaning: true, revenue: true, ...(state.charts || {}) };
  state.stats ||= {};
  state.stats.restockByProduct ||= {};
  products.forEach((product) => {
    state.stats.restockByProduct[product.id] = Math.max(0, Math.round(Number(state.stats.restockByProduct[product.id]) || 0));
  });
  state.stats.maintenance = Math.max(0, Math.round(Number(state.stats.maintenance) || 0));
  state.stats.cleaning = Math.max(0, Math.round(Number(state.stats.cleaning) || 0));
  state.stats.security = Math.max(0, Math.round(Number(state.stats.security) || 0));
  state.stats.revenueByMachine = state.stats.revenueByMachine && typeof state.stats.revenueByMachine === "object" && !Array.isArray(state.stats.revenueByMachine) ? state.stats.revenueByMachine : {};
  state.stats.locationEvents = state.stats.locationEvents && typeof state.stats.locationEvents === "object" && !Array.isArray(state.stats.locationEvents) ? state.stats.locationEvents : {};
  state.stats.daily = Array.isArray(state.stats.daily) ? state.stats.daily.slice(-30).map((day) => ({
    day: Math.max(1, Math.round(Number(day.day) || state.day || 1)),
    revenue: Math.max(0, Math.round(Number(day.revenue) || 0)),
    expenses: Math.max(0, Math.round(Number(day.expenses) || 0)),
    profit: Math.round(Number(day.profit) || 0),
    sold: Math.max(0, Math.round(Number(day.sold) || 0)),
    events: Math.max(0, Math.round(Number(day.events) || 0)),
    customers: day.customers && typeof day.customers === "object" && !Array.isArray(day.customers) ? day.customers : {},
    soldByProduct: day.soldByProduct && typeof day.soldByProduct === "object" && !Array.isArray(day.soldByProduct) ? day.soldByProduct : {},
    soldByMachineProduct: day.soldByMachineProduct && typeof day.soldByMachineProduct === "object" && !Array.isArray(day.soldByMachineProduct) ? day.soldByMachineProduct : {},
    breakdown: normalizeDailyBreakdown(day.breakdown, day)
  })) : [];
  state.stats.corporate = Math.max(0, Math.round(Number(state.stats.corporate) || 0));
  state.reports ||= [];
  if (!Array.isArray(state.reports)) state.reports = [];
  state.reviews = normalizeReviews(state.reviews);
  state.reviewMemory = Array.isArray(state.reviewMemory)
    ? state.reviewMemory.map((item) => ({
      signature: sanitizeName(item?.signature, "", 96),
      day: Math.max(0, Math.round(Number(item?.day) || 0))
    })).filter((item) => item.signature && state.day - item.day <= 18).slice(0, 40)
    : [];
  state.finalMachineCriticalDays = Math.max(0, Math.round(Number(state.finalMachineCriticalDays) || 0));
  state.log = Array.isArray(state.log) ? state.log.slice(0, 14) : ["Imported route. Some older paperwork was reconstructed."];
  state.weekly ||= {
    number: 1,
    goal: pick(weeklyGoals),
    profit: 0,
    sales: 0,
    soldByType: {},
    revenue: 0,
    expenses: 0
  };
  state.weekly.number = Math.max(1, Math.round(Number(state.weekly.number) || 1));
  state.weekly.profit = Math.round(Number(state.weekly.profit) || 0);
  state.weekly.sales = Math.max(0, Math.round(Number(state.weekly.sales) || 0));
  state.weekly.revenue = Math.max(0, Math.round(Number(state.weekly.revenue) || 0));
  state.weekly.expenses = Math.max(0, Math.round(Number(state.weekly.expenses) || 0));
  state.weekly.soldByType = state.weekly.soldByType && typeof state.weekly.soldByType === "object" && !Array.isArray(state.weekly.soldByType) ? state.weekly.soldByType : {};
  state.weekly.cleanDays = Math.max(0, Math.round(Number(state.weekly.cleanDays) || 0));
  state.weekly.breakdownFreeDays = Math.max(0, Math.round(Number(state.weekly.breakdownFreeDays) || 0));
  state.weekly.pressureDays = Math.max(0, Math.round(Number(state.weekly.pressureDays) || 0));
  state.weekly.lowHeatDays = Math.max(0, Math.round(Number(state.weekly.lowHeatDays) || 0));
  state.weekly.noSubstituteDays = Math.max(0, Math.round(Number(state.weekly.noSubstituteDays) || 0));
  state.weekly.stationDrinkSales = Math.max(0, Math.round(Number(state.weekly.stationDrinkSales) || 0));
  state.weekly.crisisProfitDays = Math.max(0, Math.round(Number(state.weekly.crisisProfitDays) || 0));
  if (!state.weekly.goal || !weeklyGoals.some((goal) => goal.type === state.weekly.goal.type && goal.text === state.weekly.goal.text)) {
    state.weekly.goal = pick(weeklyGoals);
  }
  state.machines = Array.isArray(state.machines) ? state.machines : [];
  state.machines.forEach((machine) => {
    machine.id ||= `m${Date.now()}${Math.round(Math.random() * 999)}`;
    machine.type = machineTypes[machine.type] ? machine.type : "snack";
    machine.name = sanitizeName(machine.name, machineTypes[machine.type]?.starter || "Unnamed machine");
    machine.location = locations[machine.location] ? machine.location : "campus";
    machine.condition = clamp(Number(machine.condition) || 80, 0, 100);
    machine.clean = clamp(Number(machine.clean) || 80, 0, 100);
    machine.cash = Math.max(0, Number(machine.cash) || 0);
    normalizeMachineUpgrades(machine);
    const cleanStock = makeStock(machine.type, false);
    Object.entries(machine.stock || {}).forEach(([productId, amount]) => {
      const product = productById(productId);
      if (product?.type === machine.type) cleanStock[productId] = Math.max(0, Math.round(Number(amount) || 0));
    });
    machine.stock = cleanStock;
    trimMachineStockToCapacity(machine);
    machine.batches = machine.batches && typeof machine.batches === "object" && !Array.isArray(machine.batches) ? machine.batches : {};
    productsForType(machine.type).forEach((product) => {
      machine.batches[product.id] = Array.isArray(machine.batches[product.id])
        ? machine.batches[product.id].map((batch) => ({
          qty: Math.max(0, Math.round(Number(batch.qty) || 0)),
          days: Math.max(0, Math.round(Number(batch.days) || 0))
        })).filter((batch) => batch.qty > 0 && batch.days > 0).slice(0, 24)
        : [];
    });
    ensureMachineHistory(machine);
  });
  state.machines.forEach((machine) => {
    const legacyContract = machineProgression[machine.type]?.contract;
    if (legacyContract && !state.contracts[legacyContract]) {
      state.contracts[legacyContract] = { acquiredDay: state.day, legacy: true };
    }
  });
  state.freePlacementMachineId = state.freePlacementMachineId && state.machines.some((machine) => machine.id === state.freePlacementMachineId && ensureMachineHistory(machine).daysActive === 0) ? state.freePlacementMachineId : null;
  if (!state.selectedMachine && state.machines[0]) state.selectedMachine = state.machines[0].id;
  if (state.selectedMachine && !state.machines.some((machine) => machine.id === state.selectedMachine)) {
    state.selectedMachine = state.machines[0]?.id || null;
  }
  updateOperatorProfile();
}

function normalizeOperatorProfile(profile) {
  const identity = profile?.identityPath || DEFAULT_OPERATOR_PROFILE.identityPath;
  return {
    classificationId: sanitizeName(profile?.classificationId, DEFAULT_OPERATOR_PROFILE.classificationId, 20),
    primaryArchetype: sanitizeName(profile?.primaryArchetype, DEFAULT_OPERATOR_PROFILE.primaryArchetype, 32),
    secondaryTags: Array.isArray(profile?.secondaryTags) ? profile.secondaryTags.map((tag) => sanitizeName(tag, "", 24)).filter(Boolean).slice(0, 8) : [],
    scores: profile?.scores && typeof profile.scores === "object" && !Array.isArray(profile.scores) ? { ...profile.scores } : {},
    behaviorTags: Array.isArray(profile?.behaviorTags) ? profile.behaviorTags.map((tag) => sanitizeName(tag, "", 32)).filter(Boolean).slice(0, 10) : [],
    identityPath: {
      id: sanitizeName(identity.id, DEFAULT_OPERATOR_PROFILE.identityPath.id, 32),
      label: sanitizeName(identity.label, DEFAULT_OPERATOR_PROFILE.identityPath.label, 36),
      score: clamp(Number(identity.score) || 0, 0, 1),
      emergedDay: Number.isFinite(Number(identity.emergedDay)) ? Number(identity.emergedDay) : null
    }
  };
}

function normalizeReviews(reviews) {
  if (!Array.isArray(reviews)) return [];
  return reviews.map((review) => ({
    day: Math.max(1, Math.round(Number(review?.day) || state.day || 1)),
    rating: clamp(Math.round(Number(review?.rating) || 3), 1, 5),
    tone: sanitizeName(review?.tone, "mixed", 24),
    text: sanitizeName(review?.text, "Customer submitted a blank review. Legal calls this neutral.", 160),
    machineName: sanitizeName(review?.machineName, "Anonymous machine", 42),
    tags: Array.isArray(review?.tags) ? review.tags.map((tag) => sanitizeName(tag, "", 24)).filter(Boolean).slice(0, 6) : [],
    source: sanitizeName(review?.source, "route", 32),
    category: sanitizeName(review?.category, "review", 32)
  })).filter((review) => review.text).slice(0, 12);
}

function normalizeGameOver(gameOver) {
  if (!gameOver || typeof gameOver !== "object" || Array.isArray(gameOver)) return null;
  return {
    reason: sanitizeName(gameOver.reason, "Route terminated", 40),
    detail: sanitizeName(gameOver.detail, "The vending concern has reached a legally inconvenient conclusion.", 180),
    day: Math.max(1, Math.round(Number(gameOver.day) || state.day || 1))
  };
}

function normalizeFourthWallMemory(memory) {
  const source = memory && typeof memory === "object" && !Array.isArray(memory) ? memory : {};
  return {
    lastDay: Number.isFinite(Number(source.lastDay)) ? Math.round(Number(source.lastDay)) : -99,
    lastCategory: sanitizeName(source.lastCategory, "", 32),
    signatures: Array.isArray(source.signatures)
      ? source.signatures.map((item) => ({
        signature: sanitizeName(item?.signature, "", 96),
        day: Math.max(0, Math.round(Number(item?.day) || 0))
      })).filter((item) => item.signature && state.day - item.day <= 24).slice(0, 24)
      : []
  };
}

function sanitizeProductModifiers(modifiers) {
  const clean = {};
  if (!modifiers || typeof modifiers !== "object" || Array.isArray(modifiers)) return clean;
  products.forEach((product) => {
    const modifier = modifiers[product.id];
    if (!modifier || typeof modifier !== "object") return;
    const daysLeft = Math.max(0, Math.round(Number(modifier.daysLeft) || 0));
    if (daysLeft <= 0) return;
    clean[product.id] = {
      multiplier: clamp(Number(modifier.multiplier) || 1, 0.2, 3),
      daysLeft,
      name: sanitizeName(modifier.name, "Imported market memo", 48)
    };
  });
  return clean;
}

function ensureOperatorProfile() {
  state.operatorProfile = normalizeOperatorProfile(state.operatorProfile);
  return state.operatorProfile;
}

function calculateOperatorScores() {
  const metrics = calculateBehaviorMetrics();
  return metrics.scores;
}

function calculateBehaviorMetrics() {
  const daily = state.stats?.daily || [];
  const productSales = daily.reduce((totals, day) => {
    Object.entries(day.soldByProduct || {}).forEach(([productId, amount]) => {
      totals[productId] = (totals[productId] || 0) + amount;
    });
    return totals;
  }, {});
  const typeSales = products.reduce((totals, product) => {
    totals[product.type] = (totals[product.type] || 0) + (productSales[product.id] || 0);
    return totals;
  }, {});
  const totalSales = Object.values(productSales).reduce((sum, value) => sum + value, 0) || 1;
  const stationMachines = state.machines.filter((machine) => machine.location === "station").length;
  const neglected = state.machines.filter((machine) => machine.condition < 35 || machine.clean < 35 || machine.broken).length;
  const pressure = Object.values(state.competition?.locations || {}).reduce((sum, location) => sum + (location.level || 0), 0);
  const machineCount = Math.max(1, state.machines.length);
  const heat = state.corporate?.heat || 0;
  const employees = Object.values(state.corporate?.employees || {}).reduce((sum, amount) => sum + (amount || 0), 0);
  const substituteCount = Object.values(state.corporate?.substitutes || {}).filter(Boolean).length;
  const blackMarket = state.corporate?.blackMarketSpend || 0;
  const choiceSignals = state.world?.choiceSignals || {};
  const premiumPrices = products.filter((product) => product.price >= product.basePrice * 1.22).length;
  const lowPrices = products.filter((product) => product.price <= product.basePrice * 0.86).length;
  const oldMachines = state.machines.filter((machine) => (machine.history?.daysActive || 0) >= 14).length;
  const debtRatio = companyValue() > 0 ? loanPrincipal() / companyValue() : 0;
  const serviceSpend = state.stats?.maintenance || 0;
  const cleaningSpend = state.stats?.cleaning || 0;
  const scores = {
    caffeine: ((typeSales.coffee || 0) + (productSales.energy || 0)) / totalSales,
    beverageMinimalism: ((productSales.water || 0) + (productSales.cola || 0)) / totalSales,
    snackExpansion: (typeSales.snack || 0) / totalSales + state.machines.filter((machine) => machine.type === "snack").length * 0.08,
    freshLiability: (typeSales.fresh || 0) / totalSales + state.machines.filter((machine) => machine.type === "fresh").length * 0.12,
    auditHeat: heat / 100,
    compliance: Object.keys(state.contracts || {}).length * 0.16 + (state.corporate?.employees?.accountant || 0) * 0.2,
    neglect: neglected / machineCount,
    stationChaos: stationMachines / machineCount,
    premium: (reputation() / 100) + (state.cash > 85000 ? 0.2 : 0) - (loanPrincipal() > 0 ? 0.2 : 0),
    competitorBait: pressure / 18
  };
  Object.assign(scores, {
    caffeineBias: scores.caffeine,
    hydrationBias: scores.beverageMinimalism,
    snackBias: scores.snackExpansion,
    freshFoodBias: scores.freshLiability,
    budgetBehavior: clamp(lowPrices / products.length + scores.snackExpansion * 0.28, 0, 1),
    premiumBehavior: scores.premium,
    expansionPressure: clamp((state.machines.length - 1) / 8 + debtRatio * 0.18 + (choiceSignals.debtGrowth || 0) * 0.035, 0, 1),
    maintenanceNeglect: clamp(scores.neglect - Math.min(0.18, serviceSpend / 180000) - Math.min(0.12, cleaningSpend / 120000), 0, 1),
    corporateCompliance: clamp(scores.compliance + (choiceSignals.legalistic || 0) * 0.045 + (choiceSignals.diplomatic || 0) * 0.035, 0, 1),
    auditRisk: clamp(scores.auditHeat + debtRatio * 0.08, 0, 1),
    blackMarketAffinity: clamp(blackMarket / 42000 + (state.corporate?.supplierMode === "shady" ? 0.22 : 0) + (choiceSignals.dirtyTactics || 0) * 0.08, 0, 1),
    competitorPressure: clamp(scores.competitorBait + (choiceSignals.antiCorporate || 0) * 0.06, 0, 1),
    locationRisk: clamp(scores.stationChaos + pressure / 30, 0, 1)
  });
  const identityScores = {
    sellout: clamp(Object.keys(state.contracts || {}).length * 0.11 + employees * 0.07 + (state.corporate?.securityContract !== "none" ? 0.12 : 0) + (state.corporate?.supplierMode === "premium" ? 0.08 : 0) + (choiceSignals.corporateCompliance || 0) * 0.08 + (choiceSignals.diplomatic || 0) * 0.03, 0, 1),
    underground: clamp(blackMarket / 42000 + (state.corporate?.supplierMode === "shady" ? 0.22 : 0) + heat / 180 + (choiceSignals.antiCorporate || 0) * 0.06, 0, 1),
    luxury: clamp(reputation() / 130 + premiumPrices * 0.045 + (state.corporate?.supplierMode === "premium" ? 0.14 : 0), 0, 1),
    chaos: clamp(scores.stationChaos * 0.55 + scores.neglect * 0.38 + pressure / 30 + (state.stats?.daily || []).slice(-8).reduce((sum, day) => sum + (day.events || 0), 0) / 100, 0, 1),
    monopoly: clamp((state.machines.length - 2) / 8 + pressure / 34 + oldMachines * 0.04, 0, 1),
    ethical: clamp((100 - heat) / 140 + (substituteCount === 0 ? 0.16 : -0.16) + (blackMarket === 0 ? 0.14 : -0.12) + reputation() / 220 + (choiceSignals.ethical || 0) * 0.08, 0, 1),
    megacorp: clamp((state.machines.length - 4) / 8 + employees * 0.055 + heat / 210 + debtRatio * 0.16 + (choiceSignals.aggressiveExpansion || 0) * 0.05 + (choiceSignals.debtGrowth || 0) * 0.035 + (state.stats?.daily || []).slice(-7).reduce((sum, day) => sum + day.revenue, 0) / 190000, 0, 1)
  };
  return {
    scores,
    identityScores,
    behaviorFacts: {
      blackMarket,
      employees,
      heat,
      lowPrices,
      machineCount: state.machines.length,
      oldMachines,
      premiumPrices,
      pressure,
      debtRatio,
      substituteCount,
      totalSales
    }
  };
}

function determineOperatorArchetype(scores) {
  const candidates = [
    ["CAFFEINE_INFRASTRUCTURE_VENDOR", scores.caffeine],
    ["MINIMALIST_BEVERAGE_TYRANT", scores.beverageMinimalism],
    ["LOW_MARGIN_SNACK_EXPANSIONIST", scores.snackExpansion],
    ["FRESH_FOOD_LIABILITY_DISTRIBUTOR", scores.freshLiability],
    ["AUDIT_HEAT_ENTHUSIAST", scores.auditHeat],
    ["CORPORATE_COMPLIANCE_PET", scores.compliance],
    ["NEGLECTFUL_ROUTE_GOBLIN", scores.neglect],
    ["STATION_CHAOS_OPERATOR", scores.stationChaos],
    ["PREMIUM_MICRO_EMPIRE", scores.premium],
    ["COMPETITOR_BAIT", scores.competitorBait]
  ].sort((a, b) => b[1] - a[1]);
  return candidates[0]?.[1] > 0.28 ? candidates[0][0] : "UNCLASSIFIED";
}

function generateClassificationId(archetype, scores) {
  const meta = operatorArchetypeMeta[archetype] || operatorArchetypeMeta.UNCLASSIFIED;
  const score = Math.round(clamp(Number(scores[meta.scoreKey]) || 0, 0, 1) * 99);
  const riskScore = clamp((scores.auditRisk || 0) + (scores.maintenanceNeglect || 0) + (scores.blackMarketAffinity || 0) * 0.8 + (loanPrincipal() / 90000), 0, 2.4);
  const strangeOverlap = [scores.auditRisk, scores.maintenanceNeglect, scores.locationRisk, scores.competitorPressure, scores.blackMarketAffinity].filter((value) => value > 0.45).length;
  const tier = strangeOverlap >= 3 ? "L" : riskScore > 1.35 ? "R" : riskScore > 0.82 ? "C" : riskScore > 0.38 ? "B" : "A";
  return `WND-${meta.code}-${String(score).padStart(2, "0")}-${tier}`;
}

function getOperatorFlavorText(profile = ensureOperatorProfile()) {
  const meta = operatorArchetypeMeta[profile.primaryArchetype] || operatorArchetypeMeta.UNCLASSIFIED;
  if (profile.identityPath?.id !== "unformed") return `${meta.flavor} Long-term pattern: ${profile.identityPath.label}.`;
  return meta.flavor;
}

function determineLateGameIdentity(identityScores) {
  const candidates = lateGameIdentityDefs
    .filter((identity) => state.day >= identity.minDay)
    .map((identity) => ({ ...identity, score: identityScores[identity.key] || 0 }))
    .sort((a, b) => b.score - a.score);
  const winner = candidates[0];
  if (!winner || winner.score < 0.54) return { ...DEFAULT_OPERATOR_PROFILE.identityPath };
  const previous = state.operatorProfile?.identityPath;
  return {
    id: winner.id,
    label: winner.label,
    score: winner.score,
    emergedDay: previous?.id === winner.id && previous?.emergedDay ? previous.emergedDay : state.day
  };
}

function deriveBehaviorTags(metrics, scores, identity) {
  const tags = [];
  if (metrics.blackMarket > 0 || (state.corporate?.supplierMode === "shady")) tags.push("BLACK_MARKET_SIGNAL");
  if (metrics.heat < 12 && metrics.blackMarket === 0 && metrics.substituteCount === 0) tags.push("LOW_HEAT_OPERATOR");
  if (metrics.machineCount >= 5 || identity.id === "monopolyRoute") tags.push("ROUTE_DOMINANCE");
  if (metrics.premiumPrices >= 3 || identity.id === "luxuryEmpire") tags.push("PREMIUM_POSITIONING");
  if (scores.neglect > 0.28 || scores.stationChaos > 0.42 || identity.id === "chaosStrategy") tags.push("CHAOS_TOLERANCE");
  if (Object.keys(state.contracts || {}).length >= 3 || identity.id === "corporateSellout") tags.push("CONTRACT_HEAVY");
  if (identity.id === "dystopianMegacorp") tags.push("DYSTOPIAN_SCALE");
  return tags.slice(0, 8);
}

function updateOperatorProfile() {
  const profile = ensureOperatorProfile();
  const previousIdentity = profile.identityPath?.id || "unformed";
  const metrics = calculateBehaviorMetrics();
  const scores = metrics.scores;
  const archetype = determineOperatorArchetype(scores);
  const identity = determineLateGameIdentity(metrics.identityScores);
  profile.scores = scores;
  profile.primaryArchetype = archetype;
  profile.secondaryTags = Object.entries(scores)
    .filter(([, value]) => value > 0.35)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key.toUpperCase());
  profile.identityPath = identity;
  profile.behaviorTags = deriveBehaviorTags(metrics.behaviorFacts, scores, identity);
  profile.classificationId = generateClassificationId(archetype, scores);
  if (previousIdentity !== identity.id && identity.id !== "unformed") {
    state.world ||= {};
    state.world.reactionMemory ||= [];
    state.world.reactionMemory.unshift(`Identity path emerged: ${identity.label}`);
    state.world.reactionMemory = state.world.reactionMemory.slice(0, 20);
  }
  return profile;
}

function addOperatorChoiceSignal(key, amount = 1) {
  state.world ||= {};
  state.world.choiceSignals ||= {};
  const id = sanitizeName(key, "choice", 32);
  state.world.choiceSignals[id] = clamp((Number(state.world.choiceSignals[id]) || 0) + amount, 0, 20);
  updateOperatorProfile();
}

function buildArgPortalManifest(saveState = state) {
  const profile = normalizeOperatorProfile(saveState.operatorProfile);
  return {
    schema: "wending.portal.v1",
    generatedAt: Date.now(),
    companyName: sanitizeName(saveState.companyName, DEFAULT_COMPANY_NAME),
    day: Math.max(1, Math.round(Number(saveState.day) || 1)),
    machineNames: (saveState.machines || []).map((machine) => sanitizeName(machine.name, "Unnamed machine", 42)),
    machines: (saveState.machines || []).map((machine) => ({
      id: sanitizeName(machine.id, "unknown", 32),
      name: sanitizeName(machine.name, "Unnamed machine", 42),
      type: sanitizeName(machine.type, "snack", 16),
      location: sanitizeName(machine.location, "campus", 16),
      quirks: Array.isArray(machine.history?.quirks) ? machine.history.quirks.slice(0, 4) : []
    })),
    operatorProfile: profile,
    operatorFlavor: getOperatorFlavorText(profile),
    archetypeTags: [profile.primaryArchetype, ...(profile.secondaryTags || []), ...(profile.behaviorTags || [])].filter(Boolean),
    portalHooks: [
      "identity_path_changed",
      "event_chain_stage_changed",
      "machine_history_updated",
      "corporation_pressure_changed",
      "audit_heat_changed"
    ],
    externalApi: null
  };
}

function normalizeSavePayload(raw) {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw.state ? raw : { state: raw, prices: raw.prices || {} };
  if (!payload.state || typeof payload.state !== "object") return null;
  return {
    saveVersion: Number(payload.saveVersion) || 1,
    savedAt: payload.savedAt || Date.now(),
    state: payload.state,
    prices: payload.prices || {}
  };
}

function relocationFee(machine, targetLocationId) {
  if (!machine || !locations[targetLocationId] || machine.location === targetLocationId) return 0;
  const typeCost = machineTypes[machine.type]?.buyCost || 50000;
  const target = locationById(targetLocationId);
  const riskHandling = Math.round(target.theft * 360);
  const fleetHandling = Math.max(0, state.machines.length - 1) * 220;
  return Math.round(950 + typeCost * 0.018 + riskHandling + fleetHandling);
}

function renderLocationOptions() {
  el.machineLocation.innerHTML = "";
  const machine = currentMachine();
  Object.entries(locations).forEach(([id, location]) => {
    const pressure = competitionLocation(id);
    const option = document.createElement("option");
    option.value = id;
    const blocked = pressure.blockedDays > 0 ? ` - blocked ${pressure.blockedDays}d` : "";
    const landlord = pressure.landlordDays > 0 ? ` - landlord pressure ${pressure.landlordDays}d` : "";
    const freeInitial = machine && state.freePlacementMachineId === machine.id && ensureMachineHistory(machine).daysActive === 0;
    const moveFee = machine && machine.location !== id ? ` - ${freeInitial ? "initial placement free" : `move ${formatMoney(relocationFee(machine, id))}`}` : "";
    option.textContent = `${location.label} - rent ${formatMoney(location.upkeep)}/day${moveFee}${blocked}${landlord}`;
    el.machineLocation.append(option);
  });
}

function renderMachines() {
  el.machines.innerHTML = "";
  state.machines.forEach((machine) => {
    const pressure = competitionLocation(machine.location);
    const history = ensureMachineHistory(machine);
    const quirkLabel = history.quirks.length ? (machineQuirkDefs.find((quirk) => quirk.id === history.quirks[0])?.label || "quirky") : "no quirks";
    const age = machineAgeLabel(machine);
    const button = document.createElement("button");
    button.className = `machine-card ${machine.id === state.selectedMachine ? "active" : ""}`;
    button.innerHTML = `
      <span class="mini-machine ${machine.type}"></span>
      <span>
        <span class="card-name">
          <span>${machine.name}</span>
          <span>${machineStockTotal(machine)}/${machineCapacity(machine)}</span>
        </span>
        <span class="card-meta">${locationById(machine.location).label} - ${age.label} - ${machine.broken ? "offline" : `${Math.round(machine.condition)}% condition`} - ${Math.round(effectiveSecurity(machine))}% sec. - pressure ${pressure.level || 0}/6 - ${quirkLabel}</span>
      </span>
    `;
    button.addEventListener("click", () => {
      state.selectedMachine = machine.id;
      render();
    });
    el.machines.append(button);
  });
}

function machineAgeLabel(machine) {
  const days = ensureMachineHistory(machine).daysActive;
  if (days >= 28) return { label: "Technically Alive", tone: "danger" };
  if (days >= 20) return { label: "Legacy Unit", tone: "warn" };
  if (days >= 12) return { label: "Tired", tone: "warn" };
  if (days >= 4) return { label: "Reliable", tone: "good" };
  return { label: "New", tone: "good" };
}

function renderLocationProfile(machine) {
  const location = locationById(machine.location);
  const district = districtProfiles[machine.location] || districtProfiles.campus;
  const pressure = competitionLocation(machine.location);
  const rival = pressure.companyId ? competitorById(pressure.companyId) : null;
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
  const war = pressure.priceWar?.daysLeft > 0 ? ` - ${pressure.priceWar.type} price war ${pressure.priceWar.daysLeft}d` : "";
  const activePressure = [
    pressure.blockedDays > 0 ? `blocked ${pressure.blockedDays}d` : "",
    pressure.landlordDays > 0 ? `landlord ${pressure.landlordDays}d` : "",
    pressure.interferenceDays > 0 ? `interference ${pressure.interferenceDays}d` : "",
    pressure.protectedDays > 0 ? `protected ${pressure.protectedDays}d` : "",
    pressure.adBlitzDays > 0 ? `ad blitz ${pressure.adBlitzDays}d` : "",
    (state.world?.lockdowns?.[machine.location] || 0) > 0 ? `lockdown ${state.world.lockdowns[machine.location]}d` : ""
  ].filter(Boolean).join(" - ");
  const history = ensureMachineHistory(machine);
  const age = machineAgeLabel(machine);
  const quirkTags = history.quirks.map((id) => {
    const quirk = machineQuirkDefs.find((item) => item.id === id);
    return quirk ? `<span title="${quirk.text}">${quirk.label}</span>` : "";
  }).join("");
  const lastIncident = history.incidents[0] || "No dramatic paperwork yet.";
  const drag = deadInventoryDrag(machine);
  const dragReasons = deadInventoryReasons(machine);
  const machineFlavor = dynamicMachineFlavor(machine);
  const citySecurity = worldModifier().securityByLocation?.[machine.location] || 0;
  const cityTheft = worldModifier().theftByLocation?.[machine.location] || 1;
  const securityNote = citySecurity || cityTheft !== 1
    ? ` - city security ${citySecurity >= 0 ? "+" : ""}${citySecurity}, theft x${Math.round(cityTheft * 100)}%`
    : "";
  el.locationProfile.innerHTML = `
    <div>
      <strong>${location.label} - ${district.identity}</strong>
      <span>${risk} - demand ${Math.round(location.demand * worldLocationDemandFactor(machine.location) * pressureAdBlitzFactor(machine.location) * 100)}% - security ${Math.round(effectiveSecurity(machine))}%${securityNote} - rent ${formatMoney(location.upkeep)}/day</span>
      <small>Best fit: ${district.strategy}. Main risk: ${district.risk}.</small>
    </div>
    <p class="machine-flavor" title="${machineFlavor}">${machineFlavor}</p>
    <div class="location-tags">
      ${customerLines}
    </div>
    <div class="pressure-box ${pressure.level >= 4 ? "hot" : ""}">
      <span>Competition pressure</span>
      <strong>${pressure.level || 0}/6${rival ? ` from ${rival.label}` : ""}</strong>
      <small>Takeover risk ${Math.round(pressure.takeoverRisk || 0)}%${war}${activePressure ? ` - ${activePressure}` : ""}</small>
    </div>
    <div class="machine-history">
      <span>Machine record</span>
      <strong>${history.daysActive} operating days - ${history.lifetimeSales} lifetime sales <em class="age-tag ${age.tone}">${age.label}</em></strong>
      <div class="quirk-tags">${quirkTags || "<span>No quirks yet</span>"}</div>
      <small>${drag > 0 ? `Dead inventory drag estimate: ${formatMoney(drag)}/day. ${dragReasons[0] || "Product mix does not fit this location."}` : "Dead inventory drag: none detected."} <button class="inline-help" data-help="deadInventory" aria-label="Dead inventory help">?</button></small>
      ${dragReasons.slice(1).map((reason) => `<small>Why: ${reason}.</small>`).join("")}
      <small>${lastIncident}</small>
    </div>
  `;
  bindHelpButtons(el.locationProfile);
}

function dynamicMachineFlavor(machine) {
  const profile = ensureOperatorProfile();
  const identityLine = identityMachineFlavorLines[profile.identityPath?.id];
  if (identityLine && Math.random() < 0.45) return identityLine;
  const history = ensureMachineHistory(machine);
  if (history.quirks.includes("LOCAL_FIXTURE")) return "Regulars pass it with the respect usually reserved for load-bearing walls.";
  if (history.quirks.includes("MILDLY_HAUNTED_LEDGER")) return "The ledger balances too neatly. Accounting is grateful and afraid.";
  if (profile.behaviorTags?.includes("BLACK_MARKET_SIGNAL") && Math.random() < 0.35) return "The product rows look normal. Procurement history does not.";
  return pick(machineFlavorLines[machine.type] || machineFlavorLines.snack);
}

function renderAdvisor(machine) {
  if (!el.advisorPanel) return;
  const tips = [];
  if (machine.cash > 2500) tips.push({ level: "good", text: `Collect ${formatMoney(machine.cash)} from this machine.` });
  if (machineStockTotal(machine) <= Math.max(2, machineCapacity(machine) * 0.2)) tips.push({ level: "warn", text: "This machine is low on stock. Refill from warehouse or order more stock." });
  if (machine.condition < 45 || machine.broken) tips.push({ level: "warn", text: "Service this machine soon. Low condition hurts sales and raises breakdown risk." });
  if (machine.clean < 45) tips.push({ level: "warn", text: "Clean this machine. Dirt lowers demand and reputation." });
  const pressure = competitionLocation(machine.location);
  if (pressure.level >= 3) tips.push({ level: "warn", text: "Competition pressure is high here. Keep reputation up and avoid overpriced products." });
  const drag = deadInventoryDrag(machine);
  if (drag > 0) tips.push({ level: "warn", text: `Dead inventory is dragging this machine by about ${formatMoney(drag)}/day. ${deadInventoryReasons(machine)[0] || "Adjust the product mix for this location."}` });
  if ((state.world?.hostility || 0) >= 55) tips.push({ level: "danger", text: "Corporate hostility is high. De-escalation paperwork can cool the room, expensively." });
  if ((state.corporate?.heat || 0) >= 45) tips.push({ level: "danger", text: "Audit heat is high. Avoid shady actions or hire an accountant." });
  const finalStatus = finalMachineCriticalStatus();
  if (finalStatus.critical) {
    tips.push({
      level: "danger",
      text: `Last-machine failure warning: ${state.finalMachineCriticalDays || 0}/${finalStatus.graceDays} critical days. Repair cost ${formatMoney(finalStatus.repairCost)}; ${finalStatus.reason}.`
    });
  }
  if (tips.length === 0) tips.push({ level: "good", text: "Route looks stable. Check prices, then run the next day." });
  el.advisorPanel.innerHTML = `
    <div class="mini-heading">
      <span>Route advisor</span>
      <button class="help-button small" data-help="advisor" aria-label="Route advisor help">?</button>
    </div>
    <div class="advisor-list">
      ${tips.slice(0, 3).map((tip) => `<p class="${tip.level}">${tip.text}</p>`).join("")}
    </div>
  `;
  bindHelpButtons(el.advisorPanel);
}

function renderExpensePreview() {
  if (!el.expensePreview) return;
  const preview = projectedNextDayExpenses();
  el.expensePreview.innerHTML = `
    <div class="mini-heading">
      <span>Next day projected expenses</span>
      <button class="help-button small" data-help="expenses" aria-label="Projected expenses help">?</button>
      <small class="estimate-tag">Estimated, not guaranteed</small>
    </div>
    <div class="expense-list">
      ${preview.items.map((item) => `
        <div class="expense-row">
          <span>${item.label}</span>
          <strong>${formatMoney(item.value)}</strong>
        </div>
      `).join("")}
      <div class="expense-row total">
        <span>Estimated total</span>
        <strong>${formatMoney(preview.total)}</strong>
      </div>
    </div>
    <div class="impact-list compact">${activeCityImpactLines()}</div>
    <p>${preview.note}</p>
  `;
  bindHelpButtons(el.expensePreview);
}

function projectedNextDayExpenses() {
  const legalReserve = estimateLegalExpenseReserve();
  const items = [
    { label: "Machine and location upkeep", value: estimatePredictableUpkeep() },
    { label: "Planned auto-restock", value: estimateAutoRestockSpend() },
    { label: "Corporate overhead", value: estimateCorporateOverhead() },
    { label: "Legal expenses reserve", value: legalReserve },
    { label: "Route complexity overhead", value: estimateExpansionOverhead() },
    { label: "Dead inventory drag", value: estimateDeadInventoryDrag() },
    { label: "Known event reserve", value: estimateKnownEventReserve() },
    { label: "Loan interest", value: estimateLoanInterest() }
  ];
  const total = items.reduce((sum, item) => sum + item.value, 0);
  return {
    items,
    total,
    note: "Estimate only. Manual restocks move already-paid warehouse stock, so they do not add projected cash expense. Random events, theft, spoilage, sales, and inspection drama are not guaranteed."
  };
}

function estimateDeadInventoryDrag() {
  return state.machines.reduce((sum, machine) => sum + deadInventoryDrag(machine), 0);
}

function defaultDailyBreakdown() {
  return {
    revenue: 0,
    upkeep: 0,
    autoRestock: 0,
    loanInterest: 0,
    principalRepayment: 0,
    corporateOverhead: 0,
    legalFines: 0,
    deadInventory: 0,
    theft: 0,
    spoilage: 0,
    operatingExpenses: 0,
    cashOutflow: 0
  };
}

function normalizeDailyBreakdown(raw = {}, day = {}) {
  const base = defaultDailyBreakdown();
  Object.keys(base).forEach((key) => {
    base[key] = Math.max(0, Math.round(Number(raw?.[key]) || 0));
  });
  base.revenue = Math.max(0, Math.round(Number(raw?.revenue ?? day.revenue) || 0));
  base.operatingExpenses = Math.max(0, Math.round(Number(raw?.operatingExpenses ?? day.expenses) || 0));
  base.cashOutflow = Math.max(base.operatingExpenses + base.autoRestock, Math.round(Number(raw?.cashOutflow) || 0));
  return base;
}

function estimatePredictableUpkeep() {
  return state.machines.reduce((sum, machine) => {
    const typeInfo = machineTypes[machine.type];
    const location = locationById(machine.location);
    return sum + machineDailyUpkeep(machine, typeInfo, location);
  }, 0);
}

function estimateAutoRestockSpend() {
  return products.reduce((sum, product) => {
    const policy = state.autoRestock[product.id];
    if (!policy?.enabled) return sum;
    const current = state.warehouse[product.id] || 0;
    if (current >= policy.min) return sum;
    const units = Math.min(10 + (state.corporate?.employees?.stocker || 0) * 3, policy.min - current);
    return sum + effectiveCost(product) * units;
  }, 0);
}

function estimateCorporateOverhead() {
  const employees = state.corporate?.employees || {};
  const wages = Object.entries(employeeTypes).reduce((sum, [id, employee]) => sum + (employees[id] || 0) * employee.wage, 0);
  const contract = securityContracts[state.corporate?.securityContract || "none"] || securityContracts.none;
  return wages + contract.dailyCost;
}

function estimateKnownEventReserve() {
  const pressureReserve = Object.keys(locations).reduce((sum, locationId) => {
    const pressure = competitionLocation(locationId);
    const landlord = pressure.landlordDays > 0 ? Math.round(locations[locationId].upkeep * 0.24 + pressure.level * 120) : 0;
    return sum + (pressure.level >= 3 ? pressure.level * 180 : 0) + landlord;
  }, 0);
  return pressureReserve;
}

function estimateLegalExpenseReserve() {
  const heat = state.corporate?.heat || 0;
  const tier = hostilityTier();
  const base = Math.round(heat * 34 + (state.world?.hostility || 0) * tier.legalFactor * 18);
  const counselFactor = state.corporate?.employees?.lawyer ? 0.68 : 1;
  return Math.round(base * counselFactor);
}

function estimateLoanInterest() {
  const debt = loanPrincipal();
  if (debt <= 0) return 0;
  return Math.ceil(debt * (((state.finance?.interestRate || financeDefaults.interestRate) + (worldModifier().loanInterest || 0)) / 7));
}

function loanPrincipal() {
  const principal = Math.max(0, Number(state.finance?.principal ?? state.finance?.debt) || 0);
  if (state.finance) state.finance.debt = principal;
  return principal;
}

function setLoanPrincipal(amount) {
  const principal = Math.max(0, Math.round(Number(amount) || 0));
  state.finance ||= { ...financeDefaults };
  state.finance.principal = principal;
  state.finance.debt = principal;
}

function companyValue() {
  const machines = (state.machines || []).reduce((sum, machine) => {
    const typeValue = effectiveMachineBuyCost(machine.type) * 0.62;
    const conditionFactor = clamp((machine.condition || 0) / 100, 0.15, 1);
    const stockValue = Object.entries(machine.stock || {}).reduce((stockSum, [productId, amount]) => {
      const product = productById(productId);
      return stockSum + (product ? effectiveCost(product) * Math.max(0, amount || 0) : 0);
    }, 0);
    return sum + Math.round(typeValue * conditionFactor) + stockValue + Math.max(0, machine.cash || 0);
  }, 0);
  const warehouseValue = Object.entries(state.warehouse || {}).reduce((sum, [productId, amount]) => {
    const product = productById(productId);
    return sum + (product ? effectiveCost(product) * Math.max(0, amount || 0) : 0);
  }, 0);
  return Math.max(0, Math.round((machines + warehouseValue + Math.max(0, state.cash)) * (worldModifier().companyValue || 1)));
}

function debtPressureRatio() {
  return clamp(loanPrincipal() / Math.max(1, companyValue()), 0, 2);
}

function machineDailyUpkeep(machine, typeInfo = machineTypes[machine.type], location = locationById(machine.location)) {
  const pressure = competitionLocation(machine.location);
  const landlordFee = pressure.landlordDays > 0 ? Math.round(location.upkeep * 0.24 + pressure.level * 120) : 0;
  const ageBurden = Math.max(0, (ensureMachineHistory(machine).daysActive - 18) * 9);
  return Math.round((typeInfo.upkeep + ageBurden) * (1 - (machine.upgrades?.efficiency || 0) * 0.12) * contractUpkeepFactor(machine) * worldUpkeepFactor(machine)) + Math.round(location.upkeep * worldLocationUpkeepFactor(machine.location)) + landlordFee;
}

function estimateExpansionOverhead() {
  const extraMachines = Math.max(0, state.machines.length - 3);
  const debtPressure = loanPrincipal() > 0 ? Math.round(loanPrincipal() * 0.006) : 0;
  const dominancePressure = Math.round(lateGamePressureScore() * 1800);
  return extraMachines * 680 + Math.max(0, extraMachines - 3) * 260 + debtPressure + dominancePressure;
}

function effectiveMachineBuyCost(type) {
  return Math.round((machineTypes[type]?.buyCost || 0) * (worldModifier().machineCost || 1));
}

function deadInventoryDrag(machine) {
  return Object.entries(machine.stock || {}).reduce((sum, [productId, amount]) => {
    if (amount <= 0) return sum;
    const product = productById(productId);
    if (!product) return sum;
    const fit = locationProductFactor(machine.location, productId);
    const excess = Math.max(0, amount - Math.ceil(machineCapacity(machine) * 0.28));
    return sum + (fit < 0.92 ? excess * Math.round(effectiveCost(product) * 0.08) : 0);
  }, 0);
}

function deadInventoryReasons(machine) {
  const reasons = [];
  Object.entries(machine.stock || {}).forEach(([productId, amount]) => {
    if (amount <= 0) return;
    const product = productById(productId);
    if (!product) return;
    const fit = locationProductFactor(machine.location, productId);
    const demand = priceDemandFactor(product, machine);
    const modifier = state.demandModifiers?.[productId];
    const excess = Math.max(0, amount - Math.ceil(machineCapacity(machine) * 0.28));
    if (fit < 0.92 && excess > 0) reasons.push(`${productDisplayName(product)}: poor location fit`);
    if (excess > 3) reasons.push(`${productDisplayName(product)}: overstocked for current shelf space`);
    if (demand < 0.7) reasons.push(`${productDisplayName(product)}: price is suppressing demand`);
    if (modifier && modifier.multiplier < 0.9) reasons.push(`${productDisplayName(product)}: active demand event is soft`);
  });
  return [...new Set(reasons)].slice(0, 3);
}

function lateGamePressureScore() {
  const profit = Math.max(0, state.stats?.daily?.slice(-7).reduce((sum, day) => sum + (day.profit || 0), 0) || 0);
  const machines = Math.max(0, state.machines.length - 3) / 8;
  const alcoholExposure = (state.machines || []).filter((machine) => machine.type === "alcohol").length * 0.05;
  const cash = Math.max(0, state.cash - 90000) / 180000;
  const dominance = Math.max(0, ...Object.keys(locations).map((locationId) => districtDominance(locationId)));
  const identity = ensureOperatorProfile().identityPath?.id !== "unformed" ? 0.12 : 0;
  return clamp(machines + alcoholExposure + cash + profit / 140000 + dominance * 0.35 + identity + (state.world?.hostility || 0) / 220, 0, 1.6);
}

function corporatePressureGameplayEffects(value = state.world?.hostility || 0) {
  const hostility = clamp(Number(value) || 0, 0, 100);
  return {
    takeoverBonus: hostility >= 75 ? 12 : hostility >= 50 ? 7 : hostility >= 25 ? 3 : 0,
    auditChanceBonus: hostility >= 75 ? 0.012 : hostility >= 50 ? 0.007 : hostility >= 25 ? 0.003 : 0,
    reputationDrag: hostility >= 75 ? 0.24 : hostility >= 50 ? 0.12 : hostility >= 25 ? 0.04 : 0,
    supplierReluctance: hostility >= 75 ? 0.045 : hostility >= 50 ? 0.025 : hostility >= 25 ? 0.01 : 0,
    locationPressureChance: hostility >= 75 ? 0.035 : hostility >= 50 ? 0.02 : hostility >= 25 ? 0.01 : 0
  };
}

function lateGameStage() {
  const value = companyValue();
  const dominance = Math.max(0, ...Object.keys(locations).map((locationId) => districtDominance(locationId)));
  const triggers = [
    state.day >= 30,
    state.cash >= 160000,
    value >= 260000,
    state.machines.length >= 5,
    dominance >= 0.55 && state.machines.length >= 4,
    (state.world?.hostility || 0) >= 55,
    loanPrincipal() >= 95000 && state.machines.length >= 3
  ].filter(Boolean).length;
  if (triggers >= 3 || state.day >= 60 || value >= 420000 || state.machines.length >= 8) return "deep";
  if (triggers >= 1) return "early";
  return "none";
}

function isLateGame(stage = "early") {
  const current = lateGameStage();
  if (stage === "deep") return current === "deep";
  return current === "early" || current === "deep";
}

function financialStanding() {
  const debt = loanPrincipal();
  if (debt <= 0 && state.cash >= 25000) return { id: "good", label: "clean" };
  if (debt <= 18000) return { id: "strained", label: "strained" };
  if (debt <= 45000) return { id: "leveraged", label: "leveraged" };
  return { id: "distressed", label: "distressed" };
}

function contractEligibility(contractId) {
  const contract = contractDefs[contractId];
  if (!contract) return { ok: false, reason: "Unknown paperwork." };
  if (state.contracts?.[contractId]) return { ok: false, reason: "Already licensed." };
  if (reputation() < contract.rep) return { ok: false, reason: `Requires ${contract.rep}% reputation.` };
  if (loanPrincipal() > contract.debtLimit) return { ok: false, reason: `Debt must be under ${formatMoney(contract.debtLimit)}.` };
  if (contract.maxHeat !== undefined && (state.corporate?.heat || 0) > contract.maxHeat) return { ok: false, reason: `Audit heat must be under ${contract.maxHeat + 1}%.` };
  if (state.cash < contract.cost) return { ok: false, reason: `Requires ${formatMoney(contract.cost)} cash.` };
  return { ok: true, reason: "Eligible." };
}

function buyContract(contractId) {
  const contract = contractDefs[contractId];
  const eligibility = contractEligibility(contractId);
  if (!contract || !eligibility.ok) {
    addLog(`Contract denied: ${eligibility.reason}`);
    render();
    return;
  }
  state.cash -= contract.cost;
  state.contracts[contractId] = { acquiredDay: state.day };
  state.brandBuzz = clamp(state.brandBuzz + 1.4, 0, 100);
  addLog(`${contract.label} acquired. The paperwork smiled without warmth.`);
  render();
}

function loanEligibility(offerId) {
  const offer = loanOffers[offerId];
  if (!offer) return { ok: false, reason: "Unknown financing product." };
  const value = companyValue();
  const principal = loanPrincipal();
  const projectedDebt = principal + offer.amount;
  const maxDebt = Math.max(offer.amount * 0.55, value * offer.maxDebtFactor);
  if (state.gameOver) return { ok: false, reason: "Route terminated. Finance closed the little window." };
  if (state.machines.length < offer.minMachines) return { ok: false, reason: `Requires ${offer.minMachines} machine(s).` };
  if (reputation() < offer.minRep) return { ok: false, reason: `Requires ${offer.minRep}% reputation.` };
  if (offer.minCompanyValue && value < offer.minCompanyValue) return { ok: false, reason: `Company value must reach ${formatMoney(offer.minCompanyValue)}.` };
  if (offer.maxHeat !== undefined && (state.corporate?.heat || 0) > offer.maxHeat) return { ok: false, reason: `Audit heat must be under ${offer.maxHeat + 1}%.` };
  if (offer.maxHostility !== undefined && (state.world?.hostility || 0) > offer.maxHostility) return { ok: false, reason: `Hostility must be under ${offer.maxHostility + 1}%.` };
  if (projectedDebt > maxDebt) return { ok: false, reason: `Debt pressure too high. Max comfortable principal: ${formatMoney(maxDebt)}.` };
  if (state.cash < -12000 && offerId !== "payday") return { ok: false, reason: "Only Payday Float is available while cash is deeply negative." };
  return { ok: true, reason: "Eligible." };
}

function takeLoan(offerId) {
  const offer = loanOffers[offerId];
  const status = loanEligibility(offerId);
  if (!offer || !status.ok) {
    addLog(`Loan denied: ${status.reason}`);
    render();
    return;
  }
  const previousPrincipal = loanPrincipal();
  const newPrincipal = previousPrincipal + offer.amount;
  const blendedRate = previousPrincipal > 0
    ? ((previousPrincipal * (state.finance.interestRate || financeDefaults.interestRate)) + (offer.amount * offer.interestRate)) / newPrincipal
    : offer.interestRate;
  state.cash += offer.amount;
  setLoanPrincipal(newPrincipal);
  state.finance.interestRate = clamp(blendedRate, 0.035, 0.12);
  state.finance.loansTaken = (state.finance.loansTaken || 0) + 1;
  addOperatorChoiceSignal("debtGrowth", offer.amount >= 80000 ? 1.5 : 0.8);
  if (offerId === "corporateGrowth") addOperatorChoiceSignal("corporateCompliance", 0.8);
  addLog(`${offer.label} accepted: ${formatMoney(offer.amount)} cash added, principal now ${formatMoney(newPrincipal)}, blended rate ${Math.round(state.finance.interestRate * 1000) / 10}%.`);
  const fourthWall = maybeFourthWallMoment("finance");
  if (fourthWall) addLog(fourthWall.text);
  render();
}

function repayLoan(amountMode = "5000") {
  const debt = loanPrincipal();
  if (debt <= 0 || state.cash <= 0) return;
  const requested = amountMode === "max" ? state.cash : Number(amountMode) || 0;
  const amount = Math.max(0, Math.min(debt, state.cash, requested));
  if (amount <= 0) return;
  state.cash -= amount;
  setLoanPrincipal(debt - amount);
  state.finance.totalRepaid += amount;
  state.finance.lastPrincipalPayment = amount;
  state.brandBuzz = clamp(state.brandBuzz + 0.4, 0, 100);
  addOperatorChoiceSignal("cautious", amount >= 12000 ? 0.7 : 0.3);
  addLog(`Repaid ${formatMoney(amount)} principal. Remaining principal: ${formatMoney(loanPrincipal())}. Finance responded with a smaller frown.`);
  const fourthWall = maybeFourthWallMoment("finance");
  if (fourthWall) addLog(fourthWall.text);
  evaluateGameOver("repayment");
  render();
}

function bankruptcyThreshold() {
  return BANKRUPTCY_BASE_THRESHOLD - Math.min(25000, Math.max(0, state.machines.length - 1) * 3500);
}

function evaluateGameOver(source = "system") {
  if (!state.started || state.gameOver) return false;
  const reason = gameOverReason();
  if (!reason) return false;
  state.gameOver = {
    ...reason,
    day: state.day
  };
  incrementLocalCounter("wending-game-overs");
  state.runningDay = false;
  addLog(`ROUTE TERMINATED: ${reason.detail}`);
  return true;
}

function gameOverReason() {
  const threshold = bankruptcyThreshold();
  if (state.cash < threshold) {
    return {
      reason: "Bankruptcy",
      detail: `Cash fell below ${formatMoney(threshold)}. Finance has classified the route as a cautionary object lesson.`
    };
  }
  if (reputation() <= 0) {
    return {
      reason: "Reputation collapsed",
      detail: "Reputation reached 0%. The public has declined further interaction with your rectangles."
    };
  }
  if (state.machines.length <= 0) {
    return {
      reason: "No machines remain",
      detail: "The company owns no working vending assets. This is more concept than business."
    };
  }
  if (state.machines.length === 1) {
    const status = finalMachineCriticalStatus();
    if (status.critical && state.finalMachineCriticalDays >= status.graceDays && !status.canRecover) {
      return {
        reason: "Final machine failure",
        detail: `${safeMachineName(status.machine)} stayed critically damaged for ${state.finalMachineCriticalDays}/${status.graceDays} days. Repair cost ${formatMoney(status.repairCost)} is not affordable and no available loan can cover it. The route is no longer recoverable.`
      };
    }
  }
  return null;
}

function finalMachineCriticalStatus() {
  const usableMachines = (state.machines || []).filter((machine) => !machine.broken && machine.condition > 18);
  if (state.machines.length !== 1 || usableMachines.length > 1) {
    return { critical: false, machine: null, graceDays: 3, repairCost: 0, canRecover: true, reason: "" };
  }
  const machine = state.machines[0];
  const critical = machine.condition <= 12 || (machine.broken && machine.condition <= 24);
  const repairCost = machineRepairCost(machine);
  const canAfford = state.cash >= repairCost;
  const loan = Object.keys(loanOffers).find((id) => loanEligibility(id).ok && state.cash + loanOffers[id].amount >= repairCost);
  return {
    critical,
    machine,
    graceDays: 3,
    repairCost,
    canRecover: !critical || canAfford || Boolean(loan),
    reason: canAfford ? "repair affordable" : loan ? `${loanOffers[loan].label} can cover repair` : "no repair financing available"
  };
}

function updateFinalMachineCriticalState(events = []) {
  const status = finalMachineCriticalStatus();
  if (!status.critical) {
    if (state.finalMachineCriticalDays > 0) events.push("Final-machine critical status cleared. The route stopped staring into the accounting void.");
    state.finalMachineCriticalDays = 0;
    return status;
  }
  state.finalMachineCriticalDays = Math.min(status.graceDays, (state.finalMachineCriticalDays || 0) + 1);
  events.push(`${safeMachineName(status.machine)} is critically damaged: ${state.finalMachineCriticalDays}/${status.graceDays} days. Repair it or secure financing before the route collapses. Recovery note: ${status.reason}.`);
  return status;
}

function renderGameOverOverlay() {
  if (!el.gameOverOverlay) return;
  const active = Boolean(state.gameOver);
  el.gameOverOverlay.classList.toggle("show", active);
  el.gameOverOverlay.setAttribute("aria-hidden", active ? "false" : "true");
  if (!active) return;
  el.gameOverTitle.textContent = state.gameOver.reason || "Route terminated";
  el.gameOverReason.textContent = `Day ${state.gameOver.day}: ${state.gameOver.detail}`;
}

function startNewFromGameOver() {
  state.gameOver = null;
  state.started = false;
  state.runningDay = false;
  el.startScreen?.classList.remove("hidden");
  render();
}

function showLoadOptionsFromGameOver() {
  const firstSave = [1, 2, 3].map((slot) => ({ slot, save: readSave(slot) })).find((entry) => entry.save?.state);
  if (firstSave) {
    loadGame(firstSave.slot);
    return;
  }
  addLog("No local save slots found. Use Import JSON from the start screen to replace the terminated route.");
  state.gameOver = null;
  state.started = false;
  el.startScreen?.classList.remove("hidden");
  render();
}

function machinePurchaseEligibility(type) {
  const info = machineTypes[type];
  const rule = machineProgression[type];
  if (!info || !rule) return { ok: false, reason: "Unknown machine category." };
  if (rule.contract && !state.contracts?.[rule.contract]) return { ok: false, reason: machineProgression[type].text };
  if (reputation() < rule.rep) return { ok: false, reason: `Requires ${rule.rep}% reputation.` };
  if (rule.maxHeat !== undefined && (state.corporate?.heat || 0) > rule.maxHeat) return { ok: false, reason: `Audit heat must be under ${rule.maxHeat + 1}%.` };
  if (state.cash - effectiveMachineBuyCost(type) < rule.minCashAfterPurchase) return { ok: false, reason: `Requires stronger cash position after purchase.` };
  if (financialStanding().id === "distressed" && type !== "snack") return { ok: false, reason: "Debt standing too distressed for expansion." };
  return { ok: true, reason: "Eligible." };
}

function contractUpkeepFactor(machine) {
  const contractId = Object.keys(contractDefs).find((id) => contractDefs[id].machineType === machine.type);
  if (!contractId || !state.contracts?.[contractId]) return 1;
  return contractDefs[contractId].upkeepFactor;
}

function contractDemandFactor(machine) {
  const contractId = Object.keys(contractDefs).find((id) => contractDefs[id].machineType === machine.type);
  if (!contractId || !state.contracts?.[contractId]) return 1;
  return contractDefs[contractId].demandFactor;
}

function renderMachineProducts(machine) {
  el.products.innerHTML = "";
  productsForType(machine.type).forEach((product) => {
    const amount = machine.stock[product.id] || 0;
    const demand = Math.round(priceDemandFactor(product, machine) * 100);
    const margin = productMargin(product);
    const guidance = priceGuidance(product, machine);
    const suggestion = restockSuggestion(machine, product);
    const maxRestock = maxManualRestock(machine, product.id);
    const row = document.createElement("div");
    row.className = "product-row";
    row.innerHTML = `
      <div>
        <div class="product-title" title="${productCategoryName(product)}">${productDisplayName(product)}</div>
        <div class="product-meta">
          loaded: ${amount} pcs - warehouse: ${state.warehouse[product.id] || 0} pcs - demand ${demand}% - margin ${formatMoney(margin)}
          ${supplyTag(product)}${demandTag(product)}
        </div>
        <div class="pricing-hint ${guidance.tone}">${guidance.text}</div>
        <label class="price-control">
          Price
          <input type="number" min="${Math.round(product.basePrice * 0.45)}" step="10" value="${product.price}" data-price-product="${product.id}">
        </label>
      </div>
      <div class="restock-control">
        <span>Suggested ${suggestion.qty}</span>
        <small>${suggestion.reason}</small>
        <label>
          Qty
          <input type="number" min="0" max="${maxRestock}" value="${suggestion.qty}" data-restock-qty="${product.id}">
        </label>
        <button data-restock-product="${product.id}">Restock</button>
      </div>
    `;
    el.products.append(row);
    const button = row.querySelector("[data-restock-product]");
    button.disabled = maxRestock <= 0 || state.runningDay;
    button.addEventListener("click", () => {
      const input = row.querySelector(`[data-restock-qty="${product.id}"]`);
      refillProduct(machine.id, product.id, input.value);
    });
  });

  el.products.querySelectorAll("[data-price-product]").forEach((input) => {
    input.addEventListener("change", () => updateProductPrice(input.dataset.priceProduct, input.value));
  });
}

function maxManualRestock(machine, productId) {
  return Math.max(0, Math.min(machineCapacity(machine) - machineStockTotal(machine), state.warehouse[productId] || 0));
}

function recentProductSales(productId, machineId = null, days = 5) {
  return state.stats.daily.slice(-days).reduce((sum, day) => {
    const allProducts = day.soldByProduct?.[productId] || 0;
    const machineProducts = machineId ? day.soldByMachineProduct?.[machineId]?.[productId] : null;
    return sum + (machineId && machineProducts !== null && machineProducts !== undefined ? machineProducts : allProducts);
  }, 0);
}

function restockSuggestion(machine, product) {
  const maxQty = maxManualRestock(machine, product.id);
  if (maxQty <= 0) return { qty: 0, reason: "No space or warehouse stock." };
  const recent = recentProductSales(product.id, machine.id, 5);
  const location = locationById(machine.location);
  const eventDemand = state.demandModifiers[product.id]?.multiplier || 1;
  const synergy = locationProductFactor(machine.location, product.id);
  const baselineByType = { snack: 5, drink: 5, coffee: 6, fresh: 3, alcohol: 4 };
  const recentSignal = recent > 0 ? Math.ceil(recent * 1.2) : baselineByType[machine.type] || 4;
  const locationSignal = location.demand >= 1.25 ? 2 : location.demand <= 1 ? -1 : 0;
  const synergySignal = synergy >= 1.15 ? 2 : synergy <= 0.88 ? -2 : 0;
  const eventSignal = eventDemand > 1.15 ? 2 : eventDemand < 0.9 ? -1 : 0;
  const qty = clamp(Math.round(recentSignal + locationSignal + synergySignal + eventSignal), 0, maxQty);
  const reasons = [];
  if (recent > 0) reasons.push(`${recent} sold recently`);
  else reasons.push(`${machineTypes[machine.type].label.toLowerCase()} baseline`);
  if (locationSignal > 0) reasons.push("busy location");
  if (synergySignal > 0) reasons.push("strong local fit");
  if (synergySignal < 0) reasons.push("weak local fit");
  if (eventSignal > 0) reasons.push("demand event");
  if (eventSignal < 0) reasons.push("soft demand event");
  return { qty, reason: reasons.join(", ") };
}

function priceGuidance(product, machine = currentMachine()) {
  const demand = priceDemandFactor(product, machine);
  const margin = productMargin(product);
  const ratio = product.price / product.basePrice;
  if (margin <= 0) return { tone: "danger", text: "Selling at a loss. Raise price or wait for cheaper supply." };
  if (demand < 0.62) return { tone: "danger", text: "Demand is weak. This price is probably too high right now." };
  if (ratio < 0.78 && demand > 1.15) return { tone: "warn", text: "Bargain pricing: high demand, but you may be leaving margin behind." };
  if (priceWarFactor(product, machine) < 0.9) return { tone: "warn", text: "Price war pressure is active. Competitive pricing matters more today." };
  if (state.corporate?.substitutes?.[product.id]) return { tone: "warn", text: "Substitute active: cheaper stock, slightly lower demand, higher audit heat." };
  return { tone: "good", text: "Price looks workable for current demand and costs." };
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
  const damage = autoRestockDamageRate();
  const stockers = state.corporate?.employees?.stocker || 0;
  const note = document.createElement("div");
  note.className = "corp-note";
  note.innerHTML = `Transit damage risk: ${Math.round(damage * 1000) / 10}% per auto-delivered unit. Route Stockers hired: ${stockers}/3. Manual stock already placed in machines is unaffected. <button class="inline-help" data-help="routeStockers" aria-label="Route Stockers help">?</button>`;
  el.autoRestock.append(note);
  products.forEach((product) => {
    const policy = state.autoRestock[product.id] || { enabled: false, min: 5 };
    const row = document.createElement("label");
    row.className = "auto-row";
    row.innerHTML = `
      <span title="${productCategoryName(product)}">${productDisplayName(product)}</span>
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
  bindHelpButtons(el.autoRestock);
}

function autoRestockDamageRate() {
  const stockers = clamp(Math.round(Number(state.corporate?.employees?.stocker) || 0), 0, 3);
  return [0.08, 0.04, 0.016, 0.005][stockers] || 0.08;
}

function damagedAutoRestockUnits(units) {
  const rate = autoRestockDamageRate();
  const expected = units * rate;
  const whole = Math.floor(expected);
  const fractional = expected - whole;
  return clamp(whole + (Math.random() < fractional ? 1 : 0), 0, units);
}

function renderProductWindows(machine) {
  el.productWindows.innerHTML = "";
  Object.entries(machine.stock).forEach(([id, amount]) => {
    const product = productById(id);
    const tile = document.createElement("div");
    tile.className = `product-sprite ${amount < 3 ? "low" : ""}`;
    tile.style.background = product.color;
    tile.title = `${productDisplayName(product)} (${amount} pcs)`;
    tile.textContent = productDisplayName(product).split(" ")[0];
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
        <div class="product-title" title="${productCategoryName(product)}">${productDisplayName(product)}</div>
        <div class="stock-meta">Wholesale: ${formatMoney(effectiveCost(product))} - base ${formatMoney(product.baseCost)} - warehouse: ${state.warehouse[product.id] || 0} pcs${supplyTag(product)}</div>
        <div class="freshness-line">${condition}</div>
      </div>
      <strong>${product.type}</strong>
    `;
    el.warehouse.append(row);
  });
}

function renderCorporate() {
  if (!el.corporate) return;
  if (!corporateUnlocked()) {
    el.corporate.innerHTML = `
      <section class="corp-locked">
        <strong>Corporate systems locked</strong>
        <span>Unlocks on Day 8, after buying a second machine, or after reaching ${formatMoney(100000)} cash.</span>
        <small>For now, focus on pricing, restocking, service, and location pressure.</small>
      </section>
    `;
    return;
  }
  const corporate = state.corporate;
  const employeeRows = Object.entries(employeeTypes).map(([id, employee]) => {
    const level = corporate.employees[id] || 0;
    const hireCost = employee.cost * (level + 1);
    return `
      <div class="corp-row">
        <div>
          <strong>${employee.label}</strong>
          <span>${employee.text}</span>
          <small>${level}/${employee.max} hired - wage ${formatMoney(employee.wage)}/day each</small>
        </div>
        <button data-hire="${id}" ${level >= employee.max || state.cash < hireCost || state.runningDay ? "disabled" : ""}>Hire ${formatMoney(hireCost)}</button>
      </div>
    `;
  }).join("");
  const supplierRows = Object.entries(supplierModes).map(([id, supplier]) => `
    <button class="choice-pill ${corporate.supplierMode === id ? "active" : ""}" data-supplier="${id}" ${state.runningDay ? "disabled" : ""}>
      <strong>${supplier.label}</strong>
      <span>${supplier.text}</span>
    </button>
  `).join("");
  const securityRows = Object.entries(securityContracts).map(([id, contract]) => `
    <button class="choice-pill ${corporate.securityContract === id ? "active" : ""}" data-security-contract="${id}" ${state.runningDay ? "disabled" : ""}>
      <strong>${contract.label}</strong>
      <span>${formatMoney(contract.dailyCost)}/day - ${contract.text}</span>
    </button>
  `).join("");
  const substituteRows = products.map((product) => `
    <label class="sub-row">
      <span>
        <strong title="${productCategoryName(product)}">${productDisplayName(product)}</strong>
        <small>${corporate.substitutes[product.id] ? "Substitute active: cheaper, weaker demand, more audit heat." : "Original product."}</small>
      </span>
      <input type="checkbox" data-substitute="${product.id}" ${corporate.substitutes[product.id] ? "checked" : ""} ${state.runningDay ? "disabled" : ""}>
    </label>
  `).join("");
  const target = selectedCorporation();
  const corporationOptions = activeCorporations().map((company) => `<option value="${company.id}" ${target?.id === company.id ? "selected" : ""}>${company.label} - ${company.status} - rep ${Math.round(company.rep || 0)}%</option>`).join("");
  const corporationCards = activeCorporations().map((company) => {
    const contested = Object.entries(locations)
      .filter(([locationId]) => competitionLocation(locationId).companyId === company.id)
      .map(([, location]) => location.label)
      .slice(0, 3);
    const activeEffects = (state.world?.corporateEffects || []).filter((effect) => effect.companyId === company.id && (effect.daysLeft || 0) > 0);
    return `
      <article class="corp-dossier ${target?.id === company.id ? "selected" : ""}">
        <div>
          <strong>${company.label}</strong>
          <span>${company.archetype || company.personality || "Rival operator"}</span>
        </div>
        <small>Status ${company.status || "active"} - Hostility ${Math.round(company.hostility || 0)}% - Reputation ${Math.round(company.rep || 0)}% - Share ${Math.round(company.marketShare || 0)}%</small>
        <small>Pressure: ${contested.length ? contested.join(", ") : "no hot district filed"}${activeEffects.length ? ` - Active effect: ${activeEffects.map((effect) => `${effect.type} ${effect.daysLeft}d`).join(", ")}` : ""}</small>
      </article>
    `;
  }).join("");
  const warfareRows = Object.entries(corporateWarfareActions).map(([id, action]) => {
    const cooldown = state.world?.warfareCooldowns?.[id] || 0;
    const cost = effectiveWarfareActionCost(id, action);
    const locked = action.requires && !action.requires(target, currentMachine());
    const disabled = state.runningDay || state.cash < cost || cooldown > 0 || !currentMachine() || locked;
    return `
      <div class="corp-row">
        <div>
          <strong>${action.label}</strong>
          <span>${action.text}</span>
          <small>${formatMoney(cost)} - target ${target?.label || "none"} - heat ${action.heat >= 0 ? "+" : ""}${action.heat}${cooldown > 0 ? ` - cooldown ${cooldown}d` : locked ? " - locked" : " - ready"} - failure/backlash possible</small>
        </div>
        <button data-warfare="${id}" ${disabled ? "disabled" : ""}>Authorize</button>
      </div>
    `;
  }).join("");
  const tier = hostilityTier();
  el.corporate.innerHTML = `
    <section class="corp-summary ${corporate.heat >= 45 ? "hot" : ""} ${tier.id === "siege" ? "siege" : ""}">
      <div>
        <span>Audit heat</span>
        <strong>${Math.round(corporate.heat)}%</strong>
      </div>
      <div>
        <span>Fines paid</span>
        <strong>${formatMoney(corporate.fines)}</strong>
      </div>
      <div>
        <span>Wages paid</span>
        <strong>${formatMoney(corporate.wagesPaid)}</strong>
      </div>
      <div>
        <span>Hostility</span>
        <strong>${tier.label}</strong>
      </div>
    </section>
    <section class="corp-section">
      <h3>Employees <button class="help-button small" data-help="employees" aria-label="Employees help">?</button></h3>
      ${employeeRows}
    </section>
    <section class="corp-section">
      <h3>Suppliers <button class="help-button small" data-help="suppliers" aria-label="Supplier policy help">?</button></h3>
      <div class="choice-grid">${supplierRows}</div>
    </section>
    <section class="corp-section">
      <h3>Security contract <button class="help-button small" data-help="contracts" aria-label="Security contract help">?</button></h3>
      <div class="choice-grid">${securityRows}</div>
    </section>
    <section class="corp-section">
      <h3>Black market inventory <button class="help-button small" data-help="blackMarket" aria-label="Black market help">?</button></h3>
      <p class="corp-note">Last supplier: ${blackMarketSuppliers.find((supplier) => supplier.id === corporate.lastBlackMarketSupplier)?.label || "none"} - scandals filed: ${corporate.blackMarketScandals || 0}</p>
      <button class="wide-action" data-black-market ${state.cash < 6400 || state.runningDay ? "disabled" : ""}>Buy mystery crate ${formatMoney(6400)}</button>
      <div class="sub-list compact-substitutes">
        <h4>Questionable substitutes <button class="help-button small" data-help="substitutes" aria-label="Substitutes help">?</button></h4>
        ${substituteRows}
      </div>
    </section>
    <section class="corp-section">
      <h3>Corporate warfare <button class="help-button small" data-help="competition" aria-label="Corporate warfare help">?</button></h3>
      <div class="hostility-card">
        <strong>${tier.label} - ${Math.round(state.world?.hostility || 0)}% <button class="inline-help" data-help="hostility" aria-label="Corporate hostility help">?</button></strong>
        <span>${tier.text}</span>
        <small>De-escalation cost factor: x${tier.deescalationCostFactor}. Legal Counsel reduces legal-event penalties. <button class="inline-help" data-help="legalPressure" aria-label="Lawsuits and audits help">?</button></small>
        <small>${legalPressureSummary()}</small>
      </div>
      <label class="corp-target">
        Target corporation
        <select data-corporation-target ${state.runningDay ? "disabled" : ""}>${corporationOptions}</select>
      </label>
      <div class="corp-dossier-list">${corporationCards}</div>
      <p class="corp-note">${corporatePressureSummary()}</p>
      <div class="impact-list compact">${activeCorporateEffectLines()}</div>
      ${warfareRows}
    </section>
    <section class="corp-section">
      <h3>Rival stability</h3>
      <div class="pressure-list">${renderRivalStabilitySummary()}</div>
    </section>
  `;
  bindHelpButtons(el.corporate);
  el.corporate.querySelectorAll("[data-hire]").forEach((button) => {
    button.addEventListener("click", () => hireEmployee(button.dataset.hire));
  });
  el.corporate.querySelectorAll("[data-supplier]").forEach((button) => {
    button.addEventListener("click", () => setSupplierMode(button.dataset.supplier));
  });
  el.corporate.querySelectorAll("[data-security-contract]").forEach((button) => {
    button.addEventListener("click", () => setSecurityContract(button.dataset.securityContract));
  });
  el.corporate.querySelectorAll("[data-substitute]").forEach((input) => {
    input.addEventListener("change", () => toggleSubstitute(input.dataset.substitute, input.checked));
  });
  el.corporate.querySelector("[data-black-market]")?.addEventListener("click", buyBlackMarketCrate);
  el.corporate.querySelector("[data-corporation-target]")?.addEventListener("change", (event) => {
    state.world.targetCorporationId = event.target.value;
    render();
  });
  el.corporate.querySelectorAll("[data-warfare]").forEach((button) => {
    button.addEventListener("click", () => runCorporateWarfare(button.dataset.warfare));
  });
}

function corporateUnlocked() {
  return state.day >= 8 || state.machines.length >= 2 || state.cash >= 100000 || (state.corporate?.heat || 0) > 0;
}

function effectiveWarfareActionCost(actionId, action = corporateWarfareActions[actionId]) {
  if (!action) return 0;
  const tier = hostilityTier();
  const factor = actionId === "deescalate" ? tier.deescalationCostFactor : 1 + Math.max(0, (state.world?.hostility || 0) - 50) * 0.002;
  return Math.round(action.cost * factor);
}

function applyRivalDamageFromWarfare(actionId, locationId, events) {
  const pressure = competitionLocation(locationId);
  const company = pressure.companyId ? competitorById(pressure.companyId) : null;
  if (!company) return;
  const damageByAction = {
    scout: 0.6,
    bribe: 1.2,
    hygiene: 2.6,
    adBlitz: 1,
    intimidation: 3.2,
    deescalate: 0.3
  };
  const damage = damageByAction[actionId] || 0;
  if (damage <= 0) return;
  company.rep = clamp((company.rep || 50) - damage, 4, 100);
  events.push(`${company.label} lost ${damage.toFixed(1)} reputation near ${locationById(locationId).label}. Rival stability is no longer theoretical.`);
}

function hostilityTier(value = state.world?.hostility || 0) {
  const hostility = clamp(Math.round(Number(value) || 0), 0, 100);
  if (hostility >= 75) {
    return {
      id: "siege",
      label: "Legal warfare",
      text: "Audits, lawsuits, lease pressure, retaliation, and city interference are all more likely.",
      auditFactor: 1.34,
      legalFactor: 1.62,
      retaliationFactor: 1.55,
      deescalationCostFactor: 1.32
    };
  }
  if (hostility >= 50) {
    return {
      id: "hostile",
      label: "Hostile",
      text: "Competitors retaliate harder. Legal and lease pressure become serious operating costs.",
      auditFactor: 1.18,
      legalFactor: 1.28,
      retaliationFactor: 1.25,
      deescalationCostFactor: 1.14
    };
  }
  if (hostility >= 25) {
    return {
      id: "watched",
      label: "Watched",
      text: "Corporate actions are noticed. Audit and interference chances are moderately higher.",
      auditFactor: 1.08,
      legalFactor: 1.08,
      retaliationFactor: 1.08,
      deescalationCostFactor: 1
    };
  }
  return {
    id: "contained",
    label: "Contained",
    text: "Rivals are aware of you, but the paperwork has not started breathing yet.",
    auditFactor: 1,
    legalFactor: 1,
    retaliationFactor: 1,
    deescalationCostFactor: 0.92
  };
}

function corporatePressureSummary() {
  const hostility = Math.round(state.world?.hostility || 0);
  const hotLocations = Object.keys(locations).filter((locationId) => (competitionLocation(locationId).level || 0) >= 3).length;
  const cooldowns = Object.values(state.world?.warfareCooldowns || {}).filter((days) => days > 0).length;
  const tier = hostilityTier(hostility);
  const effects = corporatePressureGameplayEffects(hostility);
  return `Corporate pressure: ${tier.label}. Hostility ${hostility}%, ${hotLocations} hot district(s), ${cooldowns} warfare cooldown(s). Effects: takeover risk +${effects.takeoverBonus}%, audit chance +${Math.round(effects.auditChanceBonus * 1000) / 10}%, supplier reluctance +${Math.round(effects.supplierReluctance * 1000) / 10}%, reputation drag ${effects.reputationDrag ? `-${effects.reputationDrag}/day` : "none"}. ${tier.text} Use De-escalation paperwork, premium suppliers, legal counsel, and lower-heat choices to cool it.`;
}

function legalPressureSummary() {
  const heat = Math.round(state.corporate?.heat || 0);
  const hostility = Math.round(state.world?.hostility || 0);
  const lawyer = state.corporate?.employees?.lawyer || 0;
  const dominance = Math.round(Math.max(0, ...Object.keys(locations).map((locationId) => districtDominance(locationId))) * 100);
  const factors = [];
  if (hostility >= 50) factors.push("hostility");
  if (heat >= 28) factors.push("audit heat");
  if (dominance >= 42 && state.machines.length >= 5) factors.push("district dominance");
  if ((state.machines || []).some((machine) => machine.type === "alcohol")) factors.push("alcohol license exposure");
  if (Object.values(state.corporate?.substitutes || {}).some(Boolean) || (state.corporate?.blackMarketSpend || 0) > 0) factors.push("questionable procurement");
  return `Legal pressure: audit heat ${heat}%, hostility contribution ${hostility}%, lawsuit factors ${factors.join(" / ") || "quiet"}, Legal Counsel ${lawyer ? "active" : "not hired"}.`;
}

function renderRivalStabilitySummary() {
  return (state.competition?.companies || []).map((company) => {
    const contested = Object.keys(locations).filter((locationId) => competitionLocation(locationId).companyId === company.id).length;
    const rep = Math.round(company.rep || 0);
    const stateLabel = company.status || corporationStatusFromRep(rep);
    return `
      <div class="pressure-row ${rep <= 12 ? "hot" : ""}">
        <span>${company.label}</span>
        <strong>${stateLabel}</strong>
        <small>${company.archetype || "Vending corporation"} - rep ${rep}% - hostility ${Math.round(company.hostility || 0)}% - share ${Math.round(company.marketShare || 0)}% - ${contested} contested district(s)</small>
        <small>Tactics: ${(company.tactics || []).join(", ") || "none filed"} - Weakness: ${(company.weaknesses || []).join(", ") || "unknown"}</small>
      </div>
    `;
  }).join("");
}

function activeCityImpactLines() {
  const active = Object.entries(state.world?.modifierDays || {}).filter(([, days]) => days > 0);
  const cityLines = active.map(([id, days]) => {
    const event = cityImpactEvents.find((item) => item.id === id);
    return `<p class="impact-pill"><strong>${event?.text || id}</strong><span>${days} day(s) remaining - ${cityImpactSummary(id)}</span></p>`;
  });
  const corporateLines = (state.world?.corporateEffects || []).filter((effect) => (effect.daysLeft || 0) > 0).map((effect) => `<p class="impact-pill"><strong>${effect.source}: ${effect.type}</strong><span>${corporateEffectSummary(effect)} - ${effect.text}</span></p>`);
  if (!cityLines.length && !corporateLines.length) return "<p class=\"corp-note\">No active city modifiers. The city is pretending to be normal.</p>";
  return [...cityLines, ...corporateLines].join("");
}

function cityImpactSummary(id) {
  const modifier = { machineCost: 1, upkeep: 1, demand: 1, theft: 1, audit: 0, loanInterest: 0, companyValue: 1, supplyByType: {}, upkeepByType: {}, locationUpkeep: {}, locationDemand: {}, securityByLocation: {}, theftByLocation: {}, cleanByLocation: {} };
  cityImpactEvents.find((item) => item.id === id)?.apply(modifier);
  const bits = [];
  if (modifier.machineCost !== 1) bits.push(`machine prices x${Math.round(modifier.machineCost * 100)}%`);
  if (modifier.upkeep !== 1) bits.push(`upkeep x${Math.round(modifier.upkeep * 100)}%`);
  if (modifier.demand !== 1) bits.push(`demand x${Math.round(modifier.demand * 100)}%`);
  if (modifier.theft !== 1) bits.push(`theft x${Math.round(modifier.theft * 100)}%`);
  if (modifier.audit) bits.push(`audit +${modifier.audit}`);
  Object.entries(modifier.supplyByType).forEach(([type, value]) => bits.push(`${type} supply x${Math.round(value * 100)}%`));
  Object.entries(modifier.upkeepByType).forEach(([type, value]) => bits.push(`${type} upkeep x${Math.round(value * 100)}%`));
  Object.entries(modifier.locationUpkeep).forEach(([locationId, value]) => bits.push(`${locationById(locationId).label} upkeep x${Math.round(value * 100)}%`));
  Object.entries(modifier.locationDemand).forEach(([locationId, value]) => bits.push(`${locationById(locationId).label} demand x${Math.round(value * 100)}%`));
  Object.entries(modifier.securityByLocation).forEach(([locationId, value]) => bits.push(`${locationById(locationId).label} security ${value >= 0 ? "+" : ""}${value}`));
  Object.entries(modifier.theftByLocation).forEach(([locationId, value]) => bits.push(`${locationById(locationId).label} theft x${Math.round(value * 100)}%`));
  Object.entries(modifier.cleanByLocation).forEach(([locationId, value]) => bits.push(`${locationById(locationId).label} dirt x${Math.round(value * 100)}%`));
  return bits.join(", ") || "flavor impact only";
}

function renderStats() {
  updateOperatorProfile();
  const blocks = [];
  if (state.charts.restock) {
    const items = products.map((product) => ({
      label: productDisplayName(product),
      value: state.stats.restockByProduct[product.id] || 0
    }));
    blocks.push(chartBlock("Restocking cost by product", "restockChart", "bar", items));
  }
  if (state.charts.service) {
    blocks.push(chartBlock("Service and machine upgrade spend", "serviceChart", "donut", [
      { label: "Service", value: state.stats.maintenance },
      { label: "Upgrades", value: state.stats.security },
      { label: "Corporate", value: state.stats.corporate || 0 }
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
  const tier = hostilityTier();
  blocks.push(`
    <section class="chart-block">
      <h3>Reputation race <button class="help-button small" data-help="competition" aria-label="Competition help">?</button></h3>
      <div class="reputation-race">
        ${renderReputationRace()}
      </div>
    </section>
    <section class="chart-block">
      <h3>Operator file <button class="help-button small" data-help="operatorClassification" aria-label="WENDING operator classification help">?</button></h3>
      <div class="operator-file">
        <span>${state.operatorProfile.classificationId}</span>
        <strong>${state.operatorProfile.primaryArchetype}</strong>
        <em>${getOperatorFlavorText(state.operatorProfile)}</em>
        <small>${(state.operatorProfile.secondaryTags || []).join(" / ") || "No secondary tags filed"}</small>
        <em>${state.operatorProfile.identityPath?.label || "Unformed operator"} - ${Math.round((state.operatorProfile.identityPath?.score || 0) * 100)}% signal</em>
        <small>${(state.operatorProfile.behaviorTags || []).join(" / ") || "No behavior tags filed"}</small>
      </div>
    </section>
    <section class="chart-block">
      <h3>Portal hooks</h3>
      <div class="operator-file">
        <span>${state.argPortal.schema || "wending.portal.v1"}</span>
        <strong>${state.argPortal.enabled ? "External portal hook armed" : "External portal hook dormant"}</strong>
        <small>${buildArgPortalManifest(state).portalHooks.join(" / ")}</small>
      </div>
    </section>
    <section class="chart-block">
      <h3>Location pressure</h3>
      <div class="pressure-list">
        ${renderPressureList()}
      </div>
    </section>
    <section class="chart-block">
      <h3>Route milestones</h3>
      <div class="pressure-list">
        ${renderRouteMilestones()}
      </div>
    </section>
    <section class="chart-block">
      <h3>Corporate descent</h3>
      <div class="corp-stats">
        <div><span>Audit heat</span><strong>${Math.round(state.corporate.heat)}%</strong></div>
        <div><span>Fines</span><strong>${formatMoney(state.corporate.fines)}</strong></div>
        <div><span>Black market</span><strong>${formatMoney(state.corporate.blackMarketSpend)}</strong></div>
        <div><span>Supplier</span><strong>${supplierModes[state.corporate.supplierMode]?.label || "Normal suppliers"}</strong></div>
        <div><span>Scandals</span><strong>${state.corporate.blackMarketScandals || 0}</strong></div>
        <div><span>Hostility</span><strong>${tier.label} ${Math.round(state.world?.hostility || 0)}%</strong></div>
      </div>
    </section>
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
            <small>${dailyBreakdownItems(day.breakdown).map((item) => `${item.label}: ${formatMoney(item.value)}`).join(" - ")}</small>
          </div>
        `).join("") : "<p class=\"empty-note\">No completed days yet.</p>"}
      </div>
    </section>
  `);
  el.stats.innerHTML = blocks.join("");
  bindHelpButtons(el.stats);
  drawVisibleCharts();
}

function renderReputationRace() {
  const rows = [
    { label: "You", rep: reputation(), color: "#4f9d78" },
    ...state.competition.companies.map((company) => ({ label: company.label, rep: Math.round(company.rep), color: company.color }))
  ].sort((a, b) => b.rep - a.rep);
  return rows.map((row) => `
    <div class="race-row">
      <span>${row.label}</span>
      <div class="race-bar"><i style="width:${row.rep}%; background:${row.color}"></i></div>
      <strong>${row.rep}%</strong>
    </div>
  `).join("");
}

function renderPressureList() {
  const rows = Object.entries(locations).map(([id, location]) => {
    const pressure = competitionLocation(id);
    const rival = pressure.companyId ? competitorById(pressure.companyId) : null;
    const war = pressure.priceWar?.daysLeft > 0 ? `${pressure.priceWar.type} price war` : "no price war";
    const flags = [
      pressure.blockedDays > 0 ? `blocked ${pressure.blockedDays}d` : "",
      pressure.landlordDays > 0 ? `landlord ${pressure.landlordDays}d` : "",
      pressure.interferenceDays > 0 ? `interference ${pressure.interferenceDays}d` : "",
      pressure.protectedDays > 0 ? `protected ${pressure.protectedDays}d` : "",
      pressure.adBlitzDays > 0 ? `ad blitz ${pressure.adBlitzDays}d` : "",
      (state.world?.lockdowns?.[id] || 0) > 0 ? `lockdown ${state.world.lockdowns[id]}d` : ""
    ].filter(Boolean).join(" - ") || "no active pressure";
    return `
      <div class="pressure-row ${pressure.level >= 4 ? "hot" : ""}">
        <span>${location.label}</span>
        <strong>${pressure.level || 0}/6</strong>
        <small>${rival ? rival.label : "no rival foothold"} - ${war} - ${flags} - takeover ${Math.round(pressure.takeoverRisk || 0)}%</small>
      </div>
    `;
  });
  return rows.join("");
}

function routeMilestoneStatus(id) {
  const memory = state.world?.milestoneMemory || {};
  const districtCount = Object.keys(locations).filter((locationId) => state.machines.some((machine) => machine.location === locationId)).length;
  const allDistricts = Object.keys(locations).length;
  const profile = ensureOperatorProfile();
  const lowHeatSignal = memory.lowHeatMaintained || ((state.corporate?.heat || 0) < 18 && state.day >= 7);
  const ethicalSignal = memory.ethicalRoute || profile.identityPath?.id === "ethicalRoute" || (lowHeatSignal && !Object.values(state.corporate?.substitutes || {}).some(Boolean) && (state.corporate?.supplierMode || "normal") !== "shady");
  const monopolySignal = memory.monopolyRoute || profile.identityPath?.id === "monopolyRoute" || (memory.districtDominance && memory.rivalRetreat);
  const statuses = {
    dominateDistricts: {
      label: "Control all districts",
      complete: memory.districtDominance || districtCount >= allDistricts,
      detail: `${districtCount}/${allDistricts} districts have your machines`
    },
    legalSiege: {
      label: "Survive legal siege",
      complete: Boolean(memory.legalSiegeSurvived),
      detail: memory.legalSiegeSurvived ? "profitable day logged during legal warfare" : `${hostilityTier().label} hostility`
    },
    rivalRetreat: {
      label: "Force rival retreat",
      complete: Boolean(memory.rivalRetreat),
      detail: memory.rivalRetreat ? "at least one rival withdrew from a district" : "pressure a weak rival until they leave"
    },
    lowHeat: {
      label: "Maintain low heat",
      complete: Boolean(lowHeatSignal),
      detail: `audit heat ${Math.round(state.corporate?.heat || 0)}%`
    },
    ethicalRoute: {
      label: "Ethical independent route",
      complete: Boolean(ethicalSignal),
      detail: ethicalSignal ? "clean procurement signal detected" : "avoid substitutes, shady suppliers, and high heat"
    },
    monopolyRoute: {
      label: "Monopoly route",
      complete: Boolean(monopolySignal),
      detail: monopolySignal ? "route dominance signal detected" : "dominate districts and push rivals back"
    }
  };
  return statuses[id];
}

function renderRouteMilestones() {
  return ["dominateDistricts", "legalSiege", "rivalRetreat", "lowHeat", "ethicalRoute", "monopolyRoute"].map((id) => {
    const item = routeMilestoneStatus(id);
    return `
      <div class="pressure-row ${item.complete ? "complete" : ""}">
        <span>${item.label}</span>
        <strong>${item.complete ? "Filed" : "Open"}</strong>
        <small>${item.detail}</small>
      </div>
    `;
  }).join("");
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
      label: productDisplayName(product),
      value: state.stats.restockByProduct[product.id] || 0
    })), "#207a81");
  }
  if (state.charts.service) {
    drawDonutChart("serviceChart", [
      { label: "Service", value: state.stats.maintenance, color: "#426f9d" },
      { label: "Upgrades", value: state.stats.security, color: "#26352c" },
      { label: "Corporate", value: state.stats.corporate || 0, color: "#8f7bd8" }
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
  ctx.fillStyle = "#4f9d78";
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "left";
  ctx.fillText("Income", left, top - 10);
  ctx.fillStyle = "#d05f45";
  ctx.fillText("Expenses", left + 76, top - 10);
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

function renderCityFeed() {
  if (!el.cityFeed) return;
  const items = (state.cityFeed || []).slice(0, 5);
  el.cityFeed.innerHTML = items.length
    ? items.map((item, index) => `<article class="${index === 0 ? "lead-headline" : ""}"><span>${sanitizeName(item.section, "News", 24)}</span><strong>${sanitizeName(item.text, "Headline unavailable.", 160)}</strong></article>`).join("")
    : "<p class=\"empty-note\">No city feed items yet. The municipal content machine is warming up.</p>";
}

function renderCityImpact() {
  if (!el.cityImpact) return;
  el.cityImpact.innerHTML = activeCityImpactLines();
}

const cityFeedTemplates = {
  economy: [
    "Local analysts confirm vending-machine coffee remains cheaper than most coping strategies.",
    "City procurement board warns that 'miscellaneous snack logistics' is not a tax category.",
    "Small operators report rising pressure from companies with suspiciously glossy brochures.",
    "Municipal economists classify exact change as a declining social ritual.",
    "Wholesale snack futures remain volatile after a spreadsheet described chips as 'strategic rectangles'.",
    "Consumer board announces that hunger is still technically demand.",
    "The city briefly considered compassion, then filed it under unpaid infrastructure.",
    "Pricing trends ended after consumers remembered rent exists."
  ],
  corporations: [
    "{company} describes location pressure as 'customer adjacency optimization.' Nobody claps.",
    "{company} denies price-war allegations, then lowers three prices while maintaining eye contact.",
    "Corporate vending sector promises innovation, delivers another blinking card reader.",
    "{company} files a report titled 'Human Proximity and the Button Economy'.",
    "Corporation denies machine sentience rumors; admits several machines have 'strong interface opinions'.",
    "{company} assures investors that customer thirst is a renewable resource.",
    "{company} calls your expansion unethical, then copies it badly.",
    "Corporate vending leaders agree the future is buttons, leases, and plausible concern."
  ],
  culture: [
    "Vending culture column: {product} is now considered lunch if eaten with enough confidence.",
    "Commuters debate whether {product} counts as self-care. Early results: legally unclear.",
    "A new survey finds 61% of customers trust machines more than meeting invitations.",
    "Local man survives exclusively on vending machine tuna. No licensed tuna machine has been located.",
    "{product} described as 'emotionally available' by late-afternoon office traffic.",
    "Campus newspaper asks whether vending machines are the last honest cafeteria.",
    "Scientists confirm caffeine does not replace sleep, but admit it makes margins easier.",
    "{product} receives a favorable review from a customer who would not identify their lunch."
  ],
  player: [
    "{companyName} expands its quiet campaign for coin-operated dominance.",
    "{companyName} posts another day of calibrated snack exposure.",
    "Local machines operated by {companyName} described as 'present' by nearby foot traffic.",
    "{companyName} denies rumors of a master plan, confirms several minor plans.",
    "{companyName} announces no layoffs because no one has been hired to lay off.",
    "Regulators note {companyName}'s growth is 'small enough to ignore, for now'.",
    "{companyName} monetizes convenience with the calm face of a laminated invoice.",
    "{companyName} reports that the machine accepted payment and released judgement."
  ],
  identity: [
    "{companyName} is increasingly described as a {identity}. Nobody knows whether this is praise.",
    "Sector bulletin classifies {companyName} under {archetype}. The printer hesitated.",
    "{identity} behavior detected in local vending routes. Citizens are advised to remain commercially hydrated.",
    "{companyName}'s latest pattern suggests {identity} ambitions with {archetype} paperwork."
  ],
  contracts: [
    "Licensing office updates guidance after reviewing {companyName}'s {identity} trajectory.",
    "Contract clerks request clearer forms from operators with {archetype} tendencies.",
    "Permit language revised after a machine named {machine} becomes administratively memorable."
  ],
  locations: [
    "{location} reports unusual vending behavior consistent with {identity} routing.",
    "Foot traffic at {location} appears to have opinions about {companyName}.",
    "Local managers near {location} ask whether the snack economy can calm down."
  ],
  startup: [
    "{companyName} enters the vending sector. City officials ask whether that was wise.",
    "New operator {companyName} registers a machine and immediately discovers rent.",
    "{companyName} launches with one machine and a legally sufficient amount of hope.",
    "{companyName} opens for business after completing the minimum viable paperwork.",
    "A new vending concern appears. Nearby coins report cautious optimism.",
    "{companyName} begins operations under the ancient commercial principle: snacks near people."
  ]
};

function makeCityHeadline(section = "economy", context = {}) {
  const profile = ensureOperatorProfile();
  const product = context.product ? productDisplayName(context.product) : productDisplayName(pick(products));
  const competitor = context.competitor || pick(state.competition?.companies || competitorTemplates).label;
  const machine = context.machine?.name || currentMachine()?.name || "Unnamed machine";
  const location = context.location || locationById(currentMachine()?.location || "campus").label;
  return {
    day: state.day,
    section: section === "player" ? "Operator" : section[0].toUpperCase() + section.slice(1),
    text: pick(cityFeedTemplates[section] || cityFeedTemplates.economy)
      .replaceAll("{product}", product)
      .replaceAll("{company}", competitor)
      .replaceAll("{companyName}", sanitizeName(state.companyName, DEFAULT_COMPANY_NAME))
      .replaceAll("{identity}", profile.identityPath?.label || DEFAULT_OPERATOR_PROFILE.identityPath.label)
      .replaceAll("{archetype}", profile.primaryArchetype || "UNCLASSIFIED")
      .replaceAll("{machine}", sanitizeName(machine, "Unnamed machine"))
      .replaceAll("{location}", sanitizeName(location, "Campus lobby"))
  };
}

function addCityHeadline(headline) {
  state.cityFeed ||= [];
  state.cityFeed.unshift(headline);
  state.cityFeed = state.cityFeed.slice(0, 16);
}

function fourthWallSignature(item) {
  return `${item.category || "session"}:${String(item.text || "").toLowerCase().replace(/\d+/g, "#").slice(0, 90)}`;
}

function fourthWallMemory() {
  state.world ||= {};
  state.world.fourthWallMemory = normalizeFourthWallMemory(state.world.fourthWallMemory);
  return state.world.fourthWallMemory;
}

function fourthWallGateAllows(item) {
  const memory = fourthWallMemory();
  const signature = fourthWallSignature(item);
  const baseChance = item.category === "machine" ? 0.003 : 0.015;
  const chance = item.strong ? Math.min(0.004, baseChance) : baseChance;
  if (sessionAwareness.data.fourthWallShown) return false;
  if (state.day - memory.lastDay < 4) return false;
  if (memory.signatures.some((entry) => entry.signature === signature && state.day - entry.day <= 24)) return false;
  return Math.random() < Math.min(chance, Number(item.chance) || chance);
}

function consumeFourthWall(item) {
  const memory = fourthWallMemory();
  const signature = fourthWallSignature(item);
  memory.lastDay = state.day;
  memory.lastCategory = sanitizeName(item.category, "session", 32);
  memory.signatures.unshift({ signature, day: state.day });
  memory.signatures = memory.signatures
    .filter((entry, index, array) => entry.signature && state.day - entry.day <= 24 && array.findIndex((candidate) => candidate.signature === entry.signature) === index)
    .slice(0, 24);
  sessionAwareness.data.fourthWallShown = true;
  sessionAwareness.data.lastFourthWallCategory = memory.lastCategory;
  sessionAwareness.save();
}

function fourthWallCandidates(category = "review", context = {}) {
  const metrics = sessionMetrics();
  const machine = context.machine || currentMachine();
  const companyName = sanitizeName(state.companyName, DEFAULT_COMPANY_NAME, 42);
  const candidates = [];
  const add = (condition, text, tags, strong = false, chance = undefined) => {
    if (!condition) return;
    candidates.push({
      category,
      text,
      tags: ["fourth-wall", ...(tags || [])],
      strong,
      chance,
      machineName: safeMachineName(machine),
      rating: 3,
      tone: strong ? "uncanny" : "weird",
      source: "fourthWall",
      priority: strong ? 0.9 : 1.2
    });
  };
  add(metrics.hourBucket === "late night", "Route activity after midnight correlates with poor expansion decisions.", ["late-night"]);
  add(metrics.hourBucket === "late night", "No customer review should be timestamped this late.", ["late-night"], true, 0.003);
  add(metrics.durationMinutes >= 45, `Operator session duration exceeds recommended vending exposure: ${metrics.durationMinutes} minutes.`, ["long-session"]);
  add(metrics.durationMinutes >= 75, "You have been managing this route for longer than the average district inspector remains employed.", ["long-session"]);
  add(metrics.focusReturns >= 3, "Welcome back. The machines continued without you.", ["tab-focus"]);
  add(metrics.focusLost >= 4, "Focus loss detected. Route confidence adjusted emotionally, not financially.", ["tab-focus"]);
  add(metrics.longIdleCount > 0 || metrics.maxIdleMinutes >= 5, "The route waited. The machines did not.", ["idle"]);
  add(metrics.longIdleCount > 0, "Inactivity logged as managerial hesitation.", ["idle"]);
  add(metrics.saveLoadCount >= 3 || metrics.routeReloads >= 2, "Route continuity restored. Consequences reattached.", ["reload"]);
  add(metrics.sameDayRetries >= 1, "Some operators keep returning to the same bad day.", ["retry"], true, 0.004);
  add(metrics.loads >= 2, "This route has been resumed more times than expected.", ["load"]);
  add(metrics.imports >= 1, "Imported route accepted. The timeline adjusted its collar.", ["import"]);
  add(companyName !== DEFAULT_COMPANY_NAME && state.started, `The machine repeated ${companyName} without being asked.`, ["company"]);
  add(metrics.language && !String(metrics.language).toLowerCase().startsWith("en"), "Language settings do not match machine sentiment.", ["language"]);
  add(Boolean(metrics.timezone), "Your timezone has been noted by no one important.", ["timezone"], false, 0.008);
  add(metrics.gameOvers > 0, "Previous bankruptcies leave residue.", ["game-over"], true, 0.004);
  add(metrics.fullscreenChanges > 0, "The route noticed the screen change size and chose not to comment officially.", ["fullscreen"]);
  return candidates.filter((item) => fourthWallGateAllows(item));
}

function maybeFourthWallMoment(category = "event", context = {}) {
  const candidates = fourthWallCandidates(category, context);
  if (!candidates.length) return null;
  const item = weightedPick(candidates, "priority");
  consumeFourthWall(item);
  return item;
}

function maybeCreateDiplomacyPrompt() {
  if (!isLateGame() || (state.world?.diplomacyCooldown || 0) > 0) return null;
  const daysSince = state.world?.lastDiplomacyDay ? state.day - state.world.lastDiplomacyDay : 999;
  const pressureChance = 0.12 + lateGamePressureScore() * 0.08 + Math.min(0.18, Math.max(0, daysSince - 8) * 0.018);
  const forced = daysSince >= 16;
  if (daysSince < 5 || (!forced && !shouldRollWorldEvent("choice:diplomacy", pressureChance, 3))) return null;
  const corp = selectedCorporation();
  if (!corp) return null;
  const stage = lateGameStage();
  const available = diplomacyPrompts.filter((item) => (item.minStage !== "deep" || stage === "deep") && item.id !== state.world.lastDiplomacyPrompt);
  const prompt = pick(available.length ? available : diplomacyPrompts);
  state.world.diplomacyCooldown = prompt.cooldown || 10;
  state.world.lastDiplomacyPrompt = prompt.id;
  state.world.lastDiplomacyDay = state.day;
  addLog(`Corporate contact queued: ${prompt.title(corp)}.`);
  return {
    title: prompt.title(corp),
    text: prompt.text(corp),
    choices: prompt.choices.map((choice) => ({ ...choice, corporation: corp })),
    corporation: corp
  };
}

function maybeCreatePressPrompt() {
  if (!isLateGame() || (state.world?.pressCooldown || 0) > 0) return null;
  const daysSince = state.world?.lastPressDay ? state.day - state.world.lastPressDay : 999;
  const scheduledWindow = state.day >= 24 && (state.day % 24 <= 4 || state.day % 30 <= 4);
  const pressureChance = 0.1 + lateGamePressureScore() * 0.06 + Math.min(0.22, Math.max(0, daysSince - 14) * 0.016);
  const forced = daysSince >= 34;
  if (daysSince < 10 || (!forced && !scheduledWindow && !shouldRollWorldEvent("choice:press", pressureChance, 4))) return null;
  const available = pressInterviewPrompts.filter((prompt) => prompt.id !== state.world.lastPressPrompt && (!prompt.requires || prompt.requires()));
  const prompt = pick(available.length ? available : pressInterviewPrompts.filter((item) => !item.requires || item.requires()));
  if (!prompt) return null;
  state.world.pressCooldown = 16 + Math.round(Math.random() * 6);
  state.world.lastPressPrompt = prompt.id;
  state.world.lastPressDay = state.day;
  addLog(`Press request queued: ${prompt.title}.`);
  return {
    title: prompt.title,
    text: prompt.text,
    choices: prompt.choices
  };
}

function addCityHeadlinesForDay(result) {
  updateOperatorProfile();
  const profile = ensureOperatorProfile();
  addCityHeadline(makeCityHeadline(result.revenue > result.expenses ? "player" : "economy"));
  if (result.events.some((event) => /price war|competitor|pressure/i.test(event))) addCityHeadline(makeCityHeadline("corporations"));
  if (result.events.some((event) => /contract|permit|license|audit/i.test(event))) addCityHeadline(makeCityHeadline("contracts"));
  if (result.events.some((event) => /campus|office|station|gym|mall|landlord|location/i.test(event))) addCityHeadline(makeCityHeadline("locations"));
  if (profile.identityPath?.id !== "unformed" && (state.day % 3 === 0 || result.events.some((event) => /identity|operator|route/i.test(event)))) {
    addCityHeadline(makeCityHeadline("identity"));
  }
  if (result.sold > 0) addCityHeadline(makeCityHeadline("culture", { product: result.sales[0]?.product || pick(products).name }));
  const districtProfile = districtProfiles[highestDominanceLocation()];
  if (districtProfile && shouldRollWorldEvent(`district-identity:${highestDominanceLocation()}`, 0.045 + lateGamePressureScore() * 0.025, 8)) {
    addCityHeadline({ day: state.day, section: "Districts", text: districtProfile.cityLine });
  }
  if (state.machines.length >= 5 && shouldRollWorldEvent("reaction:rapid-expansion", 0.08, 6)) {
    addCityHeadline({ day: state.day, section: "City", text: `${sanitizeName(state.companyName, DEFAULT_COMPANY_NAME)} route density noticed by landlords who suddenly remembered infrastructure.` });
  }
  if (loanPrincipal() > companyValue() * 0.45 && shouldRollWorldEvent("reaction:debt-culture", 0.06, 8)) {
    addCityHeadline({ day: state.day, section: "Finance", text: "Finance column warns that debt culture is not a growth strategy, then recommends two credit products." });
  }
  if ((state.machines || []).filter((machine) => machine.type === "alcohol").length >= 2 && shouldRollWorldEvent("reaction:alcohol-reliance", 0.07, 6)) {
    addCityHeadline({ day: state.day, section: "Licensing", text: "Nightlife vending growth draws permit attention. Nobody says crackdown, but everyone fonts it that way." });
  }
  if ((state.world?.pressTone || "unfiled") === "antiCorporate" && shouldRollWorldEvent("reaction:press-tone", 0.05, 7)) {
    addCityHeadline({ day: state.day, section: "Press", text: "Local operators repeat your anti-corporate quote near machines that absolutely report revenue." });
  }
  const nexTrigger = (result.events || []).some((event) => /serious fault|break-in|vandal|graffiti|shutdown|seizure|dirty reset|SILENTSCREAM/i.test(event));
  const nexCity = maybeNexFlavor("city", nexCityFeedLines, nexTrigger ? 0.018 : 0.003, 24);
  if (nexCity) addCityHeadline({ day: state.day, section: "Graffiti", text: nexCity });
  const fourthWall = maybeFourthWallMoment("city");
  if (fourthWall) addCityHeadline({ day: state.day, section: "City", text: fourthWall.text });
}

function reviewSignature(review) {
  return `${review.source || "route"}:${(review.tags || []).slice(0, 3).join(",")}:${String(review.text || "").toLowerCase().replace(/\d+/g, "#").slice(0, 80)}`;
}

function rememberReview(review) {
  state.reviewMemory ||= [];
  const signature = reviewSignature(review);
  state.reviewMemory.unshift({ signature, day: state.day });
  state.reviewMemory = state.reviewMemory
    .filter((item, index, array) => item.signature && state.day - item.day <= 18 && array.findIndex((candidate) => candidate.signature === item.signature) === index)
    .slice(0, 40);
}

function recentlyUsedReview(review) {
  const signature = reviewSignature(review);
  return (state.reviewMemory || []).some((item) => item.signature === signature && state.day - item.day <= (review.tags?.includes("creepy") ? 28 : 8));
}

function customerReviewForDay(result) {
  const candidates = [
    ...behaviorReviewCandidates(result),
    ...nexReviewCandidates(result),
    ...creepyReviewCandidates(result),
    ...fallbackReviewCandidates(result)
  ].filter((review) => !recentlyUsedReview(review));
  if (!candidates.length) return null;
  const likely = candidates.filter((review) => review.priority >= 3);
  if (!likely.length && Math.random() > 0.46) return null;
  const review = weightedPick((likely.length ? likely : candidates).map((item) => ({ ...item, chance: item.priority || 1 })));
  const normalized = {
    day: state.day,
    rating: clamp(Math.round(Number(review.rating) || 3), 1, 5),
    tone: sanitizeName(review.tone, "mixed", 24),
    text: sanitizeName(review.text, "Customer review unavailable. The form remains smug.", 160),
    machineName: sanitizeName(review.machineName, "Anonymous machine", 42),
    tags: Array.isArray(review.tags) ? review.tags.slice(0, 6) : [],
    source: sanitizeName(review.source, "route", 32),
    category: sanitizeName(review.category, "review", 32)
  };
  if (normalized.source === "fourthWall") consumeFourthWall(normalized);
  rememberReview(normalized);
  return normalized;
}

function behaviorReviewCandidates(result) {
  const candidates = [];
  const machines = getReviewableMachines();
  const selected = result.sales?.length
    ? machines.find((machine) => machine.id === pick(result.sales).machineId)
    : (machines.find((machine) => machine.id === currentMachine()?.id) || machines[0]);
  if (!machines.length || !selected) return candidates;
  const worstCondition = machines.length ? machines.reduce((worst, machine) => machine.condition < worst.condition ? machine : worst, machines[0]) : null;
  const dirtiest = machines.length ? machines.reduce((worst, machine) => machine.clean < worst.clean ? machine : worst, machines[0]) : null;
  const emptiest = machines.find((machine) => machineStockTotal(machine) === 0) || machines.find((machine) => machineFill(machine) < 0.12);
  const cleanStocked = machines.find((machine) => machine.clean >= 88 && machine.condition >= 80 && machineFill(machine) >= 0.55);
  const selectedProducts = getCompatibleReviewProducts(selected);
  const overpriced = selectedProducts.filter((product) => product.price >= product.basePrice * 1.55);
  const underpriced = selectedProducts.filter((product) => product.price <= product.basePrice * 0.72);
  const alcoholMachine = machines.find((machine) => machine.type === "alcohol");
  const substituteCount = Object.values(state.corporate?.substitutes || {}).filter(Boolean).length;
  const recentBrokenDays = (state.stats?.daily || []).slice(-5).filter((day) => day.events > 4).length;
  const shady = (state.corporate?.supplierMode || "normal") === "shady" || (state.corporate?.blackMarketSpend || 0) > 0;
  const emptySoldToday = emptiest ? Object.values(result.soldByMachineProduct?.[emptiest.id] || {}).reduce((sum, amount) => sum + amount, 0) : 0;
  const selectedCategory = getMachineReviewCategory(selected);
  if (emptiest && emptySoldToday >= Math.max(4, machineCapacity(emptiest) * 0.3)) {
    const category = getMachineReviewCategory(emptiest);
    candidates.push(makeReview(4, "positive", `${safeMachineName(emptiest)} sold out of ${category.plural} because people kept buying. Annoying, but commercially convincing.`, emptiest, ["sellout", "stock", "praise"], 4));
  } else if (emptiest) {
    const category = getMachineReviewCategory(emptiest);
    candidates.push(makeReview(1, "very negative", `${safeMachineName(emptiest)} had no useful ${category.plural} long enough to develop a philosophy.`, emptiest, ["empty", "neglect"], 5));
  }
  const poorFit = machines.find((machine) => machineStockTotal(machine) > 4 && averageMachineLocationFit(machine) < 0.82);
  if (poorFit) {
    const category = getMachineReviewCategory(poorFit);
    candidates.push(makeReview(2, "negative", `${safeMachineName(poorFit)} had ${category.plural}, technically. Just not the ${category.plural} this district wanted.`, poorFit, ["selection", "location"], 4));
  }
  const goodFit = machines.find((machine) => machineStockTotal(machine) > 5 && averageMachineLocationFit(machine) > 1.12 && result.sold >= 5);
  if (goodFit) candidates.push(makeReview(5, "very positive", `${safeMachineName(goodFit)} stocked ${sampleReviewProduct(goodFit)} like it knew the district personally. I respect the targeting and fear the accuracy.`, goodFit, ["curation", "praise"], 3));
  const customerAligned = machines.find((machine) => machineStockTotal(machine) > 4 && customerMixDemandFactor(machine) > 1.08 && result.sold >= 4);
  if (customerAligned) {
    const mix = locationCustomers[customerAligned.location] || ["casual"];
    const customer = customerTypes[pick(mix)] || customerTypes.casual;
    candidates.push(makeReview(4, "positive", `${safeMachineName(customerAligned)} seems calibrated for ${customer.label}s. That is either service design or surveillance with snacks.`, customerAligned, ["customer-mix", "praise"], 3));
  }
  if (worstCondition && (worstCondition.broken || worstCondition.condition < 28)) candidates.push(makeReview(1, "very negative", `${safeMachineName(worstCondition)} keeps breaking like it has tenure. One star for structural honesty.`, worstCondition, ["broken", "neglect"], 5));
  if (dirtiest && dirtiest.clean < 35) candidates.push(makeReview(2, "negative", `${safeMachineName(dirtiest)} looked like it had survived a committee meeting in a parking garage.`, dirtiest, ["dirty", "neglect"], 4));
  if (overpriced.length >= Math.max(1, Math.ceil(selectedProducts.length * 0.45))) candidates.push(makeReview(2, "negative", `${safeMachineName(selected)} made ${selectedCategory.plural} feel overpriced. Even the buttons seemed to be charging rent.`, selected, ["overpriced", "pricing"], 4));
  if (underpriced.length >= Math.max(1, Math.ceil(selectedProducts.length * 0.45)) && result.sold >= 6) candidates.push(makeReview(4, "positive", `${safeMachineName(selected)} had suspiciously humane ${selectedCategory.singular} prices. I bought before the accountant noticed.`, selected, ["underpriced", "pricing", "praise"], 3));
  if (substituteCount >= 3) candidates.push(makeReview(2, "negative", `The products tasted almost original in a way that made me read the label twice.`, selected, ["substitute", "quality"], 4));
  if (shady) candidates.push(makeReview(3, "mixed", `The selection was affordable, but the crate energy was legally beige.`, selected, ["shady", "quality"], 3));
  if (alcoholMachine && (state.corporate?.heat || 0) >= 25) candidates.push(makeReview(3, "mixed", `${safeMachineName(alcoholMachine)} sold me compliance with bubbles. The license looked nervous.`, alcoholMachine, ["alcohol", "legal"], 3));
  if (cleanStocked && result.sold >= 5) candidates.push(makeReview(5, "very positive", `${safeMachineName(cleanStocked)} was clean, stocked, and emotionally available. Horrifyingly professional.`, cleanStocked, ["clean", "stocked", "praise"], 4));
  if (result.missed > 3) candidates.push(makeReview(2, "negative", `I wanted ${selectedCategory.singular}. The machine offered empty spirals and a lesson about planning.`, selected, ["missed", "stock"], 4));
  if (result.sold >= 9 && reputation() >= 75) candidates.push(makeReview(5, "very positive", `This location has weirdly good ${selectedCategory.plural} now. I hate that I trust it.`, selected, ["praise", "reputation"], 3));
  if ((state.world?.hostility || 0) >= 60) candidates.push(makeReview(3, "mixed", `Buying a snack felt like being near a lawsuit with a keypad.`, selected, ["hostility", "legal"], 2));
  if ((state.world?.pressTone || "unfiled") === "antiCorporate") candidates.push(makeReview(4, "positive", `${safeMachineName(selected)} had anti-corporate energy and ${selectedCategory.plural}. Finally, public infrastructure with spite.`, selected, ["press", "praise"], 2));
  if (recentBrokenDays >= 3) candidates.push(makeReview(2, "negative", `The same route keeps producing drama. I just wanted ${selectedCategory.singular}, not an incident report.`, selected, ["pattern", "neglect"], 3));
  return candidates;
}

function nexReviewCandidates(result) {
  const machines = state.machines || [];
  const folkloreQuirks = new Set(["YRNTRLNTLYBRK", "SILENTSCREAM", "AFTER_2AM", "ROUTE_HAUNTING", "THIRD_COIN_SLOT"]);
  const machine = machines.find((item) => {
    const history = ensureMachineHistory(item);
    return item.condition < 35 || item.broken || history.quirks.some((quirk) => folkloreQuirks.has(quirk));
  });
  if (!machine) return [];
  const line = maybeNexFlavor("review", nexReviewLines, result.events?.some((event) => /serious fault|dirty reset|SILENTSCREAM|NEX/i.test(event)) ? 0.016 : 0.006, 24);
  if (!line) return [];
  return [makeReview(3, "mixed", line, machine, ["nex", "rare", "folklore"], 0.9)];
}

function makeReview(rating, tone, text, machine, tags = [], priority = 1) {
  return {
    rating,
    tone,
    text,
    machineName: safeMachineName(machine || currentMachine()),
    tags,
    priority,
    source: tags[0] || "route"
  };
}

function fallbackReviewCandidates(result) {
  const machines = getReviewableMachines();
  if (!machines.length) return [];
  const machine = result.sales?.length
    ? machines.find((item) => item.id === pick(result.sales).machineId) || pick(machines)
    : (machines.find((item) => item.id === currentMachine()?.id) || pick(machines));
  const category = getMachineReviewCategory(machine);
  const product = sampleReviewProduct(machine);
  const linesByType = {
    snack: [
      { minSold: 0, rating: 2, tone: "negative", text: `Two stars. Convenient location, inconvenient snack certainty.` },
      { minSold: 3, rating: 4, tone: "positive", text: `Four stars. Bought ${product}; received a receipt-shaped memory.` },
      { minSold: 6, rating: 5, tone: "very positive", text: `Five stars. The snack spiral understood urgency better than my calendar.` }
    ],
    drink: [
      { minSold: 0, rating: 2, tone: "negative", text: `Two stars. The drink machine looked hydrated. I did not.` },
      { minSold: 3, rating: 4, tone: "positive", text: `Four stars. ${product} emerged cold enough to suggest competence.` },
      { minSold: 6, rating: 5, tone: "very positive", text: `Five stars. This route understands liquids and quiet desperation.` }
    ],
    coffee: [
      { minSold: 0, rating: 2, tone: "negative", text: `Two stars. The hot drink promise felt legally noncommittal.` },
      { minSold: 3, rating: 4, tone: "positive", text: `Four stars. ${product} tasted like deadlines becoming manageable.` },
      { minSold: 6, rating: 5, tone: "very positive", text: `Five stars. The coffee did not fix me, but it filed an extension.` }
    ],
    fresh: [
      { minSold: 0, rating: 2, tone: "negative", text: `Two stars. Fresh food should not look this philosophical.` },
      { minSold: 3, rating: 4, tone: "positive", text: `Four stars. ${product} felt like lunch with witnesses.` },
      { minSold: 6, rating: 5, tone: "very positive", text: `Five stars. The ${category.plural} section made adulthood briefly possible.` }
    ],
    alcohol: [
      { minSold: 0, rating: 3, tone: "mixed", text: `Three stars. The license looked more confident than the customer.` },
      { minSold: 3, rating: 4, tone: "positive", text: `Four stars. ${product} arrived with municipal plausible deniability.` },
      { minSold: 6, rating: 5, tone: "very positive", text: `Five stars. Nightlife compliance has never been this conveniently chilled.` }
    ]
  };
  return (linesByType[machine.type] || linesByType.snack)
    .filter((review) => result.sold >= review.minSold)
    .map((review) => ({
      ...makeReview(review.rating, review.tone, review.text, machine, ["flavor", machine.type], 1),
      source: "flavor"
    }));
}

function creepyReviewCandidates(result) {
  if (state.day < 4) return [];
  return fourthWallCandidates("review", { result }).map((item) => ({
    ...item,
    rating: 3,
    tone: item.strong ? "uncanny" : "creepy",
    tags: ["creepy", ...(item.tags || [])],
    priority: item.strong ? 0.7 : 0.9
  }));
}

function setBusy(isBusy) {
  [el.nextDay, el.collectCash, el.repair, el.clean, el.sellMachine, el.buyMachine, el.machineLocation, el.exportSave, el.importSave, el.machineRename].forEach((button) => {
    if (!button) return;
    button.disabled = isBusy;
  });
  document.querySelectorAll("[data-price-product], [data-restock-qty], [data-auto-enabled], [data-auto-min], [data-substitute]").forEach((input) => {
    input.disabled = isBusy;
  });
}

function showAction(text, className) {
  if (el.actionBadge?.dataset.blockingEvent === "true") return;
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
    forceBlockingEventVisible();
    el.actionBadge.innerHTML = `<span>${text}</span><button type="button">OK</button>`;
    const ok = el.actionBadge.querySelector("button");
    window.requestAnimationFrame(() => forceBlockingEventVisible());
    ok.focus({ preventScroll: true });
    ok.addEventListener("click", () => {
      el.actionBadge.classList.remove("show", "event-toast");
      el.actionBadge.removeAttribute("data-blocking-event");
      el.actionBadge.removeAttribute("role");
      el.actionBadge.removeAttribute("aria-modal");
      el.actionBadge.removeAttribute("style");
      el.actionBadge.textContent = "";
      resolve();
    }, { once: true });
  });
}

function forceBlockingEventVisible() {
  el.actionBadge.className = "action-badge event-toast show";
  el.actionBadge.dataset.blockingEvent = "true";
  el.actionBadge.setAttribute("role", "dialog");
  el.actionBadge.setAttribute("aria-modal", "true");
  el.actionBadge.style.opacity = "1";
  el.actionBadge.style.pointerEvents = "auto";
  el.actionBadge.style.zIndex = "260";
}

function showDigestToast(digest) {
  return new Promise((resolve) => {
    forceBlockingEventVisible();
    el.actionBadge.classList.add("digest-toast");
    el.actionBadge.innerHTML = `
      <span class="digest-title">Daily digest</span>
      <div class="digest-body">
        ${digest.sections.map((section) => `
          <section>
            <strong>${section.title}</strong>
            <ul>${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>
        `).join("")}
      </div>
      <button type="button">OK</button>
    `;
    const ok = el.actionBadge.querySelector("button");
    ok.focus({ preventScroll: true });
    ok.addEventListener("click", () => {
      el.actionBadge.classList.remove("show", "event-toast", "digest-toast");
      el.actionBadge.removeAttribute("data-blocking-event");
      el.actionBadge.removeAttribute("role");
      el.actionBadge.removeAttribute("aria-modal");
      el.actionBadge.removeAttribute("style");
      el.actionBadge.textContent = "";
      resolve();
    }, { once: true });
  });
}

function showChoiceToast(prompt) {
  return new Promise((resolve) => {
    forceBlockingEventVisible();
    el.actionBadge.classList.add("choice-toast");
    el.actionBadge.innerHTML = `
      <span class="digest-title">${sanitizeName(prompt.title, "Corporate message", 72)}</span>
      <div class="digest-body choice-body">
        <p>${sanitizeName(prompt.text, "A corporate form asks for your position.", 260)}</p>
        ${(prompt.choices || []).map((choice, index) => {
          const locked = choice.locked?.(choice.corporation || prompt.corporation) || false;
          return `
            <button type="button" class="choice-option" data-choice="${index}" ${locked ? "disabled" : ""}>
              <strong>${sanitizeName(choice.label, "Respond", 56)}</strong>
              <span>${sanitizeName(choice.consequence, "Consequences will be filed.", 160)}${locked ? " Locked by current route conditions." : ""}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
    el.actionBadge.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Math.max(0, Math.round(Number(button.dataset.choice) || 0));
        el.actionBadge.classList.remove("show", "event-toast", "digest-toast", "choice-toast");
        el.actionBadge.removeAttribute("data-blocking-event");
        el.actionBadge.removeAttribute("role");
        el.actionBadge.removeAttribute("aria-modal");
        el.actionBadge.removeAttribute("style");
        el.actionBadge.textContent = "";
        resolve(prompt.choices[index]);
      }, { once: true });
    });
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

function refillProduct(machineId, productId, rawAmount = 6) {
  if (state.gameOver) return;
  const machine = state.machines.find((item) => item.id === machineId);
  const product = productById(productId);
  if (!machine || !product || product.type !== machine.type) return;
  const freeSpace = machineCapacity(machine) - machineStockTotal(machine);
  const requested = clamp(Math.round(Number(rawAmount) || 0), 0, 999);
  const amount = Math.min(requested, freeSpace, state.warehouse[productId] || 0);
  if (amount <= 0) {
    addLog(`Manual restock skipped: ${productDisplayName(product)} needs a positive quantity, free space, and warehouse stock.`);
    render();
    return;
  }
  machine.stock[productId] = (machine.stock[productId] || 0) + amount;
  addBatch(machine, productId, amount);
  state.warehouse[productId] -= amount;
  state.brandBuzz = clamp(state.brandBuzz + 0.8, 0, 100);
  addLog(`${machine.name} manually restocked: ${productDisplayName(product)} +${amount} pcs.`);
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
  if (!product) return;
  if (product.type !== "fresh") return;
  state.warehouseBatches ||= {};
  state.warehouseBatches[productId] ||= [];
  state.warehouseBatches[productId].push({ qty: amount, days: warehouseShelfLife(product) });
}

function addBatch(machine, productId, amount) {
  const product = productById(productId);
  if (!product) return;
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
  if (!product) return [];
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
  if (!machine.stock?.[productId]) return;
  machine.stock[productId] -= 1;
  const product = productById(productId);
  if (!product) return;
  if (product.type !== "fresh" || !machine.batches?.[productId]) return;
  const batches = machine.batches[productId];
  while (batches.length && batches[0].qty <= 0) batches.shift();
  if (batches.length) {
    batches[0].qty -= 1;
    if (batches[0].qty <= 0) batches.shift();
  }
}

function updateProductPrice(productId, rawValue) {
  if (state.gameOver) return;
  const product = productById(productId);
  const nextPrice = clamp(Math.round(Number(rawValue) || product.basePrice), Math.round(product.basePrice * 0.45), Math.round(product.basePrice * 2.8));
  product.price = nextPrice;
  const demand = Math.round(priceDemandFactor(product) * 100);
  addLog(`${productDisplayName(product)} price set to ${formatMoney(nextPrice)}. Estimated demand index: ${demand}%.`);
  render();
}

function buyUpgrade(upgradeId) {
  if (state.gameOver) return;
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
  if (state.gameOver) return;
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
  if (state.gameOver) return;
  const machine = currentMachine();
  const cost = machineRepairCost(machine);
  if (state.cash < cost) {
    addLog(`Not enough cash for service. You need ${formatMoney(cost)}.`);
    render();
    return;
  }
  const wasCritical = machine.broken || machine.condition < 28;
  state.cash -= cost;
  machine.condition = clamp(machine.condition + 38, 0, 100);
  machine.broken = false;
  if (state.machines.length === 1 && machine.condition > 18) state.finalMachineCriticalDays = 0;
  state.brandBuzz = clamp(state.brandBuzz + 1.3, 0, 100);
  state.stats.maintenance += cost;
  addLog(`${machine.name} serviced for ${formatMoney(cost)}.`);
  const nexNote = wasCritical ? maybeNexFlavor("repair", nexRepairLines, 0.012, 22) : "";
  if (nexNote) {
    addLog(`${machine.name}: ${nexNote}`);
    addMachineIncident(machine, `Maintenance note: ${nexNote}`);
  }
  render();
  showAction("serviced", "repair-pulse");
}

function cleanMachine() {
  if (state.gameOver) return;
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

function machineRepairCost(machine) {
  if (!machine) return 0;
  const missing = 100 - machine.condition;
  return Math.max(1500, Math.round(missing * 105) + (machine.broken ? 3200 : 0));
}

function orderStock(productId, units = 10) {
  if (state.gameOver) return;
  const product = productById(productId);
  const cost = effectiveCost(product) * units;
  if (state.cash < cost) {
    addLog(`Ordering ${productDisplayName(product)} needs ${formatMoney(cost)}.`);
    render();
    return;
  }
  state.cash -= cost;
  state.warehouse[product.id] = (state.warehouse[product.id] || 0) + units;
  addWarehouseBatch(product.id, units);
  state.stats.restockByProduct[product.id] = (state.stats.restockByProduct[product.id] || 0) + cost;
  addLog(`Ordered ${units} pcs of ${productDisplayName(product)}.`);
  render();
}

function hireEmployee(employeeId) {
  if (state.gameOver) return;
  if (!corporateUnlocked()) return;
  const employee = employeeTypes[employeeId];
  const level = state.corporate.employees[employeeId] || 0;
  if (!employee || level >= employee.max) return;
  const cost = employee.cost * (level + 1);
  if (state.cash < cost) {
    addLog(`${employee.label} hiring package needs ${formatMoney(cost)}.`);
    render();
    return;
  }
  state.cash -= cost;
  state.corporate.employees[employeeId] = level + 1;
  state.stats.corporate += cost;
  addLog(`Hired ${employee.label}. The org chart grew a new box.`);
  render();
}

function setSupplierMode(mode) {
  if (state.gameOver) return;
  if (!corporateUnlocked()) return;
  if (!supplierModes[mode]) return;
  state.corporate.supplierMode = mode;
  state.corporate.heat = clamp(state.corporate.heat + (mode === "shady" ? 4 : mode === "premium" ? -2 : 0), 0, 100);
  addLog(`Supplier policy changed to ${supplierModes[mode].label}.`);
  render();
}

function setSecurityContract(contractId) {
  if (state.gameOver) return;
  if (!corporateUnlocked()) return;
  if (!securityContracts[contractId]) return;
  state.corporate.securityContract = contractId;
  state.corporate.heat = clamp(state.corporate.heat + (contractId === "questionable" ? 3 : contractId === "premium" ? -1 : 0), 0, 100);
  addLog(`Security contract changed to ${securityContracts[contractId].label}.`);
  render();
}

function toggleSubstitute(productId, enabled) {
  if (state.gameOver) return;
  if (!corporateUnlocked()) return;
  const product = productById(productId);
  state.corporate.substitutes[productId] = enabled;
  state.corporate.heat = clamp(state.corporate.heat + (enabled ? 2.6 : -1.2), 0, 100);
  addLog(`${productDisplayName(product)} substitute ${enabled ? "enabled" : "disabled"}.`);
  render();
}

function buyBlackMarketCrate() {
  if (state.gameOver) return;
  if (!corporateUnlocked()) return;
  const cost = 6400;
  if (state.cash < cost) {
    addLog(`Mystery crate needs ${formatMoney(cost)}.`);
    render();
    return;
  }
  const product = pick(products);
  const supplier = weightedPick(blackMarketSuppliers);
  const units = Math.max(3, Math.round((8 + Math.floor(Math.random() * 9)) * supplier.stockFactor));
  state.cash -= cost;
  state.corporate.blackMarketSpend += cost;
  state.corporate.lastBlackMarketSupplier = supplier.id;
  state.corporate.heat = clamp(state.corporate.heat + supplier.heat, 0, 100);
  state.stats.corporate += cost;
  state.warehouse[product.id] = (state.warehouse[product.id] || 0) + units;
  addWarehouseBatch(product.id, units);
  addLog(`Black market crate from ${supplier.label} added ${units} pcs of ${productDisplayName(product)}. ${supplier.text}`);
  if (Math.random() < supplier.scandal) {
    const fine = Math.round(1800 + supplier.heat * 260 + Math.random() * 4200);
    state.cash -= fine;
    state.corporate.fines += fine;
    state.corporate.blackMarketScandals += 1;
    state.stats.corporate += fine;
    state.brandBuzz = clamp(state.brandBuzz - 2.4, 0, 100);
    addLog(`Black market supplier scandal triggered ${formatMoney(fine)} in fines. Procurement looked at the floor.`);
    evaluateGameOver("blackMarketFine");
  }
  render();
}

function runCorporateWarfare(actionId) {
  if (state.gameOver) return;
  if (!corporateUnlocked()) return;
  const action = corporateWarfareActions[actionId];
  const machine = currentMachine();
  if (!action || !machine) return;
  const target = selectedCorporation();
  if (action.requires && !action.requires(target, machine)) {
    addLog(`${action.label} unavailable against ${target?.label || "target"} right now.`);
    render();
    return;
  }
  state.world ||= {};
  state.world.warfareCooldowns ||= {};
  const cooldown = state.world.warfareCooldowns[actionId] || 0;
  const cost = effectiveWarfareActionCost(actionId, action);
  if (cooldown > 0 || state.cash < cost || state.runningDay) return;
  const events = [];
  state.cash -= cost;
  state.stats.corporate = (state.stats.corporate || 0) + cost;
  state.corporate.heat = clamp((state.corporate.heat || 0) + action.heat, 0, 100);
  state.world.hostility = clamp((state.world.hostility || 0) + action.heat * 1.6, 0, 100);
  state.world.warfareCooldowns[actionId] = action.cooldown;
  const failChance = (action.failure || 0) + lateGamePressureScore() * 0.04;
  if (Math.random() < failChance) {
    action.backlash?.(machine, events, target);
    events.unshift(`${action.label} failed. Cooldown ${action.cooldown}d applied; ${formatMoney(cost)} and heat were still recorded.`);
    if (!events.length) events.push(`${action.label} failed. The invoice succeeded.`);
  } else {
    events.unshift(`${action.label} authorized for ${formatMoney(cost)}. Cooldown ${action.cooldown}d applied.`);
    action.run(machine, events, target);
    applyRivalDamageFromWarfare(actionId, machine.location, events);
  }
  events.forEach(addLog);
  addCityHeadline({ day: state.day, section: "Corporations", text: `${action.label} targeted ${target?.label || "a rival"} near ${locationById(machine.location).label}. The operations log now has posture.` });
  render();
}

function runAutoRestock(events) {
  const summary = { spent: 0, damaged: 0, delivered: 0 };
  products.forEach((product) => {
    const policy = state.autoRestock[product.id];
    if (!policy?.enabled) return;
    const current = state.warehouse[product.id] || 0;
    if (current >= policy.min) return;
    const units = Math.min(10 + (state.corporate.employees.stocker || 0) * 3, policy.min - current);
    const cost = effectiveCost(product) * units;
    if (state.cash < cost) return;
    const damaged = damagedAutoRestockUnits(units);
    const delivered = Math.max(0, units - damaged);
    state.cash -= cost;
    state.warehouse[product.id] = current + delivered;
    if (delivered > 0) addWarehouseBatch(product.id, delivered);
    state.stats.restockByProduct[product.id] = (state.stats.restockByProduct[product.id] || 0) + cost;
    summary.spent += cost;
    summary.damaged += damaged;
    summary.delivered += delivered;
    events.push(`Auto-restock ordered ${units} pcs of ${productDisplayName(product)} for ${formatMoney(cost)}; ${delivered} reached warehouse.`);
    if (damaged > 0) events.push(`Damaged auto-stock: ${damaged} pcs of ${productDisplayName(product)} lost in transit. Logistics called it texture.`);
  });
  return summary;
}

function applyCorporateOverhead(events) {
  const employees = state.corporate.employees || {};
  const wages = Object.entries(employeeTypes).reduce((sum, [id, employee]) => {
    return sum + (employees[id] || 0) * employee.wage;
  }, 0);
  const contract = securityContracts[state.corporate.securityContract || "none"] || securityContracts.none;
  const supplier = supplierModes[state.corporate.supplierMode || "normal"] || supplierModes.normal;
  const activeSubstitutes = Object.values(state.corporate.substitutes || {}).filter(Boolean).length;
  const overhead = wages + contract.dailyCost;
  if (overhead > 0) {
    state.corporate.wagesPaid += wages;
    state.stats.corporate += overhead;
    events.push(`Corporate overhead: ${formatMoney(wages)} wages and ${formatMoney(contract.dailyCost)} security contract.`);
  }
  const alcoholHeat = (state.machines || []).filter((machine) => machine.type === "alcohol").length * 0.32;
  const heatChange = supplier.audit * 100 + contract.audit * 100 + activeSubstitutes * 0.9 + alcoholHeat - (employees.accountant || 0) * 1.8 - 1.1;
  state.corporate.heat = clamp(state.corporate.heat + heatChange, 0, 100);
  const pressureEffects = corporatePressureGameplayEffects();
  state.brandBuzz = clamp(state.brandBuzz + supplier.rep - activeSubstitutes * 0.08 - pressureEffects.reputationDrag, 0, 100);
  if (pressureEffects.supplierReluctance > 0 && Math.random() < pressureEffects.supplierReluctance) {
    const product = pick(products);
    state.supplyModifiers[product.id] = { multiplier: 1.08 + pressureEffects.supplierReluctance, daysLeft: 1, name: "Supplier reluctance" };
    events.push(`Supplier reluctance: ${productDisplayName(product)} wholesale costs rose for 1 day under corporate pressure.`);
  }
  return overhead;
}

function rollCorporateIncident(events) {
  const heat = state.corporate.heat || 0;
  const tier = hostilityTier();
  for (const incident of corporateIncidents) {
    if (heat < incident.minHeat) continue;
    if (!shouldRollWorldEvent(`corporateIncident:${incident.text}`, incident.chance * (1 + heat / 85) * tier.auditFactor, 4)) continue;
    events.push(incident.text);
    const cost = incident.effect(events) || 0;
    state.corporate.heat = clamp(state.corporate.heat - 6, 0, 100);
    return cost;
  }
  return 0;
}

function rollLegalPressureEvent(events) {
  if (!state.started || state.day < 10) return 0;
  const heat = state.corporate?.heat || 0;
  const hostility = state.world?.hostility || 0;
  const tier = hostilityTier(hostility);
  const lawyer = state.corporate?.employees?.lawyer || 0;
  const pressure = lateGamePressureScore();
  const pressureEffects = corporatePressureGameplayEffects(hostility);
  for (const item of legalPressureEvents) {
    if (hostility < item.minHostility || heat < item.minHeat) continue;
    if (item.requires && !item.requires()) continue;
    const chance = 0.018 * tier.legalFactor + pressure * 0.018 + heat / 4200 + pressureEffects.auditChanceBonus;
    if (!shouldRollWorldEvent(`legal:${item.id}`, chance, 6)) continue;
    const lawyerFactor = lawyer ? 0.62 : 1;
    const cost = Math.round((item.baseCost + hostility * 95 + heat * 65 + state.machines.length * 420) * lawyerFactor);
    state.corporate.fines += cost;
    state.stats.corporate += cost;
    events.push(`${item.label}: ${item.text}${lawyer ? " Legal Counsel reduced the damage." : ""}`);
    item.effect(cost, events);
    return cost;
  }
  return 0;
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
      events.push(`${productDisplayName(product)} spoiled in the warehouse: ${lost} pcs removed.`);
    }
  });
}

function changeLocation() {
  if (state.gameOver) return;
  const machine = currentMachine();
  if (!machine) return;
  const nextLocation = el.machineLocation.value;
  if (machine.location === nextLocation) return;
  const pressure = competitionLocation(nextLocation);
  if (pressure.blockedDays > 0) {
    const rival = pressure.companyId ? competitorById(pressure.companyId) : null;
    addLog(`${locationById(nextLocation).label} is temporarily blocked${rival ? ` by ${rival.label}` : ""}. Try again in ${pressure.blockedDays} day(s).`);
    render();
    return;
  }
  const isFreeInitialPlacement = state.freePlacementMachineId === machine.id && ensureMachineHistory(machine).daysActive === 0;
  const movingCost = isFreeInitialPlacement ? 0 : relocationFee(machine, nextLocation);
  if (state.cash < movingCost) {
    addLog(`Moving location costs ${formatMoney(movingCost)}, and the budget is making a tiny sad face.`);
    render();
    return;
  }
  state.cash -= movingCost;
  machine.location = nextLocation;
  if (isFreeInitialPlacement) state.freePlacementMachineId = null;
  state.brandBuzz = clamp(state.brandBuzz + 0.8, 0, 100);
  const note = isFreeInitialPlacement
    ? `${machine.name} placed at ${locationById(nextLocation).label}. Initial placement fee waived before the route became emotionally heavy.`
    : `${machine.name} moved to ${locationById(nextLocation).label}. Transport invoice processed: ${formatMoney(movingCost)}. Gravity was billed separately.`;
  state.pendingOperations ||= [];
  state.pendingOperations.push(note);
  state.pendingOperations = state.pendingOperations.slice(-8);
  addLog(note);
  render();
}

function resaleValue(machine) {
  if (!machine) return 0;
  const base = effectiveMachineBuyCost(machine.type) * 0.52;
  const conditionFactor = clamp((machine.condition || 0) / 100, 0.08, 1);
  const age = machineAgeLabel(machine).label;
  const ageFactor = {
    New: 0.92,
    Reliable: 0.84,
    Tired: 0.66,
    "Legacy Unit": 0.48,
    "Technically Alive": 0.31
  }[age] || 0.55;
  const brokenFactor = machine.broken ? 0.45 : 1;
  const stockValue = Object.entries(machine.stock || {}).reduce((sum, [productId, amount]) => {
    const product = productById(productId);
    return sum + (product ? effectiveCost(product) * Math.max(0, amount || 0) * 0.35 : 0);
  }, 0);
  return Math.max(1200, Math.round(base * conditionFactor * ageFactor * brokenFactor + stockValue + Math.max(0, machine.cash || 0) * 0.85));
}

function sellCurrentMachine() {
  if (state.gameOver || state.runningDay) return;
  const machine = currentMachine();
  if (!machine) return;
  if (state.machines.length <= 1) {
    addLog("Resale denied: route continuity requires at least one machine.");
    render();
    return;
  }
  const value = resaleValue(machine);
  state.cash += value;
  addLog(`${machine.name} sold for ${formatMoney(value)}. Depreciation filed a small obituary.`);
  state.machines = state.machines.filter((item) => item.id !== machine.id);
  state.selectedMachine = state.machines[0]?.id || null;
  state.finalMachineCriticalDays = 0;
  addOperatorChoiceSignal("cautious", 0.4);
  render();
}

function buyMachine() {
  if (state.gameOver) return;
  const type = el.machineToBuy.value;
  const info = machineTypes[type];
  const eligibility = machinePurchaseEligibility(type);
  if (!eligibility.ok) {
    addLog(`Expansion denied: ${eligibility.reason}`);
    render();
    return;
  }
  if (state.cash < effectiveMachineBuyCost(type)) {
    addLog(`A new ${info.label.toLowerCase()} costs ${formatMoney(effectiveMachineBuyCost(type))}.`);
    render();
    return;
  }

  const machine = makeMachine(type);
  state.cash -= effectiveMachineBuyCost(type);
  state.machines.push(machine);
  state.finalMachineCriticalDays = 0;
  state.selectedMachine = machine.id;
  state.freePlacementMachineId = machine.id;
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
  const soldByProduct = {};
  const soldByMachineProduct = {};
  const events = [];
  const breakdown = defaultDailyBreakdown();
  if (Array.isArray(state.pendingOperations) && state.pendingOperations.length) {
    events.push(...state.pendingOperations);
    state.pendingOperations = [];
  }

  const loanInterest = estimateLoanInterest();
  breakdown.principalRepayment = state.finance?.lastPrincipalPayment || 0;
  if (state.finance) state.finance.lastPrincipalPayment = 0;
  if (loanInterest > 0) {
    upkeep += loanInterest;
    breakdown.loanInterest += loanInterest;
    state.finance.totalInterestPaid += loanInterest;
    events.push(`Debt service posted ${formatMoney(loanInterest)} interest. The finance desk calls this a relationship.`);
  }
  const expansionOverhead = estimateExpansionOverhead();
  if (expansionOverhead > 0) {
    upkeep += expansionOverhead;
    breakdown.upkeep += expansionOverhead;
    events.push(`Route complexity overhead: ${formatMoney(expansionOverhead)}. Expansion has discovered administration.`);
  }
  const corporateOverhead = applyCorporateOverhead(events);
  upkeep += corporateOverhead;
  breakdown.corporateOverhead += corporateOverhead;
  const restockSummary = runAutoRestock(events);
  breakdown.autoRestock += restockSummary.spent;
  ageWarehouseFreshStock(events);
  tickSupplyModifiers(events);
  rollSupplyEvent(events);
  tickDemandModifiers(events);
  rollDemandEvent(events);
  tickWorldPressure(events);
  rollCityImpactEvent(events);
  tickCompetition(events);
  rollCompetitionEvent(events);
  rollCorporationAction(events);
  rollCorporationAttack(events);
  rollCorporationVsCorporation(events);
  rollLateGameRetaliation(events);
  rollCrisisWarningEvent(events);
  rollLateGameCrisis(events);

  state.machines.forEach((machine) => {
    const history = ensureMachineHistory(machine);
    history.daysActive += 1;
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
    const employeeFillBoost = 1 + (state.corporate.employees.stocker || 0) * 0.035;
    const varietyBoost = (0.85 + productVariety * 0.12) * employeeFillBoost;
    const priceBoost = averageMachinePriceDemand(machine);
    const displayBoost = 1 + (machine.upgrades?.display || 0) * 0.08;
    const impulseBoost = 1 + (machine.upgrades?.moodLighting || 0) * 0.06 + (machine.upgrades?.voiceAssistant || 0) * 0.03;
    const lockSlowdown = 1 - (machine.upgrades?.camera || 0) * 0.025;
    const competitionBoost = locationCompetitionFactor(machine);
    const saturationBoost = locationSaturationFactor(machine);
    const contractBoost = contractDemandFactor(machine);
    const quirkDemandBoost = machineQuirkFactor(machine, "demand");
    const districtDemandBoost = worldLocationDemandFactor(machine.location) * (pressureAdBlitzFactor(machine.location));
    const mixFit = averageMachineLocationFit(machine);
    const customerMixDemand = customerMixDemandFactor(machine);
    const repDemand = 2 + rep / 9;
    const dailyVisitors = canSell
      ? Math.max(0, Math.round(repDemand * typeInfo.demand * location.demand * districtDemandBoost * health * clean * fill * varietyBoost * priceBoost * displayBoost * impulseBoost * lockSlowdown * competitionBoost * saturationBoost * contractBoost * quirkDemandBoost * mixFit * customerMixDemand * (0.72 + Math.random() * demandVolatility(machine.location))))
      : 0;

    const machineUpkeep = machineDailyUpkeep(machine, typeInfo, location);
    upkeep += machineUpkeep;
    breakdown.upkeep += machineUpkeep;
    const drag = deadInventoryDrag(machine);
    if (drag > 0) {
      upkeep += drag;
      breakdown.deadInventory += drag;
    }
    let machineDaySales = 0;
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
      machineDaySales += 1;
      state.stats.revenueByMachine[machine.id] = (state.stats.revenueByMachine[machine.id] || 0) + saleValue;
      sold += 1;
      soldByProduct[id] = (soldByProduct[id] || 0) + 1;
      soldByMachineProduct[machine.id] ||= {};
      soldByMachineProduct[machine.id][id] = (soldByMachineProduct[machine.id][id] || 0) + 1;
      state.weekly.sales += 1;
      state.weekly.soldByType[product.type] = (state.weekly.soldByType[product.type] || 0) + 1;
      if (machine.location === "station" && product.type === "drink") state.weekly.stationDrinkSales = (state.weekly.stationDrinkSales || 0) + 1;
      sales.push({ machineId: machine.id, machineName: machine.name, product: productDisplayName(product), value: saleValue, customer });
    }
    history.lifetimeSales += machineDaySales;

    const mechanicReduction = 1 - (state.corporate.employees.mechanic || 0) * 0.14;
    const cleanerReduction = 1 - (state.corporate.employees.cleaner || 0) * 0.18;
    const wear = (1.6 + dailyVisitors * 0.32 + Math.random() * 2.8 + (machine.broken ? 2.4 : 0)) * mechanicReduction * machineQuirkFactor(machine, "wear");
    machine.condition = clamp(machine.condition - wear, 0, 100);
    machine.clean = clamp(machine.clean - ((1.8 + dailyVisitors * 0.3 + Math.random() * 2.6) * location.clean * worldLocationCleanFactor(machine.location) * cleanerReduction), 0, 100);
    if (machine.type === "fresh") spoilLoss += spoilFreshStock(machine, events);
    rollAbsurdEvent(machine, events);
    rollRareEncounter(machine, events);
    rollMachineQuirk(machine, events);
    const takeoverCost = applyTakeoverPressure(machine, dailyVisitors, events);
    upkeep += takeoverCost;
    breakdown.legalFines += takeoverCost;
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
      addMachineIncident(machine, `Break-in: ${formatMoney(stolen)} stolen.`);
    }
  });
  rollHumorEventPack(events);
  rollChaosEvent(events);
  rollBehaviorEventChain(events);
  const corporateIncidentCost = rollCorporateIncident(events);
  upkeep += corporateIncidentCost;
  breakdown.legalFines += corporateIncidentCost;
  const legalPressureCost = rollLegalPressureEvent(events);
  upkeep += legalPressureCost;
  breakdown.legalFines += legalPressureCost;

  state.cash -= upkeep;
  const expenses = upkeep + theftLoss + spoilLoss;
  breakdown.revenue = revenue;
  breakdown.theft = theftLoss;
  breakdown.spoilage = spoilLoss;
  breakdown.operatingExpenses = expenses;
  breakdown.cashOutflow = expenses + breakdown.autoRestock;
  state.lastProfit = revenue - expenses;
  updateWeeklyPressureMetrics({ sold, missed, revenue, expenses, profit: state.lastProfit });
  state.weekly.profit += state.lastProfit;
  state.weekly.revenue += revenue;
  state.weekly.expenses += expenses;
  state.brandBuzz = clamp(state.brandBuzz + sold * 0.36 - missed * 1.65 + (state.lastProfit > 0 ? 1.1 : -2.8), 0, 100);
  updatePassiveMilestoneMemory({ profit: state.lastProfit });
  state.stats.daily.push({ day: state.day, revenue, expenses, profit: state.lastProfit, sold, events: events.length, customers: customerBreakdown, soldByProduct, soldByMachineProduct, breakdown });
  state.stats.daily = state.stats.daily.slice(-30);
  updateOperatorProfile();
  return { sales, revenue, sold, upkeep, missed, theftLoss, spoilLoss, events, customerBreakdown, soldByProduct, soldByMachineProduct, breakdown };
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

function rollRareEncounter(machine, events) {
  const fourthWall = maybeFourthWallMoment("machine", { machine });
  if (fourthWall) {
    events.push(`${machine.name}: ${fourthWall.text}`);
    addMachineIncident(machine, `Session-aware note: ${fourthWall.tags?.slice(1, 3).join(", ") || "observed"}.`);
    return;
  }
  for (let index = 0; index < rareEncounters.length; index += 1) {
    const encounter = rareEncounters[index];
    const text = encounter.text(machine);
    if (!shouldRollWorldEvent(`rare:${index}`, encounter.chance, 10)) continue;
    events.push(text);
    encounter.effect?.(machine, events);
    return;
  }
}

function rollHumorEventPack(events) {
  for (const pack of humorEventPacks) {
    if (Math.random() >= pack.chance) continue;
    events.push(pack.text());
    return;
  }
}

function rollChaosEvent(events) {
  if (!state.started || state.day < 4) return;
  for (const event of chaosEvents) {
    if (!shouldRollWorldEvent(`chaos:${event.text}`, event.chance, 3)) continue;
    events.push(event.text);
    event.effect?.(events);
    return;
  }
}

function tickWorldPressure(events) {
  state.world ||= {};
  state.world.modifierDays ||= {};
  state.world.lockdowns ||= {};
  state.world.warfareCooldowns ||= {};
  state.world.corporateEffects = Array.isArray(state.world.corporateEffects) ? state.world.corporateEffects : [];
  Object.keys(state.world.warfareCooldowns).forEach((id) => {
    state.world.warfareCooldowns[id] = Math.max(0, (state.world.warfareCooldowns[id] || 0) - 1);
  });
  state.world.diplomacyCooldown = Math.max(0, (state.world.diplomacyCooldown || 0) - 1);
  state.world.pressCooldown = Math.max(0, (state.world.pressCooldown || 0) - 1);
  Object.keys(state.world.eventCooldowns).forEach((id) => {
    state.world.eventCooldowns[id] = Math.max(0, (state.world.eventCooldowns[id] || 0) - 1);
  });
  state.world.corporateEffects.forEach((effect) => {
    effect.daysLeft = Math.max(0, (effect.daysLeft || 0) - 1);
  });
  state.world.corporateEffects = state.world.corporateEffects.filter((effect) => (effect.daysLeft || 0) > 0);
  Object.keys(state.world.lockdowns).forEach((locationId) => {
    state.world.lockdowns[locationId] = Math.max(0, (state.world.lockdowns[locationId] || 0) - 1);
  });
  Object.keys(state.world.modifierDays).forEach((id) => {
    state.world.modifierDays[id] -= 1;
    if (state.world.modifierDays[id] <= 0) delete state.world.modifierDays[id];
  });
  rebuildWorldModifiers();
  state.world.hostility = clamp((state.world.hostility || 0) + lateGamePressureScore() * 1.4 - 1.1, 0, 100);
  const audit = worldModifier().audit || 0;
  if (audit > 0) state.corporate.heat = clamp((state.corporate.heat || 0) + audit, 0, 100);
}

function rebuildWorldModifiers() {
  const next = { machineCost: 1, upkeep: 1, demand: 1, theft: 1, audit: 0, loanInterest: 0, companyValue: 1, supplyByType: {}, upkeepByType: {}, locationUpkeep: {}, locationDemand: {}, securityByLocation: {}, theftByLocation: {}, cleanByLocation: {} };
  Object.keys(state.world.modifierDays || {}).forEach((id) => {
    if ((state.world.modifierDays[id] || 0) <= 0) return;
    const event = cityImpactEvents.find((item) => item.id === id);
    event?.apply(next);
  });
  (state.world.corporateEffects || []).forEach((effect) => {
    if ((effect.daysLeft || 0) <= 0) return;
    if (effect.type === "rent" && effect.locationId) {
      next.locationUpkeep[effect.locationId] = (next.locationUpkeep[effect.locationId] || 1) * (effect.value || 1.12);
      next.locationDemand[effect.locationId] = (next.locationDemand[effect.locationId] || 1) * 0.97;
    }
    if (effect.type === "credit") {
      next.loanInterest += effect.value || 0.012;
      next.companyValue *= 0.94;
    }
    if (effect.type === "smear") {
      next.demand *= effect.value || 0.94;
    }
    if (effect.type === "inspection") {
      next.audit += effect.value || 1.2;
    }
    if (effect.type === "supplier") {
      const type = effect.productType || "snack";
      next.supplyByType[type] = (next.supplyByType[type] || 1) * (effect.value || 1.1);
    }
    if (effect.type === "security" && effect.locationId) {
      next.theftByLocation[effect.locationId] = (next.theftByLocation[effect.locationId] || 1) * (effect.value || 1.15);
      next.securityByLocation[effect.locationId] = (next.securityByLocation[effect.locationId] || 0) - 8;
    }
    if (effect.type === "diplomacy") next.demand *= effect.value || 1;
  });
  state.world.modifiers = next;
}

function addCorporateEffect(effect) {
  state.world ||= {};
  state.world.corporateEffects = Array.isArray(state.world.corporateEffects) ? state.world.corporateEffects : [];
  const normalized = {
    id: sanitizeName(effect.id || `${effect.type || "effect"}-${Date.now()}-${Math.round(Math.random() * 999)}`, "corporate-effect", 64),
    type: sanitizeName(effect.type, "pressure", 32),
    source: sanitizeName(effect.source, "Corporate pressure", 64),
    text: sanitizeName(effect.text, "Corporate pressure changed operating conditions.", 180),
    daysLeft: Math.max(1, Math.round(Number(effect.daysLeft) || 2)),
    locationId: locations[effect.locationId] ? effect.locationId : null,
    productType: sanitizeName(effect.productType, "", 24),
    corporationId: sanitizeName(effect.corporationId, "", 32),
    value: Number(effect.value) || 1
  };
  state.world.corporateEffects.unshift(normalized);
  state.world.corporateEffects = state.world.corporateEffects.slice(0, 12);
  rebuildWorldModifiers();
  return normalized;
}

function rollCityImpactEvent(events) {
  if (!state.started || state.day < 6) return;
  const pressure = lateGamePressureScore();
  const tier = hostilityTier();
  for (const event of cityImpactEvents) {
    if (state.world.modifierDays?.[event.id]) continue;
    if (!shouldRollWorldEvent(`city:${event.id}`, event.chance * (1 + pressure * 0.55) * tier.retaliationFactor, 5)) continue;
    state.world.modifierDays[event.id] = event.duration;
    rebuildWorldModifiers();
    events.push(event.text);
    addCityHeadline(makeCityHeadline("economy"));
    return;
  }
}

function rollLateGameRetaliation(events) {
  const pressure = lateGamePressureScore();
  const tier = hostilityTier();
  const pressureEffects = corporatePressureGameplayEffects();
  if (state.day < 10 || pressure < 0.34 || Math.random() > ((0.04 + pressure * 0.045) * tier.retaliationFactor + pressureEffects.locationPressureChance)) return;
  const locationId = highestDominanceLocation();
  const company = pick(activeCorporations());
  const locationPressure = competitionLocation(locationId);
  locationPressure.companyId = company.id;
  locationPressure.level = clamp((locationPressure.level || 0) + 2, 0, 6);
  locationPressure.daysLeft = Math.max(locationPressure.daysLeft || 0, 4);
  locationPressure.interferenceDays = Math.max(locationPressure.interferenceDays || 0, 2);
  state.world.hostility = clamp((state.world.hostility || 0) + 5, 0, 100);
  events.push(`${company.label} coordinated a retaliation package at ${locationById(locationId).label}. It came with attachments.`);
}

function rollCorporationAttack(events) {
  if (!state.started || !isLateGame() || state.machines.length < 2) return;
  const tier = hostilityTier();
  const daysSince = state.world?.lastCorporateAttackDay ? state.day - state.world.lastCorporateAttackDay : 999;
  const chance = (0.024 + lateGamePressureScore() * 0.026 + (state.world?.hostility || 0) / 4200 + Math.min(0.055, Math.max(0, daysSince - 10) * 0.007)) * tier.retaliationFactor;
  if (!shouldRollWorldEvent("corporate:attack", chance, 4)) return;
  const corps = activeCorporations();
  if (!corps.length) return;
  const company = weightedPick(corps.map((corp) => ({ ref: corp, chance: 1 + (corp.hostility || 0) / 35 + (corp.marketShare || 0) / 80 }))).ref;
  const tacticPool = corporateAttackEvents.filter((attack) => !attack.tactic || (company.tactics || []).includes(attack.tactic));
  const attack = pick(tacticPool.length ? tacticPool : corporateAttackEvents);
  const locationId = highestDominanceLocation();
  const productType = pick(["snack", "drink", "coffee", "fresh", "alcohol"]);
  const effect = addCorporateEffect({
    id: `${attack.id}-${state.day}`,
    type: attack.type,
    source: company.label,
    text: attack.text(company, locationById(locationId)),
    daysLeft: attack.duration,
    locationId,
    productType,
    corporationId: company.id,
    value: attack.value
  });
  company.hostility = clamp((company.hostility || 0) + 3, 0, 100);
  state.world.hostility = clamp((state.world.hostility || 0) + 3, 0, 100);
  if (attack.type === "inspection") state.corporate.heat = clamp((state.corporate.heat || 0) + 3, 0, 100);
  if (attack.type === "smear") state.brandBuzz = clamp(state.brandBuzz - 2.5, 0, 100);
  const pressure = competitionLocation(locationId);
  pressure.companyId = company.id;
  pressure.level = clamp((pressure.level || 0) + 1, 0, 6);
  if (attack.type === "rent") pressure.landlordDays = Math.max(pressure.landlordDays || 0, attack.duration);
  if (attack.type === "smear") pressure.smearDays = Math.max(pressure.smearDays || 0, attack.duration);
  if (attack.type === "supplier") pressure.supplierInterferenceDays = Math.max(pressure.supplierInterferenceDays || 0, attack.duration);
  if (attack.type === "security") pressure.securityIntimidationDays = Math.max(pressure.securityIntimidationDays || 0, attack.duration);
  events.push(`${effect.text} Effect: ${corporateEffectSummary(effect)}.`);
  addCityHeadline({ day: state.day, section: "Corporations", text: `${company.label} escalated pressure against ${sanitizeName(state.companyName, DEFAULT_COMPANY_NAME)}. The city called it competition because that is cheaper.` });
  state.world.lastCorporateAttackDay = state.day;
}

function corporateEffectSummary(effect) {
  if (!effect) return "temporary operating pressure";
  if (effect.type === "rent") return `${locationById(effect.locationId).label} upkeep x${Math.round((effect.value || 1) * 100)}%, ${effect.daysLeft}d`;
  if (effect.type === "credit") return `loan interest +${Math.round((effect.value || 0) * 1000) / 10} pts and company value suppressed, ${effect.daysLeft}d`;
  if (effect.type === "smear") return `global demand x${Math.round((effect.value || 1) * 100)}%, ${effect.daysLeft}d`;
  if (effect.type === "inspection") return `audit heat +${effect.value || 1}/day, ${effect.daysLeft}d`;
  if (effect.type === "supplier") return `${effect.productType || "selected"} supply x${Math.round((effect.value || 1) * 100)}%, ${effect.daysLeft}d`;
  if (effect.type === "security") return `${locationById(effect.locationId).label} theft x${Math.round((effect.value || 1) * 100)}%, ${effect.daysLeft}d`;
  if (effect.type === "diplomacy") return `diplomatic pressure x${Math.round((effect.value || 1) * 100)}%, ${effect.daysLeft}d`;
  return `${effect.daysLeft || 0}d`;
}

function activeCorporateEffectLines() {
  const effects = (state.world?.corporateEffects || []).filter((effect) => (effect.daysLeft || 0) > 0);
  if (!effects.length) return "<p class=\"corp-note\">No active corporate attack modifiers. The paperwork is merely watching.</p>";
  return effects.map((effect) => `<p class="impact-pill"><strong>${effect.source}: ${effect.type}</strong><span>${effect.text} ${corporateEffectSummary(effect)}.</span></p>`).join("");
}

function rollCorporationVsCorporation(events) {
  if (!state.started || !isLateGame() || activeCorporations().length < 2) return;
  const daysSince = state.world?.lastInfightingDay ? state.day - state.world.lastInfightingDay : 999;
  const forced = daysSince >= 22 && isLateGame("deep");
  if (!forced && !shouldRollWorldEvent("corporate:infighting", 0.06 + lateGamePressureScore() * 0.035 + Math.min(0.08, Math.max(0, daysSince - 8) * 0.008), 5)) return;
  const corps = activeCorporations();
  const attacker = pick(corps);
  const defender = pick(corps.filter((corp) => corp.id !== attacker.id));
  if (!defender) return;
  const outcomes = [
    () => {
      defender.rep = clamp((defender.rep || 0) - 4, 0, 100);
      attacker.marketShare = clamp((attacker.marketShare || 0) + 1.5, 0, 100);
      return `${attacker.label} started a price war against ${defender.label}. ${defender.label} lost reputation and several polite words.`;
    },
    () => {
      attacker.rep = clamp((attacker.rep || 0) - 3, 0, 100);
      defender.marketShare = clamp((defender.marketShare || 0) + 1, 0, 100);
      return `${attacker.label} attempted a district grab and was fined for paperwork with intent.`;
    },
    () => {
      defender.status = "weakened";
      defender.marketShare = clamp((defender.marketShare || 0) - 2.2, 0, 100);
      return `${defender.label} lost a district contract after a rival memo described them as 'legacy-adjacent'.`;
    },
    () => {
      if ((attacker.rep || 0) > 65 && (defender.rep || 0) < 18) {
        defender.status = "merged";
        defender.rep = 6;
        attacker.marketShare = clamp((attacker.marketShare || 0) + 4, 0, 100);
        return `${attacker.label} absorbed ${defender.label}. The city updated the illusion of choice.`;
      }
      defender.rep = clamp((defender.rep || 0) - 2, 0, 100);
      return `${attacker.label} floated a merger rumor about ${defender.label}. Investors briefly developed pupils.`;
    },
    () => {
      attacker.hostility = clamp((attacker.hostility || 0) - 3, 0, 100);
      defender.hostility = clamp((defender.hostility || 0) + 5, 0, 100);
      return `${attacker.label} leaked a compliance memo about ${defender.label}. For one beautiful hour, nobody looked at your machines.`;
    },
    () => {
      const locationId = pick(Object.keys(locations));
      const pressure = competitionLocation(locationId);
      pressure.companyId = defender.id;
      pressure.level = Math.max(0, (pressure.level || 0) - 1);
      defender.marketShare = clamp((defender.marketShare || 0) - 1.4, 0, 100);
      return `${attacker.label} and ${defender.label} fought over ${locationById(locationId).label}. District pressure loosened while the suits argued.`;
    }
  ];
  const text = pick(outcomes)();
  events.push(text);
  addCityHeadline({ day: state.day, section: "Corporations", text });
  addOperatorChoiceSignal("competitorChaos", 0.4);
  state.world.lastInfightingDay = state.day;
}

function rollCrisisWarningEvent(events) {
  if (!state.started || state.day < 8) return;
  const pressure = lateGamePressureScore();
  const warnings = [
    {
      id: "inspectionRumors",
      chance: 0.035 + pressure * 0.025,
      condition: () => (state.corporate?.heat || 0) >= 22,
      text: "Warning: inspection rumors are circulating. The forms have started arriving pre-disappointed."
    },
    {
      id: "supplierInstability",
      chance: 0.028 + pressure * 0.018,
      condition: () => Object.keys(state.supplyModifiers || {}).length > 0 || state.machines.length >= 3,
      text: "Warning: supplier instability indicators rose. Procurement describes this as 'probably tomorrow's problem'."
    },
    {
      id: "legalAttention",
      chance: 0.03 + pressure * 0.02,
      condition: () => (state.world?.hostility || 0) >= 45 || (state.corporate?.heat || 0) >= 35,
      text: "Warning: legal attention is rising. Someone in a blazer learned your company name."
    },
    {
      id: "machineFatigue",
      chance: 0.032,
      condition: () => state.machines.some((machine) => machine.condition < 42 || ensureMachineHistory(machine).daysActive >= 18),
      text: "Warning: machine fatigue reports increased. One unit made a sound that maintenance classified as 'not ideal'."
    },
    {
      id: "districtTension",
      chance: 0.03 + pressure * 0.02,
      condition: () => Object.keys(locations).some((locationId) => (competitionLocation(locationId).level || 0) >= 3),
      text: "Warning: district tension is rising. Landlords are using the phrase 'market reality' again."
    }
  ];
  for (const warning of warnings) {
    if (!warning.condition()) continue;
    if (!shouldRollWorldEvent(`warning:${warning.id}`, warning.chance, 5)) continue;
    events.push(warning.text);
    return;
  }
}

function rollLateGameCrisis(events) {
  const pressure = lateGamePressureScore();
  if (state.day < 12 || state.machines.length < 3) return;
  for (const crisis of lateGameCrises) {
    if (pressure < crisis.minPressure) continue;
    if (!shouldRollWorldEvent(`crisis:${crisis.id}`, crisis.chance * (1 + pressure * 0.35), 7)) continue;
    const locationId = highestDominanceLocation();
    events.push(typeof crisis.text === "function" ? crisis.text(locationById(locationId)) : crisis.text);
    crisis.effect(locationId, events);
    state.world.crisisDays = (state.world.crisisDays || 0) + 1;
    return;
  }
}

function shouldRollWorldEvent(id, chance, cooldown) {
  state.world ||= {};
  state.world.eventCooldowns ||= {};
  if ((state.world.eventCooldowns[id] || 0) > 0) return false;
  if (Math.random() >= chance) return false;
  state.world.eventCooldowns[id] = cooldown;
  return true;
}

function maybeNexFlavor(channel, lines, chance = 0.006, cooldown = 18) {
  if (!state.started || state.day < 8 || !Array.isArray(lines) || lines.length === 0) return "";
  state.world ||= {};
  state.world.eventCooldowns ||= {};
  const anyKey = "nex:any";
  const channelKey = `nex:${channel}`;
  if ((state.world.eventCooldowns[anyKey] || 0) > 0 || (state.world.eventCooldowns[channelKey] || 0) > 0) return "";
  if (Math.random() >= Math.min(0.035, chance * 1.45)) return "";
  state.world.eventCooldowns[anyKey] = cooldown;
  state.world.eventCooldowns[channelKey] = cooldown * 2;
  return pick(lines);
}

function highestDominanceLocation() {
  return Object.keys(locations).sort((a, b) => districtDominance(b) - districtDominance(a))[0] || "campus";
}

function rollBehaviorEventChain(events) {
  const profile = ensureOperatorProfile();
  const tags = profile.behaviorTags || [];
  for (const chain of behaviorEventChains) {
    if (!tags.includes(chain.tag) || reputation() < chain.minRep) continue;
    state.world.eventChains[chain.id] ||= { stage: 0, lastDay: 0 };
    const record = state.world.eventChains[chain.id];
    if (record.stage >= chain.stages.length || state.day - record.lastDay < 3) continue;
    const chance = 0.1 + record.stage * 0.035 + (profile.identityPath?.id !== "unformed" ? 0.025 : 0);
    if (Math.random() >= chance) continue;
    const text = chain.stages[record.stage];
    events.push(text);
    chain.effect?.(record.stage, events);
    record.stage += 1;
    record.lastDay = state.day;
    state.world.reactionMemory ||= [];
    state.world.reactionMemory.unshift(`${chain.id} stage ${record.stage}`);
    state.world.reactionMemory = state.world.reactionMemory.slice(0, 20);
    return;
  }
}

function tickCompetition(events) {
  if (!state.competition?.companies) normalizeLoadedState();
  state.competition.companies.forEach((company) => {
    Object.assign(company, normalizeCorporation(company, competitorTemplates.find((template) => template.id === company.id) || competitorTemplates[0]));
    if (["collapsed", "merged"].includes(company.status)) return;
    const drift = company.style === "premium" ? 0.18 : company.style === "aggressive" ? 0.08 : 0.04;
    company.rep = clamp(company.rep + drift + (Math.random() - 0.5) * 1.2, 4, 92);
    company.status = corporationStatusFromRep(company.rep);
    company.hostility = clamp((company.hostility || 0) + (state.world?.hostility || 0) / 1000 - 0.12, 0, 100);
  });
  Object.keys(locations).forEach((locationId) => {
    const pressure = competitionLocation(locationId);
    if (pressure.daysLeft > 0) pressure.daysLeft -= 1;
    if (pressure.blockedDays > 0) pressure.blockedDays -= 1;
    if (pressure.landlordDays > 0) pressure.landlordDays -= 1;
    if (pressure.interferenceDays > 0) pressure.interferenceDays -= 1;
    if (pressure.protectedDays > 0) pressure.protectedDays -= 1;
    if (pressure.adBlitzDays > 0) pressure.adBlitzDays -= 1;
    if (pressure.scoutedDays > 0) pressure.scoutedDays -= 1;
    if (pressure.smearDays > 0) pressure.smearDays -= 1;
    if (pressure.supplierInterferenceDays > 0) pressure.supplierInterferenceDays -= 1;
    if (pressure.securityIntimidationDays > 0) pressure.securityIntimidationDays -= 1;
    if (pressure.daysLeft <= 0 && pressure.level > 0) {
      pressure.level = Math.max(0, pressure.level - 1);
      pressure.daysLeft = pressure.level > 0 ? 3 : 0;
      if (pressure.level === 0) pressure.companyId = null;
      events.push(`${locationById(locationId).label}: competitor pressure cooled down a little.`);
    }
    if (pressure.priceWar) {
      pressure.priceWar.daysLeft -= 1;
      if (pressure.priceWar.daysLeft <= 0) {
        const rival = competitorById(pressure.priceWar.companyId);
        events.push(`${rival.label}'s ${pressure.priceWar.type} price war ended.`);
        pressure.priceWar = null;
      }
    }
    pressure.takeoverRisk = takeoverRiskForLocation(locationId);
  });
  rollRivalStability(events);
}

function rollRivalStability(events) {
  const wounded = state.competition.companies.find((company) => (company.rep || 0) <= 12);
  if (!wounded) return;
  const contestedLocations = Object.keys(locations).filter((locationId) => competitionLocation(locationId).companyId === wounded.id);
  if (contestedLocations.length && Math.random() < 0.34) {
    const locationId = pick(contestedLocations);
    const pressure = competitionLocation(locationId);
    pressure.level = 0;
    pressure.daysLeft = 0;
    pressure.companyId = null;
    pressure.priceWar = null;
    pressure.blockedDays = 0;
    pressure.interferenceDays = 0;
    events.push(`${wounded.label} withdrew from ${locationById(locationId).label} after sustained pressure. Corporate vacancy detected; the city pretends competition still exists.`);
    wounded.status = "retreating";
    wounded.rep = clamp(wounded.rep + 8, 4, 92);
    state.world.milestoneMemory ||= {};
    state.world.milestoneMemory.rivalRetreat = true;
    state.world.hostility = clamp((state.world.hostility || 0) + 2, 0, 100);
    return;
  }
  if ((wounded.rep || 0) <= 7 && Math.random() < 0.12) {
    const template = pick(competitorTemplates.filter((company) => company.id !== wounded.id));
    wounded.label = `${template.label} Restructured`;
    wounded.color = template.color;
    wounded.style = template.style;
    wounded.archetype = template.archetype;
    wounded.personality = template.personality;
    wounded.tactics = [...(template.tactics || [])];
    wounded.weaknesses = [...(template.weaknesses || [])];
    wounded.resistances = [...(template.resistances || [])];
    wounded.status = "active";
    wounded.rep = 34;
    events.push(`${template.label} exited through a restructuring door. ${wounded.label} entered the city with a clean logo and no memory.`);
  }
}

function pressureAdBlitzFactor(locationId) {
  return competitionLocation(locationId).adBlitzDays > 0 ? 1.18 : 1;
}

function rollCompetitionEvent(events) {
  if (!state.started || state.day < 3) return;
  const event = pick(competitorEvents);
  if (Math.random() >= event.chance) return;
  const active = activeCorporations();
  if (!active.length) return;
  const company = pick(active);
  const locationId = pick(Object.keys(locations));
  const before = competitionLocation(locationId);
  event.apply(company, locationId, state.competition);
  const after = competitionLocation(locationId);
  const productType = after.priceWar?.type || before.priceWar?.type || "product";
  events.push(event.text(company, locationById(locationId), productType));
  const personality = corporationPersonalityLine(company);
  if (personality) events.push(personality);
}

function rollCorporationAction(events) {
  if (!state.started || state.day < 5 || state.machines.length === 0) return;
  const event = weightedPick(corporationActions);
  if (Math.random() >= event.chance) return;
  const active = activeCorporations();
  if (!active.length) return;
  const company = pick(active);
  const playerLocations = [...new Set(state.machines.map((machine) => machine.location))];
  const locationId = Math.random() < 0.78 ? pick(playerLocations) : pick(Object.keys(locations));
  event.apply(company, locationId, events);
  events.push(event.text(company, locationById(locationId)));
  const personality = corporationPersonalityLine(company);
  if (personality && Math.random() < 0.55) events.push(personality);
}

function corporationPersonalityLine(company) {
  const lines = corporationPersonalityLines[company?.personality] || corporationPersonalityLines[company?.style];
  if (!lines?.length) return "";
  const profile = ensureOperatorProfile();
  const base = pick(lines).replaceAll("{company}", company.label);
  if (profile.identityPath?.id === "monopolyRoute") return `${base} They have noticed your route density.`;
  if (profile.identityPath?.id === "undergroundChain") return `${base} Their compliance team seems unusually interested.`;
  return base;
}

function takeoverRiskForLocation(locationId) {
  const pressure = competitionLocation(locationId);
  if (!pressure.companyId || pressure.level < 3) return Math.max(0, pressure.level * 3);
  const rival = competitorById(pressure.companyId);
  const machinesHere = state.machines.filter((machine) => machine.location === locationId);
  const presence = machinesHere.length ? 0 : 12;
  const repGap = Math.max(0, rival.rep - reputation());
  const neglect = machinesHere.reduce((sum, machine) => {
    return sum + Math.max(0, 55 - machine.condition) * 0.16 + Math.max(0, 55 - machine.clean) * 0.12 + (machine.broken ? 10 : 0);
  }, 0);
  return clamp(pressure.level * 6 + repGap * 0.55 + neglect + presence + corporatePressureGameplayEffects().takeoverBonus, 0, 86);
}

function applyTakeoverPressure(machine, dailyVisitors, events) {
  const pressure = competitionLocation(machine.location);
  pressure.takeoverRisk = takeoverRiskForLocation(machine.location);
  if (pressure.takeoverRisk < 28) return 0;
  const rival = competitorById(pressure.companyId);
  if (Math.random() >= pressure.takeoverRisk / 1000) return 0;
  const fee = Math.round((locationById(machine.location).upkeep + 900 + pressure.level * 360) * (0.8 + Math.random() * 0.5));
  if (state.cash >= fee) {
    state.brandBuzz = clamp(state.brandBuzz - 1.5, 0, 100);
    events.push(`${rival.label} challenged ${machine.name}'s spot at ${locationById(machine.location).label}. You paid ${formatMoney(fee)} in retention fees.`);
    return fee;
  }
  const oldLocationId = machine.location;
  const oldLocation = locationById(machine.location).label;
  machine.location = "campus";
  machine.condition = clamp(machine.condition - 7, 0, 100);
  pressure.level = Math.max(0, pressure.level - 2);
  pressure.takeoverRisk = takeoverRiskForLocation(oldLocationId);
  state.brandBuzz = clamp(state.brandBuzz - 5, 0, 100);
  events.push(`${rival.label} pushed ${machine.name} out of ${oldLocation}. The machine was moved back to Campus lobby in a very awkward lease defeat.`);
  return 0;
}

function rollLocationEvent(location) {
  const candidates = locationEvents.filter((event) => event.bias === "any" || event.bias === location.eventBias);
  for (const event of candidates) {
    if (shouldRollWorldEvent(`location:${location.eventBias}:${event.name}`, event.chance, 3)) return { ...event, active: true };
  }
  return { name: "Normal day", productIds: [], multiplier: 1, duration: 0, text: "", active: false };
}

function averageMachinePriceDemand(machine) {
  const stocked = Object.keys(machine.stock).filter((id) => machine.stock[id] > 0).map(productById);
  if (stocked.length === 0) return 0.35;
  const average = stocked.reduce((sum, product) => sum + priceDemandFactor(product, machine), 0) / stocked.length;
  return clamp(average, 0.32, 1.55);
}

function averageMachineLocationFit(machine) {
  const stocked = Object.keys(machine.stock).filter((id) => machine.stock[id] > 0);
  if (!stocked.length) return 0.42;
  const weighted = stocked.reduce((sum, id) => sum + locationProductFactor(machine.location, id) * Math.max(1, machine.stock[id] || 0), 0);
  const total = stocked.reduce((sum, id) => sum + Math.max(1, machine.stock[id] || 0), 0);
  return clamp(weighted / total, 0.68, 1.28);
}

function customerMixDemandFactor(machine) {
  if (!machine) return 1;
  const mix = locationCustomers[machine.location] || ["casual"];
  const compatible = productsForType(machine.type).map((product) => product.id);
  if (!compatible.length) return 1;
  const stocked = Object.keys(machine.stock || {}).filter((id) => (machine.stock[id] || 0) > 0);
  const stockedCompatible = stocked.length ? stocked : compatible;
  const preference = mix.reduce((sum, customerId) => {
    const customer = customerTypes[customerId] || customerTypes.casual;
    const preferred = stockedCompatible.filter((id) => customer.products.includes(id)).length;
    return sum + (preferred > 0 ? 1.08 + Math.min(0.16, preferred * 0.035) : 0.88);
  }, 0) / Math.max(1, mix.length);
  return clamp(preference, 0.82, 1.22);
}

function demandVolatility(locationId) {
  const bias = locationById(locationId).eventBias;
  if (bias === "chaos") return 0.54;
  if (bias === "crowd") return 0.42;
  if (bias === "sport") return 0.36;
  return 0.3;
}

function weightedProductPick(productIds, customerId = "casual", machine = currentMachine()) {
  const customer = customerTypes[customerId] || customerTypes.casual;
  const weights = productIds.map((id) => {
    const product = productById(id);
    const preference = customer.products.includes(id) ? 1.65 : 0.65;
    const tolerance = product.price > product.basePrice ? customer.priceTolerance : 1;
    return Math.max(0.05, priceDemandFactor(product, machine) * preference * tolerance * locationProductFactor(machine.location, id));
  });
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < productIds.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) return productIds[i];
  }
  return productIds[productIds.length - 1];
}

const marketNormalizationLines = {
  supply: [
    "Several short-lived supply distortions normalized. The accountant resumed blinking.",
    "Wholesale pricing drift settled back down. Procurement stopped whispering at the calculator.",
    "Temporary supplier weirdness cleared. Costs returned to their usual, still disappointing, baseline."
  ],
  demand: [
    "Several demand trends expired at once. Consumers remembered rent exists.",
    "A cluster of public opinions moved on. Demand returned to operationally normal levels.",
    "Short-lived buying behavior normalized. The city filed the feeling under 'probably weather'."
  ]
};

function marketNormalizationText(kind, productNames) {
  const names = productNames.slice(0, 3).join(", ");
  const extra = productNames.length > 3 ? ` and ${productNames.length - 3} more` : "";
  return `${pick(marketNormalizationLines[kind] || marketNormalizationLines.demand)} Affected: ${names}${extra}.`;
}

function tickSupplyModifiers(events) {
  const normalized = [];
  Object.entries(state.supplyModifiers).forEach(([productId, modifier]) => {
    const product = productById(productId);
    if (!product) {
      delete state.supplyModifiers[productId];
      return;
    }
    modifier.daysLeft -= 1;
    if (modifier.daysLeft <= 0) {
      delete state.supplyModifiers[productId];
      normalized.push(productDisplayName(product));
    }
  });
  if (normalized.length > 0) events.push(marketNormalizationText("supply", normalized));
}

function updateWeeklyPressureMetrics(result) {
  const machines = state.machines || [];
  const averageClean = machines.length ? machines.reduce((sum, machine) => sum + machine.clean, 0) / machines.length : 100;
  if (averageClean >= 90) state.weekly.cleanDays = (state.weekly.cleanDays || 0) + 1;
  if (!machines.some((machine) => machine.broken)) state.weekly.breakdownFreeDays = (state.weekly.breakdownFreeDays || 0) + 1;
  if (Object.keys(locations).some((locationId) => (competitionLocation(locationId).level || 0) >= 3)) state.weekly.pressureDays = (state.weekly.pressureDays || 0) + 1;
  if ((state.corporate?.heat || 0) < 18) state.weekly.lowHeatDays = (state.weekly.lowHeatDays || 0) + 1;
  if (!Object.values(state.corporate?.substitutes || {}).some(Boolean)) state.weekly.noSubstituteDays = (state.weekly.noSubstituteDays || 0) + 1;
  if ((state.world?.crisisDays || 0) > 0 && result.profit > 0) state.weekly.crisisProfitDays = (state.weekly.crisisProfitDays || 0) + 1;
}

function updatePassiveMilestoneMemory(result) {
  state.world ||= {};
  state.world.milestoneMemory ||= {};
  if ((state.world.hostility || 0) >= 75 && result.profit >= 0) state.world.milestoneMemory.legalSiegeSurvived = true;
  if ((state.corporate?.heat || 0) < 18 && state.day >= 7) state.world.milestoneMemory.lowHeatMaintained = true;
  if (routeMilestoneStatus("dominateDistricts").complete) state.world.milestoneMemory.districtDominance = true;
  if (ensureOperatorProfile().identityPath?.id === "ethicalRoute") state.world.milestoneMemory.ethicalRoute = true;
  if (ensureOperatorProfile().identityPath?.id === "monopolyRoute") state.world.milestoneMemory.monopolyRoute = true;
}

function rollSupplyEvent(events) {
  for (const event of supplyEvents) {
    if (!eventProductScopeAllowed(event)) continue;
    if (!shouldRollWorldEvent(`supply:${event.name}`, event.chance, 4)) continue;
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
  const normalized = [];
  Object.entries(state.demandModifiers).forEach(([productId, modifier]) => {
    const product = productById(productId);
    if (!product) {
      delete state.demandModifiers[productId];
      return;
    }
    modifier.daysLeft -= 1;
    if (modifier.daysLeft <= 0) {
      delete state.demandModifiers[productId];
      normalized.push(productDisplayName(product));
    }
  });
  if (normalized.length > 0) events.push(marketNormalizationText("demand", normalized));
}

function rollDemandEvent(events) {
  for (const event of demandEvents) {
    if (!eventProductScopeAllowed(event)) continue;
    if (!shouldRollWorldEvent(`demand:${event.name}`, event.chance, 4)) continue;
    applyDemandEvent(event, events);
    return;
  }
}

function eventProductScopeAllowed(event) {
  const ids = event.productIds || [];
  if (!ids.length) return true;
  const types = new Set(ids.map((id) => productById(id)?.type).filter(Boolean));
  if (types.has("alcohol")) {
    const hasAlcoholRoute = (state.machines || []).some((machine) => machine.type === "alcohol") || Boolean(state.contracts?.alcohol);
    if (!hasAlcoholRoute) return false;
  }
  return true;
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
  const mechanicReduction = 1 - (state.corporate?.employees?.mechanic || 0) * 0.18;
  return (balance.majorFaultBaseChance + conditionRisk + ageRisk) * mechanicReduction;
}

function breakInChance(machine) {
  const location = locationById(machine.location);
  const security = effectiveSecurity(machine);
  if (security >= 90) return 0.00001;
  const insecurity = (100 - security) / 100;
  const cashTemptation = Math.min(0.018, machine.cash / 320000);
  const lateGameNoise = state.day > 14 ? 0.002 : 0;
  const alcoholAttention = machine.type === "alcohol" ? 1.18 : 1;
  return (balance.breakInBaseChance + Math.pow(insecurity, 2.35) * 0.105 + cashTemptation + lateGameNoise) * location.theft * worldLocationTheftFactor(machine.location) * alcoholAttention;
}

function applyMachineRisks(machine, events) {
  if (machine.broken) return;
  if (Math.random() < majorFaultChance(machine)) {
    const drop = 22 + Math.random() * 28;
    machine.condition = clamp(machine.condition - drop, 0, 100);
    machine.broken = machine.condition < 28 || Math.random() < 0.45;
    if (state.machines.length === 1 && machine.condition < 8) machine.condition = 0;
    state.brandBuzz = clamp(state.brandBuzz - 3.5, 0, 100);
    events.push(`${machine.name} started the day with a serious fault. Without service, it mostly sighs.`);
    const nexLine = maybeNexFlavor("failure", nexMachineFailureLines, 0.014, 22);
    if (nexLine) {
      events.push(`${machine.name}: ${nexLine}`);
      addMachineIncident(machine, `NEX// failure residue: ${nexLine}`);
    }
  }
}

function spoilFreshStock(machine, events) {
  let lostValue = 0;
  Object.keys(machine.stock).forEach((id) => {
    const product = productById(id);
    if (!product) return;
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

const eventDigestSections = [
  { id: "economy", title: "Economy", match: /(profit|cash|overhead|fine|tax|price|cost|fee|supplier|corporate|black market|wages|contract|settlement)/i },
  { id: "corporation", title: "Corporation activity", match: /(competitor|rival|corporation|price war|scouting|landlord|blocked|takeover|lease|lawsuit|audit|legal|monopoly|QuickSnack|Vendora|BudgetBite|NightGlass|CivicSnack)/i },
  { id: "chaos", title: "Chaos events", match: /(chaos|warning|strange|mysterious|serious fault|break-in|cracked|smudge|inspection drill|love letter|silver coat|clown)/i },
  { id: "supply", title: "Supply changes", match: /(supply|ordered|restock|warehouse|spoiled|wholesale|crate|stock)/i },
  { id: "location", title: "Location incidents", match: /(location|campus|office|station|gym|mall|pressure|takeover|break-in|cracked|fault|clean|service|machine)/i },
  { id: "reputation", title: "Reputation/news", match: /(reputation|brand|buzz|operator|classification|identity|headline|city|customer review)/i },
  { id: "news", title: "News", match: /./ }
];

function eventSeverity(text) {
  if (/(break-in|cracked open|tax inspection fine|lawsuit|regulatory audit|monopoly inquiry|pushed .* out|serious fault|goal missed|goal cleared|Week \d+ report)/i.test(text)) return "critical";
  return "minor";
}

function digestSignature(text) {
  const normalized = String(text || "")
    .toLowerCase()
    .replace(/\d+(\.\d+)?%?/g, "#")
    .replace(/day #/g, "day")
    .replace(/ft/g, "currency")
    .replace(/\s+/g, " ")
    .trim();
  if (/market distortions normalized|pricing drift settled|supplier weirdness cleared|demand trends expired|buying behavior normalized|demand returned|supply prices normalized/.test(normalized)) return "market-normalization";
  if (/accountant stopped squinting|trend moved on/.test(normalized)) return "market-normalization";
  if (/auto-restock ordered/.test(normalized)) return "auto-restock-summary";
  return normalized.slice(0, 110);
}

function dedupeDigestEvents(events) {
  state.world ||= {};
  state.world.digestMemory = Array.isArray(state.world.digestMemory) ? state.world.digestMemory : [];
  const recent = new Set(state.world.digestMemory.filter((item) => state.day - item.day <= 3).map((item) => item.signature));
  const seenToday = new Set();
  const kept = [];
  events.forEach((event) => {
    const signature = digestSignature(event);
    const critical = eventSeverity(event) === "critical";
    if (!critical && seenToday.has(signature)) return;
    if (!critical && recent.has(signature) && !/normalized|market|supplier|demand|auto-restock|relocation|transport/i.test(event)) return;
    seenToday.add(signature);
    kept.push(event);
  });
  state.world.digestMemory = [
    ...Array.from(seenToday).map((signature) => ({ signature, day: state.day })),
    ...state.world.digestMemory
  ].filter((item, index, array) => item.signature && state.day - item.day <= 5 && array.findIndex((candidate) => candidate.signature === item.signature) === index).slice(0, 40);
  return kept;
}

function buildEventDigest(events) {
  const cleanEvents = dedupeDigestEvents(events);
  const grouped = eventDigestSections.map((section) => ({ ...section, items: [] }));
  cleanEvents.filter((event) => eventSeverity(event) !== "critical").forEach((event) => {
    const section = grouped.find((candidate) => candidate.match.test(event)) || grouped[grouped.length - 1];
    if (section.items.length < 4) section.items.push(event);
  });
  const sections = grouped.filter((section) => section.items.length > 0).map(({ title, items }) => ({ title, items }));
  return {
    critical: cleanEvents.filter((event) => eventSeverity(event) === "critical"),
    sections
  };
}

function dailyBreakdownItems(breakdown) {
  const data = normalizeDailyBreakdown(breakdown);
  return [
    { label: "Revenue", value: data.revenue, always: true },
    { label: "Upkeep", value: data.upkeep },
    { label: "Auto-restock cash outflow", value: data.autoRestock },
    { label: "Loan interest", value: data.loanInterest },
    { label: "Principal repayment", value: data.principalRepayment },
    { label: "Corporate overhead", value: data.corporateOverhead },
    { label: "Legal/fines", value: data.legalFines },
    { label: "Dead inventory", value: data.deadInventory },
    { label: "Theft/vandalism", value: data.theft },
    { label: "Spoilage", value: data.spoilage },
    { label: "Operating expenses", value: data.operatingExpenses, always: true },
    { label: "Total cash outflow", value: data.cashOutflow, always: data.autoRestock > 0 }
  ].filter((item) => item.always || item.value > 0);
}

function dailyBreakdownLogLine(breakdown) {
  const items = dailyBreakdownItems(breakdown)
    .filter((item) => ["Upkeep", "Auto-restock cash outflow", "Loan interest", "Principal repayment", "Corporate overhead", "Legal/fines", "Dead inventory", "Theft/vandalism", "Spoilage"].includes(item.label))
    .slice(0, 8);
  if (!items.length) return "Daily cost breakdown: no material costs filed. Accounting is briefly suspicious.";
  return `Daily cost breakdown: ${items.map((item) => `${item.label} ${formatMoney(item.value)}`).join(" | ")}. Auto-restock is shown as cash outflow, not operating profit.`;
}

function digestHasItems(digest) {
  return digest.sections.some((section) => section.items.length > 0);
}

async function nextDay() {
  if (state.runningDay || state.gameOver) return;
  state.runningDay = true;
  setBusy(true);
  addLog(pick(logBits.dayStart));
  renderLog();

  const result = planDay();
  updateFinalMachineCriticalState(result.events);
  addCityHeadlinesForDay(result);
  const digest = buildEventDigest(result.events);
  const animationCount = Math.min(Math.max(result.sold, 4), 18);
  const liveEvents = [...digest.critical];
  for (let i = 0; i < animationCount; i += 1) {
    spawnCustomer(i, result.sales[i % Math.max(result.sales.length, 1)]);
    if (liveEvents.length > 0 && (i === 1 || i % 6 === 0)) {
      await showEventToast(liveEvents.shift());
    }
    await wait(170);
  }
  while (liveEvents.length > 0) {
    await showEventToast(liveEvents.shift());
  }
  if (digestHasItems(digest)) {
    await showDigestToast(digest);
  }
  const choicePrompt = maybeCreatePressPrompt() || maybeCreateDiplomacyPrompt();
  if (choicePrompt) {
    const choice = await showChoiceToast(choicePrompt);
    const outcome = choice?.apply?.(choice.corporation || choicePrompt.corporation);
    if (outcome) {
      addLog(outcome);
      addCityHeadline({ day: state.day, section: choicePrompt.corporation ? "Corporations" : "Press", text: outcome });
    }
  }
  await wait(850);

  state.day += 1;
  result.events.forEach((event) => addLog(event));
  if (result.sold > 0) {
    addLog(`${result.sold} items sold, ${formatMoney(result.revenue)} revenue, ${formatMoney(state.lastProfit)} profit/loss. The cash box jingled with quiet confidence.`);
  } else {
    addLog(pick(logBits.noSale));
  }
  addLog(dailyBreakdownLogLine(result.breakdown));
  if (result.missed > 0) addLog(`${result.missed} ${pick(logBits.problem)}`);
  if (result.theftLoss > 0) addLog(`Break-in losses: ${formatMoney(result.theftLoss)}. The security screwdriver was missed today.`);
  if (result.spoilLoss > 0) addLog(`Spoilage loss: ${formatMoney(result.spoilLoss)}. A few sandwiches entered a philosophical state.`);
  if (result.missed === 0 && result.sold > 5) addLog(pick(logBits.goodDay));
  const review = customerReviewForDay(result);
  if (review) {
    state.reviews ||= [];
    state.reviews.unshift(review);
    state.reviews = normalizeReviews(state.reviews);
    addLog(`Customer review (${review.rating}/5 stars): "${review.text}"`);
  }
  if ((state.day - 1) % 7 === 0) {
    const report = closeWeek();
    await showEventToast(report.text);
  }

  evaluateGameOver("dayEnd");
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
    expenses: 0,
    cleanDays: 0,
    breakdownFreeDays: 0,
    pressureDays: 0,
    lowHeatDays: 0,
    noSubstituteDays: 0,
    stationDrinkSales: 0,
    crisisProfitDays: 0
  };
  return { text };
}

function goalReached(goal) {
  if (goal.type === "profit") return state.weekly.profit >= goal.target;
  if (goal.type === "reputation") return reputation() >= goal.target;
  if (goal.type === "sales") return state.weekly.sales >= goal.target;
  if (goal.type === "cleanDays") return (state.weekly.cleanDays || 0) >= goal.target;
  if (goal.type === "breakdownFree") return (state.weekly.breakdownFreeDays || 0) >= goal.target;
  if (goal.type === "pressureSurvival") return (state.weekly.pressureDays || 0) >= goal.target;
  if (goal.type === "lowHeatDays") return (state.weekly.lowHeatDays || 0) >= goal.target;
  if (goal.type === "noSubstituteDays") return (state.weekly.noSubstituteDays || 0) >= goal.target;
  if (goal.type === "stationDrinks") return (state.weekly.stationDrinkSales || 0) >= goal.target;
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

function bindHelpButtons(root = document) {
  root.querySelectorAll("[data-help]").forEach((button) => {
    if (button.dataset.helpBound) return;
    button.dataset.helpBound = "true";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openHelp(button.dataset.help);
    });
  });
}

bindHelpButtons();

el.helpClose.addEventListener("click", closeHelp);
el.helpOverlay.addEventListener("click", (event) => {
  if (event.target === el.helpOverlay) closeHelp();
});

el.collectCash.addEventListener("click", collectCash);
el.repair.addEventListener("click", repairMachine);
el.clean.addEventListener("click", cleanMachine);
el.sellMachine?.addEventListener("click", sellCurrentMachine);
el.machineLocation.addEventListener("change", changeLocation);
el.machineRename.addEventListener("change", () => renameCurrentMachine(el.machineRename.value));
el.exportSave.addEventListener("click", exportCurrentSave);
el.importSave.addEventListener("click", () => el.importSaveFile.click());
el.importSaveFile.addEventListener("change", () => importSaveFile(el.importSaveFile.files?.[0]));
el.startImportSave?.addEventListener("click", () => el.startImportSaveFile?.click());
el.startImportSaveFile?.addEventListener("change", () => importSaveFile(el.startImportSaveFile.files?.[0], el.startImportSaveFile));
el.buyMachine.addEventListener("click", buyMachine);
el.nextDay.addEventListener("click", nextDay);
el.gameOverNew?.addEventListener("click", startNewFromGameOver);
el.gameOverLoad?.addEventListener("click", showLoadOptionsFromGameOver);
el.gameOverExport?.addEventListener("click", exportCurrentSave);

["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, updateIdleTelemetry, { passive: true });
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    sessionAwareness.data.focusLost += 1;
  } else {
    sessionAwareness.data.focusReturns += 1;
    updateIdleTelemetry();
  }
  sessionAwareness.save();
});

document.addEventListener("fullscreenchange", () => {
  sessionAwareness.record("fullscreen");
});

render();
