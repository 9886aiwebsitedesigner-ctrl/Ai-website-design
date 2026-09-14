import { ServiceItem, Stylist, LookbookItem, BeforeAfterItem, Testimonial, QuizQuestion } from '../types';

export const SALON_DETAILS = {
  name: "Junko Hair Studio",
  tagline: "Japanese Hair Artistry & Texture Mastery Since 1991",
  address: "2391 Peachtree Rd NE, Suite B3D",
  cityStateZip: "Atlanta, GA 30305",
  neighborhood: "Buckhead",
  phone: "(404) 814-1827",
  formattedPhone: "+14048141827",
  email: "concierge@junkohair.com",
  instagram: "@junkohairstudio",
  shopUrl: "https://shop.saloninteractive.com/store/junko-hair-studio-95652",
  hours: [
    { day: "Tuesday – Friday", time: "10:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday & Monday", time: "Closed (VIP Special Bookings Only)" }
  ],
  awards: [
    "2024 Quality Business Award Winner — Best Hair Salon in Atlanta",
    "Pioneer of Japanese Thermal Reconditioning in the Southeast (YUKO Certified)",
    "Over 33 Years of Texture Excellence in Buckhead Atlanta",
    "Rated 4.9/5 Across 650+ Verified Client Reviews"
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "jtr-full",
    name: "Japanese Thermal Reconditioning (JTR / YUKO)",
    category: "jtr-straightening",
    priceStartingAt: 380,
    priceNote: "Starting price varies with length & density; consultation included",
    durationMinutes: 240,
    description: "The gold standard of permanent hair straightening pioneered in Japan. Restructures internal hair bonds with pure collagen, silk proteins, and precision heat to create permanent pin-straight, ultra-glossy glass hair that resists humidity.",
    highlights: [
      "Permanent pin-straight result until new growth appears",
      "Humidity-proof glass-like mirror shine",
      "Customized pH formulation for delicate or color-treated hair",
      "Includes deep Milbon post-treatment seal"
    ],
    recommendedStylists: ["Kai", "Akemi", "Ahmed", "David"],
    requiresConsultation: true,
    tag: "Signature Specialty",
    image: "/src/assets/images/junko_hero_hair_1788320326641.jpg"
  },
  {
    id: "jtr-retouch",
    name: "JTR Regrowth Touch-up",
    category: "jtr-straightening",
    priceStartingAt: 320,
    priceNote: "For returning clients with 3–8 months of new growth",
    durationMinutes: 180,
    description: "Precision chemical application targeting only new curly/textured regrowth while protecting previously straightened strands with protective barrier creams.",
    highlights: [
      "Seamless blending with previously straightened lengths",
      "Protective keratin barrier application",
      "Blowdry and thermal sealing included"
    ],
    recommendedStylists: ["Kai", "Akemi", "David"],
    tag: "Maintenance"
  },
  {
    id: "digital-perm",
    name: "Japanese Digital Perm (Air Wave)",
    category: "digital-perms",
    priceStartingAt: 260,
    priceNote: "Includes cut & custom curl rod mapping",
    durationMinutes: 180,
    description: "Utilizes temperature-regulated ceramic rods controlled by a digitized machine. Unlike cold traditional perms, Digital Perm curls activate and become loose, bouncy, natural mermaid waves when dry.",
    highlights: [
      "Natural loose, touchable curls that look freshly styled",
      "Lasts 6 to 10 months with minimal styling effort",
      "Ceramic heat locks in soft texture without crunchiness"
    ],
    recommendedStylists: ["Kai", "Akemi", "Soung Youn"],
    tag: "High Demand",
    image: "/src/assets/images/junko_digital_perm_1788320364051.jpg"
  },
  {
    id: "japanese-head-spa",
    name: "Aromatherapy Japanese Scalp & Head Spa Ritual",
    category: "head-spa-treatments",
    priceStartingAt: 140,
    priceNote: "60-minute rejuvenating sensory experience",
    durationMinutes: 60,
    description: "An authentic Japanese hair & scalp revitalization ritual. Features scalp diagnostics, botanical exfoliating foam, warm waterfall water-circulator, deep shiatsu acupressure massage, and micro-mist steam infusion.",
    highlights: [
      "Deeply unclogs hair follicles and stimulates healthy growth",
      "Shiatsu neck, shoulder, and cranial acupressure relief",
      "Herbal essential oil blends customized to your scalp type",
      "Leaves hair weightless, soft, and glossy"
    ],
    recommendedStylists: ["Ahmed", "Kai", "Jessica"],
    tag: "Ultimate Relaxation",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "master-cut-women",
    name: "Master Japanese Precision Haircut & Styling",
    category: "precision-cuts",
    priceStartingAt: 95,
    priceNote: "Includes tailored wash, conditioning, and blowout",
    durationMinutes: 60,
    description: "Architectural Japanese slide-cutting and point-cutting techniques tailored to your face shape, head structure, and natural hair movement. Weight removal without fraying ends.",
    highlights: [
      "Dry and wet tailored Japanese precision cutting",
      "Specializing in Korean soft layers, butterfly cuts, and bobs",
      "Long-lasting shape that grows out gracefully"
    ],
    recommendedStylists: ["Soung Youn", "Nykeria", "Brielle", "Ahmed", "Jessica"],
    tag: "Foundational"
  },
  {
    id: "master-cut-men",
    name: "Men's Architectural Haircut & Scalp Refresh",
    category: "precision-cuts",
    priceStartingAt: 65,
    priceNote: "Includes scalp massage, shampoo, and styling",
    durationMinutes: 45,
    description: "Detailed scissor-over-comb, texture thinning, two-block cuts, and modern classic fades engineered for Asian, straight, wavy, and coarse hair textures.",
    highlights: [
      "Custom two-block, textured crop, or tailored classic lines",
      "Invigorating botanical scalp rinse & hot towel finish",
      "Matte paste or pomade styling tutorial"
    ],
    recommendedStylists: ["Ahmed", "Kai", "David"]
  },
  {
    id: "dimensional-balayage",
    name: "Bespoke Dimensional Balayage & Gloss",
    category: "color-balayage",
    priceStartingAt: 240,
    priceNote: "Toner, Olaplex bond multiplier, and blowout included",
    durationMinutes: 180,
    description: "Freehand hand-painted ribbons of light designed for high dimension and seamless, low-maintenance grow-out. Specially formulated for dark and stubborn undertones.",
    highlights: [
      "Custom anti-brass toners for creamy vanilla, mocha, or beige tones",
      "Olaplex bonding protection included in every lightener step",
      "Seamless root melt for graceful 4–6 month transitions"
    ],
    recommendedStylists: ["Brielle", "Soung Youn", "Lori", "Jessica"],
    tag: "Editorial",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "all-over-color",
    name: "Japanese Milbon Color Formulation & Glaze",
    category: "color-balayage",
    priceStartingAt: 120,
    priceNote: "Single-process root-to-end luxury color",
    durationMinutes: 90,
    description: "Rich, multifaceted Japanese Milbon and low-ammonia color systems delivering mirror shine, high pigment retention, and superior scalp comfort.",
    highlights: [
      "Ultra-nourishing formulas infused with squalane",
      "100% grey blending or rich fashion tone deposits",
      "Includes pH restorative gloss treatment"
    ],
    recommendedStylists: ["Brielle", "Jessica", "Lori", "Soung Youn"]
  },
  {
    id: "milbon-treatment",
    name: "Milbon 5-Step Intensive Moisture Treatment",
    category: "head-spa-treatments",
    priceStartingAt: 95,
    priceNote: "Includes take-home 4-week booster pack",
    durationMinutes: 45,
    description: "Japan’s #1 salon conditioning treatment. Systematically rebuilds the hair's SSVR-Silk matrix from cortex to cuticle with micro-mist steam sealing.",
    highlights: [
      "Instant transformation from brittle to silky velvet",
      "Includes 4 take-home weekly maintenance vials",
      "Perfect add-on to any color, bleach, or cut"
    ],
    recommendedStylists: ["All Stylists"],
    tag: "Award Winning"
  },
  {
    id: "keratin-smoothing",
    name: "Keratin Complex Smoothing Treatment",
    category: "head-spa-treatments",
    priceStartingAt: 280,
    priceNote: "Eliminates 95% of frizz while retaining natural curl",
    durationMinutes: 150,
    description: "A gentle smoothing therapy for clients who want frizz-free ease without permanently eliminating their natural wave or curl pattern.",
    highlights: [
      "Cuts daily blow-dry time by over 50%",
      "Blocks Atlanta humidity for up to 4–5 months",
      "Leaves hair soft, pliable, and touchable"
    ],
    recommendedStylists: ["Akemi", "Ahmed", "Kai"]
  },
  {
    id: "bridal-styling",
    name: "Editorial Bridal Updo & Special Occasion",
    category: "extensions-styling",
    priceStartingAt: 150,
    priceNote: "Trial consultations available upon request",
    durationMinutes: 75,
    description: "Couture red-carpet and bridal styling, modern romantic low buns, intricate braids, and timeless editorial updos.",
    highlights: [
      "Custom accessory and veil placement",
      "All-day weather-resistant hold without stiffness",
      "Dedicated VIP styling suite available"
    ],
    recommendedStylists: ["David", "Nykeria", "Soung Youn"]
  }
];

