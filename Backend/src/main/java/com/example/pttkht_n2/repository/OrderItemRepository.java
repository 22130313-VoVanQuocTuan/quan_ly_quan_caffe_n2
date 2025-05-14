package com.example.pttkht_n2.repository;

import com.example.pttkht_n2.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findAllByOrderId(int orderId);

    //1.2.7.1.1.1.1.1 OrderItemRepository sử dụng phương thức save(orderItem) của JpaRepository để lưu dữ liệu.
}
