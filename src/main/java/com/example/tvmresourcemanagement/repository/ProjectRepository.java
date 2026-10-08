package com.example.tvmresourcemanagement.repository;
import com.example.tvmresourcemanagement.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProjectRepository extends JpaRepository<Project, Long> {
    boolean existsByProjectCode(String projectCode);
}