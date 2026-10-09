package com.example.tvmresourcemanagement.controller;
import com.example.tvmresourcemanagement.Entity.User;
import com.example.tvmresourcemanagement.dto.UserCreateRequest;
import com.example.tvmresourcemanagement.dto.UserResponse;
import com.example.tvmresourcemanagement.dto.UserStatusUpdateRequest;
import com.example.tvmresourcemanagement.dto.UserUpdateRequest;
import com.example.tvmresourcemanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(
            @Valid @RequestBody UserCreateRequest request) {

        return userService.createUser(request);
    }
    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }
    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }
    @PutMapping("/{id}")
    public UserResponse updateUser(
            @PathVariable("id") Long id,
            @Valid @RequestBody UserUpdateRequest request) {

        return userService.updateUser(id, request);
    }
    @PatchMapping("/{id}/status")
    public UserResponse updateUserStatus(
            @PathVariable("id") Long id,
            @Valid @RequestBody UserStatusUpdateRequest request) {

        return userService.updateUserStatus(id, request);
    }
}