package com.example.pttkht_n2.dto.user.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientsRequest {
    String code;
    String name;
    int quantity;
    String unit;
}
