package com.ecommerce.controller;

import com.ecommerce.dto.response.CategoryResponse;
import com.ecommerce.dto.response.ProductResponse;
import com.ecommerce.service.CategoryService;
import com.ecommerce.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CatalogController {

    private final ProductService productService;
    private final CategoryService categoryService;

    public CatalogController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> listProducts(
            @RequestParam(required = false) Long categoryId) {
        return ResponseEntity.ok(productService.findAll(categoryId));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> listCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryResponse> getCategory(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findById(id));
    }
}
