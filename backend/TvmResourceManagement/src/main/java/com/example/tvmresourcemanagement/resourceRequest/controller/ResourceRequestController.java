package com.example.tvmresourcemanagement.resourceRequest.controller;

import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestAllocateRequest;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestCreateRequest;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestResponse;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestStatusUpdateRequest;
import com.example.tvmresourcemanagement.resourceRequest.service.ResourceRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class ResourceRequestController {

    private final ResourceRequestService requestService;

    // POST /api/requests - Create a new request (requester extracted from JWT)
    @PostMapping
    public ResponseEntity<ResourceRequestResponse> createRequest(
            @Valid @RequestBody ResourceRequestCreateRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(requestService.createRequest(request, userDetails.getUsername()));
    }

    // GET /api/requests - Get requests (Admin gets all, Employee gets their own)
    @GetMapping
    public ResponseEntity<List<ResourceRequestResponse>> getAllRequests(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(requestService.getAllRequests(userDetails.getUsername()));
    }

    // GET /api/requests/{id} - Get single request details
    @GetMapping("/{id}")
    public ResponseEntity<ResourceRequestResponse> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    // PATCH /api/requests/{id}/status - Update status (APPROVE, REJECT, CANCEL)
    @PatchMapping("/{id}/status")
    public ResponseEntity<ResourceRequestResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody ResourceRequestStatusUpdateRequest request
    ) {
        return ResponseEntity.ok(requestService.updateStatus(id, request));
    }

    // PATCH /api/requests/{id}/allocate - Allocate an asset from inventory
    @PatchMapping("/{id}/allocate")
    public ResponseEntity<ResourceRequestResponse> allocateAsset(
            @PathVariable Long id,
            @Valid @RequestBody ResourceRequestAllocateRequest request
    ) {
        return ResponseEntity.ok(requestService.allocateAsset(id, request));
    }
}