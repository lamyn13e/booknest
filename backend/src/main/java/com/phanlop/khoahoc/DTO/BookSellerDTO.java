package com.phanlop.khoahoc.DTO;

import lombok.Data;

@Data
public class BookSellerDTO {
    private Long bookId;
    private String title;
    private String author;
    private String description;
    private Double price;
    private String imgUrl;
    private String categoryName;
}