package com.example.tvmresourcemanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ProjectCreateRequest {

    @NotBlank
    private String projectCode;

    @NotBlank
    private String name;

    @NotBlank
    private String projectDeveloper;

    @NotBlank
    private String projectVoice;

    @NotBlank
    private String manager;

    private String description;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;
}
