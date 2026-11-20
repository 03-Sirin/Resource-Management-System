package com.example.tvmresourcemanagement.User.dto;

import com.example.tvmresourcemanagement.User.enums.UserStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStatusUpdateRequest {

    @NotNull
    private UserStatus status;
}