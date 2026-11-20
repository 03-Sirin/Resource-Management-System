package com.example.tvmresourcemanagement.Asset.dto;

import com.example.tvmresourcemanagement.Asset.enums.AssetStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetUpdateRequest {

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

    @Size(min = 1, max = 5, message = "Asset must have between 1 and 5 images")
    private List<String> imageUrls;
}