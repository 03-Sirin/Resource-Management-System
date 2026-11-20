package com.example.tvmresourcemanagement.Role.repository;

import com.example.tvmresourcemanagement.Role.Entity.Role;
import com.example.tvmresourcemanagement.Role.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository <Role, Long>{
    Optional<Role> findByName(RoleName name);

}
