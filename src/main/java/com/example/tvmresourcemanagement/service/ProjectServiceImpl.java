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

import java.time.LocalDate;
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

        validateDateRange(request.getStartDate(), request.getEndDate());

        Project project = Project.builder()
                .projectCode(request.getProjectCode())
                .name(request.getName())
                .projectDeveloper(request.getProjectDeveloper())
                .projectVoice(request.getProjectVoice())
                .manager(request.getManager())
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
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        return mapToResponse(project);
    }

    @Override
    public ProjectResponse updateProject(Long id, ProjectUpdateRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        if (!project.getProjectCode().equals(request.getProjectCode())
                && projectRepository.existsByProjectCode(request.getProjectCode())) {
            throw new RuntimeException("Project code already exists");
        }

        project.setProjectCode(request.getProjectCode());
        project.setName(request.getName());
        project.setProjectDeveloper(request.getProjectDeveloper());
        project.setProjectVoice(request.getProjectVoice());
        project.setManager(request.getManager());
        project.setDescription(request.getDescription());
        project.setStartDate(request.getStartDate());

        if (project.getStatus() == ProjectStatus.COMPLETED && request.getEndDate() == null) {
            throw new IllegalArgumentException("End date is required for a completed project");
        }

        project.setEndDate(project.getStatus() == ProjectStatus.COMPLETED
                ? request.getEndDate()
                : null);

        validateDateRange(project.getStartDate(), project.getEndDate());

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public ProjectResponse updateProjectStatus(Long id, String status, LocalDate endDate) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        ProjectStatus projectStatus;

        try {
            projectStatus = ProjectStatus.fromValue(status);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid project status: " + status);
        }

        if (projectStatus == ProjectStatus.COMPLETED) {
            if (endDate == null) {
                throw new IllegalArgumentException("End date is required when completing a project");
            }
            validateDateRange(project.getStartDate(), endDate);
            project.setEndDate(endDate);
        } else {
            project.setEndDate(null);
        }

        project.setStatus(projectStatus);

        return mapToResponse(projectRepository.save(project));
    }

    private ProjectResponse mapToResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .projectCode(project.getProjectCode())
                .name(project.getName())
                .projectDeveloper(project.getProjectDeveloper())
                .projectVoice(project.getProjectVoice())
                .manager(project.getManager())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .status(project.getStatus())
                .build();
    }

    private void validateDateRange(LocalDate startDate, LocalDate endDate) {
        if (endDate != null && startDate != null && endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
    }
}
