package com.example.pttkht_n2.dto.user.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductCreateRequest {
    String name;
    String price;
    String menuGroup;
    String imageUrl;
    int quantity;
    List<IngredientsRequest> ingredients;
}

