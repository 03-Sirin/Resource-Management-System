package com.example.tvmresourcemanagement.security.service;

import com.example.tvmresourcemanagement.User.entity.User;
import com.example.tvmresourcemanagement.User.enums.UserStatus;
import com.example.tvmresourcemanagement.User.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        boolean isEnabled = user.getStatus() == UserStatus.ACTIVE;

        // Prefix with ROLE_ for Spring Security role convention (e.g., ROLE_ADMIN, ROLE_EMPLOYEE)
        String roleName = "ROLE_" + user.getRole().getName().name();

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                isEnabled,
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }
}