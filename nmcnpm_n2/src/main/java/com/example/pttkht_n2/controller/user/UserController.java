package com.example.pttkht_n2.controller.user;

import com.example.pttkht_n2.dto.user.APIResponse;
import com.example.pttkht_n2.dto.user.request.LoginRequest;
import com.example.pttkht_n2.dto.user.request.UserRegisterRequest;
import com.example.pttkht_n2.dto.user.response.UserResponse;
import com.example.pttkht_n2.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class UserController {
    UserService userService;

    @PostMapping
    APIResponse<UserResponse> registerUser(@RequestBody @Valid UserRegisterRequest userRegisterRequest) {
        return APIResponse.<UserResponse>builder()
                .data(userService.registerUser(userRegisterRequest))
        .build();
    }

    @PostMapping("/login")
    APIResponse<UserResponse> loginUser(@RequestBody @Valid LoginRequest request) {
        return APIResponse.<UserResponse>builder()
                .data(userService.login(request))
                .build();
    }
}
