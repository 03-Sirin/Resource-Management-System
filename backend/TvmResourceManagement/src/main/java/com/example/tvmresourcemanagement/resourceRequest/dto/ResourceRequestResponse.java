package com.example.tvmresourcemanagement.resourceRequest.dto;

import com.example.tvmresourcemanagement.resourceRequest.enums.RequestPriority;
import com.example.tvmresourcemanagement.resourceRequest.enums.RequestStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceRequestResponse {

    private Long id;
    private String requestNumber;

    // Requester info
    private Long requesterId;
    private String requesterName;
    private String requesterEmail;

    // Project info
    private Long projectId;
    private String projectName;

    // Request details
    private String deviceType;
    private String specifications;
    private RequestPriority priority;
    private LocalDate requiredDate;
    private RequestStatus status;

    // Allocation info (if allocated)
    private Long allocatedAssetId;
    private String allocatedAssetTag;
    private String allocatedDeviceType;

    private LocalDateTime createdAt;
}