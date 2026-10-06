package com.example.tvmresourcemanagement.service;

import com.example.tvmresourcemanagement.dto.ProjectCreateRequest;
import com.example.tvmresourcemanagement.dto.ProjectResponse;
import com.example.tvmresourcemanagement.dto.ProjectUpdateRequest;

import java.util.List;

public interface ProjectService {

    ProjectResponse createProject(ProjectCreateRequest request);

    List<ProjectResponse> getAllProjects();

    ProjectResponse getProjectById(Long id);

    ProjectResponse updateProject(Long id, ProjectUpdateRequest request);

    ProjectResponse updateProjectStatus(Long id, String status);
}