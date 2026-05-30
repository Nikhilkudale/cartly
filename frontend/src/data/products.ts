import { Product } from "../types";

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro (Natural Titanium, 128 GB)",
    category: "Mobiles",
    price: 119900,
    originalPrice: 134900,
    discount: 11,
    rating: 4.7,
    reviewsCount: 3840,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 12,
    brand: "Apple",
    description: "iPhone 15 Pro features a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that's tougher than any smartphone glass. And it's splash, water, and dust resistant.",
    specifications: {
      "Model Name": "iPhone 15 Pro",
      "Display Size": "15.49 cm (6.1 inch)",
      "Resolution": "2556 x 1179 Pixels Super Retina XDR",
      "Processor": "A17 Pro Chip",
      "Camera": "48MP + 12MP + 12MP Rear | 12MP Front",
      "OS": "iOS 17"
    }
  },
  {
    id: 2,
    title: "SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)",
    category: "Mobiles",
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    rating: 4.8,
    reviewsCount: 1950,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 8,
    brand: "Samsung",
    description: "Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 17.27 cm (6.8\") flat display. It is an absolute marvel of design. Meet Galaxy S24 Ultra, powered by Galaxy AI.",
    specifications: {
      "Model Name": "Galaxy S24 Ultra 5G",
      "Display Size": "17.27 cm (6.8 inch)",
      "Resolution": "3120 x 1440 Pixels Quad HD+",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "Camera": "200MP + 50MP + 12MP + 10MP | 12MP Front",
      "OS": "Android 14"
    }
  },
  {
    id: 3,
    title: "PUMA Aviator Premium Unisex Running Shoes",
    category: "Fashion",
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    rating: 4.2,
    reviewsCount: 12850,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 45,
    brand: "PUMA",
    description: "A functional, lightweight shoe engineered for high performance, featuring a breathable mesh upper, supportive overlays, and an ultra-comfortable cushioned midsole for effortless daily runs.",
    specifications: {
      "Outer Material": "Mesh",
      "Closure": "Lace-Ups",
      "Occasion": "Sports/Running",
      "Sole Material": "Rubber",
      "Weight": "280g (single shoe)"
    }
  },
  {
    id: 4,
    title: "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
    category: "Electronics",
    price: 26990,
    originalPrice: 34990,
    discount: 22,
    rating: 4.6,
    reviewsCount: 5430,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 14,
    brand: "Sony",
    description: "Industry leading noise cancellation with two processors controlling 8 microphones, Auto NC Optimizer designed to auto-optimize cancelation based on wearing conditions, and an ultra-comfortable synthetic leather headband.",
    specifications: {
      "Type": "Over the Ear",
      "Battery Life": "Up to 30 Hours",
      "Charge Time": "3.5 Hours",
      "Bluetooth Version": "5.2",
      "Warranty": "1 Year"
    }
  },
  {
    id: 5,
    title: "Apple 2024 MacBook Air M3 (13 inch, 8GB RAM, 256GB SSD)",
    category: "Electronics",
    price: 99900,
    originalPrice: 114900,
    discount: 13,
    rating: 4.8,
    reviewsCount: 740,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 5,
    brand: "Apple",
    description: "The Apple M3 chip makes the super-portable 13-inch MacBook Air even more capable. With up to 18 hours of battery life and a gorgeous Liquid Retina display, you can take it anywhere and breeze through work and play.",
    specifications: {
      "Processor Name": "Apple M3 Chip",
      "RAM": "8 GB Unified memory",
      "SSD Capacity": "256 GB",
      "OS": "macOS Sonoma",
      "Screen Size": "34.46 cm (13.6 inch)"
    }
  },
  {
    id: 6,
    title: "Mi AL 139cm (55 inch) Ultra HD (4K) Smart LED TV",
    category: "Appliances",
    price: 36999,
    originalPrice: 54999,
    discount: 32,
    rating: 4.4,
    reviewsCount: 22750,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 20,
    brand: "Mi",
    description: "Immerse yourself in breathtaking 4K clarity with vivid colors and deep contrasts. Features Dolby Audio, a bezel-less metallic design, dual-band Wi-Fi, and patchwall UI built on Google TV.",
    specifications: {
      "Screen Size": "139 cm (55 inch)",
      "Screen Type": "LED",
      "HD Technology & Resolution": "Ultra HD (4K), 3840 x 2160 Pixels",
      "Smart TV": "Yes",
      "Sound Output": "30 W"
    }
  },
  {
    id: 7,
    title: "Levi's Men's Slim Fit Indigo Denim Jeans",
    category: "Fashion",
    price: 1899,
    originalPrice: 3799,
    discount: 50,
    rating: 4.1,
    reviewsCount: 9400,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 60,
    brand: "Levi's",
    description: "The classic slim-fit jeans from Levi's. Made of durable, high-quality denim with a soft stretch component for all-day comfort and a sleek modern silhouette.",
    specifications: {
      "Fit": "Slim Fit",
      "Fabric": "98% Cotton, 2% Elastane",
      "Type": "Clean Look Denim",
      "Rise": "Mid Rise"
    }
  },
  {
    id: 8,
    title: "Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner",
    category: "Appliances",
    price: 55900,
    originalPrice: 65900,
    discount: 15,
    rating: 4.5,
    reviewsCount: 160,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 3,
    brand: "Dyson",
    description: "Our lightest intelligent cordless vacuum. Reveals invisible dust on hard floors with a precisely-angled laser. Automatically adapts suction power based on dust volume and floor type.",
    specifications: {
      "Run Time": "Up to 60 Minutes",
      "Bin Volume": "0.35 L",
      "Suction Power": "150 AW",
      "Weight": "2.2 kg"
    }
  },
  {
    id: 9,
    title: "Sleepwell Ortho Pro Ergonomic Grid Mattress (King Size)",
    category: "Home & Furniture",
    price: 18499,
    originalPrice: 24999,
    discount: 26,
    rating: 4.3,
    reviewsCount: 3200,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 12,
    brand: "Sleepwell",
    description: "Expertly engineered for spine alignment and customized support. The smart grid layer actively conforms to your body, offering perfect comfort and cooler nights.",
    specifications: {
      "Dimensions": "182.88 cm x 198.12 cm (72x78 inches)",
      "Primary Color": "Grey & White",
      "Thickness": "15.24 cm (6 inches)",
      "Comfort Level": "Medium Firm"
    }
  },
  {
    id: 10,
    title: "Cello Maxima Stainless Steel Double Wall Thermos Bottle (1L)",
    category: "Home & Furniture",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.2,
    reviewsCount: 4500,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 100,
    brand: "Cello",
    description: "Keeps beverages hot or cold for up to 24 hours. Made from pristine food-grade 18/8 stainless steel inside and out, making it completely BPA-free, rust-proof, and leak-proof.",
    specifications: {
      "Storage Volume": "1 Litre",
      "Material": "Double-Wall Stainless Steel",
      "Insulation Period": "24 Hours Hot/Cold",
      "Dishwasher Safe": "Yes"
    }
  }
];

