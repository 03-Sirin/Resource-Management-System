package com.example.tvmresourcemanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectUpdateRequest {

    @NotBlank(message = "Project code is required")
    private String projectCode;

    @NotBlank(message = "Project name is required")
    private String name;

    private String description;

    @NotBlank(message = "Start date is required")
    private LocalDate startDate;

    private LocalDate endDate;
}
