package com.example.tvmresourcemanagement.resourceRequest.repo;

import com.example.tvmresourcemanagement.resourceRequest.entity.ResourceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRequestRepository extends JpaRepository<ResourceRequest, Long> {

    List<ResourceRequest> findByRequesterId(Long requesterId);

    List<ResourceRequest> findByProjectId(Long projectId);

    boolean existsByRequestNumber(String requestNumber);
}