package com.ecommerce.controller;

import com.ecommerce.dto.request.CategoryRequest;
import com.ecommerce.dto.request.ProductRequest;
import com.ecommerce.dto.response.CategoryResponse;
import com.ecommerce.dto.response.ProductResponse;
import com.ecommerce.service.CatalogImportService;
import com.ecommerce.service.CategoryService;
import com.ecommerce.service.ProductCsvImportService;
import com.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final CatalogImportService catalogImportService;
    private final ProductCsvImportService productCsvImportService;

    public AdminController(ProductService productService,
                           CategoryService categoryService,
                           CatalogImportService catalogImportService,
                           ProductCsvImportService productCsvImportService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.catalogImportService = catalogImportService;
        this.productCsvImportService = productCsvImportService;
    }

    @PostMapping("/catalog/import-demo")
    public ResponseEntity<CatalogImportService.ImportResult> importDemoCatalog() {
        return ResponseEntity.ok(catalogImportService.importDemoCatalog());
    }

    @PostMapping(value = "/catalog/import-csv", consumes = "multipart/form-data")
    public ResponseEntity<CatalogImportService.ImportResult> importCsv(
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(productCsvImportService.importCsv(file));
    }

    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.update(id, request));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/categories")
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(request));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.update(id, request));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> adminListProducts() {
        return ResponseEntity.ok(productService.findAll(null));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> adminListCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }
}
