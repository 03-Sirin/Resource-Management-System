package com.example.tvmresourcemanagement.Asset.entity;

import com.example.tvmresourcemanagement.Asset.enums.AssetStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "asset_tag", nullable = false, unique = true)
    private String assetTag;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "device_type", nullable = false)
    private String deviceType;

    @Column(name = "received_date", nullable = false)
    private LocalDate receivedDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetStatus status;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(name = "project")
    private String project;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "asset_images", joinColumns = @JoinColumn(name = "asset_id"))
    @Column(name = "image_url", columnDefinition = "LONGTEXT")
    private java.util.List<String> imageUrls = new java.util.ArrayList<>();
}