package com.example.pttkht_n2.repository;

import com.example.pttkht_n2.dto.user.response.OrderItemResponse;
import com.example.pttkht_n2.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
//1.2.3.1.1.1.1.1 OrderRepository sử dụng phương thức save(order) từ JpaRepository để lưu thực thể Order vào cơ sở dữ liệu.
//
//1.2.10.1.1.1.1.1 OrderRepository thực hiện phương thức save(order) của JpaRepository để lưu dữ liệu.
}
