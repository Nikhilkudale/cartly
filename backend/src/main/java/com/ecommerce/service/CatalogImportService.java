package com.ecommerce.service;

import com.ecommerce.config.DemoProductCatalog;
import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CatalogImportService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    public CatalogImportService(CategoryRepository categoryRepository, 
                                ProductRepository productRepository,
                                CartItemRepository cartItemRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Transactional
    public ImportResult importDemoCatalog() {
        // Clean up old duplicate/obsolete products first
        for (String name : List.of("Dark Chocolate Assorted", "Bestseller Novel")) {
            productRepository.findByNameIgnoreCase(name).ifPresent(p -> {
                cartItemRepository.findAll().stream()
                        .filter(ci -> ci.getProduct().getId().equals(p.getId()))
                        .forEach(cartItemRepository::delete);
                productRepository.delete(p);
            });
        }

        Map<String, Category> categoriesByName = new HashMap<>();
        for (DemoProductCatalog.CategorySeed seed : DemoProductCatalog.CATEGORIES) {
            Category category = categoryRepository.findByName(seed.name())
                    .orElseGet(() -> categoryRepository.save(Category.builder()
                            .name(seed.name())
                            .description(seed.description())
                            .build()));
            categoriesByName.put(category.getName(), category);
        }

        int added = 0;
        int skipped = 0;
        int updated = 0;

        for (DemoProductCatalog.ProductSeed seed : DemoProductCatalog.PRODUCTS) {
            Category category = categoriesByName.get(seed.categoryName());
            var existing = productRepository.findByNameIgnoreCase(seed.name());

            if (existing.isPresent()) {
                Product p = existing.get();
                boolean changed = false;
                if (p.getImageUrl() == null || !p.getImageUrl().equals(seed.imageUrl())) {
                    p.setImageUrl(seed.imageUrl());
                    changed = true;
                }
                if (p.getDescription() == null || !p.getDescription().equals(seed.description())) {
                    p.setDescription(seed.description());
                    changed = true;
                }
                if (p.getPrice() == null || p.getPrice().compareTo(seed.price()) != 0) {
                    p.setPrice(seed.price());
                    changed = true;
                }
                if (p.getStock() == null || !p.getStock().equals(seed.stock())) {
                    p.setStock(seed.stock());
                    changed = true;
                }
                if (p.getCategory() == null || !p.getCategory().getId().equals(category.getId())) {
                    p.setCategory(category);
                    changed = true;
                }
                if (changed) {
                    productRepository.save(p);
                    updated++;
                } else {
                    skipped++;
                }
                continue;
            }

            productRepository.save(Product.builder()
                    .name(seed.name())
                    .description(seed.description())
                    .price(seed.price())
                    .stock(seed.stock())
                    .imageUrl(seed.imageUrl())
                    .category(category)
                    .build());
            added++;
        }

        return new ImportResult(added, skipped, updated, categoriesByName.size());
    }

    public record ImportResult(int added, int skipped, int updated, int categoryCount) {}
}
