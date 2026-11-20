package com.example.tvmresourcemanagement.Asset.repo;

import com.example.tvmresourcemanagement.Asset.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    boolean existsByAssetTag(String assetTag);

    Optional<Asset> findByAssetTag(String assetTag);
}