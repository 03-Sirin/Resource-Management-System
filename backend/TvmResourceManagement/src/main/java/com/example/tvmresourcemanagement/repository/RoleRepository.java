package com.example.tvmresourcemanagement.repository;

import com.example.tvmresourcemanagement.Entity.Role;
import com.example.tvmresourcemanagement.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository <Role, Long>{
    Optional<Role> findByName(RoleName name);

}
