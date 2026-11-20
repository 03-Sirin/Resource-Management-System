package com.example.tvmresourcemanagement.Asset.dto;

import com.example.tvmresourcemanagement.Asset.enums.AssetStatus;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetResponse {

    private Long id;
    private String assetTag;
    private String companyName;
    private String deviceType;
    private LocalDate receivedDate;
    private AssetStatus status;
    private String assignedTo;
    private String project;
    private List<String> imageUrls;
}