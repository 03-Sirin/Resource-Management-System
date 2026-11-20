package com.example.tvmresourcemanagement.User.dto;

import com.example.tvmresourcemanagement.Role.enums.RoleName;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {

    @NotBlank
    private String employeeCode;

    @NotBlank
    private String firstName;

    private String lastName;

    @NotBlank
    @Email
    private String email;

    private String phone;

    @NotNull
    private RoleName role;
}