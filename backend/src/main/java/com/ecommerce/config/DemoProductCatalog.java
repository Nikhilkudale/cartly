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
                    "https://images.unsplash.com/photo-1592899677974-9bc0a4e8e0e0?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("OnePlus Nord CE 3", "120Hz display, 80W SUPERVOOC", 24999, 80,
                    "https://images.unsplash.com/photo-1565849902261-2a39be9c72c0?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("Redmi Note 13 Pro", "200MP camera, curved AMOLED", 23999, 95,
                    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("iPad Air", "M1 chip, 10.9\" Liquid Retina display", 54999, 35,
                    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),
            p("Wireless Earbuds Pro", "ANC, 28h total battery, IPX5", 2999, 200,
                    "https://images.unsplash.com/photo-1590658268037-6bfad31c0f0e?auto=format&fit=crop&w=800&q=80", "Mobiles & Tablets"),

            // Laptops
            p("HP Pavilion Laptop", "Intel i5, 16GB RAM, 512GB SSD, 15.6\"", 54999, 60,
                    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("MacBook Air M2", "13.6\" display, 8GB RAM, 256GB SSD", 99999, 25,
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("ASUS Gaming Laptop", "RTX 4060, 144Hz display, 16GB RAM", 89999, 30,
                    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("Mechanical Keyboard RGB", "Hot-swappable switches, wireless", 3499, 150,
                    "https://images.unsplash.com/photo-1587829741301-d7988e5b0e8f?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("27\" 4K Monitor", "IPS panel, 60Hz, HDMI/DP", 18999, 40,
                    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),
            p("1TB NVMe SSD", "Gen4, 3500MB/s read speed", 5999, 180,
                    "https://images.unsplash.com/photo-1597872200969-2b65d7f5c5b1?auto=format&fit=crop&w=800&q=80", "Laptops & Computers"),

            // TV & Appliances
            p("55\" Smart LED TV", "4K UHD, Dolby Audio, Android TV", 42999, 50,
                    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Split AC 1.5 Ton", "5-star inverter, copper condenser", 35999, 35,
                    "https://images.unsplash.com/photo-1631545806609-8fb5c1b2f2f3?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Front Load Washing Machine", "7kg, steam wash, inverter motor", 27999, 28,
                    "https://images.unsplash.com/photo-1626806819282-2d1b0d0e0b0a?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Microwave Oven 28L", "Convection, auto cook menus", 8999, 70,
                    "https://images.unsplash.com/photo-1574269909862-7e1d1bb011e9?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Air Fryer 4.5L", "Digital touch, 8 presets", 4999, 90,
                    "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),
            p("Bluetooth Speaker", "20W RMS, 12h playback, waterproof", 2499, 160,
                    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80", "TV & Appliances"),

            // Fashion
            p("Men's Casual Sneakers", "Lightweight mesh, cushioned sole", 1999, 300,
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Women's Running Shoes", "Breathable knit upper, responsive midsole", 2499, 220,
                    "https://images.unsplash.com/photo-1543163521-1bf539c55dd1?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Men's Slim Fit Jeans", "Stretch denim, mid-rise", 1299, 400,
                    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Women's Kurti Set", "Cotton blend, festive print", 899, 350,
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Leather Wallet", "Genuine leather, RFID blocking", 799, 500,
                    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80", "Fashion"),
            p("Aviator Sunglasses", "UV400 polarized lenses", 599, 280,
                    "https://images.unsplash.com/photo-1572635196233-14b492f7fb42?auto=format&fit=crop&w=800&q=80", "Fashion"),

            // Home
            p("Queen Size Bedsheet Set", "300 TC cotton, 4 pieces", 1499, 180,
                    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Study Table with Shelf", "Engineered wood, compact design", 4999, 55,
                    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Office Chair Ergonomic", "Lumbar support, adjustable height", 6999, 65,
                    "https://images.unsplash.com/photo-1580480051063-fd921d76291d?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("LED Desk Lamp", "3 color modes, touch dimmer", 899, 240,
                    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Non-stick Cookware Set", "5-piece, induction compatible", 2999, 120,
                    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),
            p("Vacuum Cleaner", "Cordless, HEPA filter, 40min runtime", 8999, 40,
                    "https://images.unsplash.com/photo-1558317374-0bc8c8f63a7f?auto=format&fit=crop&w=800&q=80", "Home & Furniture"),

            // Beauty
            p("Face Wash Vitamin C", "Brightening, 100ml", 299, 600,
                    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),
            p("Perfume Eau de Parfum", "Long lasting, 100ml", 1999, 150,
                    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),
            p("Electric Trimmer", "Cordless, 90min runtime, waterproof", 1499, 200,
                    "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),
            p("Hair Dryer 2000W", "Ionic technology, 2 speeds", 1299, 130,
                    "https://images.unsplash.com/photo-1522338242992-e1a54906a8e8?auto=format&fit=crop&w=800&q=80", "Beauty & Personal Care"),

            // Sports & Books
            p("Yoga Mat 6mm", "Anti-slip, carrying strap included", 699, 320,
                    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80", "Sports & Books"),
            p("Cricket Bat Kashmir Willow", "Full size, rubber grip", 1999, 85,
                    "https://images.unsplash.com/photo-1624526279023-5d2a6b0b0b0b?auto=format&fit=crop&w=800&q=80", "Sports & Books"),
            p("Bestseller Novel", "Paperback edition", 399, 500,
                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80", "Sports & Books"),
            p("Adjustable Dumbbells 20kg", "Home gym pair set", 4999, 45,
                    "https://images.unsplash.com/photo-1517836357463-4aa95e956833?auto=format&fit=crop&w=800&q=80", "Sports & Books"),

            // Grocery
            p("Premium Basmati Rice 5kg", "Aged long grain", 699, 400,
                    "https://images.unsplash.com/photo-1586201375761-b1f5c0e7a2b?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),
            p("Extra Virgin Olive Oil 1L", "Cold pressed", 899, 250,
                    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),
            p("Dark Chocolate Assorted", "500g gift pack", 499, 350,
                    "https://images.unsplash.com/photo-1481391319762-47dff72954a0?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet"),
            p("Green Tea 100 Bags", "Antioxidant blend", 349, 420,
                    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80", "Grocery & Gourmet")
    );

    private static ProductSeed p(String name, String desc, int priceInr, int stock, String img, String cat) {
        return new ProductSeed(name, desc, BigDecimal.valueOf(priceInr), stock, img, cat);
    }
}
