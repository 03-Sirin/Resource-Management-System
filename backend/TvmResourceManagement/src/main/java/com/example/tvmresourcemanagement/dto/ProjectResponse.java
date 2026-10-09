package com.example.tvmresourcemanagement.dto;

import com.example.tvmresourcemanagement.enums.ProjectStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectResponse {

    private Long id;
    private String name;
    private String companyName;
    private String projectDeveloper;
    private String projectVoice;
    private String manager;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private ProjectStatus status;
}