// Seedable deterministic value helper so generated data never changes during reloads
function getDeterministicInt(id: number, seed: number, min: number, max: number): number {
  const x = Math.sin(id * 12.9898 + seed * 78.233) * 43758.5453;
  const rawFraction = x - Math.floor(x);
  return Math.floor(min + rawFraction * (max - min + 1));
}

function generateAdditionalProducts(): Product[] {
  const additional: Product[] = [];
  const categories = ["Mobiles", "Fashion", "Electronics", "Appliances", "Home & Furniture"];

  // Category values configuration
  const CONFIG = {
    Mobiles: {
      brands: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Vivo", "Nothing", "Motorola", "OPPO", "Realme"],
      models: ["16 Pro Max", "Galaxy S25 Ultra", "Pixel 9 Pro Fold", "Nord 4T", "14 Ultra", "V40 Pro", "Phone (2)", "Edge 50 Neo", "Find X7", "GT 6"],
      colors: ["Natural Titanium", "Desert Sand", "Obsidian Black", "Porcelain White", "Emerald Green", "Royal Cobalt", "Glacier Blue", "Amber Gold"],
      features: [
        "Features a legendary camera lens array, long-lasting battery capability, and smooth fluid computing performance.",
        "Engineered with state-of-the-art visual hardware and intelligent adaptive energy management for intense workflows.",
        "An absolutely stunning flagship device designed with premium materials and custom silicon layers built to last."
      ],
      processors: ["A18 Pro Octa-core", "Snapdragon 8 Gen 4", "Google Tensor G4 AI SoC", "MediaTek Dimensity 9300+", "Qualcomm Snapdragon 7+ Gen 3"],
      images: [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1565849652224-30793a1f7802?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      minPrice: 19999,
      maxPrice: 149999
    },
    Fashion: {
      brands: ["PUMA", "Nike", "Adidas", "Levi's", "Zara", "Tommy Hilfiger", "Calvin Klein", "Gucci", "Armani", "US Polo"],
      models: ["Signature Comfort Polo Shirt", "Vanguard Leather Air Jacket", "Dynamic Knit Running Shoes", "Relaxed Fit Cargo Trousers", "Suede Heritage Casual Loafers", "Luxury Cashmere Winter Coat", "Waterproof Lightweight Windbreaker", "Tech-Dry Knit Gym Hoodie"],
      colors: ["Raven Black", "Alpine Crisp White", "Heritage Navy Blue", "Vintage Olive Khaki", "Burgundy Maroon", "Stone Khaki Sand", "Cobalt Indigo Blue"],
      features: [
        "Woven from high-performance breathable fabrics to offer unparalleled movement and sophisticated styling silhouettes.",
        "Engineered for durable active lifestyles or elevated formal situations, delivering pristine design contours.",
        "A premium boutique addition that leverages lightweight moisture-wicking weaves for long-lasting comfort."
      ],
      materials: ["Premium Breathable Cotton", "Regenerated Tech Polyester", "Primaloft Lightweight Nylon", "High-Grade Suede Denim Blend", "Fine Knit Cashmere Wool"],
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      minPrice: 999,
      maxPrice: 19999
    },
    Electronics: {
      brands: ["Sony", "Bose", "Apple", "ASUS", "HP", "Dell", "Logitech", "Razer", "Canon", "Sennheiser", "Audio-Technica", "Intel"],
      models: ["Pro Spatial Wireless Earbuds", "RGB Mechanical Click Keyboard", "Quantum Wide Gaming Screen", "Pro-Creator Mirrorless Camera Bundle", "Pro Studio Podcasting Microphone", "Multi-Port Thunderbolt Dock Adapter", "Spatial Sound Dual Soundbar Core", "Vanguard Ultra-Thin Laptop Node"],
      colors: ["Carbon Slate Grey", "Prism Brushed Aluminium", "Stellar Blackout", "Matte White Diamond", "Neon Aurora Custom Gold"],
      features: [
        "Provides ultra-low latency playback, state-of-the-art ergonomic geometry, and deep spatial acoustics.",
        "Crafted with professional interfaces to boost creative workflows and immersive gaming responsiveness.",
        "Engineered with active intelligent response circuitry to isolate detail with exceptional fidelity results."
      ],
      types: ["Over the Ear Active ANC", "Spatial Hybrid Bluetooth 5.4", "USB-C High Speed Multi Channel", "Laser Tracking Optical Pro", "IPS Anti-Glare HDR Pro OLED"],
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      minPrice: 2499,
      maxPrice: 189900
    },
    Appliances: {
      brands: ["Dyson", "LG", "Samsung", "Mi", "Philips", "Panasonic", "Whirlpool", "Bosch", "Haier", "Midea"],
      models: ["Carbon HEPA Smart Air Purifier", "Lidar Assisted Smart Robot Vac", "Digital Precision Espresso Machine", "Convection Digital Power Air Oven", "Inverter Double-Door Multi Refrigerator", "Whisper-Quiet Turbo Bladeless Fan", "Advanced High-Freq Sonic Toothbrush"],
      colors: ["Cosmopolitan Silver", "Brushed Graphite", "Pearl Opal White", "Polished Charcoal Dark"],
      features: [
        "Leverages automatic smart sensor triggers to monitor environment conditions and output performance stats.",
        "High-efficiency motor design delivers maximum dynamic output while cutting down on electrical overhead.",
        "A game-changing intelligent appliance built to refine household routines with automated convenience."
      ],
      capacities: ["Digital HEPA 4-Stage Filter", "Direct Drive BLDC Suction Engine", "15 Bar Industrial Thermoblock Pump", "Dual-Inverter Variable Compressor", "6-Level Adaptive Power Heating"],
      images: [
        "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1585533816599-ac0c25a74ef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1545224933-73c1371078ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      minPrice: 4999,
      maxPrice: 84999
    },
    "Home & Furniture": {
      brands: ["Sleepwell", "Cello", "Ikea", "West Elm", "Ashley", "Pepperfry", "HomeCentre", "Nilkamal", "Godrej Interio"],
      models: ["Mesh Ergonomic Posture Office Chair", "Nordic Ash-Wood Dual Tier Desk", "Elegant Mid-Century Linen Lounge Couch", "Aero Vacuum Double Wall Stainless Thermos", "Geometric Hardwood Accents Coffee Table", "Modular Multilevel Cookware Rack Organizer", "Advanced Therapeutic Support Cushion Bedding"],
      colors: ["Warm Oak Brown", "Brushed Warm Carbon Oxide", "Sand Dunes Beige", "Sage Moss Weave", "Royal Velvet Navy Blue"],
      features: [
        "Crafted with certified eco-conscious components to ensure superior orthopedic support and pristine aesthetics.",
        "An exquisite design anchor that structures living and working domains with minimalist elegant visual notes.",
        "Durable, corrosion-free, light build profiles combined with premium matte coatings for elite finish quality."
      ],
      dimensions: ["L 180cm x W 95cm x H 75cm", "100% Solid Certified Hardwood", "Double-Wall Food Grade SS 304", "Heavy-Duty Carbon Structural Steel", "Ergonomic Lumbar-Fit Contour"],
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      minPrice: 1499,
      maxPrice: 42999
    }
  };

  for (let i = 11; i <= 500; i++) {
    // Select category in a round-robin/deterministic fashion
    const catIndex = (i - 11) % categories.length;
    const cat = categories[catIndex] as keyof typeof CONFIG;
    const data = CONFIG[cat];

    // Read deterministic indexes
    const brand = data.brands[getDeterministicInt(i, 1, 0, data.brands.length - 1)];
    const model = data.models[getDeterministicInt(i, 2, 0, data.models.length - 1)];
    const color = data.colors[getDeterministicInt(i, 3, 0, data.colors.length - 1)];
    const feature = data.features[getDeterministicInt(i, 4, 0, data.features.length - 1)];
    
    // Build distinctive title
    const title = `${brand} ${model} (${color})`;

    // Core params
    const price = getDeterministicInt(i, 5, data.minPrice, data.maxPrice);
    const discount = getDeterministicInt(i, 6, 5, 45);
    const originalPrice = Math.round(price / (1 - discount / 100));
    
    const ratingRaw = 4.0 + (getDeterministicInt(i, 7, 0, 9) / 10);
    const rating = Math.round(ratingRaw * 10) / 10;
    const reviewsCount = getDeterministicInt(i, 8, 15, 6200);
    const image = data.images[getDeterministicInt(i, 9, 0, data.images.length - 1)];
    const stock = getDeterministicInt(i, 10, 2, 85);

    // Build unique specifications map and desc based on category
    let ispecs: Record<string, string> = {};
    let desc = "";

    if (cat === "Mobiles") {
      const p = CONFIG.Mobiles.processors[getDeterministicInt(i, 11, 0, CONFIG.Mobiles.processors.length - 1)];
      ispecs = {
        "Model Name": model,
        "Display Size": `${14.7 + getDeterministicInt(i, 12, 1, 30)/10} cm (${5.8 + getDeterministicInt(i, 13, 0, 10)/10} inch)`,
        "Processor": p,
        "Camera": `${48 + getDeterministicInt(i, 14, 0, 152)}MP Rear Quad Camera | 32MP Front Selfie`,
        "Battery": `${4500 + getDeterministicInt(i, 15, 0, 15)*100} mAh Smart Cells`,
        "OS": getDeterministicInt(i, 16, 0, 1) === 0 ? "Android 15 (Material You)" : "iOS 18 (Siri Intell)"
      };
      desc = `The gorgeous new ${title}. ${feature} Integrates state-of-the-art visual hardware and intelligent adaptive energy management built for intense multitasking and creative design flows.`;
    } else if (cat === "Fashion") {
      const m = CONFIG.Fashion.materials[getDeterministicInt(i, 11, 0, CONFIG.Fashion.materials.length - 1)];
      ispecs = {
        "Fabric Blend": m,
        "Closure": getDeterministicInt(i, 12, 0, 1) === 0 ? "Tailored Button Fly" : "YKK Lightweight Zip",
        "Occasion": getDeterministicInt(i, 13, 0, 1) === 0 ? "Casual Street / Club" : "Premium Sports Wear",
        "Sole Element": "Dual-Density Rubber Grip",
        "Wash Care": "Machine Cold Wash Only",
        "Fit Style": "Tailored Contour Silhouette"
      };
      desc = `Make a bold statement with the pristine ${title}. ${feature} Perfectly matching premium aesthetics with durability, this is a timeless selection for your wardrobe catalog.`;
    } else if (cat === "Electronics") {
      const t = CONFIG.Electronics.types[getDeterministicInt(i, 11, 0, CONFIG.Electronics.types.length - 1)];
      ispecs = {
        "Connectivity": t,
        "Battery Power": `${20 + getDeterministicInt(i, 12, 0, 60)} Hours Dynamic`,
        "Bluetooth Specs": "BT v5.4 BLE Certified",
        "Interface Channels": "Smart Native Hub Sync",
        "Warranty Term": "18 Months Structural Warranty"
      };
      desc = `Experience elite sonic performance and precision details with the ${title}. ${feature} Built to exceed standards, engineered using the finest materials inside and out.`;
    } else if (cat === "Appliances") {
      const cp = CONFIG.Appliances.capacities[getDeterministicInt(i, 11, 0, CONFIG.Appliances.capacities.length - 1)];
      ispecs = {
        "Internal Engine": cp,
        "Energy Star Badge": `${getDeterministicInt(i, 12, 3, 5)} Star Inverter`,
        "Operating Decibel": `${32 + getDeterministicInt(i, 13, 0, 15)} dB Ultra-Silent`,
        "Smart App Integration": "Yes (IoT App Compatible)",
        "Input Voltage": "220-240V AC Core Ready"
      };
      desc = `Simplify your luxury home routine using the intelligent ${title}. ${feature} Loaded with advanced micro-sensors and heavy-duty structural components for outstanding durability and performance.`;
    } else if (cat === "Home & Furniture") {
      const dim = CONFIG["Home & Furniture"].dimensions[getDeterministicInt(i, 11, 0, CONFIG["Home & Furniture"].dimensions.length - 1)];
      ispecs = {
        "Dimensions Size": dim,
        "Design Theme": "Nordic Warm Minimalist",
        "Water Repellency": "Yes (Protective Matt Satin Finish)",
        "Assembly Node": "Minimal Tools Included",
        "Pincode Delivery": "Logistics Dispatch Ready"
      };
      desc = `An exquisite layout anchor that structures your living area: the ${title}. ${feature} High-durability finishes pair with elite craftsmanship curves to create an elegant aesthetic.`;
    }

    additional.push({
      id: i,
      title,
      category: cat,
      price,
      originalPrice,
      discount,
      rating,
      reviewsCount,
      image,
      stock,
      brand,
      description: desc,
      specifications: ispecs
    });
  }

  return additional;
}

export const PRODUCTS_DATA: Product[] = [
  ...INITIAL_PRODUCTS,
  ...generateAdditionalProducts()
];

export const CATEGORIES = [
  "All",
  "Mobiles",
  "Fashion",
  "Electronics",
  "Appliances",
  "Home & Furniture"
];
