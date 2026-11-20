package com.example.tvmresourcemanagement.resourceRequest.dto;

import com.example.tvmresourcemanagement.Asset.entity.Asset;
import com.example.tvmresourcemanagement.resourceRequest.enums.RequestStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceRequestStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private RequestStatus status;

    private Asset allocatedAsset;
}