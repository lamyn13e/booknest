package com.phanlop.khoahoc.Repository;

import com.phanlop.khoahoc.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBook_BookId(Long bookId);
}