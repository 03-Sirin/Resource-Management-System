package com.example.tvmresourcemanagement.Project.repo;

import com.example.tvmresourcemanagement.Project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

}
