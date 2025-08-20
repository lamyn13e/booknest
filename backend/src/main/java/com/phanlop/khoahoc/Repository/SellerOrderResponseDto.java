package com.phanlop.khoahoc.Repository;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class SellerOrderResponseDto {
    private Long orderId;
    private String customerName;
    private Instant orderDate;
    private String status;
    private Double totalAmount;
    private List<String> bookTitles;
}
