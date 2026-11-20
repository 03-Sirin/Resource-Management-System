package com.example.tvmresourcemanagement.Asset.service;

import com.example.tvmresourcemanagement.Asset.dto.AssetCreateRequest;
import com.example.tvmresourcemanagement.Asset.dto.AssetResponse;
import com.example.tvmresourcemanagement.Asset.dto.AssetUpdateRequest;

import java.util.List;

public interface AssetService {

    AssetResponse createAsset(AssetCreateRequest request);

    List<AssetResponse> getAllAssets();

    AssetResponse getAssetById(Long id);

    AssetResponse updateAsset(Long id, AssetUpdateRequest request);

    void deleteAsset(Long id);
}