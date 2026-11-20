package com.example.tvmresourcemanagement.config;

import com.example.tvmresourcemanagement.Role.Entity.Role;
import com.example.tvmresourcemanagement.Role.enums.RoleName;
import com.example.tvmresourcemanagement.Role.repository.RoleRepository;
import com.example.tvmresourcemanagement.User.entity.User;
import com.example.tvmresourcemanagement.User.enums.UserStatus;
import com.example.tvmresourcemanagement.User.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.security.admin.email}")
    private String adminEmail;
    @Value("${app.security.admin.password}")
    private String adminPassword;
    @Value("${app.security.admin.employee-code}")
    private String adminEmployeeCode;
    @Value("${app.security.admin.first-name}")
    private String adminFirstName;
    @Value("${app.security.admin.last-name}")
    private String adminLastName;
    @Value("${app.security.admin.phone}")
    private String adminPhone;
//    @Override
//    public void run(String... args) {
//
//        for (RoleName roleName : RoleName.values()) {
//
//            if (!userRepository.existsByEmail(adminEmail)) {
//                Role adminRole = roleRepository.findByName(RoleName.ADMIN)
//                        .orElseThrow(() -> new IllegalStateException("ADMIN role not found"));
//                userRepository.save(
//                        User.builder()
//                                .employeeCode(adminEmployeeCode)
//                                .firstName(adminFirstName)
//                                .lastName(adminLastName)
//                                .email(adminEmail)
//                                .password(passwordEncoder.encode(adminPassword))
//                                .phone(adminPhone)
//                                .role(adminRole)
//                                .status(UserStatus.ACTIVE)
//                                .build()
//                );
//            }
//
//
//        }
//    }
@Override
public void run(String... args) {

    // 1. Seed all Roles first!
    for (RoleName roleName : RoleName.values()) {
        if (roleRepository.findByName(roleName).isEmpty()) {
            roleRepository.save(
                    Role.builder()
                            .name(roleName)
                            .build()
            );
        }
    }

    // 2. Now seed the Admin user (outside the loop)!
    if (!userRepository.existsByEmail(adminEmail)) {
        Role adminRole = roleRepository.findByName(RoleName.ADMIN)
                .orElseThrow(() -> new IllegalStateException("ADMIN role not found"));

        userRepository.save(
                User.builder()
                        .employeeCode(adminEmployeeCode)
                        .firstName(adminFirstName)
                        .lastName(adminLastName)
                        .email(adminEmail)
                        .password(passwordEncoder.encode(adminPassword))
                        .phone(adminPhone)
                        .role(adminRole)
                        .status(UserStatus.ACTIVE)
                        .build()
        );
        System.out.println(">>> Seeded default admin: " + adminEmail);
    }
}
}