package com.phanlop.khoahoc.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserRegisterDto {
    @NotEmpty private String fullName;
    @Email
    @NotEmpty private String email;
    @NotEmpty private String password;
    @NotEmpty
    private String roleName;  // "ROLE_CUSTOMER" hoặc "ROLE_SELLER"
}

