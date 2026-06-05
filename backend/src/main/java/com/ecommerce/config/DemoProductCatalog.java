package com.ecommerce.config;

import java.math.BigDecimal;
import java.util.List;

/**
 * Demo catalog inspired by typical Indian e-commerce categories (not copied from Flipkart).
 * Images are from Unsplash (free to use for demos).
 */
public final class DemoProductCatalog {

    private DemoProductCatalog() {}

    public record CategorySeed(String name, String description) {}

    public record ProductSeed(
            String name,
            String description,
            BigDecimal price,
            int stock,
            String imageUrl,
            String categoryName
    ) {}

    public static final List<CategorySeed> CATEGORIES = List.of(
            new CategorySeed("Mobiles & Tablets", "Smartphones, tablets, and accessories"),
            new CategorySeed("Laptops & Computers", "Laptops, monitors, keyboards, and storage"),
            new CategorySeed("TV & Appliances", "Televisions, AC, washing machines, and kitchen appliances"),
            new CategorySeed("Fashion", "Clothing, footwear, and accessories"),
            new CategorySeed("Home & Furniture", "Furniture, decor, and home essentials"),
            new CategorySeed("Beauty & Personal Care", "Skincare, grooming, and wellness"),
            new CategorySeed("Sports & Books", "Fitness gear, books, and outdoor"),
            new CategorySeed("Grocery & Gourmet", "Snacks, beverages, and pantry staples")
    );

