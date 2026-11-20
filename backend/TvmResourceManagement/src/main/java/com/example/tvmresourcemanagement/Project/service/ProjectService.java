package com.example.tvmresourcemanagement.Project.service;

import com.example.tvmresourcemanagement.Project.dto.ProjectCreateRequest;
import com.example.tvmresourcemanagement.Project.dto.ProjectResponse;
import com.example.tvmresourcemanagement.Project.dto.ProjectUpdateRequest;

import java.time.LocalDate;

import java.util.List;
public interface ProjectService {

    ProjectResponse createProject(ProjectCreateRequest request);

    List<ProjectResponse> getAllProjects();

    ProjectResponse getProjectById(Long id);

    ProjectResponse updateProject(Long id, ProjectUpdateRequest request);

    ProjectResponse updateProjectStatus(Long id, String status, LocalDate endDate);
}
