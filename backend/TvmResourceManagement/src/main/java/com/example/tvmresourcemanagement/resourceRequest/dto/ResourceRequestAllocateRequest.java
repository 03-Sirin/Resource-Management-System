package com.example.tvmresourcemanagement.resourceRequest.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceRequestAllocateRequest {

    @NotNull(message = "Asset ID to allocate is required")
    private Long assetId;

}