package com.ecommerce.service;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductCsvImportService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public ProductCsvImportService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public CatalogImportService.ImportResult importCsv(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("CSV file is required");
        }

        List<String[]> rows = parseCsv(file);
        if (rows.isEmpty()) {
            throw new BadRequestException("CSV file has no data rows");
        }

        String[] header = rows.get(0);
        Map<String, Integer> col = mapColumns(header);

        int added = 0;
        int skipped = 0;
        int updated = 0;
        Map<String, Category> categories = new HashMap<>();

        for (int i = 1; i < rows.size(); i++) {
            String[] row = rows.get(i);
            if (row.length == 0 || (row.length == 1 && row[0].isBlank())) {
                continue;
            }

            String name = get(row, col, "name");
            if (name.isBlank()) {
                continue;
            }

            String description = get(row, col, "description");
            BigDecimal price = new BigDecimal(get(row, col, "price"));
            int stock = Integer.parseInt(get(row, col, "stock"));
            String imageUrl = get(row, col, "imageurl");
            String categoryName = get(row, col, "categoryname");

            Category category = categories.computeIfAbsent(categoryName, cn ->
                    categoryRepository.findByName(cn).orElseGet(() ->
                            categoryRepository.save(Category.builder().name(cn).description(cn).build())));

            var existing = productRepository.findByNameIgnoreCase(name);
            if (existing.isPresent()) {
                Product p = existing.get();
                p.setDescription(description);
                p.setPrice(price);
                p.setStock(stock);
                p.setImageUrl(imageUrl);
                p.setCategory(category);
                productRepository.save(p);
                updated++;
            } else {
                productRepository.save(Product.builder()
                        .name(name)
                        .description(description)
                        .price(price)
                        .stock(stock)
                        .imageUrl(imageUrl)
                        .category(category)
                        .build());
                added++;
            }
        }

        return new CatalogImportService.ImportResult(added, skipped, updated, categories.size());
    }

    private static String get(String[] row, Map<String, Integer> col, String key) {
        Integer idx = col.get(key);
        if (idx == null || idx >= row.length) {
            throw new BadRequestException("Missing column: " + key);
        }
        return row[idx].trim();
    }

    private static Map<String, Integer> mapColumns(String[] header) {
        Map<String, Integer> col = new HashMap<>();
        for (int i = 0; i < header.length; i++) {
            col.put(header[i].trim().toLowerCase(), i);
        }
        if (!col.containsKey("name") || !col.containsKey("price") || !col.containsKey("categoryname")) {
            throw new BadRequestException("CSV must include columns: name, description, price, stock, imageUrl, categoryName");
        }
        return col;
    }

    /** Minimal RFC-4180-style CSV parser (quoted fields supported). */
    static List<String[]> parseCsv(MultipartFile file) {
        try (var reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            List<String[]> rows = new ArrayList<>();
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.isBlank()) {
                    continue;
                }
                rows.add(parseLine(line));
            }
            return rows;
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw new BadRequestException("Failed to read CSV: " + e.getMessage());
        }
    }

    static String[] parseLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == '"') {
                if (inQuotes && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    current.append('"');
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (c == ',' && !inQuotes) {
                fields.add(current.toString());
                current.setLength(0);
            } else {
                current.append(c);
            }
        }
        fields.add(current.toString());
        return fields.toArray(String[]::new);
    }
}
