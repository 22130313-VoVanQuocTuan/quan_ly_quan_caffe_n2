package com.example.pttkht_n2.dto.user.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    String username;
    String password;
    String role;
}
