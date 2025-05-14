package com.example.pttkht_n2.repository;

import com.example.pttkht_n2.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    //1.2.5.1.1.1.1.1 ProductRepository sử dụng phương thức findById(productId) từ JpaRepository để lấy dữ liệu Product ra.
}
