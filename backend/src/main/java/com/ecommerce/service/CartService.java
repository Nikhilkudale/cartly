package com.ecommerce.service;

import com.ecommerce.dto.request.CartItemRequest;
import com.ecommerce.dto.response.CartResponse;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.mapper.EntityMapper;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.SecurityUtils;
import com.ecommerce.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductService productService;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       UserRepository userRepository,
                       ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productService = productService;
    }

    @Transactional(readOnly = true)
    public CartResponse getMyCart() {
        Cart cart = getCartForCurrentUser();
        return EntityMapper.toCartResponse(cart);
    }

    @Transactional
    public CartResponse addItem(CartItemRequest request) {
        Cart cart = getCartForCurrentUser();
        Product product = productService.getProduct(request.getProductId());

        if (product.getStock() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock for product: " + product.getName());
        }

        CartItem item = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElse(null);

        if (item != null) {
            int newQty = item.getQuantity() + request.getQuantity();
            if (product.getStock() < newQty) {
                throw new BadRequestException("Insufficient stock for product: " + product.getName());
            }
            item.setQuantity(newQty);
        } else {
            item = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cart.getItems().add(item);
        }

        cartRepository.save(cart);
        return getMyCart();
    }

    @Transactional
    public CartResponse updateItemQuantity(Long productId, Integer quantity) {
        Cart cart = getCartForCurrentUser();
        CartItem item = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (quantity <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        } else {
            if (item.getProduct().getStock() < quantity) {
                throw new BadRequestException("Insufficient stock");
            }
            item.setQuantity(quantity);
        }

        cartRepository.save(cart);
        return getMyCart();
    }

    @Transactional
    public CartResponse removeItem(Long productId) {
        return updateItemQuantity(productId, 0);
    }

    @Transactional
    public void clearCart(Cart cart) {
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    Cart getCartForCurrentUser() {
        UserPrincipal principal = SecurityUtils.currentUser();
        return cartRepository.findByUserIdWithItems(principal.getId())
                .orElseGet(() -> createCart(principal.getId()));
    }

    private Cart createCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Cart cart = Cart.builder().user(user).build();
        return cartRepository.save(cart);
    }
}
