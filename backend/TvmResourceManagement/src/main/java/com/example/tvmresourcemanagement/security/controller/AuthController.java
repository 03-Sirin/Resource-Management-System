package com.example.tvmresourcemanagement.security.controller;

import com.example.tvmresourcemanagement.Role.Entity.Role;
import com.example.tvmresourcemanagement.Role.enums.RoleName;
import com.example.tvmresourcemanagement.Role.repository.RoleRepository;
import com.example.tvmresourcemanagement.User.entity.User;
import com.example.tvmresourcemanagement.User.enums.UserStatus;
import com.example.tvmresourcemanagement.User.repo.UserRepository;
import com.example.tvmresourcemanagement.security.dto.AuthResponse;
import com.example.tvmresourcemanagement.security.dto.LoginRequest;
import com.example.tvmresourcemanagement.security.dto.RegisterRequest;
import com.example.tvmresourcemanagement.security.jwt.JwtService;
import com.example.tvmresourcemanagement.security.service.CustomUserDetailsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

@PostMapping("/login")
@Transactional(readOnly = true)
public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
    try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(userDetails);

        AuthResponse response = AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .employeeCode(user.getEmployeeCode())
                .role(user.getRole().getName().name())
                .build();

        return ResponseEntity.ok(response);
    } catch (Exception ex) {
        System.err.println(">>> LOGIN FAILED REASON: " + ex.getMessage());
        ex.printStackTrace();
        return ResponseEntity.status(401).body(ex.getMessage());
    }
  }
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        if (userRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee code already exists");
        }

        Role employeeRole = roleRepository.findByName(RoleName.EMPLOYEE)
                .orElseThrow(() -> new IllegalStateException("EMPLOYEE role not found"));

        User newUser = User.builder()
                .employeeCode(request.getEmployeeCode())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // Hashed with BCrypt!
                .phone(request.getPhone())
                .role(employeeRole)
                .status(UserStatus.ACTIVE)
                .build();

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
}