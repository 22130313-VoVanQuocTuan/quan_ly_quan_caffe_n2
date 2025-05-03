package com.example.pttkht_n2.repository;

import com.example.pttkht_n2.dto.user.response.OrderItemResponse;
import com.example.pttkht_n2.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {


}
