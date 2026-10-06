package com.example.tvmresourcemanagement.config;

import com.example.tvmresourcemanagement.Entity.Role;
import com.example.tvmresourcemanagement.enums.RoleName;
import com.example.tvmresourcemanagement.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {

        for (RoleName roleName : RoleName.values()) {

            if (roleRepository.findByName(roleName).isEmpty()) {

                roleRepository.save(
                        Role.builder()
                                .name(roleName)
                                .build()
                );
            }
        }
    }
}