package com.example.tvmresourcemanagement.resourceRequest.service;

import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestAllocateRequest;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestCreateRequest;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestResponse;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestStatusUpdateRequest;

import java.util.List;

public interface ResourceRequestService {

    ResourceRequestResponse createRequest(ResourceRequestCreateRequest request, String userEmail);

    List<ResourceRequestResponse> getAllRequests(String userEmail);

    ResourceRequestResponse getRequestById(Long id);

    ResourceRequestResponse updateStatus(Long id, ResourceRequestStatusUpdateRequest request);

    ResourceRequestResponse allocateAsset(Long id, ResourceRequestAllocateRequest request);
}