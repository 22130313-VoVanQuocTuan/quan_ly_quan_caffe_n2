package com.example.pttkht_n2.service;

import com.example.pttkht_n2.dto.user.response.ProductQuantityResponse;
import com.example.pttkht_n2.dto.user.response.ProductResponse;
import com.example.pttkht_n2.entity.Product;
import com.example.pttkht_n2.mapper.ProductMapper;
import com.example.pttkht_n2.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;

    // Lấy ra danh sách món
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll(); // trả về danh sách Product
        return products.stream()
                .map(productMapper::toProductResponse) //chuyển từng Product thành ProductResponse
                .collect(Collectors.toList()); // gom lại thành một List<ProductResponse> để trả về
    }

    // kiểm tra saản phầm còn hay hết
    public ProductQuantityResponse checkProduct(int productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với ID: " + productId));

        return ProductQuantityResponse.builder()
                .isAvailable(product.getQuantity() > 0)
                .quantity(product.getQuantity())
                .build();
    }

}
