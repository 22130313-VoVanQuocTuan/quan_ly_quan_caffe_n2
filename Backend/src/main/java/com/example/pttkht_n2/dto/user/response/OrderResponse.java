package com.example.pttkht_n2.dto.user.response;

import com.example.pttkht_n2.entity.OrderItem;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    int id;
    String username;
    double totalPrice;
    Timestamp createAt;
    String status;
    List<OrderItem> orderItems;
}
