package com.example.pttkht_n2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @ManyToOne
    @JoinColumn(name = "orderId") // cột user_id làm khóa ngoại
    Order order;

    @ManyToOne
    @JoinColumn(name = "productId") // Khóa ngoại đến Product
    Product product;

   int quantity;
   double subtotal;


}
