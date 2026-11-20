package com.example.tvmresourcemanagement.Asset.dto;

import com.example.tvmresourcemanagement.Asset.enums.AssetStatus;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetCreateRequest {

    @NotBlank(message = "Asset tag is required")
    private String assetTag;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Device type is required")
    private String deviceType;

    @NotNull(message = "Received date is required")
    private LocalDate receivedDate;

    @NotNull(message = "Status is required")
    private AssetStatus status;

    private String assignedTo;

    private String project;

    @ElementCollection
    @CollectionTable(name = "asset_images", joinColumns = @JoinColumn(name = "asset_id"))
    @Column(name = "image_url", columnDefinition = "LONGTEXT")
    private java.util.List<String> imageUrls = new java.util.ArrayList<>();
}