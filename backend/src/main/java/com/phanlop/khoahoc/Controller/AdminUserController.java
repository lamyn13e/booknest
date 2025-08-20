package com.phanlop.khoahoc.Controller;

import com.phanlop.khoahoc.DTO.UserAdminDTO;
import com.phanlop.khoahoc.DTO.UserRequest;
import com.phanlop.khoahoc.Entity.Role;
import com.phanlop.khoahoc.Entity.User;
import com.phanlop.khoahoc.Repository.RoleRepository;
import com.phanlop.khoahoc.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8082")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;

    // GET /api/users
    @GetMapping
    public List<UserAdminDTO> listUsers() {
        return userRepo.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<UserAdminDTO> createUser(@Valid @RequestBody UserRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            return ResponseEntity.status(409).build();
        }
        User u = new User();
        u.setFullName(req.getFullName());
        u.setEmail(req.getEmail());
        System.out.println("Pass: "+req.getPassword());
        u.setPassword(passwordEncoder.encode(req.getPassword()));

        // gán roles
        List<Role> roles = req.getRoles().stream()
                .map(roleName -> roleRepo.findByRoleName(roleName)
                        .orElseThrow(() -> new RuntimeException("Role không tồn tại: " + roleName)))
                .collect(Collectors.toList());
        u.getListRoles().addAll(roles);

        User saved = userRepo.save(u);
        for (Role r : roles) {
            r.getListUsers().add(u);
            roleRepo.save(r);
        }

        return ResponseEntity.ok(toDTO(saved));
    }

    // PUT /api/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<UserAdminDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequest req
    ) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        u.setFullName(req.getFullName());
        if (!u.getEmail().equals(req.getEmail())) {
            if (userRepo.existsByEmail(req.getEmail())) {
                return ResponseEntity.status(409).build();
            }
            u.setEmail(req.getEmail());
        }
        if (req.getPassword() != null && !req.getPassword().isBlank()) {
            u.setPassword(passwordEncoder.encode(req.getPassword()));
        }
        // update roles
        u.getListRoles().clear();
        List<Role> roles = req.getRoles().stream()
                .map(roleName -> roleRepo.findByRoleName(roleName)
                        .orElseThrow(() -> new RuntimeException("Role không tồn tại: " + roleName)))
                .collect(Collectors.toList());
        u.getListRoles().addAll(roles);
        User updated = userRepo.save(u);

        for (Role r : roles) {
            Set<User> users = r.getListUsers();
            if (!users.contains(u)) {
                users.add(u);
                roleRepo.save(r);
            }
        }
        return ResponseEntity.ok(toDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        // 1. Kiểm tra tồn tại
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        for (Role role : user.getListRoles()) {
            role.getListUsers().removeIf(u -> u.getUserId().equals(id));
            roleRepo.save(role);
        }

        // 3. Xóa chính User
        userRepo.delete(user);
        return ResponseEntity.noContent().build();
    }
    // helper
    private UserAdminDTO toDTO(User u) {
        UserAdminDTO dto = new UserAdminDTO();
        dto.setUserId(u.getUserId());
        dto.setFullName(u.getFullName());
        dto.setEmail(u.getEmail());
        dto.setRoles(u.getListRoles()
                .stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList()));
        return dto;
    }
}

