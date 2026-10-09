package com.example.tvmresourcemanagement.Entity;

import com.example.tvmresourcemanagement.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_code", nullable = false, unique = true)
    private String projectCode;

    @Column(nullable = false)
    private String name;

    @Column(name = "project_developer", nullable = false)
    private String projectDeveloper;

    @Column(name = "project_voice", nullable = false)
    private String projectVoice;

    @Column(nullable = false)
    private String manager;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;


}
