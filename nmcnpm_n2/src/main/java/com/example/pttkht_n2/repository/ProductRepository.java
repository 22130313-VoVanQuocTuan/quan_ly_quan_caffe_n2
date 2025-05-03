package com.example.pttkht_n2.repository;

import com.example.pttkht_n2.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
