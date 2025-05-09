package com.example.pttkht_n2.controller.user;


import com.example.pttkht_n2.dto.user.APIResponse;
import com.example.pttkht_n2.dto.user.response.ProductQuantityResponse;
import com.example.pttkht_n2.dto.user.response.ProductResponse;
import com.example.pttkht_n2.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;

    @GetMapping
    APIResponse<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> productResponseList = productService.getAllProducts();
        return APIResponse.<List<ProductResponse>>builder().data(productResponseList).build();
    }

    //1.2.6.1.1 Thực hiện qua method checkProduct(int productId).
    @GetMapping("/check/{productId}")
    APIResponse<ProductQuantityResponse> checkProduct(@PathVariable int productId) {
        ProductQuantityResponse productQuantityResponses = productService.checkProduct(productId);
        return APIResponse.<ProductQuantityResponse>builder().data(productQuantityResponses).build(); //1.2.6.1.1.1 Hệ thống trả về một đối tượng APIResponse (JSON).
    }


}
