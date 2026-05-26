package com.ecommerce.service;

import com.ecommerce.config.DemoProductCatalog;
import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class CatalogImportService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CatalogImportService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public ImportResult importDemoCatalog() {
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
                if (p.getImageUrl() == null || p.getImageUrl().contains("picsum.photos")) {
                    p.setImageUrl(seed.imageUrl());
                    changed = true;
                }
                if (p.getDescription() == null || p.getDescription().isBlank()) {
                    p.setDescription(seed.description());
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
