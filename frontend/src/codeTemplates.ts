export const SPRING_BOOT_TEMPLATES = {
  entity: `package com.flipkart.clone.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "original_price", precision = 12, scale = 2)
    private BigDecimal originalPrice;

    private Integer discount;

    private Double rating;

    @Column(name = "reviews_count")
    private Integer reviewsCount;

    @Column(length = 500)
    private String image;

    @Column(nullable = false)
    private Integer stock;

    @Column(length = 100)
    private String brand;

    @Column(columnDefinition = "TEXT")
    private String description;
}`,

  repository: `package com.flipkart.clone.repository;

import com.flipkart.clone.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIgnoreCase(String category);

    @Query("SELECT p FROM Product p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);

    List<Product> findByStockLessThan(Integer threshold);
}`,

  controller: `package com.flipkart.clone.controller;

import com.flipkart.clone.model.Product;
import com.flipkart.clone.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Allow React Dev Server Connection
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String q) {
        return ResponseEntity.ok(productRepository.searchProducts(q));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productRepository.findByCategoryIgnoreCase(category));
    }

    // Role-based Access endpoint example
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Restrict to admin users with JWT Token
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product saved = productRepository.save(product);
        return ResponseEntity.ok(saved);
    }
}`,

  userModel: `package com.flipkart.clone.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false, length = 255)
    @JsonIgnore
    private String password;

    @Column(nullable = false, length = 50)
    private String role; // Values: "CUSTOMER" or "ADMIN"

    @Column(name = "full_name", length = 150)
    private String fullName;
}`,

  userRepository: `package com.flipkart.clone.repository;

import com.flipkart.clone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}`,

  jwtTokenProvider: `package com.flipkart.clone.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // Safe HS512 secret code storage
    @Value("\${app.jwt.secret:SuperSecretFlipkartTokenSecretKeyStoreWithHighDensityLengthJWTKey2026}")
    private String jwtSecret;

    @Value("\${app.jwt.expiration-ms:86400000}") // 24 Hours duration
    private int jwtExpirationMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(String username, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            // Logs access violations inside Tomcat Log output
            return false;
        }
    }
}`,

  jwtFilter: `package com.flipkart.clone.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                String username = tokenProvider.getUsernameFromJwt(jwt);
                String role = tokenProvider.getRoleFromJwt(jwt); // Extract claims

                SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);
                
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.singletonList(authority));
                
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in Spring Security context", ex);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}`,

  securityConfig: `package com.flipkart.clone.config;

import com.flipkart.clone.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Enables @PreAuthorize("hasRole('ADMIN')") method validation 
public class WebSecurityConfig {

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeHttpRequests(auth -> auth
                // Public auth paths & catalog queries
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                
                // RBAC endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/orders/**").hasAnyRole("CUSTOMER", "ADMIN")
                
                // Fallback route protection
                .anyRequest().authenticated()
            );

        // Inject JWT extraction filter prior to base Auth Filter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}`,

  authController: `package com.flipkart.clone.controller;

import com.flipkart.clone.model.User;
import com.flipkart.clone.dto.LoginRequest;
import com.flipkart.clone.dto.AuthResponse;
import com.flipkart.clone.dto.RegisterRequest;
import com.flipkart.clone.repository.UserRepository;
import com.flipkart.clone.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user (Defaults to CUSTOMER role type)
        User user = User.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .fullName(signUpRequest.getFullName())
                .role(signUpRequest.getRole() != null ? signUpRequest.getRole().toUpperCase() : "CUSTOMER")
                .build();

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully. Role: " + user.getRole());
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return userRepository.findByUsername(loginRequest.getUsername())
                .filter(user -> passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
                .map(user -> {
                    String token = tokenProvider.generateToken(user.getUsername(), user.getRole());
                    return ResponseEntity.ok(AuthResponse.builder()
                            .token(token)
                            .username(user.getUsername())
                            .email(user.getEmail())
                            .role(user.getRole())
                            .fullName(user.getFullName())
                            .build());
                })
                .orElseGet(() -> ResponseEntity.status(401).body("Error: Invalid username or password"));
    }
}`,

  orderController: `package com.flipkart.clone.controller;

import com.flipkart.clone.dto.OrderRequest;
import com.flipkart.clone.model.Order;
import com.flipkart.clone.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')") // Authenticated JWT needed!
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            Order order = orderService.processOrder(orderRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}`,

  orderService: `package com.flipkart.clone.service;

import com.flipkart.clone.dto.OrderRequest;
import com.flipkart.clone.model.Order;
import com.flipkart.clone.model.OrderItem;
import com.flipkart.clone.model.Product;
import com.flipkart.clone.repository.OrderRepository;
import com.flipkart.clone.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order processOrder(OrderRequest request) {
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("SUCCESS");
        order.setTransactionId("TXN" + System.currentTimeMillis());

        BigDecimal total = BigDecimal.ZERO;

        for (var itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

            if (product.getStock() < itemRequest.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for: " + product.getTitle());
            }

            // Deduct stock (MySQL UPDATE under Transaction lock)
            product.setStock(product.getStock() - itemRequest.getQuantity());
            productRepository.save(product);

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            item.setPrice(product.getPrice());
            item.setOrder(order);

            order.getItems().add(item);
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setTotalAmount(total);
        return orderRepository.save(order);
    }
}`,

  mysqlSchema: `-- -------------------------------------------------------------
-- MySQL Database DDL Structure for Flipkart Clone Application
-- -------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS flipkart_db;
USE flipkart_db;

-- 1. Users Table (Identity Management)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER',
    full_name VARCHAR(150),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    original_price DECIMAL(12, 2) DEFAULT NULL,
    discount INT DEFAULT 0,
    rating DOUBLE DEFAULT 0.0,
    reviews_count INT DEFAULT 0,
    image VARCHAR(500) DEFAULT NULL,
    stock INT NOT NULL DEFAULT 0,
    brand VARCHAR(100) DEFAULT NULL,
    description TEXT,
    INDEX idx_category (category),
    FULLTEXT INDEX idx_searching (title, brand)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_date DATETIME NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    transaction_id VARCHAR(100) UNIQUE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Order Items Table (Many-to-Many Bridge with Attributes)
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(12, 2) NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Users Data (BCrypt hashes for 'password123')
INSERT INTO users (username, email, password, role, full_name) VALUES
('nikhil_customer', 'nikhil@flipkart.com', '$2a$10$vN9fPZ38ZAt8zLhVvXo5xe1R04t0kUp1wZ9vQzU0.W4O.H6A9FvU.', 'CUSTOMER', 'Nikhil Kudale'),
('admin_flipkart', 'admin@flipkart.com', '$2a$10$vN9fPZ38ZAt8zLhVvXo5xe1R04t0kUp1wZ9vQzU0.W4O.H6A9FvU.', 'ADMIN', 'Flipkart Administrator');

-- Seed Products Table
INSERT INTO products (title, category, price, original_price, discount, rating, reviews_count, image, stock, brand, description) VALUES
('Apple iPhone 15 Pro (Natural Titanium, 128 GB)', 'Mobiles', 119900.00, 134900.00, 11, 4.7, 3840, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569', 12, 'Apple', 'iPhone 15 Pro features aerospace-grade titanium design'),
('SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)', 'Mobiles', 129999.00, 139999.00, 7, 4.8, 1950, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf', 8, 'Samsung', 'Powered by Galaxy AI, S24 Ultra titanium powerhouse'),
('PUMA Aviator Premium Unisex Running Shoes', 'Fashion', 3499.00, 6999.00, 50, 4.2, 12850, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 45, 'PUMA', 'Lightweight mesh performance running footwear'),
('Sony WH-1000XM5 Wireless ANC Headphones', 'Electronics', 26990.00, 34990.00, 22, 4.6, 5430, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 14, 'Sony', 'True smart noise cancellation with 8 mic tracking');
`
};
