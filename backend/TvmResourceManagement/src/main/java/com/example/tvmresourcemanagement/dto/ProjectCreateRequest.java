package com.example.tvmresourcemanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectCreateRequest {

    @NotBlank(message = "Project name is required")
    private String name;

    @NotBlank(message = "Company name is required")
    private String companyName;

    private String projectDeveloper;

    private String projectVoice;

    private String manager;

    private String description;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;
}
