package com.example.pttkht_n2.dto.user.request;

import lombok.Data;

@Data
public class AddOrderItemRequest {
    private int productId;
    private int quantity;
    private double price;
}