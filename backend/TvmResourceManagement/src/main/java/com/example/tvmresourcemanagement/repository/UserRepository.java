package com.example.tvmresourcemanagement.repository;
import com.example.tvmresourcemanagement.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEmployeeCode(String employeeCode);

    boolean existsByPhone(String phone);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByEmployeeCodeAndIdNot(String employeeCode, Long id);

    boolean existsByPhoneAndIdNot(String phone, Long id);
}