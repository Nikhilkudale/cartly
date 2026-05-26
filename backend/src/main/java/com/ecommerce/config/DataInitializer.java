package com.ecommerce.config;

import com.ecommerce.entity.*;
import com.ecommerce.repository.*;
import com.ecommerce.service.CatalogImportService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedData(
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            CartRepository cartRepository,
            CatalogImportService catalogImportService,
            PasswordEncoder passwordEncoder) {

        return args -> {
            if (userRepository.count() > 0) {
                if (categoryRepository.count() == 0) {
                    catalogImportService.importDemoCatalog();
                }
                return;
            }

            User admin = userRepository.save(User.builder()
                    .email("admin@shop.com")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("Store Admin")
                    .role(Role.ROLE_ADMIN)
                    .build());

            User demoUser = userRepository.save(User.builder()
                    .email("user@shop.com")
                    .password(passwordEncoder.encode("user123"))
                    .fullName("Demo User")
                    .role(Role.ROLE_USER)
                    .build());

            cartRepository.save(Cart.builder().user(admin).build());
            cartRepository.save(Cart.builder().user(demoUser).build());

            catalogImportService.importDemoCatalog();
        };
    }
}
