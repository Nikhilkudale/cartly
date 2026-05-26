package com.ecommerce.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PlaceOrderRequest {

    @NotBlank
    @Size(max = 500)
    private String shippingAddress;

    @NotBlank
    @Size(max = 50)
    private String paymentMethod;
}
