package com.example.pttkht_n2.repository;

import com.example.pttkht_n2.entity.Order;
import com.example.pttkht_n2.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;
import java.time.LocalDate;

public interface ReportRevenueRepository extends JpaRepository<Order,Integer> {
    //2.5.1.8.  Service truy vấn cơ sở dữ liệu, lọc tất cả đơn hàng đã thanh toán nằm trong khoảng thời gian chỉ định
    @Query(value = "SELECT o.id, o.create_at, o.status, o.total_price, o.user_id, o.status_payment " +
                    "FROM orders o " +
                    "WHERE o.create_at BETWEEN :start AND :end " +
                    "AND o.status = N'Đã xác nhận'",
        nativeQuery = true)
//    2.5.1.9. Database trả về kết quả
    List<Order> findByCreateAtBetween(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );
}
