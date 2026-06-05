import { Product } from "../types";

const INITIAL_PRODUCTS: Product[] = [
  {
    "id": 1,
    "title": "Samsung Galaxy M34 5G",
    "category": "Mobiles & Tablets",
    "price": 15999,
    "originalPrice": 18999,
    "discount": 15,
    "rating": 4.3,
    "reviewsCount": 3840,
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    "stock": 120,
    "brand": "Samsung",
    "description": "6.5\" AMOLED, 6000mAh, 50MP camera. Vibrant display, long-lasting battery capability.",
    "specifications": {
      "Model Name": "Galaxy M34 5G",
      "Display": "6.5 inch AMOLED",
      "Battery": "6000 mAh",
      "Camera": "50MP Main"
    }
  },
  {
    "id": 2,
    "title": "iPhone 15",
    "category": "Mobiles & Tablets",
    "price": 69999,
    "originalPrice": 79999,
    "discount": 12,
    "rating": 4.7,
    "reviewsCount": 5430,
    "image": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80",
    "stock": 45,
    "brand": "Apple",
    "description": "A16 chip, Dynamic Island, dual camera system. Premium build, advanced performance.",
    "specifications": {
      "Model Name": "iPhone 15",
      "Processor": "A16 Bionic",
      "Display": "6.1 inch Super Retina",
      "Camera": "48MP Dual"
    }
  },
  {
    "id": 3,
    "title": "OnePlus Nord CE 3",
    "category": "Mobiles & Tablets",
    "price": 24999,
    "originalPrice": 28999,
    "discount": 13,
    "rating": 4.4,
    "reviewsCount": 2950,
    "image": "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?auto=format&fit=crop&w=800&q=80",
    "stock": 80,
    "brand": "OnePlus",
    "description": "120Hz display, 80W SUPERVOOC fast charging. Smooth computing performance.",
    "specifications": {
      "Model Name": "Nord CE 3",
      "Display": "120Hz Fluid AMOLED",
      "Charging": "80W SUPERVOOC",
      "Camera": "50MP Triple"
    }
  },
  {
    "id": 4,
    "title": "Redmi Note 13 Pro",
    "category": "Mobiles & Tablets",
    "price": 23999,
    "originalPrice": 27999,
    "discount": 14,
    "rating": 4.3,
    "reviewsCount": 1950,
    "image": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
    "stock": 95,
    "brand": "Redmi",
    "description": "200MP camera, curved AMOLED display. High-resolution photography, stunning display.",
    "specifications": {
      "Model Name": "Note 13 Pro",
      "Camera": "200MP Rear",
      "Display": "Curved AMOLED",
      "Battery": "5000 mAh"
    }
  },
  {
    "id": 5,
    "title": "iPad Air",
    "category": "Mobiles & Tablets",
    "price": 54999,
    "originalPrice": 59999,
    "discount": 8,
    "rating": 4.8,
    "reviewsCount": 740,
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    "stock": 35,
    "brand": "Apple",
    "description": "M1 chip, 10.9\" Liquid Retina display. Lightweight design, powerful computing capacity.",
    "specifications": {
      "Model Name": "iPad Air",
      "Processor": "Apple M1",
      "Display": "10.9 inch Retina",
      "Storage": "64GB / 256GB"
    }
  },
  {
    "id": 6,
    "title": "Wireless Earbuds Pro",
    "category": "Mobiles & Tablets",
    "price": 2999,
    "originalPrice": 3999,
    "discount": 25,
    "rating": 4.1,
    "reviewsCount": 12850,
    "image": "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80",
    "stock": 200,
    "brand": "Premium",
    "description": "ANC, 28h total battery, IPX5 waterproof. Immersive sound and active noise cancellation.",
    "specifications": {
      "Type": "In-Ear Wireless",
      "Battery Life": "28 Hours",
      "IPX Rating": "IPX5",
      "Active Noise Cancellation": "Yes"
    }
  },
  {
    "id": 7,
    "title": "HP Pavilion Laptop",
    "category": "Laptops & Computers",
    "price": 54999,
    "originalPrice": 62999,
    "discount": 12,
    "rating": 4.2,
    "reviewsCount": 1450,
    "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    "stock": 60,
    "brand": "HP",
    "description": "Intel i5, 16GB RAM, 512GB SSD, 15.6\". Reliable performance for work and play.",
    "specifications": {
      "Model Name": "Pavilion 15",
      "Processor": "Intel Core i5",
      "RAM": "16GB DDR4",
      "Storage": "512GB SSD"
    }
  },
  {
    "id": 8,
    "title": "MacBook Air M2",
    "category": "Laptops & Computers",
    "price": 99999,
    "originalPrice": 114900,
    "discount": 13,
    "rating": 4.8,
    "reviewsCount": 3850,
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "stock": 25,
    "brand": "Apple",
    "description": "13.6\" Liquid Retina display, 8GB RAM, 256GB SSD. Sleek aluminum unibody, long battery life.",
    "specifications": {
      "Processor": "Apple M2",
      "RAM": "8GB Unified",
      "Storage": "256GB SSD",
      "Display": "13.6 inch Liquid Retina"
    }
  },
  {
    "id": 9,
    "title": "ASUS Gaming Laptop",
    "category": "Laptops & Computers",
    "price": 89999,
    "originalPrice": 99999,
    "discount": 10,
    "rating": 4.5,
    "reviewsCount": 650,
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    "stock": 30,
    "brand": "ASUS",
    "description": "RTX 4060, 144Hz display, 16GB RAM. High refresh rate, powerful graphics performance.",
    "specifications": {
      "Model Name": "TUF Gaming",
      "Graphics": "NVIDIA RTX 4060",
      "Display": "144Hz IPS",
      "RAM": "16GB"
    }
  },
  {
    "id": 10,
    "title": "Mechanical Keyboard RGB",
    "category": "Laptops & Computers",
    "price": 3499,
    "originalPrice": 4999,
    "discount": 30,
    "rating": 4.4,
    "reviewsCount": 4200,
    "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
    "stock": 150,
    "brand": "Premium",
    "description": "Hot-swappable switches, wireless connectivity, custom RGB backlit effects.",
    "specifications": {
      "Keys": "Mechanical",
      "Connectivity": "Bluetooth / 2.4G / Wired",
      "RGB": "Customizable Profiles"
    }
  },
  {
    "id": 11,
    "title": "27\" 4K Monitor",
    "category": "Laptops & Computers",
    "price": 18999,
    "originalPrice": 24999,
    "discount": 24,
    "rating": 4.4,
    "reviewsCount": 880,
    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    "stock": 40,
    "brand": "Premium",
    "description": "IPS panel, 60Hz, HDMI/DP inputs. Crystal clear details and vibrant professional colors.",
    "specifications": {
      "Screen Size": "27 inch",
      "Resolution": "3840 x 2160 (4K)",
      "Panel Type": "IPS",
      "Refresh Rate": "60Hz"
    }
  },
  {
    "id": 12,
    "title": "1TB NVMe SSD",
    "category": "Laptops & Computers",
    "price": 5999,
    "originalPrice": 7999,
    "discount": 25,
    "rating": 4.6,
    "reviewsCount": 1540,
    "image": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
    "stock": 180,
    "brand": "Premium",
    "description": "Gen4, 3500MB/s read speed. High-speed file access, seamless system bootups.",
    "specifications": {
      "Capacity": "1 TB",
      "Interface": "PCIe Gen 4.0 x4",
      "Max Read Speed": "3500 MB/s"
    }
  },
  {
    "id": 13,
    "title": "55\" Smart LED TV",
    "category": "TV & Appliances",
    "price": 42999,
    "originalPrice": 49999,
    "discount": 14,
    "rating": 4.5,
    "reviewsCount": 22750,
    "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    "stock": 50,
    "brand": "Premium",
    "description": "4K UHD, Dolby Audio, Android TV. Bezel-less design, immersive streaming experience.",
    "specifications": {
      "Screen Size": "55 inch",
      "Resolution": "4K Ultra HD",
      "OS": "Android TV",
      "Audio": "Dolby Sound"
    }
  },
  {
    "id": 14,
    "title": "Split AC 1.5 Ton",
    "category": "TV & Appliances",
    "price": 35999,
    "originalPrice": 42999,
    "discount": 16,
    "rating": 4.2,
    "reviewsCount": 1120,
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    "stock": 35,
    "brand": "Premium",
    "description": "5-star inverter rating, copper condenser. Efficient cooling, low energy consumption.",
    "specifications": {
      "Capacity": "1.5 Ton",
      "Energy Rating": "5 Star Inverter",
      "Condenser": "100% Copper"
    }
  },
  {
    "id": 15,
    "title": "Front Load Washing Machine",
    "category": "TV & Appliances",
    "price": 27999,
    "originalPrice": 34999,
    "discount": 20,
    "rating": 4.4,
    "reviewsCount": 1820,
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    "stock": 28,
    "brand": "Premium",
    "description": "7kg laundry capacity, steam wash cycle, quiet inverter motor technology.",
    "specifications": {
      "Capacity": "7.0 kg",
      "Type": "Front Load",
      "Motor": "Direct Drive Inverter",
      "Special Cycle": "Steam Wash"
    }
  },
  {
    "id": 16,
    "title": "Microwave Oven 28L",
    "category": "TV & Appliances",
    "price": 8999,
    "originalPrice": 10999,
    "discount": 18,
    "rating": 4.3,
    "reviewsCount": 950,
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    "stock": 70,
    "brand": "Premium",
    "description": "Convection microwave, auto cook menus, touch keypad panel controls.",
    "specifications": {
      "Volume": "28 Litres",
      "Type": "Convection",
      "Control Type": "Touch Panel"
    }
  },
  {
    "id": 17,
    "title": "Air Fryer 4.5L",
    "category": "TV & Appliances",
    "price": 4999,
    "originalPrice": 6999,
    "discount": 28,
    "rating": 4.5,
    "reviewsCount": 7420,
    "image": "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
    "stock": 90,
    "brand": "Premium",
    "description": "Digital touch controls, 8 preset cooking guides. Healthy oil-free snacks.",
    "specifications": {
      "Capacity": "4.5 Litres",
      "Power": "1500 W",
      "Control": "Digital Touch Screen"
    }
  },
  {
    "id": 18,
    "title": "Bluetooth Speaker",
    "category": "TV & Appliances",
    "price": 2499,
    "originalPrice": 3499,
    "discount": 28,
    "rating": 4.3,
    "reviewsCount": 3100,
    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    "stock": 160,
    "brand": "Premium",
    "description": "20W RMS audio, 12h playback capacity, IPX7 waterproof certification.",
    "specifications": {
      "Output Power": "20W RMS",
      "Battery": "12 Hours Playback",
      "Water Resistance": "IPX7"
    }
  },
  {
    "id": 19,
    "title": "Men's Casual Sneakers",
    "category": "Fashion",
    "price": 1999,
    "originalPrice": 2999,
    "discount": 33,
    "rating": 4.1,
    "reviewsCount": 1240,
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "stock": 300,
    "brand": "Premium",
    "description": "Lightweight mesh, cushioned athletic sole. Perfect for daily steps.",
    "specifications": {
      "Style": "Sneakers",
      "Material": "Mesh Upper",
      "Sole": "Cushioned EVA"
    }
  },
  {
    "id": 20,
    "title": "Women's Running Shoes",
    "category": "Fashion",
    "price": 2499,
    "originalPrice": 3499,
    "discount": 28,
    "rating": 4.4,
    "reviewsCount": 850,
    "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    "stock": 220,
    "brand": "Premium",
    "description": "Breathable knit upper, highly responsive midsole for running comfort.",
    "specifications": {
      "Category": "Running Shoes",
      "Gender": "Women",
      "Upper": "Knit Mesh"
    }
  },
  {
    "id": 21,
    "title": "Men's Slim Fit Jeans",
    "category": "Fashion",
    "price": 1299,
    "originalPrice": 1999,
    "discount": 35,
    "rating": 4,
    "reviewsCount": 9400,
    "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    "stock": 400,
    "brand": "Premium",
    "description": "Stretch denim fabric, mid-rise waist, standard slim tailored fit.",
    "specifications": {
      "Fit": "Slim Fit",
      "Rise": "Mid-Rise",
      "Fabric": "Stretch Cotton Denim"
    }
  },
  {
    "id": 22,
    "title": "Women's Kurti Set",
    "category": "Fashion",
    "price": 899,
    "originalPrice": 1499,
    "discount": 40,
    "rating": 4.2,
    "reviewsCount": 4500,
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    "stock": 350,
    "brand": "Premium",
    "description": "Premium cotton blend fabric, ethnic festival print, matching pants set.",
    "specifications": {
      "Style": "Kurti Set",
      "Material": "Cotton Blend",
      "Type": "Ethnic Wear"
    }
  },
  {
    "id": 23,
    "title": "Leather Wallet",
    "category": "Fashion",
    "price": 799,
    "originalPrice": 1199,
    "discount": 33,
    "rating": 4.3,
    "reviewsCount": 8850,
    "image": "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
    "stock": 500,
    "brand": "Premium",
    "description": "Genuine leather wallet, secure RFID blocking card slots.",
    "specifications": {
      "Material": "Genuine Leather",
      "Features": "RFID Blocking",
      "Compartments": "Multi-slot"
    }
  },
  {
    "id": 24,
    "title": "Aviator Sunglasses",
    "category": "Fashion",
    "price": 599,
    "originalPrice": 999,
    "discount": 40,
    "rating": 4.2,
    "reviewsCount": 4120,
    "image": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    "stock": 280,
    "brand": "Premium",
    "description": "UV400 polarized lenses, metallic wire frame aviator silhouette.",
    "specifications": {
      "Frame Type": "Full Metal Aviator",
      "Lens Protection": "UV400 Polarized",
      "Gender": "Unisex"
    }
  },
  {
    "id": 25,
    "title": "Queen Size Bedsheet Set",
    "category": "Home & Furniture",
    "price": 1499,
    "originalPrice": 1999,
    "discount": 25,
    "rating": 4.3,
    "reviewsCount": 3200,
    "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    "stock": 180,
    "brand": "Premium",
    "description": "300 TC pure cotton, 4 pieces layout set (1 bedsheet + 2 pillowcases + 1 duvet cover).",
    "specifications": {
      "Thread Count": "300 TC",
      "Material": "100% Cotton",
      "Size": "Queen Size"
    }
  },
  {
    "id": 26,
    "title": "Study Table with Shelf",
    "category": "Home & Furniture",
    "price": 4999,
    "originalPrice": 6499,
    "discount": 23,
    "rating": 4.4,
    "reviewsCount": 1500,
    "image": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    "stock": 55,
    "brand": "Premium",
    "description": "Engineered wood table, compact side shelves, laptop office layout.",
    "specifications": {
      "Material": "Engineered Wood",
      "Design": "Compact study / office",
      "Shelves": "Integrated Shelves"
    }
  },
  {
    "id": 27,
    "title": "Office Chair Ergonomic",
    "category": "Home & Furniture",
    "price": 6999,
    "originalPrice": 8999,
    "discount": 22,
    "rating": 4.4,
    "reviewsCount": 1200,
    "image": "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    "stock": 65,
    "brand": "Premium",
    "description": "Orthopedic lumbar support, height adjustable pneumatic cylinder, nylon caster wheels.",
    "specifications": {
      "Support": "Adjustable Lumbar Support",
      "Mechanism": "Pneumatic Height Adjust",
      "Base": "Durable Nylon Caster"
    }
  },
  {
    "id": 28,
    "title": "LED Desk Lamp",
    "category": "Home & Furniture",
    "price": 899,
    "originalPrice": 1499,
    "discount": 40,
    "rating": 4.2,
    "reviewsCount": 740,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    "stock": 240,
    "brand": "Premium",
    "description": "3 color light warmth modes, touch control slide dimmer, USB output port.",
    "specifications": {
      "Modes": "3 Warmth Settings",
      "Dimmer": "Touch slide adjustment",
      "Output": "USB Charging port"
    }
  },
  {
    "id": 29,
    "title": "Non-stick Cookware Set",
    "category": "Home & Furniture",
    "price": 2999,
    "originalPrice": 3999,
    "discount": 25,
    "rating": 4.3,
    "reviewsCount": 1600,
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80",
    "stock": 120,
    "brand": "Premium",
    "description": "5-piece cooking pans, induction gas stove compatible bases, scratch-resistant coating.",
    "specifications": {
      "Pieces": "5 Pieces Set",
      "Compatibility": "Induction & Gas",
      "Coating": "Pristine Non-Stick"
    }
  },
  {
    "id": 30,
    "title": "Vacuum Cleaner",
    "category": "Home & Furniture",
    "price": 8999,
    "originalPrice": 10999,
    "discount": 18,
    "rating": 4.5,
    "reviewsCount": 180,
    "image": "https://images.unsplash.com/photo-1569698134101-f15cde5cd66c?auto=format&fit=crop&w=800&q=80",
    "stock": 40,
    "brand": "Premium",
    "description": "Cordless hand-operated stick vacuum, built-in HEPA filter, 40min high-suction runtime.",
    "specifications": {
      "Type": "Cordless Stick",
      "Filter": "Washable HEPA Filter",
      "Runtime": "40 Minutes max"
    }
  },
  {
    "id": 31,
    "title": "Face Wash Vitamin C",
    "category": "Beauty & Personal Care",
    "price": 299,
    "originalPrice": 399,
    "discount": 25,
    "rating": 4.2,
    "reviewsCount": 6200,
    "image": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
    "stock": 600,
    "brand": "Premium",
    "description": "Skin brightening formula, loaded with Vitamin C, 100ml packaging.",
    "specifications": {
      "Volume": "100 ml",
      "Skin Benefit": "Brightening",
      "Paraben Free": "Yes"
    }
  },
  {
    "id": 32,
    "title": "Perfume Eau de Parfum",
    "category": "Beauty & Personal Care",
    "price": 1999,
    "originalPrice": 2499,
    "discount": 20,
    "rating": 4.5,
    "reviewsCount": 1240,
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "stock": 150,
    "brand": "Premium",
    "description": "Premium long-lasting citrus-infused spray formulation, 100ml glass bottle.",
    "specifications": {
      "Volume": "100 ml",
      "Concentration": "Eau de Parfum",
      "Fragrance": "Woody Citrus Notes"
    }
  },
  {
    "id": 33,
    "title": "Electric Trimmer",
    "category": "Beauty & Personal Care",
    "price": 1499,
    "originalPrice": 1999,
    "discount": 25,
    "rating": 4.3,
    "reviewsCount": 8850,
    "image": "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80",
    "stock": 200,
    "brand": "Premium",
    "description": "Cordless operation, 90min battery runtime, waterproof shaver blades.",
    "specifications": {
      "Runtime": "90 Minutes Cordless",
      "Blades": "Stainless Steel Shaver",
      "Waterproof": "IPX7 Washable"
    }
  },
  {
    "id": 34,
    "title": "Hair Dryer 2000W",
    "category": "Beauty & Personal Care",
    "price": 1299,
    "originalPrice": 1699,
    "discount": 23,
    "rating": 4.4,
    "reviewsCount": 3100,
    "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    "stock": 130,
    "brand": "Premium",
    "description": "Ionic drying technology, 2 wind speed control settings, styling nozzle included.",
    "specifications": {
      "Wattage": "2000 W",
      "Technology": "Negative Ionic Care",
      "Speeds": "2 Settings"
    }
  },
  {
    "id": 35,
    "title": "Yoga Mat 6mm",
    "category": "Sports & Books",
    "price": 699,
    "originalPrice": 999,
    "discount": 30,
    "rating": 4.4,
    "reviewsCount": 3200,
    "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    "stock": 320,
    "brand": "Premium",
    "description": "Anti-slip yoga workout cushion, shoulder carrying strap included.",
    "specifications": {
      "Thickness": "6 mm",
      "Material": "Eco-friendly TPE",
      "Features": "Anti-slip Dual Texture"
    }
  },
  {
    "id": 36,
    "title": "Cricket Bat Kashmir Willow",
    "category": "Sports & Books",
    "price": 1999,
    "originalPrice": 2499,
    "discount": 20,
    "rating": 4.3,
    "reviewsCount": 1540,
    "image": "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=800&q=80",
    "stock": 85,
    "brand": "Premium",
    "description": "Full adult size cricket bat, kashmir willow handle wrapped with rubber grip.",
    "specifications": {
      "Willow": "Kashmir Willow Wood",
      "Size": "Full Size 4",
      "Handle": "Singapore Cane Handle"
    }
  },
  {
    "id": 37,
    "title": "Spalding Replica Basketball",
    "category": "Sports & Books",
    "price": 1499,
    "originalPrice": 1999,
    "discount": 25,
    "rating": 4.5,
    "reviewsCount": 1820,
    "image": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    "stock": 85,
    "brand": "Spalding",
    "description": "Official size and weight rubber basketball. Ideal for indoor/outdoor court playing.",
    "specifications": {
      "Brand": "Spalding",
      "Size": "Official Size 7",
      "Material": "Durable Composite Rubber"
    }
  },
  {
    "id": 38,
    "title": "Adjustable Dumbbells 20kg",
    "category": "Sports & Books",
    "price": 4999,
    "originalPrice": 5999,
    "discount": 16,
    "rating": 4.5,
    "reviewsCount": 650,
    "image": "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=800&q=80",
    "stock": 45,
    "brand": "Premium",
    "description": "Home gym pair dumbbells set, spinlock chrome collars and steel weights.",
    "specifications": {
      "Weight": "20 kg Total Pair",
      "Type": "Adjustable Plates",
      "Collars": "Threaded Spinlocks"
    }
  },
  {
    "id": 39,
    "title": "Premium Basmati Rice 5kg",
    "category": "Grocery & Gourmet",
    "price": 699,
    "originalPrice": 899,
    "discount": 22,
    "rating": 4.6,
    "reviewsCount": 3100,
    "image": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80",
    "stock": 400,
    "brand": "Premium",
    "description": "Aged long-grain basmati rice, highly fragrant basmati grains.",
    "specifications": {
      "Weight": "5 kg",
      "Grain Length": "Extra Long",
      "Age": "12+ Months Aged"
    }
  },
  {
    "id": 40,
    "title": "Extra Virgin Olive Oil 1L",
    "category": "Grocery & Gourmet",
    "price": 899,
    "originalPrice": 1199,
    "discount": 25,
    "rating": 4.5,
    "reviewsCount": 1240,
    "image": "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80",
    "stock": 250,
    "brand": "Premium",
    "description": "Cold-pressed extra virgin olive oil, imported cooking oil.",
    "specifications": {
      "Volume": "1 Litre",
      "Process": "Cold-Pressed",
      "Origin": "Mediterranean"
    }
  },
  {
    "id": 41,
    "title": "Organic Wildflower Honey 500g",
    "category": "Grocery & Gourmet",
    "price": 549,
    "originalPrice": 749,
    "discount": 26,
    "rating": 4.5,
    "reviewsCount": 850,
    "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "stock": 350,
    "brand": "Premium",
    "description": "Pure raw unpasteurized honey. Rich in antioxidants and natural sweetness.",
    "specifications": {
      "Weight": "500 g",
      "Source": "Wildflower Forest",
      "Purity": "100% Organic Raw"
    }
  },
  {
    "id": 42,
    "title": "Green Tea 100 Bags",
    "category": "Grocery & Gourmet",
    "price": 349,
    "originalPrice": 499,
    "discount": 30,
    "rating": 4.3,
    "reviewsCount": 4200,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    "stock": 420,
    "brand": "Premium",
    "description": "Pure green tea leaves, organic herbal antioxidant blend bags.",
    "specifications": {
      "Count": "100 Teabags",
      "Type": "Organic Green Tea",
      "Antioxidants": "High EGCG Content"
    }
  },
  {
    "id": 43,
    "title": "Google Pixel 9 Pro",
    "category": "Mobiles & Tablets",
    "price": 109999,
    "originalPrice": 119999,
    "discount": 8,
    "rating": 4.8,
    "reviewsCount": 120,
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    "stock": 15,
    "brand": "Google",
    "description": "AI camera, Tensor G4 chip, Hazel color. Most advanced Pixel smartphone.",
    "specifications": {
      "Processor": "Google Tensor G4",
      "OS": "Android 15",
      "Display": "6.3 inch Super Actua OLED"
    }
  },
  {
    "id": 44,
    "title": "OnePlus Open",
    "category": "Mobiles & Tablets",
    "price": 139999,
    "originalPrice": 149999,
    "discount": 6,
    "rating": 4.7,
    "reviewsCount": 340,
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    "stock": 10,
    "brand": "OnePlus",
    "description": "Foldable flagship, Hasselblad camera, Emerald Green. Dual ProXDR screens.",
    "specifications": {
      "Display Size": "7.82 inch Folding Display",
      "Processor": "Snapdragon 8 Gen 2",
      "OS": "OxygenOS"
    }
  },
  {
    "id": 45,
    "title": "Apple Watch Ultra 2",
    "category": "Mobiles & Tablets",
    "price": 89900,
    "originalPrice": 89900,
    "discount": 0,
    "rating": 4.9,
    "reviewsCount": 880,
    "image": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80",
    "stock": 20,
    "brand": "Apple",
    "description": "Rugged titanium casing, 72h battery, Ocean Band. Advanced GPS outdoor tracking.",
    "specifications": {
      "Case Size": "49 mm Titanium",
      "Display": "Always-On OLED",
      "Water Resistance": "100 m"
    }
  },
  {
    "id": 46,
    "title": "Dell XPS 15",
    "category": "Laptops & Computers",
    "price": 189900,
    "originalPrice": 209900,
    "discount": 9,
    "rating": 4.6,
    "reviewsCount": 145,
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    "stock": 12,
    "brand": "Dell",
    "description": "OLED InfinityEdge, Intel Core i9, CNC aluminium body. Premium office performance.",
    "specifications": {
      "Processor": "Intel Core i9 13th Gen",
      "Display": "15.6 inch OLED Touch",
      "RAM": "32GB DDR5"
    }
  },
  {
    "id": 47,
    "title": "Razer Blade 16",
    "category": "Laptops & Computers",
    "price": 349999,
    "originalPrice": 389999,
    "discount": 10,
    "rating": 4.8,
    "reviewsCount": 64,
    "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    "stock": 5,
    "brand": "Razer",
    "description": "Dual-mode Mini-LED screen, RTX 4090, anodized black chassis. Ultimate gaming laptop.",
    "specifications": {
      "Graphics": "NVIDIA GeForce RTX 4090",
      "Processor": "Intel i9 14900HX",
      "Display": "Mini-LED Dual Mode"
    }
  },
  {
    "id": 48,
    "title": "Logitech MX Master 3S",
    "category": "Laptops & Computers",
    "price": 9495,
    "originalPrice": 10995,
    "discount": 13,
    "rating": 4.8,
    "reviewsCount": 15400,
    "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    "stock": 55,
    "brand": "Logitech",
    "description": "Ergonomic wireless mouse, silent clicks, 8K DPI darkfield tracking sensor.",
    "specifications": {
      "DPI Range": "200 to 8000 DPI",
      "Buttons": "7 Programmable Buttons",
      "Battery": "Rechargeable Li-Po"
    }
  },
  {
    "id": 49,
    "title": "LG C3 65\" 4K OLED TV",
    "category": "TV & Appliances",
    "price": 169999,
    "originalPrice": 249999,
    "discount": 32,
    "rating": 4.8,
    "reviewsCount": 1820,
    "image": "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80",
    "stock": 18,
    "brand": "LG",
    "description": "Self-lit OLED evo display panel, Dolby Vision, Filmmaker Mode. Ultimate gaming TV.",
    "specifications": {
      "Display": "OLED evo 4K",
      "Refresh Rate": "120Hz",
      "Sound": "40W Dolby Atmos"
    }
  },
  {
    "id": 50,
    "title": "Dyson Purifier Hot+Cool",
    "category": "TV & Appliances",
    "price": 59900,
    "originalPrice": 66900,
    "discount": 10,
    "rating": 4.5,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
    "stock": 22,
    "brand": "Dyson",
    "description": "HEPA H13 filtration, real-time air quality tracking. Heats, cools, purifies.",
    "specifications": {
      "Filter Standard": "HEPA H13",
      "Oscillation": "350 Degrees",
      "Functions": "Heat + Cool + Purify"
    }
  },
  {
    "id": 51,
    "title": "Philips Barista Sublime",
    "category": "TV & Appliances",
    "price": 15999,
    "originalPrice": 19999,
    "discount": 20,
    "rating": 4.4,
    "reviewsCount": 95,
    "image": "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=800&q=80",
    "stock": 30,
    "brand": "Philips",
    "description": "Double shot espresso maker, capsule compatible. 19-bar professional pressure pump.",
    "specifications": {
      "Pump Pressure": "19 Bar",
      "Capsule System": "L'OR / Nespresso",
      "Water Tank": "1.0 L"
    }
  },
  {
    "id": 52,
    "title": "Patagonia Torrentshell Jacket",
    "category": "Fashion",
    "price": 12999,
    "originalPrice": 15999,
    "discount": 18,
    "rating": 4.6,
    "reviewsCount": 1120,
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "stock": 45,
    "brand": "Patagonia",
    "description": "Recycled waterproof nylon, H2No performance standard 3-layer shell protection.",
    "specifications": {
      "Material": "100% Recycled Nylon",
      "Technology": "H2No 3-Layer Shell",
      "Weight": "394 g"
    }
  },
  {
    "id": 53,
    "title": "Nike Air Force 1 '07",
    "category": "Fashion",
    "price": 9695,
    "originalPrice": 10795,
    "discount": 10,
    "rating": 4.7,
    "reviewsCount": 22800,
    "image": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    "stock": 100,
    "brand": "Nike",
    "description": "Premium white leather classic court silhouette sneakers, supportive air cushioning.",
    "specifications": {
      "Upper": "Premium Leather",
      "Sole": "Nike Air Cushioned",
      "Color": "White / White"
    }
  },
  {
    "id": 54,
    "title": "Ray-Ban Wayfarer Classic",
    "category": "Fashion",
    "price": 10890,
    "originalPrice": 12090,
    "discount": 10,
    "rating": 4.5,
    "reviewsCount": 4120,
    "image": "https://images.unsplash.com/photo-1572635196233-14b492f7fb42?auto=format&fit=crop&w=800&q=80",
    "stock": 60,
    "brand": "Ray-Ban",
    "description": "Polarized G-15 lenses, shiny black acetate frame. Authentic retro vintage style.",
    "specifications": {
      "Frame Material": "Acetate Frame",
      "Lens": "Polarized G-15",
      "UV Blocking": "100% UV400"
    }
  },
  {
    "id": 55,
    "title": "Herman Miller Aeron Chair",
    "category": "Home & Furniture",
    "price": 149999,
    "originalPrice": 169999,
    "discount": 11,
    "rating": 4.9,
    "reviewsCount": 3850,
    "image": "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80",
    "stock": 8,
    "brand": "Herman Miller",
    "description": "Ergonomic posturefit SL lumbar support, breathable Pellicle mesh ventilation.",
    "specifications": {
      "Mesh": "8Z Pellicle Mesh",
      "Lumbar Support": "PostureFit SL",
      "Warranty": "12 Years"
    }
  },
  {
    "id": 56,
    "title": "Dyson Solarcycle Morph Desk Light",
    "category": "Home & Furniture",
    "price": 45900,
    "originalPrice": 49900,
    "discount": 8,
    "rating": 4.6,
    "reviewsCount": 92,
    "image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    "stock": 15,
    "brand": "Dyson",
    "description": "Adapts to natural daylight. 4 light formats in 1 (ambient, task, feature, indirect).",
    "specifications": {
      "Light Formats": "4 in 1 Mode",
      "Lifespan": "Up to 60 Years",
      "Connectivity": "Dyson Link App"
    }
  },
  {
    "id": 57,
    "title": "KitchenAid Artisan Stand Mixer",
    "category": "Home & Furniture",
    "price": 49990,
    "originalPrice": 59990,
    "discount": 16,
    "rating": 4.8,
    "reviewsCount": 7420,
    "image": "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=800&q=80",
    "stock": 14,
    "brand": "KitchenAid",
    "description": "4.8L bowl capacity, planetary mixing action. Robust all-metal body construction.",
    "specifications": {
      "Bowl Volume": "4.8 Litres",
      "Speeds": "10 Speed settings",
      "Body": "Die-cast Metal"
    }
  },
  {
    "id": 58,
    "title": "Dyson Airwrap Multi-Styler",
    "category": "Beauty & Personal Care",
    "price": 49900,
    "originalPrice": 49900,
    "discount": 0,
    "rating": 4.7,
    "reviewsCount": 3100,
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "stock": 25,
    "brand": "Dyson",
    "description": "Coanda airflow styling, ceramic pink/rose attachments. Heat-free styling damage.",
    "specifications": {
      "Styling Type": "Coanda Airflow",
      "Attachments": "Complete barrels set",
      "Power": "1300 W"
    }
  },
  {
    "id": 59,
    "title": "Kiehl's Facial Fuel",
    "category": "Beauty & Personal Care",
    "price": 2950,
    "originalPrice": 3250,
    "discount": 9,
    "rating": 4.4,
    "reviewsCount": 1850,
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
    "stock": 120,
    "brand": "Kiehl's",
    "description": "Energizing non-oily facial moisture treatment for men, 125ml squeeze bottle.",
    "specifications": {
      "Volume": "125 ml",
      "Key Ingredients": "Caffeine & Vitamin C/E",
      "Formulation": "Lightweight Cream"
    }
  },
  {
    "id": 60,
    "title": "Philips Sonicare DiamondClean",
    "category": "Beauty & Personal Care",
    "price": 18999,
    "originalPrice": 22999,
    "discount": 17,
    "rating": 4.6,
    "reviewsCount": 4200,
    "image": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=80",
    "stock": 40,
    "brand": "Philips",
    "description": "Sonic brush sweep motion, smart app real-time coaching. 4 cleaning modes.",
    "specifications": {
      "Speed": "62,000 movements/min",
      "Cleaning Modes": "4 Modes",
      "Charging": "Glass charger cup"
    }
  },
  {
    "id": 61,
    "title": "Garmin Fenix 7X Pro",
    "category": "Sports & Books",
    "price": 94990,
    "originalPrice": 99990,
    "discount": 5,
    "rating": 4.8,
    "reviewsCount": 650,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "stock": 15,
    "brand": "Garmin",
    "description": "Solar multisport GPS watch, sapphire edition. Preloaded topography maps.",
    "specifications": {
      "Bezel Material": "Titanium Bezel",
      "Battery": "Up to 37 Days Solar",
      "GPS": "Multi-band GNSS"
    }
  },
  {
    "id": 62,
    "title": "Theragun PRO",
    "category": "Sports & Books",
    "price": 49999,
    "originalPrice": 54999,
    "discount": 9,
    "rating": 4.7,
    "reviewsCount": 450,
    "image": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    "stock": 20,
    "brand": "Theragun",
    "description": "5th Gen percussion muscle massage therapy, ultra-silent brushless motor.",
    "specifications": {
      "Amplitude": "16 mm",
      "Force Capability": "60 lbs max",
      "Speeds": "5 Speeds (1750-2400 PPM)"
    }
  },
  {
    "id": 63,
    "title": "Atomic Habits",
    "category": "Sports & Books",
    "price": 799,
    "originalPrice": 999,
    "discount": 20,
    "rating": 4.8,
    "reviewsCount": 94500,
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    "stock": 250,
    "brand": "James Clear",
    "description": "Bestseller book by James Clear. Form good behaviors, break bad ones.",
    "specifications": {
      "Author": "James Clear",
      "Format": "Paperback / Hardcover",
      "Pages": "320 Pages"
    }
  },
  {
    "id": 64,
    "title": "Blue Tokai Coffee Sampler",
    "category": "Grocery & Gourmet",
    "price": 799,
    "originalPrice": 899,
    "discount": 11,
    "rating": 4.5,
    "reviewsCount": 1240,
    "image": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    "stock": 100,
    "brand": "Blue Tokai",
    "description": "4x75g single-origin ground coffee bags, custom ground arabica roasts.",
    "specifications": {
      "Contents": "4 bags x 75g Arabica",
      "Roasts Profile": "Assorted Roasts",
      "Grind": "Channi / French Press"
    }
  },
  {
    "id": 65,
    "title": "Ferrero Rocher Collection",
    "category": "Grocery & Gourmet",
    "price": 999,
    "originalPrice": 1199,
    "discount": 16,
    "rating": 4.7,
    "reviewsCount": 8850,
    "image": "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80",
    "stock": 150,
    "brand": "Ferrero Rocher",
    "description": "Premium hazelnut chocolate truffles gift box. 24 pieces collection.",
    "specifications": {
      "Count": "24 Confections",
      "Weight": "269 g",
      "Veg Indicator": "100% Vegetarian"
    }
  },
  {
    "id": 66,
    "title": "Lindt Excellence Dark Chocolate",
    "category": "Grocery & Gourmet",
    "price": 650,
    "originalPrice": 750,
    "discount": 13,
    "rating": 4.8,
    "reviewsCount": 1560,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    "stock": 200,
    "brand": "Lindt",
    "description": "Pack of 3 premium Swiss dark chocolate bars, 70% Cocoa content.",
    "specifications": {
      "Quantity": "3 Chocolate Bars x 100g",
      "Cocoa Percent": "70% Cocoa",
      "Origin": "Switzerland"
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
  const categories = ["Mobiles & Tablets", "Fashion", "Laptops & Computers", "TV & Appliances", "Home & Furniture"];

  const CONFIG = {
  "Mobiles & Tablets": {
    "brands": [
      "Apple",
      "Samsung",
      "Google",
      "OnePlus",
      "Xiaomi",
      "Vivo",
      "Nothing",
      "Motorola",
      "OPPO",
      "Realme"
    ],
    "models": [
      "16 Pro Max",
      "Galaxy S25 Ultra",
      "Pixel 9 Pro Fold",
      "Nord 4T",
      "14 Ultra",
      "V40 Pro",
      "Phone (2)",
      "Edge 50 Neo",
      "Find X7",
      "GT 6"
    ],
    "colors": [
      "Natural Titanium",
      "Desert Sand",
      "Obsidian Black",
      "Porcelain White",
      "Emerald Green",
      "Royal Cobalt",
      "Glacier Blue",
      "Amber Gold"
    ],
    "features": [
      "Features a legendary camera lens array, long-lasting battery capability, and smooth fluid computing performance.",
      "Engineered with state-of-the-art visual hardware and intelligent adaptive energy management for intense workflows.",
      "An absolutely stunning flagship device designed with premium materials and custom silicon layers built to last."
    ],
    "processors": [
      "A18 Pro Octa-core",
      "Snapdragon 8 Gen 4",
      "Google Tensor G4 AI SoC",
      "MediaTek Dimensity 9300+",
      "Qualcomm Snapdragon 7+ Gen 3"
    ],
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&auto=format&fit=crop&q=60"
    ],
    "minPrice": 19999,
    "maxPrice": 149999
  },
  "Fashion": {
    "brands": [
      "PUMA",
      "Nike",
      "Adidas",
      "Levi's",
      "Zara",
      "Tommy Hilfiger",
      "Calvin Klein",
      "Gucci",
      "Armani",
      "US Polo"
    ],
    "models": [
      "Signature Comfort Polo Shirt",
      "Vanguard Leather Air Jacket",
      "Dynamic Knit Running Shoes",
      "Relaxed Fit Cargo Trousers",
      "Suede Heritage Casual Loafers",
      "Luxury Cashmere Winter Coat",
      "Waterproof Lightweight Windbreaker",
      "Tech-Dry Knit Gym Hoodie"
    ],
    "colors": [
      "Raven Black",
      "Alpine Crisp White",
      "Heritage Navy Blue",
      "Vintage Olive Khaki",
      "Burgundy Maroon",
      "Stone Khaki Sand",
      "Cobalt Indigo Blue"
    ],
    "features": [
      "Woven from high-performance breathable fabrics to offer unparalleled movement and sophisticated styling silhouettes.",
      "Engineered for durable active lifestyles or elevated formal situations, delivering pristine design contours.",
      "A premium boutique addition that leverages lightweight moisture-wicking weaves for long-lasting comfort."
    ],
    "materials": [
      "Premium Breathable Cotton",
      "Regenerated Tech Polyester",
      "Primaloft Lightweight Nylon",
      "High-Grade Suede Denim Blend",
      "Fine Knit Cashmere Wool"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&auto=format&fit=crop&q=60"
    ],
    "minPrice": 999,
    "maxPrice": 19999
  },
  "Laptops & Computers": {
    "brands": [
      "Sony",
      "Bose",
      "Apple",
      "ASUS",
      "HP",
      "Dell",
      "Logitech",
      "Razer",
      "Canon",
      "Sennheiser",
      "Audio-Technica",
      "Intel"
    ],
    "models": [
      "Pro Spatial Wireless Earbuds",
      "RGB Mechanical Click Keyboard",
      "Quantum Wide Gaming Screen",
      "Pro-Creator Mirrorless Camera Bundle",
      "Pro Studio Podcasting Microphone",
      "Multi-Port Thunderbolt Dock Adapter",
      "Spatial Sound Dual Soundbar Core",
      "Vanguard Ultra-Thin Laptop Node"
    ],
    "colors": [
      "Carbon Slate Grey",
      "Prism Brushed Aluminium",
      "Stellar Blackout",
      "Matte White Diamond",
      "Neon Aurora Custom Gold"
    ],
    "features": [
      "Provides ultra-low latency playback, state-of-the-art ergonomic geometry, and deep spatial acoustics.",
      "Crafted with professional interfaces to boost creative workflows and immersive gaming responsiveness.",
      "Engineered with active intelligent response circuitry to isolate detail with exceptional fidelity results."
    ],
    "types": [
      "Over the Ear Active ANC",
      "Spatial Hybrid Bluetooth 5.4",
      "USB-C High Speed Multi Channel",
      "Laser Tracking Optical Pro",
      "IPS Anti-Glare HDR Pro OLED"
    ],
    "images": [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60"
    ],
    "minPrice": 2499,
    "maxPrice": 189900
  },
  "TV & Appliances": {
    "brands": [
      "Dyson",
      "LG",
      "Samsung",
      "Mi",
      "Philips",
      "Panasonic",
      "Whirlpool",
      "Bosch",
      "Haier",
      "Midea"
    ],
    "models": [
      "Carbon HEPA Smart Air Purifier",
      "Lidar Assisted Smart Robot Vac",
      "Digital Precision Espresso Machine",
      "Convection Digital Power Air Oven",
      "Inverter Double-Door Multi Refrigerator",
      "Whisper-Quiet Turbo Bladeless Fan",
      "Advanced High-Freq Sonic Toothbrush"
    ],
    "colors": [
      "Cosmopolitan Silver",
      "Brushed Graphite",
      "Pearl Opal White",
      "Polished Charcoal Dark"
    ],
    "features": [
      "Leverages automatic smart sensor triggers to monitor environment conditions and output performance stats.",
      "High-efficiency motor design delivers maximum dynamic output while cutting down on electrical overhead.",
      "A game-changing intelligent appliance built to refine household routines with automated convenience."
    ],
    "capacities": [
      "Digital HEPA 4-Stage Filter",
      "Direct Drive BLDC Suction Engine",
      "15 Bar Industrial Thermoblock Pump",
      "Dual-Inverter Variable Compressor",
      "6-Level Adaptive Power Heating"
    ],
    "images": [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=60"
    ],
    "minPrice": 4999,
    "maxPrice": 84999
  },
  "Home & Furniture": {
    "brands": [
      "Sleepwell",
      "Cello",
      "Ikea",
      "West Elm",
      "Ashley",
      "Pepperfry",
      "HomeCentre",
      "Nilkamal",
      "Godrej Interio"
    ],
    "models": [
      "Mesh Ergonomic Posture Office Chair",
      "Nordic Ash-Wood Dual Tier Desk",
      "Elegant Mid-Century Linen Lounge Couch",
      "Aero Vacuum Double Wall Stainless Thermos",
      "Geometric Hardwood Accents Coffee Table",
      "Modular Multilevel Cookware Rack Organizer",
      "Advanced Therapeutic Support Cushion Bedding"
    ],
    "colors": [
      "Warm Oak Brown",
      "Brushed Warm Carbon Oxide",
      "Sand Dunes Beige",
      "Sage Moss Weave",
      "Royal Velvet Navy Blue"
    ],
    "features": [
      "Crafted with certified eco-conscious components to ensure superior orthopedic support and pristine aesthetics.",
      "An exquisite design anchor that structures living and working domains with minimalist elegant visual notes.",
      "Durable, corrosion-free, light build profiles combined with premium matte coatings for elite finish quality."
    ],
    "dimensions": [
      "L 180cm x W 95cm x H 75cm",
      "100% Solid Certified Hardwood",
      "Double-Wall Food Grade SS 304",
      "Heavy-Duty Carbon Structural Steel",
      "Ergonomic Lumbar-Fit Contour"
    ],
    "images": [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1569698134101-f15cde5cd66c?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60"
    ],
    "minPrice": 1499,
    "maxPrice": 42999
  }
};

  for (let i = 67; i <= 500; i++) {
    const catIndex = (i - 67) % categories.length;
    const cat = categories[catIndex] as keyof typeof CONFIG;
    const data = CONFIG[cat];

    const brand = data.brands[getDeterministicInt(i, 1, 0, data.brands.length - 1)];
    const model = data.models[getDeterministicInt(i, 2, 0, data.models.length - 1)];
    const color = data.colors[getDeterministicInt(i, 3, 0, data.colors.length - 1)];
    const feature = data.features[getDeterministicInt(i, 4, 0, data.features.length - 1)];
    
    const title = `${brand} ${model} (${color})`;
    const price = getDeterministicInt(i, 5, data.minPrice, data.maxPrice);
    const discount = getDeterministicInt(i, 6, 5, 45);
    const originalPrice = Math.round(price / (1 - discount / 100));
    
    const ratingRaw = 4.0 + (getDeterministicInt(i, 7, 0, 9) / 10);
    const rating = Math.round(ratingRaw * 10) / 10;
    const reviewsCount = getDeterministicInt(i, 8, 15, 6200);
    const image = data.images[getDeterministicInt(i, 9, 0, data.images.length - 1)];
    const stock = getDeterministicInt(i, 10, 2, 85);

    let ispecs: Record<string, string> = {};
    let desc = "";

    if (cat === "Mobiles & Tablets") {
      const p = CONFIG["Mobiles & Tablets"].processors[getDeterministicInt(i, 11, 0, CONFIG["Mobiles & Tablets"].processors.length - 1)];
      ispecs = {
        "Model Name": model,
        "Display Size": `${14.7 + getDeterministicInt(i, 12, 1, 30)/10} cm (${5.8 + getDeterministicInt(i, 13, 0, 10)/10} inch)`,
        "Processor": p,
        "Camera": `${48 + getDeterministicInt(i, 14, 0, 152)}MP Rear Quad Camera | 32MP Front Selfie`,
        "Battery": `${4500 + getDeterministicInt(i, 15, 0, 15)*100} mAh Smart Cells`,
        "OS": getDeterministicInt(i, 16, 0, 1) === 0 ? "Android 15 (Material You)" : "iOS 18 (Siri Intell)"
      };
      desc = `The gorgeous new ${title}. ${feature}`;
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
      desc = `Make a bold statement with the pristine ${title}. ${feature}`;
    } else if (cat === "Laptops & Computers") {
      const t = CONFIG["Laptops & Computers"].types[getDeterministicInt(i, 11, 0, CONFIG["Laptops & Computers"].types.length - 1)];
      ispecs = {
        "Connectivity": t,
        "Battery Power": `${20 + getDeterministicInt(i, 12, 0, 60)} Hours Dynamic`,
        "Bluetooth Specs": "BT v5.4 BLE Certified",
        "Interface Channels": "Smart Native Hub Sync",
        "Warranty Term": "18 Months Structural Warranty"
      };
      desc = `Experience elite sonic performance and precision details with the ${title}. ${feature}`;
    } else if (cat === "TV & Appliances") {
      const cp = CONFIG["TV & Appliances"].capacities[getDeterministicInt(i, 11, 0, CONFIG["TV & Appliances"].capacities.length - 1)];
      ispecs = {
        "Internal Engine": cp,
        "Energy Star Badge": `${getDeterministicInt(i, 12, 3, 5)} Star Inverter`,
        "Operating Decibel": `${32 + getDeterministicInt(i, 13, 0, 15)} dB Ultra-Silent`,
        "Smart App Integration": "Yes (IoT App Compatible)",
        "Input Voltage": "220-240V AC Core Ready"
      };
      desc = `Simplify your luxury home routine using the intelligent ${title}. ${feature}`;
    } else if (cat === "Home & Furniture") {
      const dim = CONFIG["Home & Furniture"].dimensions[getDeterministicInt(i, 11, 0, CONFIG["Home & Furniture"].dimensions.length - 1)];
      ispecs = {
        "Dimensions Size": dim,
        "Design Theme": "Nordic Warm Minimalist",
        "Water Repellency": "Yes (Protective Matt Satin Finish)",
        "Assembly Node": "Minimal Tools Included",
        "Pincode Delivery": "Logistics Dispatch Ready"
      };
      desc = `An exquisite layout anchor that structures your living area: the ${title}. ${feature}`;
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
  "Mobiles & Tablets",
  "Laptops & Computers",
  "TV & Appliances",
  "Fashion",
  "Home & Furniture",
  "Beauty & Personal Care",
  "Sports & Books",
  "Grocery & Gourmet"
];
