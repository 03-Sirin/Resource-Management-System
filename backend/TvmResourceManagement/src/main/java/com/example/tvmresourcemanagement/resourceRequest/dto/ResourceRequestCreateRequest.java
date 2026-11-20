package com.example.tvmresourcemanagement.resourceRequest.dto;

import com.example.tvmresourcemanagement.resourceRequest.enums.RequestPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceRequestCreateRequest {

    @NotNull(message = "Project ID is required")
    private Long projectId;

    @NotBlank(message = "Device type is required")
    private String deviceType;

    private String specifications;

    @NotNull(message = "Priority is required")
    private RequestPriority priority;

    @NotNull(message = "Required date is required")
    private LocalDate requiredDate;
}