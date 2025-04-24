package com.example.pttkht_n2.mapper;


import com.example.pttkht_n2.dto.user.request.UserRegisterRequest;
import com.example.pttkht_n2.dto.user.response.UserResponse;
import com.example.pttkht_n2.entity.User;
import org.mapstruct.Mapper;


@Mapper(componentModel ="spring" )
public interface UserMapper {
    User toUser(UserRegisterRequest userRegisterRequest);
    UserResponse toUserResponse(User user);
}
