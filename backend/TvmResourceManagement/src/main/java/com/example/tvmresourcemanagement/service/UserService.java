package com.example.tvmresourcemanagement.service;

import com.example.tvmresourcemanagement.Entity.User;
import com.example.tvmresourcemanagement.dto.UserCreateRequest;
import com.example.tvmresourcemanagement.dto.UserResponse;
import com.example.tvmresourcemanagement.dto.UserStatusUpdateRequest;
import com.example.tvmresourcemanagement.dto.UserUpdateRequest;

import java.util.List;

public interface UserService {

    User createUser(UserCreateRequest request);
    UserResponse getUserById(Long id);
    List<UserResponse> getAllUsers();
    UserResponse updateUser(Long id, UserUpdateRequest request);
    UserResponse updateUserStatus(Long id, UserStatusUpdateRequest request);
}