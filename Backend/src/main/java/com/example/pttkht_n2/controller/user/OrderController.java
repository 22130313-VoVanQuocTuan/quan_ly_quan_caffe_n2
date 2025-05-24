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
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Builder
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;


    //1.2.3.1.1 Thực hiện tạo thực đơn qua method createOrder(HttpSession session) trong OrderController (Backend).
    @PostMapping
     APIResponse<OrderResponse> createOrder(HttpSession session) {
        //1.2.3.1.2 OrderController trả về một APIResponse (JSON) chứa dữ liệu cho Frontend.
        return APIResponse.<OrderResponse>builder()
                //1.2.3.1.1.1 OrderController gọi OrderService.createOrder(HttpSession session) để xử lý logic nghiệp vụ.
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
    //1.2.7.1.1 Thực hiện qua method addItemToOrder(HttpSession session, AddOrderItemRequest request) trong OrderController (Backend).
    @PostMapping("/order-items")
    APIResponse<OrderItemResponse> addItemToOrder(HttpSession session, @RequestBody AddOrderItemRequest request) {
        //1.2.7.1.1.2 OrderController trả về một APIResponse (JSON) chứa dữ liệu cho Frontend.
        return APIResponse.<OrderItemResponse>builder()
        //1.2.7.1.1.1 OrderController gọi OrderService.addItemToOrder(HttpSession session, AddOrderItemRequest request) để xử lý logic.
                .data(orderService.addItemToOrder(session, request))
                .build();

    }

    //1.2.10.1.1 Lưu thực đơn được thực hiện qua method confirmCreateOrder(HttpSession session, ConfirmOrderRequest request) trong OrderController (Backend).
    @PutMapping()
    public APIResponse<String> confirmCreateOrder(HttpSession session, @RequestBody ConfirmOrderRequest request) {
        try {
            Double subtotal = request.getTotalPrice();
            if (subtotal == null || subtotal <= 0) {
                throw new IllegalArgumentException("Tổng tiền phải lớn hơn 0");
            }
            //1.2.10.1.1.1 OrderController gọi OrderService.confirmCreateOrder(HttpSession session, ConfirmOrderRequest request) để xử lý logic.
            String result = orderService.confirmCreateOrder(session, subtotal);
            //1.2.10.1.1.2 OrderController trả về một APIResponse (JSON) chứa dữ liệu cho Frontend .
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
