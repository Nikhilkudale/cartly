package com.ecommerce.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PaymentRequest {

    @NotNull
    private Long orderId;

    @NotBlank
    @Size(max = 50)
    private String paymentMethod;
}
