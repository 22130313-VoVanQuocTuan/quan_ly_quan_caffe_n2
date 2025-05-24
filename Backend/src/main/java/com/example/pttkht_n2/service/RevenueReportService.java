package com.example.pttkht_n2.service;

import com.example.pttkht_n2.entity.Order;
import com.example.pttkht_n2.repository.ReportRevenueRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Service
public class RevenueReportService {
    private final ReportRevenueRepository repo;

    public RevenueReportService(ReportRevenueRepository repo) {
        this.repo = repo;
    }
    //2.5.1.8.0.  Service gọi Repository truy vấn cơ sở dữ liệu, lọc tất cả đơn hàng đã thanh toán nằm trong khoảng thời gian chỉ định.
    public List<Order> findByCreateAtBetween(LocalDate start, LocalDate end) {
    //2.5.1.10. Service trả kết quả về Controller, dưới dạng một object
        return repo.findByCreateAtBetween(start, end);
    }

}
