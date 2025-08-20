package com.phanlop.khoahoc.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class UserRequest {
    @NotEmpty(message = "Họ và tên không được để trống")
    private String fullName;

    @Email(message = "Email không hợp lệ")
    @NotEmpty(message = "Email không được để trống")
    private String email;

    // Khi tạo mới: bắt buộc; khi cập nhật: có thể để trống để giữ nguyên mật khẩu
    private String password;

    @NotEmpty(message = "Phải chọn ít nhất một role")
    private List<String> roles; // ví dụ ["ROLE_CUSTOMER","ROLE_SELLER"]
}
