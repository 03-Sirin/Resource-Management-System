package com.example.tvmresourcemanagement.dto;

import com.example.tvmresourcemanagement.enums.UserStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStatusUpdateRequest {

    @NotNull
    private UserStatus status;
}