    public static final List<ProductSeed> PRODUCTS = List.of(
            // Mobiles
            p("Samsung Galaxy M34 5G", "6.5\" AMOLED, 6000mAh, 50MP camera", 15999, 120,
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("iPhone 15", "A16 chip, Dynamic Island, dual camera system", 69999, 45,
                    "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("OnePlus Nord CE 3", "120Hz display, 80W SUPERVOOC", 24999, 80,
                    "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("Redmi Note 13 Pro", "200MP camera, curved AMOLED", 23999, 95,
                    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("iPad Air", "M1 chip, 10.9\" Liquid Retina display", 54999, 35,
                    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("Wireless Earbuds Pro", "ANC, 28h total battery, IPX5", 2999, 200,
                    "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),

            // Laptops
            p("HP Pavilion Laptop", "Intel i5, 16GB RAM, 512GB SSD, 15.6\"", 54999, 60,
                    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("MacBook Air M2", "13.6\" display, 8GB RAM, 256GB SSD", 99999, 25,
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("ASUS Gaming Laptop", "RTX 4060, 144Hz display, 16GB RAM", 89999, 30,
                    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("Mechanical Keyboard RGB", "Hot-swappable switches, wireless", 3499, 150,
                    "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("27\" 4K Monitor", "IPS panel, 60Hz, HDMI/DP", 18999, 40,
                    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("1TB NVMe SSD", "Gen4, 3500MB/s read speed", 5999, 180,
                    "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),

            // TV & Appliances
            p("55\" Smart LED TV", "4K UHD, Dolby Audio, Android TV", 42999, 50,
                    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Split AC 1.5 Ton", "5-star inverter, copper condenser", 35999, 35,
                    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Front Load Washing Machine", "7kg, steam wash, inverter motor", 27999, 28,
                    "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Microwave Oven 28L", "Convection, auto cook menus", 8999, 70,
                    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Air Fryer 4.5L", "Digital touch, 8 presets", 4999, 90,
                    "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Bluetooth Speaker", "20W RMS, 12h playback, waterproof", 2499, 160,
                    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),

            // Fashion
            p("Men's Casual Sneakers", "Lightweight mesh, cushioned sole", 1999, 300,
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Women's Running Shoes", "Breathable knit upper, responsive midsole", 2499, 220,
                    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Men's Slim Fit Jeans", "Stretch denim, mid-rise", 1299, 400,
                    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Women's Kurti Set", "Cotton blend, festive print", 899, 350,
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Leather Wallet", "Genuine leather, RFID blocking", 799, 500,
                    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Aviator Sunglasses", "UV400 polarized lenses", 599, 280,
                    "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80", "Fashion"),

            // Home
            p("Queen Size Bedsheet Set", "300 TC cotton, 4 pieces", 1499, 180,
                    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Study Table with Shelf", "Engineered wood, compact design", 4999, 55,
                    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Office Chair Ergonomic", "Lumbar support, adjustable height", 6999, 65,
                    "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("LED Desk Lamp", "3 color modes, touch dimmer", 899, 240,
                    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Non-stick Cookware Set", "5-piece, induction compatible", 2999, 120,
                    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Vacuum Cleaner", "Cordless, HEPA filter, 40min runtime", 8999, 40,
                    "https://images.unsplash.com/photo-1569698134101-f15cde5cd66c?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),

            // Beauty
            p("Face Wash Vitamin C", "Brightening, 100ml", 299, 600,
                    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),
            p("Perfume Eau de Parfum", "Long lasting, 100ml", 1999, 150,
                    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),
            p("Electric Trimmer", "Cordless, 90min runtime, waterproof", 1499, 200,
                    "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),
            p("Hair Dryer 2000W", "Ionic technology, 2 speeds", 1299, 130,
                    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),

            // Sports & Books
            p("Yoga Mat 6mm", "Anti-slip, carrying strap included", 699, 320,
                    "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80", "Sports & Books"),
            p("Cricket Bat Kashmir Willow", "Full size, rubber grip", 1999, 85,
                    "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=800&q=80", "Sports & Books"),
            p("Spalding Replica Basketball", "Official size and weight rubber basketball", 1499, 85,
                    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80", "Sports & Books"),
            p("Adjustable Dumbbells 20kg", "Home gym pair set", 4999, 45,
                    "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=800&q=80", "Sports & Books"),

            // Grocery
            p("Premium Basmati Rice 5kg", "Aged long grain", 699, 400,
                    "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),
            p("Extra Virgin Olive Oil 1L", "Cold pressed", 899, 250,
                    "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),
            p("Organic Wildflower Honey 500g", "Pure raw unpasteurized honey", 549, 350,
                    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),
            p("Green Tea 100 Bags", "Antioxidant blend", 349, 420,
                    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),

            // --- New Premium Products (Mobiles & Tablets) ---
            p("Google Pixel 9 Pro", "AI camera, Tensor G4 chip, Hazel color", 109999, 15,
                    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("OnePlus Open", "Foldable flagship, Hasselblad camera, Emerald Green", 139999, 10,
                    "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("Apple Watch Ultra 2", "Rugged titanium, 72h battery, Ocean Band", 89900, 20,
                    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),

            // --- New Premium Products (Laptops & Computers) ---
            p("Dell XPS 15", "OLED InfinityEdge, Intel Core i9, CNC aluminium", 189900, 12,
                    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("Razer Blade 16", "Dual-mode Mini-LED, RTX 4090, anodized black", 349999, 5,
                    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("Logitech MX Master 3S", "Ergonomic wireless mouse, silent clicks", 9495, 55,
                    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),

            // --- New Premium Products (TV & Appliances) ---
            p("LG C3 65\" 4K OLED TV", "Self-lit OLED evo, Dolby Vision, Filmmaker Mode", 169999, 18,
                    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Dyson Purifier Hot+Cool", "HEPA H13 filtration, real-time air quality tracking", 59900, 22,
                    "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Philips Barista Sublime", "Double shot espresso maker, capsule compatible", 15999, 30,
                    "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),

            // --- New Premium Products (Fashion) ---
            p("Patagonia Torrentshell Jacket", "Recycled waterproof nylon, H2No performance", 12999, 45,
                    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Nike Air Force 1 '07", "Premium white leather, classic court silhouette", 9695, 100,
                    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Ray-Ban Wayfarer Classic", "Polarized G-15 lenses, shiny black acetate", 10890, 60,
                    "https://images.unsplash.com/photo-1572635196233-14b492f7fb42?auto=format&fit=crop&w=800&q=80", "Fashion"),

            // --- New Premium Products (Home & Furniture) ---
            p("Herman Miller Aeron Chair", "Ergonomic posturefit SL, breathable Pellicle mesh", 149999, 8,
                    "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Dyson Solarcycle Morph Desk Light", "Adapts to daylight, 60-year light quality", 45900, 15,
                    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("KitchenAid Artisan Stand Mixer", "4.8L bowl, planetary mixing action, empire red", 49990, 14,
                    "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),

            // --- New Premium Products (Beauty & Personal Care) ---
            p("Dyson Airwrap Multi-Styler", "Coanda airflow styling, ceramic pink/rose", 49900, 25,
                    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),
            p("Kiehl's Facial Fuel", "Energizing moisture treatment for men, 125ml", 2950, 120,
                    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),
            p("Philips Sonicare DiamondClean", "Sonic toothbrush, smart app coaching", 18999, 40,
                    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),

            // --- New Premium Products (Sports & Books) ---
            p("Garmin Fenix 7X Pro", "Solar multisport GPS watch, sapphire edition", 94990, 15,
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", "Sports & Books"),
            p("Theragun PRO", "5th Gen percussion therapy, ultra-silent motor", 49999, 20,
                    "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80", "Sports & Books"),
            p("Atomic Habits", "Self-improvement bestseller by James Clear", 799, 250,
                    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80", "Sports & Books"),

            // --- New Premium Products (Grocery & Gourmet) ---
            p("Blue Tokai Coffee Sampler", "4x75g single-origin ground coffee packs", 799, 100,
                    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),
            p("Ferrero Rocher Collection", "Premium hazelnut chocolates, 24 pieces", 999, 150,
                    "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),
            p("Lindt Excellence Dark Chocolate", "Pack of 3 premium Swiss bars (70% Cocoa)", 650, 200,
                    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet")
    );

    private static ProductSeed p(String name, String desc, int priceInr, int stock, String img, String cat) {
        return new ProductSeed(name, desc, BigDecimal.valueOf(priceInr), stock, img, cat);
    }
}
