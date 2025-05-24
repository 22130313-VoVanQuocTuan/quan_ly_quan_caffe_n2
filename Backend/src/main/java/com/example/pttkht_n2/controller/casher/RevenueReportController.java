package com.example.pttkht_n2.controller.casher;

import com.example.pttkht_n2.entity.Order;
import com.example.pttkht_n2.model.RevenueModel;
import com.example.pttkht_n2.service.RevenueReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/revenue")
public class RevenueReportController {
    private final RevenueReportService revenueReportService;

    public RevenueReportController(RevenueReportService revenueReportService) {
        this.revenueReportService = revenueReportService;
    }
    //2.5.1.7. Controller gọi Service xử lý nghiệp vụ bằng cách truyền khoảng thời gian hợp lệ.
    @GetMapping("/get-revenue-by-date")
    public ResponseEntity<List<RevenueModel>> findByCreateAtBetween(@RequestParam(name = "start") LocalDate start,
                                                                    @RequestParam(name = "end") LocalDate end) {
        List<Order> orders = revenueReportService.findByCreateAtBetween(start, end);
        List<RevenueModel> revenueModels = getRevenueModelList(orders);
//        2.5.1.11. trả dữ liệu cho giao diện
        if (!revenueModels.isEmpty()) {
            return ResponseEntity.ok(revenueModels);
        }
        return ResponseEntity.notFound().build();
    }
    //2.5.1.11. Controller xử lý
    public List<RevenueModel> getRevenueModelList(List<Order> orders) {
        Map<LocalDate, RevenueModel> map = new HashMap<>();
        for (Order order : orders) {
            RevenueModel rm;
            if (map.containsKey(order.getCreateAt())) {
                rm = map.get(order.getCreateAt());
            } else {
                rm = new RevenueModel();
            }
            rm.setDate(order.getCreateAt());
            rm.setRevenue(rm.getRevenue() + order.getTotalPrice());
            rm.setNumberOfOrder(rm.getNumberOfOrder() + 1);
            map.put(order.getCreateAt(), rm);
        }
        return new ArrayList<>(map.values());
    }
}
