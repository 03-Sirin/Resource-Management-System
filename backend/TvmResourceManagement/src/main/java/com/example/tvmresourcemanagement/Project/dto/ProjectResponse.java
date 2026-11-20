package com.example.tvmresourcemanagement.Project.dto;

import com.example.tvmresourcemanagement.Project.enums.ProjectStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectResponse {

    private Long id;
    private String companyName;
    private String projectDeveloper;
    private String projectVoice;
    private String manager;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private ProjectStatus status;
}
