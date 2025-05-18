package com.example.pttkht_n2.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ingredient")

public class Ingredient {

    @Id
    String code;
    String name;
    int quantity;
    String unit;

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL)
    List<ProductIngredient> productIngredients;

}
