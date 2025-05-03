package com.example.pttkht_n2.service;

import com.example.pttkht_n2.dto.user.request.LoginRequest;
import com.example.pttkht_n2.dto.user.request.UserRegisterRequest;
import com.example.pttkht_n2.dto.user.response.UserResponse;
import com.example.pttkht_n2.mapper.UserMapper;
import com.example.pttkht_n2.entity.User;
import com.example.pttkht_n2.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults (level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;


    public UserResponse registerUser(UserRegisterRequest request){
        // Check email and username
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username đã tồn tại");
        }
        // Mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // Chuyển từ DTO sang Entity và cập nhật thông tin
        User user = userMapper.toUser(request);
        user.setPassword(encodedPassword);


        // Lưu vào database
        userRepository.save(user);

        // Trả về UserResponse
        return userMapper.toUserResponse(user);
         }

    public UserResponse login(LoginRequest request, HttpSession session) {
        // Tìm user theo username
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            throw new RuntimeException("Username không tồn tại");
        }

        // So sánh password nhập vào với password đã mã hóa trong DB
        boolean isPasswordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!isPasswordMatch) {
            throw new RuntimeException("Sai mật khẩu");
        }

        // Kiểm tra role
        if (!user.getRole().equals(request.getRole())) {
            throw new RuntimeException("Sai quyền truy cập");
        }
        UserResponse userResponse = userMapper.toUserResponse(user);
        session.setAttribute("userResponse", userResponse);
        // Trả về UserResponse nếu đăng nhập thành công
        return userResponse;
    }


    // Lấy thông tin cá nhân
    public UserResponse getUserInfo(HttpSession session) {
     UserResponse userResponse = (UserResponse) session.getAttribute("userResponse");
        return userResponse;
    }
}
