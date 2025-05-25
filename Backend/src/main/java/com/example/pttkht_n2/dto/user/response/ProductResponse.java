package com.example.pttkht_n2.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
// 5.1.1.11.5 Tạo ProductResponse để trả về dữ liệu sản phẩm sau khi thêm món ăn thành công.
public class ProductResponse {
    int id;
    String imageUrl;
    String name;
    String price;
    String category;
}
