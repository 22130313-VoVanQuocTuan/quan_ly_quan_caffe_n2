package com.example.pttkht_n2.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "product_ingredient")
public class ProductIngredient {
    @Id

    @ManyToOne
    @JoinColumn(name = "id") // cột product_id làm khóa ngoại
    Product product; // Khóa ngoại đến Product

    @ManyToOne
    @JoinColumn(name = "code") // cột ingredient_code làm khóa ngoại
    Ingredient ingredient; // Khóa ngoại đến Ingredient

    int quantity; // Số lượng nguyên liệu trong sản phẩm
    String unit; // Đơn vị của nguyên liệu trong sản phẩm
}
