package com.example.tvmresourcemanagement.resourceRequest.service;

import com.example.tvmresourcemanagement.Asset.entity.Asset;
import com.example.tvmresourcemanagement.Asset.enums.AssetStatus;
import com.example.tvmresourcemanagement.Asset.repo.AssetRepository;
import com.example.tvmresourcemanagement.Project.entity.Project;
import com.example.tvmresourcemanagement.Project.repo.ProjectRepository;
import com.example.tvmresourcemanagement.Role.enums.RoleName;
import com.example.tvmresourcemanagement.User.entity.User;
import com.example.tvmresourcemanagement.User.repo.UserRepository;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestAllocateRequest;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestCreateRequest;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestResponse;
import com.example.tvmresourcemanagement.resourceRequest.dto.ResourceRequestStatusUpdateRequest;
import com.example.tvmresourcemanagement.resourceRequest.entity.ResourceRequest;
import com.example.tvmresourcemanagement.resourceRequest.enums.RequestStatus;
import com.example.tvmresourcemanagement.resourceRequest.repo.ResourceRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ResourceRequestServiceImpl implements ResourceRequestService {

    private final ResourceRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final AssetRepository assetRepository;

    @Override
    public ResourceRequestResponse createRequest(ResourceRequestCreateRequest request, String userEmail) {
        User requester = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userEmail));
        if (requester.getRole().getName() == RoleName.ADMIN) {
            throw new IllegalArgumentException("Admins cannot raise resource requests. Only employees and project leads can request devices.");
        }
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + request.getProjectId()));

        String requestNumber = "REQ-" + System.currentTimeMillis() % 1000000;

        ResourceRequest resourceRequest = ResourceRequest.builder()
                .requestNumber(requestNumber)
                .requester(requester)
                .project(project)
                .deviceType(request.getDeviceType())
                .specifications(request.getSpecifications())
                .priority(request.getPriority())
                .requiredDate(request.getRequiredDate())
                .status(RequestStatus.PENDING)
                .build();

        return mapToResponse(requestRepository.save(resourceRequest));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResourceRequestResponse> getAllRequests(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userEmail));

        // If ADMIN, return all requests. If EMPLOYEE, return only their own requests!
        List<ResourceRequest> list = (user.getRole().getName() == RoleName.ADMIN)
                ? requestRepository.findAll()
                : requestRepository.findByRequesterId(user.getId());

        return list.stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ResourceRequestResponse getRequestById(Long id) {
        ResourceRequest resourceRequest = requestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Resource request not found with id: " + id));

        return mapToResponse(resourceRequest);
    }

    @Override
    public ResourceRequestResponse updateStatus(Long id, ResourceRequestStatusUpdateRequest request) {
        ResourceRequest resourceRequest = requestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Resource request not found with id: " + id));

        resourceRequest.setStatus(request.getStatus());


        return mapToResponse(requestRepository.save(resourceRequest));
    }

    @Override
    public ResourceRequestResponse allocateAsset(Long id, ResourceRequestAllocateRequest request) {
        ResourceRequest resourceRequest = requestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Resource request not found with id: " + id));

        Asset asset = assetRepository.findById(request.getAssetId())
                .orElseThrow(() -> new IllegalArgumentException("Asset not found with id: " + request.getAssetId()));

        if (asset.getStatus() != AssetStatus.AVAILABLE) {
            throw new IllegalStateException("Selected asset is not available for allocation. Current status: " + asset.getStatus());
        }

        // 1. Update the Resource Request
        resourceRequest.setAllocatedAsset(asset);
        resourceRequest.setStatus(RequestStatus.ALLOCATED);

        // 2. Automatically update the Asset in inventory!
        asset.setStatus(AssetStatus.ASSIGNED);
        asset.setAssignedTo(resourceRequest.getRequester().getFirstName() + " " + resourceRequest.getRequester().getLastName());
        asset.setProject(resourceRequest.getProject().getName());
        assetRepository.save(asset);

        return mapToResponse(requestRepository.save(resourceRequest));
    }

    private ResourceRequestResponse mapToResponse(ResourceRequest r) {
        return ResourceRequestResponse.builder()
                .id(r.getId())
                .requestNumber(r.getRequestNumber())
                .requesterId(r.getRequester().getId())
                .requesterName(r.getRequester().getFirstName() + " " + (r.getRequester().getLastName() != null ? r.getRequester().getLastName() : ""))
                .requesterEmail(r.getRequester().getEmail())
                .projectId(r.getProject().getId())
                .projectName(r.getProject().getName())
                .deviceType(r.getDeviceType())
                .specifications(r.getSpecifications())
                .priority(r.getPriority())
                .requiredDate(r.getRequiredDate())
                .status(r.getStatus())
                .allocatedAssetId(r.getAllocatedAsset() != null ? r.getAllocatedAsset().getId() : null)
                .allocatedAssetTag(r.getAllocatedAsset() != null ? r.getAllocatedAsset().getAssetTag() : null)
                .allocatedDeviceType(r.getAllocatedAsset() != null ? r.getAllocatedAsset().getDeviceType() : null)
                .createdAt(r.getCreatedAt())
                .build();
    }
}