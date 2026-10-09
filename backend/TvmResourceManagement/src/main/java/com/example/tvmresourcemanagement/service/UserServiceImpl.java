package com.example.tvmresourcemanagement.service;

import com.example.tvmresourcemanagement.Entity.Role;
import com.example.tvmresourcemanagement.Entity.User;
import com.example.tvmresourcemanagement.dto.UserCreateRequest;
import com.example.tvmresourcemanagement.dto.UserResponse;
import com.example.tvmresourcemanagement.dto.UserStatusUpdateRequest;
import com.example.tvmresourcemanagement.dto.UserUpdateRequest;
import com.example.tvmresourcemanagement.enums.UserStatus;
import com.example.tvmresourcemanagement.repository.RoleRepository;
import com.example.tvmresourcemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public User createUser(UserCreateRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (userRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new IllegalArgumentException("Employee code already exists");
        }

        String phone = normalizePhone(request.getPhone());
        if (phone != null && userRepository.existsByPhone(phone)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Phone number already exists");
        }

        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        User user = User.builder()
                .employeeCode(request.getEmployeeCode())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(request.getPassword())
                .phone(phone)
                .role(role)
                .status(UserStatus.ACTIVE)
                .build();
        return userRepository.save(user);

}
        @Override
        @Transactional(readOnly = true)
        public UserResponse getUserById(Long id) {

            User user = userRepository.findById(id)
                    .orElseThrow(() ->
                            new IllegalArgumentException("User not found with id: " + id));

            return mapToResponse(user);
        }
    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .employeeCode(user.getEmployeeCode())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().getName().name())
                .status(user.getStatus())
                .build();
    }
    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found with id: " + id));

        if (userRepository.existsByEmployeeCodeAndIdNot(request.getEmployeeCode(), id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Employee code already exists");
        }
        if (userRepository.existsByEmailAndIdNot(request.getEmail(), id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        String phone = normalizePhone(request.getPhone());
        if (phone != null && userRepository.existsByPhoneAndIdNot(phone, id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Phone number already exists");
        }

        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() ->
                        new IllegalArgumentException("Role not found"));

        user.setEmployeeCode(request.getEmployeeCode());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(phone);
        user.setRole(role);

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }

    private String normalizePhone(String phone) {
        return phone == null || phone.isBlank() ? null : phone.trim();
    }

    @Override
    @Transactional
    public UserResponse updateUserStatus(
            Long id,
            UserStatusUpdateRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found with id: " + id));

        user.setStatus(request.getStatus());

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }
}