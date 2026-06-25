/* ============================================================
   ONYX VIKING SERVICES — brand data + content
   Single source of truth for copy. Update phone/email/cities
   here and it flows site-wide. Viking is a single full-line
   brand, so its appliances are grouped into two service
   categories below: REFRIGERATION and COOKING.
   ============================================================ */

export type Problem = { t: string; d: string };
export type Brand = { label: string; line: string; problems: Problem[] };
export type CityGroup = { region: string; cities: string[] };

export const SITE = {
  name: "Onyx Viking Services",
  phoneDisplay: "(877) 778-0227",
  phoneTel: "+18777780227",
  email: "contact@onyxvikingservice.com",
  hours: "Open daily, 7am to 7pm",
  region: "Los Angeles & Southern California",
  address: "By appointment · Beverly Hills, CA",
  // CA Bureau of Household Goods and Services registration (in progress). NOT CSLB.
  bearReg: "CA Appliance Service Dealer Reg. # ____ (BEAR)",
  disclaimer:
    "Onyx Viking Services is independent and not affiliated with, sponsored by, or endorsed by Viking Range, LLC",
  diagnosticFee: 95,
  ctaLabel: "Call now",
  // Stripe Payment Link for the $95 diagnostic deposit.
  stripePaymentLink: "https://buy.stripe.com/bJe7sLdNKdoU6XF2xbfUQ00",

  /** Top-nav / footer pages (Next.js routes) */
  pages: [
    { id: "problems", label: "Problems We Fix", href: "/problems" },
    { id: "cities", label: "Cities Served", href: "/cities" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
  home: "/",
  book: "/book",
} as const;

export const ASSURANCES: Problem[] = [
  {
    t: "Discreet, vetted technicians",
    d: "Vetted, uniformed, and briefed on the homes they enter. NDAs available on request.",
  },
  {
    t: "Genuine factory parts only",
    d: "No aftermarket substitutes. Every component is Viking OEM, sourced direct.",
  },
  {
    t: "White glove home protection",
    d: "Floors, cabinetry and stonework are draped and protected before a single panel comes off.",
  },
  {
    t: "Flat, upfront pricing",
    d: "A fixed diagnostic fee, credited toward your repair. No surprises, no hourly meter.",
  },
  {
    t: "Concierge scheduling",
    d: "A single point of contact, arrival windows kept, and updates by text or call, whichever you prefer.",
  },
  {
    t: "Fully bonded and insured",
    d: "Comprehensive liability coverage on every visit. Your estate manager will have the paperwork.",
  },
];

export const REFRIGERATION: Brand = {
  label: "Refrigeration",
  line: "Refrigerators · Freezers · Built-Ins · Wine Storage",
  problems: [
    { t: "Refrigerator not cooling", d: "Temperature drift, warm zones, or food spoiling early. Usually a failing thermostat, sealed system, or compressor." },
    { t: "Freezer not freezing", d: "Soft ice cream and frost on the walls point to a defrost system or evaporator fan that has failed." },
    { t: "Heavy frost buildup", d: "Excess ice in the compartment traces back to a defrost heater, a terminator, or a tired door gasket." },
    { t: "Door not sealing", d: "A broken vacuum seal lets cold escape and runs the compressor hard. We restore airtight gasket integrity." },
    { t: "Ice maker not making ice", d: "No ice, low production, or leaks at the water inlet valve, diagnosed and repaired in one visit." },
    { t: "Water leaking from the bottom", d: "A clogged defrost drain or a split water line, traced to the source and sealed properly." },
    { t: "Buzzing and loud operation", d: "Viking refrigerators run nearly silent. Grinding or buzzing is a fan motor or compressor calling for attention." },
    { t: "Condenser and error codes", d: '"Vacuum Condenser" and "Service" codes, control board errors, and light faults, cleared and corrected.' },
    { t: "Wine storage temperature", d: "Dual zone drift and humidity faults that threaten a cellar, recalibrated to spec." },
  ],
};

export const COOKING: Brand = {
  label: "Cooking",
  line: "Ranges · Stoves · Ovens · Wall Ovens · Cooktops",
  problems: [
    { t: "Oven won’t heat or hold temp", d: "Failed igniters and bake elements restored for consistent, calibrated baking heat." },
    { t: "Uneven baking", d: "Convection fan motor failures and airflow faults that cook one side faster than the other." },
    { t: "Burner won’t light or clicks", d: "Continuous clicking and spark module faults on dual stacked sealed burners, corrected." },
    { t: "Range flame control", d: "Gas regulator pressure and manifold flow issues that make a low simmer impossible." },
    { t: "Touch panel and display errors", d: "Unresponsive touchscreens and digital error codes diagnosed at the board level." },
    { t: "Door and gasket heat loss", d: "Hinge tension and gasket seals restored so the oven holds its heat where it belongs." },
  ],
};

export const CITY_GROUPS: CityGroup[] = [
  { region: "The Westside", cities: ["Beverly Hills", "Bel Air", "Holmby Hills", "Brentwood", "Pacific Palisades", "Malibu", "Santa Monica", "Hancock Park"] },
  { region: "The Valley", cities: ["Encino", "Sherman Oaks", "Studio City", "Tarzana", "Calabasas", "Hidden Hills", "Toluca Lake", "Woodland Hills"] },
  { region: "Pasadena & Foothills", cities: ["Pasadena", "San Marino", "La Cañada Flintridge", "Sierra Madre", "Glendale", "Los Feliz"] },
  { region: "Coast & South Bay", cities: ["Manhattan Beach", "Palos Verdes", "Hermosa Beach", "Redondo Beach", "Newport Beach", "Santa Barbara"] },
];

export const FEATURED_CITIES = [
  { name: "Beverly Hills", note: "Built in Viking estates" },
  { name: "Bel Air", note: "Discreet service, strictly by appointment" },
  { name: "Malibu", note: "Coastal homes and salt air corrosion care" },
  { name: "Pacific Palisades", note: "Same day across the Westside" },
  { name: "Pasadena", note: "Historic kitchens, modern Viking appliances" },
  { name: "Santa Monica", note: "Wine storage and dual zone specialists" },
];

export const REVIEWS = [
  { q: "Our 48 inch Viking went down the day before a dinner for twenty. They were in Bel Air within hours, parts on the truck, and never left a mark on the floors.", n: "R. Calloway", c: "Bel Air" },
  { q: "The only people I let touch the Viking range. Calm, precise, genuinely expert, and they explain exactly what failed and why.", n: "M. Adeyemi", c: "Pacific Palisades" },
  { q: "A wine cooler holding 600 bottles was drifting warm. They recalibrated it the same afternoon and saved the cellar. Worth every cent.", n: "D. Hartman", c: "Montecito" },
];

export const WARNING_SIGNS: Problem[] = [
  { t: "Temperature fluctuations", d: "Food spoiling early or a freezer that won’t hold cold, often a failing thermostat or compressor." },
  { t: "Unusual noise", d: "Grinding, buzzing, or clicking from a fridge built to run quietly points to a fan motor or compressor." },
  { t: "Water leaking", d: "Puddles inside or beneath the unit usually mean a clogged defrost drain or a compromised water line." },
  { t: "Frost buildup", d: "Excess ice in the freezer traces back to a defrost system fault or a tired door gasket." },
  { t: "Lights or display out", d: "A dark interior or a blank panel can signal an electrical fault well beyond a burned out bulb." },
];

export const APPLIANCES = [
  "Viking refrigerator",
  "Viking freezer",
  "Viking built-in fridge/freezer",
  "Viking range",
  "Viking stove",
  "Viking oven",
  "Viking wall oven",
  "Viking cooktop",
  "Viking wine storage",
];

// Three hour arrival windows across the 7am to 7pm service day.
export const TIME_WINDOWS = [
  "7:00 to 10:00 AM",
  "10:00 AM to 1:00 PM",
  "1:00 to 4:00 PM",
  "4:00 to 7:00 PM",
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "How soon can someone come out?",
    a: "Same day or next day across Los Angeles and Southern California. A flat $95 diagnostic reserves a factory trained technician in the arrival window you choose.",
  },
  {
    q: "Are your technicians vetted?",
    a: "Every technician is certified, background checked, uniformed, and briefed on the homes they enter. NDAs are available on request.",
  },
  {
    q: "Do you use genuine parts?",
    a: "Only Viking OEM components, sourced direct. No aftermarket substitutes, ever.",
  },
  {
    q: "What does the $95 diagnostic include?",
    a: "A factory trained technician at your door, a full diagnosis at the source, and a genuine parts quote on the spot. It is credited in full toward your repair.",
  },
  {
    q: "Is the repair guaranteed?",
    a: "Yes. Three years, manufacturer backed, on parts and labour. One name to call if anything is ever not right.",
  },
  {
    q: "Will you protect my home?",
    a: "Floors, cabinetry, and stonework are draped and protected before a single panel comes off, and the kitchen is left exactly as we found it.",
  },
];