export const STYLISTS_DATA: Stylist[] = [
  {
    id: "kai",
    name: "Kai",
    title: "Assistant Manager — JTR & Digital Perm Specialist",
    experienceYears: 16,
    licenses: ["Cosmetology License (USA)", "Cosmetology License (Japan)", "Yamano Beauty School (Tokyo)"],
    bio: "Kai is the Assistant Manager at Junko Hair Studio. She graduated from Yamano Beauty School in Tokyo, Japan and holds a cosmetology license in both the U.S. and Japan. She specializes in cuts, color, and styling, with a deep focus on Japanese Thermal Reconditioning (JTR), Digital Perms, and other chemical services.",
    specialties: ["Japanese Thermal Reconditioning (JTR)", "Digital Perms", "Cuts & Styling", "Chemical Retexturizing"],
    image: "/src/assets/images/kai_stylist_photo_1788324105244.jpg",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    quote: "Chemical retexturizing is pure science — when calibrated precisely, hair gains unprecedented vitality."
  },
  {
    id: "ahmed",
    name: "Ahmed",
    title: "Salon Manager & Master Stylist",
    experienceYears: 32,
    licenses: ["Salon Manager", "Master Cosmetologist (GA)", "30+ Years Mastery"],
    bio: "Ahmed is the salon Manager at Junko Hair Studio and has been crafting hairstyles for his clients for more than 30 years. He is passionate about his work and takes pride in tailoring every look to the individual.",
    specialties: ["Tailored Styling", "Precision Cuts", "JTR Straightening", "Traditional Perms"],
    image: "/src/assets/images/ahmed_stylist_photo_1788324898964.jpg",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    quote: "A great haircut should fall effortlessly into place and celebrate each client's unique individuality."
  },
  {
    id: "david",
    name: "David",
    title: "Highlights & Extensions Specialist",
    experienceYears: 12,
    licenses: ["Empire Beauty School Graduate", "Licensed Cosmetologist (GA)"],
    bio: "David is a graduate of Empire Beauty School and brings a well-rounded approach to every client. He specializes in highlights, styling, natural hair, and extensions, and is known for his attention to detail and precision.",
    specialties: ["Dimensional Highlights", "Extensions & Styling", "Natural Hair Care", "JTR Straightening"],
    image: "/src/assets/images/david_exact_portrait_1788325374434.jpg",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    quote: "Precision and meticulous attention to detail turn everyday hair into a confidence statement."
  },
  {
    id: "nykeria",
    name: "Nykeria",
    title: "Cuts & Natural Hair Specialist",
    experienceYears: 20,
    licenses: ["Empire Beauty School (2004)", "Toni & Guy Certified", "Aveda & Dass Trained"],
    bio: "Nykeria graduated from Empire Beauty School in 2004 and went on to train with industry leaders including Toni & Guy, Aveda Salon & Spa, and Dass Salon & Spa. With more than 20 years of experience, she excels in cuts, perms, and natural hair.",
    specialties: ["Precision Haircuts", "Natural Hair Textures", "Perms & Body Waves", "Balayage"],
    image: "/src/assets/images/stylist_nykeria_1788323468621.jpg",
    availableDays: ["Tuesday", "Wednesday", "Friday", "Saturday"],
    quote: "Understanding natural hair texture and geometry is the key to effortless everyday elegance."
  },
  {
    id: "jessica",
    name: "Jessica",
    title: "Color & Cutting Specialist",
    experienceYears: 10,
    licenses: ["Paul Mitchell Academy (Atlanta)", "Licensed Cosmetologist (GA)"],
    bio: "Jessica graduated from Paul Mitchell Academy in Atlanta. She specializes in cuts and color, with a particular focus on blonde hair, and takes pride in bringing each client's vision to life.",
    specialties: ["Blonde Transformations", "Color Formulations", "Custom Precision Cuts", "Balayage"],
    image: "/src/assets/images/stylist_jessica_1788323482726.jpg",
    availableDays: ["Wednesday", "Thursday", "Friday", "Saturday"],
    quote: "I take pride in listening closely to bring each client's dream aesthetic into vibrant reality."
  },
  {
    id: "akemi",
    name: "Akemi",
    title: "JTR & Digital Perm Specialist",
    experienceYears: 32,
    licenses: ["Cosmetology License (USA)", "Cosmetology License (Japan)", "Keratin Complex Certified"],
    bio: "With more than 30 years of experience, Akemi specializes in Japanese Thermal Reconditioning, Digital Perms, and Keratin Complex Treatments, with a deep expertise in Asian hair. She holds a cosmetology license in both the U.S. and Japan.",
    specialties: ["Japanese Thermal Reconditioning", "Digital Perms", "Asian Hair Expertise", "Keratin Complex Treatments"],
    image: "/src/assets/images/stylist_akemi_1788323498691.jpg",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    quote: "Decades of Japanese technique ensure the structural health and silkiness of every strand."
  },
  {
    id: "brielle",
    name: "Brielle",
    title: "Balayage & Color Specialist",
    experienceYears: 33,
    licenses: ["Vidal Sassoon NYC (1991)", "Toni & Guy Cutting Specialist", "Jacques Dessange Balayage"],
    bio: "Brielle has more than 30 years of experience in hairdressing and began her career studying at Vidal Sassoon in New York City in 1991. She worked as a cutting specialist and colorist at Toni & Guy, and has trained in the Jacques Dessange Balayage system for low-maintenance color. She believes a great client experience is just as important as a great technical result.",
    specialties: ["Jacques Dessange Balayage", "Low-Maintenance Color", "Vidal Sassoon Cutting", "Color Formulations"],
    image: "/src/assets/images/stylist_brielle_1788323514860.jpg",
    availableDays: ["Tuesday", "Thursday", "Friday", "Saturday"],
    quote: "A great client experience is just as important as a flawless, enduring technical result."
  },
  {
    id: "soung-youn",
    name: "Soung Youn",
    title: "Precision Cutting & Balayage Specialist",
    experienceYears: 22,
    licenses: ["Bennett Dugo French Trained", "Former Salon Owner (20 Yrs)", "Master Cosmetologist (GA)"],
    bio: "Soung Youn brings more than 20 years of expertise in precision cutting and color. Her career includes training under a renowned French stylist at Bennett Dugo Salon, an earlier tenure at Junko Hair Studio, and two decades owning her own salon. She specializes in Korean-style cuts, soft layers, and dimensional color, including balayage and highlights.",
    specialties: ["Korean-Style Cuts", "Soft Feathered Layers", "Dimensional Balayage & Highlights", "Traditional Perms"],
    image: "/src/assets/images/stylist_soung_youn_1788323526384.jpg",
    availableDays: ["Wednesday", "Thursday", "Friday", "Saturday"],
    quote: "Softness, movement, and light reflection define modern luxury hair."
  },
  {
    id: "lori",
    name: "Lori",
    title: "Balayage & Highlights Specialist",
    experienceYears: 15,
    licenses: ["Licensed Cosmetologist (GA)", "Mexico City & USA Trained"],
    bio: "Lori is a licensed cosmetologist with 15 years of experience. Born in Mexico City, she discovered her passion for hairdressing as a teenager and trained in Mexico before continuing her education in the U.S. She specializes in creating dimension through highlights, lowlights, and balayage.",
    specialties: ["Dimensional Highlights", "Lowlights", "Seamless Balayage", "Tone Blending"],
    image: "/src/assets/images/stylist_lori_1788323543749.jpg",
    availableDays: ["Tuesday", "Wednesday", "Friday", "Saturday"],
    quote: "Creating rich dimension and illumination brings hair alive with depth and warmth."
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "look-1",
    title: "Liquid Obsidian Glass Hair",
    subtitle: "Japanese Thermal Reconditioning (YUKO)",
    category: "Straightening",
    image: "/src/assets/images/junko_hero_hair_1788320326641.jpg",
    stylist: "Kai",
    hairType: "Naturally coarse, frizzy 3A wave",
    servicesUsed: ["JTR Full System", "Milbon Gloss Treatment"],
    description: "Transformed coarse, frizzy curls into a flawless, mirror-like curtain of silk that remains completely pin-straight even in humid Atlanta summers."
  },
  {
    id: "look-2",
    title: "Bespoke Digital Air Wave",
    subtitle: "Japanese Ceramic Digital Perm",
    category: "Perms",
    image: "/src/assets/images/junko_digital_perm_1788320364051.jpg",
    stylist: "Kai",
    hairType: "Fine, pin-straight Asian hair",
    servicesUsed: ["Digital Air Wave Perm", "Face Framing Cut"],
    description: "Effortless, beachy mermaid waves that spring to life naturally when air dried with zero curling iron heat damage."
  },
  {
    id: "look-3",
    title: "Muted Vanilla Pearl Balayage",
    subtitle: "Seamless Dimensional Hand-Painting",
    category: "Color",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    stylist: "Soung Youn",
    hairType: "Level 3 dark brown base",
    servicesUsed: ["Balayage", "Olaplex Bonding", "Smoky Pearl Toner"],
    description: "Soft dimensional ribbons blending from deep espresso roots into cool, creamy champagne ribbons without warm brassy undertones."
  },
  {
    id: "look-4",
    title: "Architectural Textured Blunt Bob",
    subtitle: "Japanese Wet & Dry Precision Slide Cut",
    category: "Cuts",
    image: "https://images.unsplash.com/photo-1584297091622-af8e5fd6331f?auto=format&fit=crop&w=1200&q=80",
    stylist: "Ahmed",
    hairType: "Medium density straight hair",
    servicesUsed: ["Master Precision Cut", "Milbon Hydration Seal"],
    description: "Crisp geometric perimeter with internal weight reduction for fluid movement and low-maintenance everyday styling."
  },
  {
    id: "look-5",
    title: "Seoul Feathered Butterfly Layers",
    subtitle: "Curtain Bangs & Soft Cascade",
    category: "Cuts",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80",
    stylist: "Soung Youn",
    hairType: "Long heavy hair needing lift",
    servicesUsed: ["Korean Layering", "Signature Blowout"],
    description: "Feathered front contouring that sculpts cheekbones while retaining full length and airy lightness throughout the crown."
  },
  {
    id: "look-6",
    title: "Aromatic Scalp Sanctuary",
    subtitle: "Japanese Waterfall Head Spa Experience",
    category: "Head Spa",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    stylist: "Jessica",
    hairType: "Stressed, dry scalp & dull lengths",
    servicesUsed: ["Scalp Scrub", "Waterfall Circulator", "Micro-Mist"],
    description: "Deep relaxation and pore purification that leaves hair feeling weightless, refreshed, and exceptionally nourished."
  }
];

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: "ba-1",
    title: "Coarse Resistant Curl → Permanent Glass Silk",
    service: "Japanese Thermal Reconditioning (JTR)",
    stylist: "Kai",
    timeTaken: "3.5 Hours",
    hairStory: "Client struggled with daily 45-minute flat-iron routines and immediate humidity frizz. After JTR, her hair dries pin-straight and glossy without any heat tools.",
    beforeImage: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=800&q=80",
    afterImage: "/src/assets/images/junko_hero_hair_1788320326641.jpg",
    keyBenefits: [
      "100% Humidity resistant",
      "Cut morning routine from 45 min to 0 min",
      "Permanent until new root growth"
    ]
  },
  {
    id: "ba-2",
    title: "Limp, Flat Straight Hair → Bouncy Dimensional Waves",
    service: "Japanese Digital Perm",
    stylist: "Kai",
    timeTaken: "2.5 Hours",
    hairStory: "Client wanted romantic body and movement without hot rollers or curling iron damage. Digital perm created soft, wash-and-wear waves that last 9+ months.",
    beforeImage: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
    afterImage: "/src/assets/images/junko_digital_perm_1788320364051.jpg",
    keyBenefits: [
      "Lasts 6-9 months",
      "Soft, touchable curl memory",
      "Air-dry friendly styling"
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "rev-1",
    author: "Caroline V.",
    location: "Buckhead, Atlanta",
    rating: 5,
    date: "2 weeks ago",
    service: "Japanese Thermal Reconditioning",
    stylist: "Kai",
    review: "I have been coming to Junko Hair Studio for my Japanese straightening for over 8 years. Kai is a true master! In Atlanta's brutal summer humidity, my hair stays completely flat, silky, and reflective like glass. There is simply no other salon in the South that matches their precision.",
    verified: true
  },
  {
    id: "rev-2",
    author: "Michelle K.",
    location: "Midtown Atlanta",
    rating: 5,
    date: "1 month ago",
    service: "Japanese Digital Perm & Cut",
    stylist: "Kai",
    review: "The Digital Perm is magic! I have super straight Asian hair that never held a curl before. Kai mapped out the rods perfectly and my curls look like a fresh red-carpet blowout every single day when I let it air dry. The salon ambiance is peaceful and chic.",
    verified: true
  },
  {
    id: "rev-3",
    author: "David S.",
    location: "Peachtree Hills",
    rating: 5,
    date: "3 weeks ago",
    service: "Men's Architectural Cut & Scalp Rinse",
    stylist: "Ahmed",
    review: "Ahmed has been cutting my hair for 5 years. His attention to detail and knowledge of how hair grows out is second to none. The scalp massage with botanical mint oil is worth the visit alone!",
    verified: true
  },
  {
    id: "rev-4",
    author: "Sarah L.",
    location: "Sandy Springs",
    rating: 5,
    date: "2 months ago",
    service: "Korean Soft Layers & Balayage",
    stylist: "Soung Youn",
    review: "Soung Youn transformed my heavy, dull hair into the most stunning butterfly cut with seamlessly blended creamy beige balayage. She took the time to explain how to maintain the tone and hydration at home.",
    verified: true
  },
  {
    id: "rev-5",
    author: "Amanda T.",
    location: "Vinings, GA",
    rating: 5,
    date: "Just recently",
    service: "Japanese Scalp & Head Spa Ritual",
    stylist: "Elena",
    review: "The Japanese waterfall head spa is the most therapeutic 60 minutes you will ever experience. My scalp felt thoroughly refreshed, breathing, and my hair had a featherlight shine that lasted for days.",
    verified: true
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your primary hair goal right now?",
    description: "Choose the main transformation you are envisioning for your daily routine.",
    options: [
      {
        label: "Permanent mirror-smooth, pin-straight hair that defies humidity",
        description: "Zero frizz, zero daily flat ironing, permanent glass effect",
        trait: "jtr"
      },
      {
        label: "Effortless, natural bouncy curls and mermaid waves",
        description: "Wash-and-go curl memory without daily heat styling",
        trait: "digital-perm"
      },
      {
        label: "Frizz reduction while keeping my natural wave or curl",
        description: "Smoothness and manageable blowouts without permanent pin-straightening",
        trait: "keratin"
      },
      {
        label: "Scalp detox, stress relief, and deep restorative hair health",
        description: "Circulation renewal, pore cleansing, and luxurious relaxation",
        trait: "head-spa"
      },
      {
        label: "Dimensional, sun-kissed luminous color with soft grow-out",
        description: "High-end balayage or gloss customized to my skin tone",
        trait: "balayage"
      }
    ]
  },
  {
    id: 2,
    question: "What is your current hair type and texture?",
    description: "Helps us assess the chemistry and technique best suited for your strands.",
    options: [
      {
        label: "Naturally coarse, frizzy, wavy, or tightly curled",
        description: "Takes significant effort and high heat to smooth out",
        trait: "jtr"
      },
      {
        label: "Fine to medium, pin-straight or resistant to holding curls",
        description: "Lacks volume and movement, curls fall out in 30 minutes",
        trait: "digital-perm"
      },
      {
        label: "Color-treated, dry, or chemically processed",
        description: "Needs restorative moisture and bond reinforcement",
        trait: "head-spa"
      },
      {
        label: "Puffy and prone to extreme humidity swelling",
        description: "Wants manageable, sleek daily wear",
        trait: "keratin"
      }
    ]
  },
  {
    id: 3,
    question: "What chemical history does your hair have from the past 12 months?",
    description: "Crucial for ensuring optimal structural integrity and hair safety.",
    options: [
      {
        label: "Virgin hair or only single-process dark/natural color",
        description: "Ideal candidate for Japanese Thermal Reconditioning or Digital Perms",
        trait: "jtr"
      },
      {
        label: "Highlights, bleach, or previous balayage",
        description: "Best suited for gentle Keratin smoothing, toner gloss, or Head Spa treatments",
        trait: "keratin"
      },
      {
        label: "Dry, stressed scalp, flaky, or tight feeling",
        description: "Needs botanical head spa micro-mist stimulation",
        trait: "head-spa"
      },
      {
        label: "Looking for an architectural haircut & face-framing reshape",
        description: "Master wet and dry Japanese precision cuts",
        trait: "cut"
      }
    ]
  }
];

