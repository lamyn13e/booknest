package com.phanlop.khoahoc.Repository;

import com.phanlop.khoahoc.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer_UserId(Long userId);
}