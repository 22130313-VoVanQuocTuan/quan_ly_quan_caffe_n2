package com.example.pttkht_n2.dto.user.response;

import com.example.pttkht_n2.entity.OrderDetail;
import com.example.pttkht_n2.entity.User;
import jakarta.persistence.*;
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
    List<OrderDetail> orderDetails;
}
