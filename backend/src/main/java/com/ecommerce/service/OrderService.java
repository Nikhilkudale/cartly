package com.ecommerce.service;

import com.ecommerce.dto.request.PlaceOrderRequest;
import com.ecommerce.dto.response.OrderResponse;
import com.ecommerce.entity.*;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.mapper.EntityMapper;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.security.SecurityUtils;
import com.ecommerce.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final PaymentService paymentService;

    public OrderService(OrderRepository orderRepository,
                        CartService cartService,
                        PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.paymentService = paymentService;
    }

    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest request) {
        Cart cart = cartService.getCartForCurrentUser();
        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        UserPrincipal principal = SecurityUtils.currentUser();
        Order order = Order.builder()
                .user(cart.getUser())
                .shippingAddress(request.getShippingAddress())
                .status(OrderStatus.PENDING)
                .build();

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            if (product.getStock() < cartItem.getQuantity()) {
                throw new BadRequestException("Insufficient stock for: " + product.getName());
            }
            BigDecimal subtotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productId(product.getId())
                    .productName(product.getName())
                    .unitPrice(product.getPrice())
                    .quantity(cartItem.getQuantity())
                    .subtotal(subtotal)
                    .build();
            order.getItems().add(orderItem);
            total = total.add(subtotal);

            product.setStock(product.getStock() - cartItem.getQuantity());
        }

        order.setTotalAmount(total);
        order = orderRepository.save(order);

        paymentService.createPendingPayment(order, request.getPaymentMethod());
        cartService.clearCart(cart);

        return findById(order.getId());
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> myOrders() {
        UserPrincipal principal = SecurityUtils.currentUser();
        return orderRepository.findByUserIdWithItems(principal.getId()).stream()
                .map(EntityMapper::toOrderResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderResponse findById(Long id) {
        Order order = orderRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));
        UserPrincipal principal = SecurityUtils.currentUser();
        boolean isAdmin = principal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(Role.ROLE_ADMIN.name()));
        if (!isAdmin && !order.getUser().getId().equals(principal.getId())) {
            throw new ResourceNotFoundException("Order not found: " + id);
        }
        return EntityMapper.toOrderResponse(order);
    }

    @Transactional
    public OrderResponse updateStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));
        order.setStatus(status);
        return EntityMapper.toOrderResponse(orderRepository.save(order));
    }
}
