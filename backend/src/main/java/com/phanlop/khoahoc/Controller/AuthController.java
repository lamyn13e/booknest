package com.phanlop.khoahoc.Controller;

import com.phanlop.khoahoc.Config.CustomUserDetails;
import com.phanlop.khoahoc.DTO.UserRegisterDto;
import com.phanlop.khoahoc.Entity.Role;
import com.phanlop.khoahoc.Entity.User;
import com.phanlop.khoahoc.Repository.RoleRepository;
import com.phanlop.khoahoc.Repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8082")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Chưa đăng nhập");
        }

        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(Map.of(
                "email", user.getUsername(),
                "roles", user.getAuthorities()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already in use");
        }

        // Tạo user mới
        User newUser = new User();
        newUser.setFullName(dto.getFullName());
        newUser.setEmail(dto.getEmail());
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));

        // Lấy role theo dto.roleName
        Role role = roleRepository.findByRoleName(dto.getRoleName())
                .orElseThrow(() -> new RuntimeException("Role không tồn tại: " + dto.getRoleName()));

        // Thiết lập 2 chiều
        newUser.getListRoles().add(role);
        role.getListUsers().add(newUser);

        // Lưu user trước để có ID, rồi lưu role
        userRepository.save(newUser);
        roleRepository.save(role);

        return ResponseEntity.ok("Registered successfully");
    }
}

