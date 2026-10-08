package com.example.tvmresourcemanagement.dto;

import com.example.tvmresourcemanagement.enums.ProjectStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ProjectResponse {
    private Long id;
    private String projectCode;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private ProjectStatus status;

}