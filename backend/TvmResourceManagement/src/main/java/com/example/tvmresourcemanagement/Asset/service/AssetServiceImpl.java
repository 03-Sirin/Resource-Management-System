package com.example.tvmresourcemanagement.Asset.service;

import com.example.tvmresourcemanagement.Asset.entity.Asset;
import com.example.tvmresourcemanagement.Asset.dto.AssetCreateRequest;
import com.example.tvmresourcemanagement.Asset.dto.AssetResponse;
import com.example.tvmresourcemanagement.Asset.dto.AssetUpdateRequest;
import com.example.tvmresourcemanagement.Asset.repo.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;

    @Override
    public AssetResponse createAsset(AssetCreateRequest request) {
        if (assetRepository.existsByAssetTag(request.getAssetTag())) {
            throw new IllegalArgumentException("Asset tag already exists: " + request.getAssetTag());
        }

        Asset asset = Asset.builder()
                .assetTag(request.getAssetTag())
                .companyName(request.getCompanyName())
                .deviceType(request.getDeviceType())
                .receivedDate(request.getReceivedDate())
                .status(request.getStatus())
                .assignedTo(request.getAssignedTo())
                .project(request.getProject())
                .imageUrls(request.getImageUrls())
                .build();

        return mapToResponse(assetRepository.save(asset));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AssetResponse> getAllAssets() {
        return assetRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AssetResponse getAssetById(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found with id: " + id));

        return mapToResponse(asset);
    }

    @Override
    public AssetResponse updateAsset(Long id, AssetUpdateRequest request) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found with id: " + id));

        // If changing asset tag, ensure the new one doesn't collide with another asset
        if (!asset.getAssetTag().equalsIgnoreCase(request.getAssetTag())
                && assetRepository.existsByAssetTag(request.getAssetTag())) {
            throw new IllegalArgumentException("Asset tag already exists: " + request.getAssetTag());
        }

        asset.setAssetTag(request.getAssetTag());
        asset.setCompanyName(request.getCompanyName());
        asset.setDeviceType(request.getDeviceType());
        asset.setReceivedDate(request.getReceivedDate());
        asset.setStatus(request.getStatus());
        asset.setAssignedTo(request.getAssignedTo());
        asset.setProject(request.getProject());
        asset.setImageUrls(request.getImageUrls());

        return mapToResponse(assetRepository.save(asset));
    }

    @Override
    public void deleteAsset(Long id) {
        if (!assetRepository.existsById(id)) {
            throw new IllegalArgumentException("Asset not found with id: " + id);
        }
        assetRepository.deleteById(id);
    }

    private AssetResponse mapToResponse(Asset asset) {
        return AssetResponse.builder()
                .id(asset.getId())
                .assetTag(asset.getAssetTag())
                .companyName(asset.getCompanyName())
                .deviceType(asset.getDeviceType())
                .receivedDate(asset.getReceivedDate())
                .status(asset.getStatus())
                .assignedTo(asset.getAssignedTo())
                .project(asset.getProject())
                .imageUrls(asset.getImageUrls())
                .build();
    }
}