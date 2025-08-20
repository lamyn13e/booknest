package com.phanlop.khoahoc.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookRequest {
    @NotEmpty    private String title;
    private String description;
    private String author;
    @NotNull     private Double price;
    private String imgUrl;
    @NotEmpty    private String categoryName;
}
