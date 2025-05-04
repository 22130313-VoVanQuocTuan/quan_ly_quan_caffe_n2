package com.example.pttkht_n2.controller.user;

import com.example.pttkht_n2.dto.user.APIResponse;
import com.example.pttkht_n2.dto.user.request.AddOrderItemRequest;
import com.example.pttkht_n2.dto.user.request.ConfirmOrderRequest;
import com.example.pttkht_n2.dto.user.request.CreateOrderRequest;
import com.example.pttkht_n2.dto.user.response.OrderItemResponse;
import com.example.pttkht_n2.dto.user.response.OrderResponse;
import com.example.pttkht_n2.dto.user.response.ProductResponse;
import com.example.pttkht_n2.service.OrderService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;


    @PostMapping
     APIResponse<OrderResponse> createOrder(HttpSession session) {
        return APIResponse.<OrderResponse>builder()
                .data(orderService.createOrder(session))
        .build();

    }
    @GetMapping
    APIResponse<List<OrderItemResponse>> getOrderItems(HttpSession session) {
        List<OrderItemResponse> orderItemResponses = orderService.getOrderItems(session);
        return APIResponse.<List<OrderItemResponse>>builder()
                .data(orderItemResponses)
                .build();

    }
    @PostMapping("/order-items")
    APIResponse<OrderItemResponse> addItemToOrder(HttpSession session, @RequestBody AddOrderItemRequest request) {
        return APIResponse.<OrderItemResponse>builder()
                .data(orderService.addItemToOrder(session, request))
                .build();

    }
    @PutMapping()
    public APIResponse<String> confirmCreateOrder(HttpSession session, @RequestBody ConfirmOrderRequest request) {
        try {
            Double subtotal = request.getTotalPrice();
            if (subtotal == null || subtotal <= 0) {
                throw new IllegalArgumentException("Tổng tiền phải lớn hơn 0");
            }
            String result = orderService.confirmCreateOrder(session, subtotal);
            return APIResponse.<String>builder()
                    .data(result)
                    .msg("Xác nhận đơn hàng thành công")
                    .build();
        } catch (Exception e) {
            return APIResponse.<String>builder()
                    .code(9999)
                    .msg("Xác nhận đơn hàng thất bại: " + e.getMessage())
                    .build();
        }

    }

}
