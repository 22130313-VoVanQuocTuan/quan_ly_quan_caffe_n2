package com.example.pttkht_n2.dto.user.request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {
    @NotBlank(message   = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    String email;

    @NotBlank(message = "Username không được để trống")
    @Size(min = 5, max = 10, message = "Username phải từ 5 đến 10 ký tự")
    String username;
    @NotBlank(message = "Password không được để trống")
    @Size(min = 5, max = 10, message = "Password phải từ 5 đến 10 ký tự")
    String password;
    @NotBlank(message = "Confirm password không được để trống")
    String confirmPassword;

    String role;


}
