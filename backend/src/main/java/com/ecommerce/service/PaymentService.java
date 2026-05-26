package com.ecommerce.service;

import com.ecommerce.dto.request.PaymentRequest;
import com.ecommerce.dto.response.PaymentResponse;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Payment;
import com.ecommerce.entity.PaymentStatus;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.mapper.EntityMapper;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.PaymentRepository;
import com.ecommerce.security.SecurityUtils;
import com.ecommerce.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Payment createPendingPayment(Order order, String paymentMethod) {
        Payment payment = Payment.builder()
                .order(order)
                .amount(order.getTotalAmount())
                .status(PaymentStatus.PENDING)
                .paymentMethod(paymentMethod)
                .build();
        order.setPayment(payment);
        return paymentRepository.save(payment);
    }

    /**
     * Mock payment gateway — always succeeds unless amount is negative.
     */
    @Transactional
    public PaymentResponse processPayment(PaymentRequest request) {
        Order order = orderRepository.findByIdWithDetails(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + request.getOrderId()));

        UserPrincipal principal = SecurityUtils.currentUser();
        if (!order.getUser().getId().equals(principal.getId())) {
            throw new BadRequestException("Not authorized for this order");
        }

        Payment payment = paymentRepository.findByOrderId(order.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found for order"));

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            throw new BadRequestException("Order already paid");
        }

        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setTransactionId("MOCK-" + UUID.randomUUID());
        payment.setStatus(PaymentStatus.SUCCESS);
        order.setStatus(com.ecommerce.entity.OrderStatus.CONFIRMED);

        paymentRepository.save(payment);
        orderRepository.save(order);

        return EntityMapper.toPaymentResponse(payment);
    }

    @Transactional(readOnly = true)
    public PaymentResponse getByOrderId(Long orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
        return EntityMapper.toPaymentResponse(payment);
    }
}
