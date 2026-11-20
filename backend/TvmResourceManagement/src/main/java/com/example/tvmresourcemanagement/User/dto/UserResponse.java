package com.example.tvmresourcemanagement.User.dto;

import com.example.tvmresourcemanagement.User.enums.UserStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String employeeCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;
    private UserStatus status;
}