package com.example.pttkht_n2.mapper;

import com.example.pttkht_n2.dto.user.response.OrderItemResponse;
import com.example.pttkht_n2.entity.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel ="spring" )
public interface OrderItemMapper {

    List<OrderItemResponse> toOrderItemResponse (List<OrderDetail> orderDetail);

    @Mapping(source = "product.name", target = "productName")
    OrderItemResponse toOrderItemResponse (OrderDetail orderDetail);
}
