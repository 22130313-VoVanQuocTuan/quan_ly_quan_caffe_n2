package com.example.pttkht_n2.service;

import com.example.pttkht_n2.controller.user.OrderController;
import com.example.pttkht_n2.dto.user.request.AddOrderItemRequest;
import com.example.pttkht_n2.dto.user.response.OrderItemResponse;
import com.example.pttkht_n2.dto.user.response.OrderResponse;
import com.example.pttkht_n2.dto.user.response.UserResponse;
import com.example.pttkht_n2.entity.Order;
import com.example.pttkht_n2.entity.OrderItem;
import com.example.pttkht_n2.entity.Product;
import com.example.pttkht_n2.entity.User;
import com.example.pttkht_n2.mapper.OrderItemMapper;
import com.example.pttkht_n2.mapper.OrderMapper;
import com.example.pttkht_n2.repository.OrderItemRepository;
import com.example.pttkht_n2.repository.OrderRepository;
import com.example.pttkht_n2.repository.ProductRepository;
import com.example.pttkht_n2.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {
    OrderRepository orderRepository;
    UserRepository userRepository;
    OrderMapper orderMapper;
    OrderItemMapper orderItemMapper;
    ProductRepository productRepository;
    OrderItemRepository orderItemRepository;

    // tạo thực đơn
    public OrderResponse createOrder(HttpSession session) {
        // Lấy thông tin người dùng từ session
        UserResponse userResponse = (UserResponse) session.getAttribute("userResponse");

        if (userResponse == null) {
            throw new RuntimeException("Bạn chưa đăng nhập");
        }

        // Lấy user từ DB bằng id lấy từ session
        User user = userRepository.findById(Integer.parseInt(userResponse.getId()))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        // Kiểm tra role
        if (!"Phục vụ".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Chỉ phục vụ mới được tạo thực đơn");
        }

        // Tạo đơn hàng
        Order order = Order.builder()
                .user(user)
                .createAt(new Timestamp(System.currentTimeMillis()))
                .status("Chưa xác nhận")
                .totalPrice(0.0)
                .build();

        //1.2.3.1.1.1.1 OrderService gọi OrderRepository.save(Order order) để lưu dữ liệu vào cơ sở dữ liệu qua Hibernate.
        orderRepository.save(order);



        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
        session.setAttribute("orderResponse", orderResponse);  // Lưu vào session
        orderResponse.setUsername(user.getUsername());
       //1.2.3.1.1.2 OrderService xử lý dữ liệu và trả về kết quả (OrderResponse) cho OrderController.
        return orderResponse;
    }

// lấy danh sách đã có trong thực đơn theo id thực đơn
public List<OrderItemResponse> getOrderItems(HttpSession session) {
    List<OrderItemResponse> orderItemResponses = new ArrayList<>();

    // Lấy đối tượng order từ session
    OrderResponse orderResponse = (OrderResponse) session.getAttribute("orderResponse");

    if (orderResponse == null) {
        return orderItemResponses; // Không có order trong session => trả danh sách rỗng
    }

    // 1.2.3.4.1.1.1 OrderService gọi OrderRepository. findAllByOrderId(orderId) để lưu dữ liệu vào cơ sở dữ liệu qua Hibernate. 
    List<OrderItem> orderItem = orderItemRepository.findAllByOrderId(orderResponse.getId());
    orderItemResponses = orderItemMapper.toOrderItemResponse(orderItem);


    //1.2.3.4.1.1.2 OrderService xử lý dữ liệu và trả về kết quả (orderItemResponses) cho OrderController.
    return orderItemResponses;
}

    //Thêm món vào thực đơn
    public OrderItemResponse addItemToOrder(HttpSession session, AddOrderItemRequest request) {
        OrderResponse orderResponse = (OrderResponse) session.getAttribute("orderResponse");
        if (orderResponse == null) {
            throw new RuntimeException("Chưa tạo thực đơn");
        }

        Order order = orderRepository.findById(orderResponse.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(request.getQuantity());
        orderItem.setSubtotal(request.getPrice() * request.getQuantity());

        //1.2.7.1.1.1.1 OrderService gọi OrderItemRepository.save(orderItem) để lưu dữ liệu vào cơ sở dữ liệu qua Hibernate.
        orderItemRepository.save(orderItem);

        OrderItemResponse orderItemResponse = orderItemMapper.toOrderItemResponse(orderItem);

        //1.2.7.1.1.1.2 OrderService xử lý và trả về kết quả (OrderItemResponse) cho OrderController.
        return orderItemResponse ;
    }


    // Xác nhận thực đơn
    public String confirmCreateOrder(HttpSession session, double subtotal) {
        OrderResponse orderResponse = (OrderResponse) session.getAttribute("orderResponse");
        if (orderResponse == null) {
            throw new RuntimeException("Chưa tạo thực đơn");
        }

        Optional<Order> optionalOrder = orderRepository.findById(orderResponse.getId()); //tránh lỗi NullPointerException khi không tìm thấy
        if (optionalOrder.isEmpty()) {
            throw new RuntimeException("Không tìm thấy đơn hàng");
        }

        Order order = optionalOrder.get();
        order.setStatus("Đã xác nhận");
        order.setTotalPrice(subtotal);

        //1.2.10.1.1.1.1 OrderService gọi OrderRepository.save(order) để lưu dữ liệu vào cơ sở dữ liệu qua Hibernate.
        orderRepository.save(order);

        //1.2.10.1.1.1.2 OrderService xử lý và trả về kết quả (message) cho OrderController.
        return "Xác nhận thành công";
    }



}

