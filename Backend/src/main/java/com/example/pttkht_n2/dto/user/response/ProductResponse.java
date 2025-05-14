package com.example.pttkht_n2.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    int id;
    String imageUrl;
    String name;
    String price;
    String category;

}