export const FAQS = [
  {
    q: "How does Japanese Thermal Reconditioning (JTR) differ from Keratin?",
    a: "Japanese Thermal Reconditioning (often called YUKO or Japanese Straightening) is a permanent chemical restructuring process. It changes the internal disulfide bonds of the hair with collagen and precise heat, resulting in permanently pin-straight, ultra-glossy glass hair that never frizzes up even in rain or extreme humidity. Keratin, on the other hand, is a temporary protein coating that lasts 3–5 months and reduces frizz while preserving your natural curl pattern."
  },
  {
    q: "What makes a Digital Perm different from a traditional cold perm?",
    a: "A Japanese Digital Perm uses specialized temperature-controlled ceramic rods hooked up to a computerized console. The curls produced are soft, natural, and bouncy when DRY (resembling a blowout or curling wand wave), whereas cold perms look curliest when wet and can be frizzy when dry. Digital Perms last between 6 to 10 months."
  },
  {
    q: "How long does a JTR appointment take?",
    a: "Because JTR is a meticulous, strand-by-strand scientific process, a full treatment takes between 3.5 to 5 hours depending on your hair length, density, and texture history. We prioritize hair health with customized pre-treatments, neutralizing rinses, and Milbon moisture sealing."
  },
  {
    q: "Can I get JTR or a Digital Perm if my hair has bleach or heavy highlights?",
    a: "Bleached or heavily highlighted hair requires a thorough in-person strand test and consultation first. For heavily lightened hair, we often recommend our Milbon 5-Step Restorative Treatment or Keratin Smoothing to rebuild tensile strength before any thermal retexturizing."
  },
  {
    q: "Where in Buckhead is Junko Hair Studio located?",
    a: "We are located at 2391 Peachtree Rd NE, Suite B3D, Atlanta, GA 30305, in the heart of Buckhead with convenient complimentary on-site parking."
  }
];
