package com.example.tvmresourcemanagement.User.service;

import com.example.tvmresourcemanagement.User.entity.User;
import com.example.tvmresourcemanagement.User.dto.UserCreateRequest;
import com.example.tvmresourcemanagement.User.dto.UserResponse;
import com.example.tvmresourcemanagement.User.dto.UserStatusUpdateRequest;
import com.example.tvmresourcemanagement.User.dto.UserUpdateRequest;

import java.util.List;

public interface UserService {

    User createUser(UserCreateRequest request);
    UserResponse getUserById(Long id);
    List<UserResponse> getAllUsers();
    UserResponse updateUser(Long id, UserUpdateRequest request);
    UserResponse updateUserStatus(Long id, UserStatusUpdateRequest request);
}