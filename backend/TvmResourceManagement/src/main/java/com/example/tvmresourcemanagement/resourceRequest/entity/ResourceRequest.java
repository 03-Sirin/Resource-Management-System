package com.example.tvmresourcemanagement.resourceRequest.entity;

import com.example.tvmresourcemanagement.Asset.entity.Asset;
import com.example.tvmresourcemanagement.Project.entity.Project;
import com.example.tvmresourcemanagement.User.entity.User;
import com.example.tvmresourcemanagement.resourceRequest.enums.RequestPriority;
import com.example.tvmresourcemanagement.resourceRequest.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "resource_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "request_number", nullable = false, unique = true)
    private String requestNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "device_type", nullable = false)
    private String deviceType;

    @Column(columnDefinition = "TEXT")
    private String specifications;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestPriority priority;

    @Column(name = "required_date", nullable = false)
    private LocalDate requiredDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    // Allocated physical asset (null until allocated by Admin)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "allocated_asset_id")
    private Asset allocatedAsset;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}