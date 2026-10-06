package com.example.tvmresourcemanagement.service;

import com.example.tvmresourcemanagement.Entity.Project;
import com.example.tvmresourcemanagement.dto.ProjectCreateRequest;
import com.example.tvmresourcemanagement.dto.ProjectResponse;
import com.example.tvmresourcemanagement.dto.ProjectUpdateRequest;
import com.example.tvmresourcemanagement.enums.ProjectStatus;
import com.example.tvmresourcemanagement.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public ProjectResponse createProject(ProjectCreateRequest request) {

        if (projectRepository.existsByProjectCode(request.getProjectCode())) {
            throw new RuntimeException("Project code already exists");
        }

        Project project = Project.builder()
                .projectCode(request.getProjectCode())
                .name(request.getName())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(ProjectStatus.ACTIVE)
                .build();

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {

        return projectRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found with id: " + id));

        return mapToResponse(project);
    }

    @Override
    public ProjectResponse updateProject(Long id, ProjectUpdateRequest request) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found with id: " + id));

        if (!project.getProjectCode().equals(request.getProjectCode())
                && projectRepository.existsByProjectCode(request.getProjectCode())) {
            throw new RuntimeException("Project code already exists");
        }

        project.setProjectCode(request.getProjectCode());
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public ProjectResponse updateProjectStatus(Long id, String status) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found with id: " + id));

        ProjectStatus projectStatus;

        try {
            projectStatus = ProjectStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid project status: " + status);
        }

        project.setStatus(projectStatus);

        return mapToResponse(projectRepository.save(project));
    }

    private ProjectResponse mapToResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .projectCode(project.getProjectCode())
                .name(project.getName())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .status(project.getStatus())
                .build();
    }
}