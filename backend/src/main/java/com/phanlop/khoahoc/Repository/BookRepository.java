package com.phanlop.khoahoc.Repository;

import com.phanlop.khoahoc.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    // Search by seller name
    @Query("SELECT b FROM Book b WHERE lower(b.seller.fullName) LIKE lower(concat('%', :name, '%'))")
    List<Book> findBySellerName(@Param("name") String name);

    // Filter by category name
    List<Book> findByCategory_Name(String categoryName);

    // Filter by price range
    List<Book> findByPriceBetween(Double min, Double max);
    List<Book> findBySeller_UserId(Long sellerId);
}