package com.phanlop.khoahoc.DTO;

import lombok.Data;

import java.util.List;

@Data
public class UserAdminDTO {
    private Long userId;
    private String fullName;
    private String email;
    private List<String> roles;
}