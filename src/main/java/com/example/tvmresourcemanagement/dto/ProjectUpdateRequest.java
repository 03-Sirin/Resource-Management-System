package com.example.tvmresourcemanagement.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
@Getter
@Setter
public class ProjectUpdateRequest {
    @NotBlank
    private String projectCode;

    @NotBlank
    private String name;

    private String description;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;
}
