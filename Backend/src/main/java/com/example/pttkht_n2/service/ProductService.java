package com.example.pttkht_n2.service;

import com.example.pttkht_n2.dto.user.request.IngredientsRequest;
import com.example.pttkht_n2.dto.user.request.ProductCreateRequest;
import com.example.pttkht_n2.dto.user.response.ProductQuantityResponse;
import com.example.pttkht_n2.dto.user.response.ProductResponse;
import com.example.pttkht_n2.entity.Ingredient;
import com.example.pttkht_n2.entity.Product;
import com.example.pttkht_n2.entity.ProductIngredient;
import com.example.pttkht_n2.mapper.ProductMapper;
import com.example.pttkht_n2.repository.IngredientRepository;
import com.example.pttkht_n2.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;
    IngredientRepository ingredientRepository;

    // Lấy ra danh sách món
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll(); // trả về danh sách Product
        return products.stream()
                .map(productMapper::toProductResponse) //chuyển từng Product thành ProductResponse
                .collect(Collectors.toList()); // gom lại thành một List<ProductResponse> để trả về
    }

    // kiểm tra saản phầm còn hay hết
    public ProductQuantityResponse checkProduct(int productId) {
        //1.2.5.1.1.1.1 ProductService gọi ProductRepository.findById(productId) để truy vấn dữ liệu từ cơ sở dữ liệu qua Hibernate.
        Product product = productRepository.findById(productId) //1.2.5.1.1.1.1.2 ProductRepository trả về dữ liệu cho ProductService.
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với ID: " + productId));

        //1.2.5.1.1.1.2 ProductService xử lý dữ liệu và trả về kết quả(ProductQuantityResponse) cho ProductController.
        return ProductQuantityResponse.builder()
                .isAvailable(product.getQuantity() > 0)
                .quantity(product.getQuantity())
                .build();
    }


    // tìm kiếm sản phảm theo tên
    public List<ProductResponse> searchProduct(String productName) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(productName);// trả về danh sách Product
        return products.stream()
                .map(productMapper::toProductResponse) //chuyển từng Product thành ProductResponse
                .collect(Collectors.toList()); // gom lại thành một List<ProductResponse> để trả về

    // 5.1.1.11.1.Thực hiện phương thức addProduct(ProductCreateRequest request) ở phần product service để có thể lưu xuống database
    public void addProduct(ProductCreateRequest request) {
        Product product = Product.builder().
                name(request.getName()).
                imageUrl(request.getImageUrl()).
                price(request.getPrice()).
                category(request.getMenuGroup()).
                quantity(request.getQuantity()).build(); // mặc định số lượng là 100
        //5.1.1.9.2.	Lớp productRepository sẽ dung phương thức save(product) để lưu product vào database
        productRepository.save(product);

        // Lưu các nguyên liệu vào bảng ProductIngredient

        List<ProductIngredient> productIngredients = new ArrayList<>();
        for (IngredientsRequest ing : request.getIngredients()) {
            Ingredient ingredient = ingredientRepository.findByCode(ing.getCode())
                    .orElseGet(() -> {
                        Ingredient newIngredient = Ingredient.builder().code(ing.getCode()).name(ing.getName()).unit(ing.getUnit()).quantity(Integer.parseInt(String.valueOf(ing.getQuantity()))).build();
                        return ingredientRepository.save(newIngredient);
                    });

            ProductIngredient productIngredient = new ProductIngredient();
            productIngredient.setProduct(product);
            productIngredient.setIngredient(ingredient);
            productIngredient.setQuantity(ing.getQuantity());
            productIngredient.setUnit(ing.getUnit());

            productIngredients.add(productIngredient);
        }

        product.setProductIngredients(productIngredients);
        productRepository.save(product);
    }

}
