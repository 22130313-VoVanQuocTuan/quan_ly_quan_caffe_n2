package com.example.pttkht_n2.mapper;

import com.example.pttkht_n2.dto.user.response.OrderResponse;
import com.example.pttkht_n2.entity.Order;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring" )
public interface OrderMapper {
    OrderResponse toOrderResponse(Order order);
}
