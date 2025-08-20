package com.phanlop.khoahoc.Controller;

import com.phanlop.khoahoc.Config.CustomUserDetails;
import com.phanlop.khoahoc.DTO.BookDTO;
import com.phanlop.khoahoc.DTO.BookRequest;
import com.phanlop.khoahoc.DTO.BookSellerDTO;
import com.phanlop.khoahoc.Entity.Book;
import com.phanlop.khoahoc.Entity.Category;
import com.phanlop.khoahoc.Entity.User;
import com.phanlop.khoahoc.Repository.BookRepository;
import com.phanlop.khoahoc.Repository.CategoryRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:8082") // Cho phép React truy cập
@RequiredArgsConstructor
public class BookController {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepo;
    @GetMapping
    public List<BookDTO> getAllBooks() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "123456@Hh";  // chuỗi bạn muốn mã hóa
        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("Mã hóa: " + encodedPassword);
        List<Book> books = bookRepository.findAll();

        return books.stream().map(book -> {
            BookDTO dto = new BookDTO();
            dto.setId(book.getBookId());
            dto.setTitle(book.getTitle());
            dto.setAuthor(book.getAuthor());
            dto.setPrice(book.getPrice());
            dto.setCoverUrl(book.getImgUrl());
            dto.setCategoryName(book.getCategory().getName());
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public BookDTO getBookById(@PathVariable Long id) {
        Book book = bookRepository.findById(id).get();

        BookDTO dto = new BookDTO();
        dto.setId(book.getBookId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setPrice(book.getPrice());
        dto.setCoverUrl(book.getImgUrl());
        dto.setCategoryName(book.getCategory().getName());
        return dto;
    }

//    SELLER

    // 1. GET /api/books/mine
    @GetMapping("/mine")
    @PreAuthorize("hasAnyRole('ROLE_SELLER')")
    public List<BookSellerDTO> getMyBooks(Authentication auth) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        User seller = userDetails.getUser();

        return bookRepository.findBySeller_UserId(seller.getUserId())
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // 2. POST /api/books
    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_SELLER')")
    public ResponseEntity<BookSellerDTO> createBook(
            Authentication auth,
            @Valid @RequestBody BookRequest req
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        User seller = userDetails.getUser();

        Category cat = categoryRepo.findByName(req.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category không tồn tại"));

        Book b = new Book();
        b.setTitle(req.getTitle());
        b.setDescription(req.getDescription());
        b.setAuthor(req.getAuthor());
        b.setPrice(req.getPrice());
        b.setImgUrl(req.getImgUrl());
        b.setCategory(cat);
        b.setSeller(seller);

        Book saved = bookRepository.save(b);
        return ResponseEntity.ok(toDTO(saved));
    }

    // 3. PUT /api/books/{id}
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_SELLER')")
    public ResponseEntity<BookSellerDTO> updateBook(
            Authentication auth,
            @PathVariable Long id,
            @Valid @RequestBody BookRequest req
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        User seller = userDetails.getUser();

        Book b = bookRepository.findById(id)
                .filter(book -> book.getSeller().getUserId().equals(seller.getUserId()))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hoặc không có quyền"));

        Category cat = categoryRepo.findByName(req.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category không tồn tại"));

        b.setTitle(req.getTitle());
        b.setDescription(req.getDescription());
        b.setAuthor(req.getAuthor());
        b.setPrice(req.getPrice());
        b.setImgUrl(req.getImgUrl());
        b.setCategory(cat);

        Book updated = bookRepository.save(b);
        return ResponseEntity.ok(toDTO(updated));
    }

    // 4. DELETE /api/books/{id}
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_SELLER')")
    public ResponseEntity<?> deleteBook(
            Authentication auth,
            @PathVariable Long id
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        User seller = userDetails.getUser();

        Book b = bookRepository.findById(id)
                .filter(book -> book.getSeller().getUserId().equals(seller.getUserId()))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hoặc không có quyền"));

        bookRepository.delete(b);
        return ResponseEntity.noContent().build();
    }

    // helper chuyển Book → DTO
    private BookSellerDTO toDTO(Book b) {
        BookSellerDTO dto = new BookSellerDTO();
        dto.setBookId(b.getBookId());
        dto.setTitle(b.getTitle());
        dto.setAuthor(b.getAuthor());
        dto.setDescription(b.getDescription());
        dto.setPrice(b.getPrice());
        dto.setImgUrl(b.getImgUrl());
        dto.setCategoryName(b.getCategory().getName());
        return dto;
    }
}
