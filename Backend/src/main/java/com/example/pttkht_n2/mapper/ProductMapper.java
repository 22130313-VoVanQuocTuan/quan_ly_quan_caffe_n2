package com.example.pttkht_n2.mapper;

import com.example.pttkht_n2.dto.user.response.ProductResponse;
import com.example.pttkht_n2.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel ="spring" )
public interface ProductMapper {
    ProductResponse toProductResponse(Product product);
}
