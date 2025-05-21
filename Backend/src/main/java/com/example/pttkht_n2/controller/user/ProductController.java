package com.example.pttkht_n2.controller.user;


import com.example.pttkht_n2.dto.user.APIResponse;
import com.example.pttkht_n2.dto.user.response.ProductQuantityResponse;
import com.example.pttkht_n2.dto.user.response.ProductResponse;
import com.example.pttkht_n2.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

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

    //1.2.5.1.1 Thực hiện kiểm tra qua method checkProduct(int productId) trong ProductController (Backend).
    @GetMapping("/check/{productId}")
    APIResponse<ProductQuantityResponse> checkProduct(@PathVariable int productId) {
        //1.2.5.1.1.1 ProductController gọi ProductService.checkProduct(int productId) để xử lý logic.
        ProductQuantityResponse productQuantityResponses = productService.checkProduct(productId);
        //1.2.5.1.1.2 ProductController trả về một APIResponse (JSON) chứa dữ liệu cho Frontend
        return APIResponse.<ProductQuantityResponse>builder().data(productQuantityResponses).build();
    }

    @GetMapping("/search")
    APIResponse<List<ProductResponse>> searchProduct(@RequestParam("name") String productName) {
        List<ProductResponse> productResponseList = productService.searchProduct(productName);
        return APIResponse.<List<ProductResponse>>builder().data(productResponseList).build();
    }
}
