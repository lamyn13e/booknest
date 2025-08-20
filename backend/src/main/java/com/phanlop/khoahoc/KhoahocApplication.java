package com.phanlop.khoahoc;
//
//import com.phanlop.khoahoc.Entity.*;
//import com.phanlop.khoahoc.Repository.*;
//import lombok.AllArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.HashSet;
//import java.util.List;
//
//@SpringBootApplication
//@EnableJpaAuditing
//@AllArgsConstructor
//@EnableScheduling
//public class KhoahocApplication implements CommandLineRunner {
//	private final PasswordEncoder passwordEncoder;
//	private final UserRepository userRepository;
//	private final RoleRepository roleRepository;
//	private final CategoryRepository categoryRepository;
//	private final BookRepository bookRepository;
//
//	public static void main(String[] args) {
//		SpringApplication.run(KhoahocApplication.class, args);
//	}
//
//	@Override
//	public void run(String... args) {
//		initializeDB();
//	}
//
//	@Transactional
//	public void initializeDB() {
//		// --- 1. TẠO ROLE ---
//		Role adminRole    = new Role(null, "ROLE_ADMIN",    new HashSet<>());
//		Role customerRole = new Role(null, "ROLE_CUSTOMER", new HashSet<>());
//		Role sellerRole   = new Role(null, "ROLE_SELLER",   new HashSet<>());
//		roleRepository.saveAll(List.of(adminRole, customerRole, sellerRole));
//
//		// --- 2. TẠO USER ---
//		User admin = new User();
//		admin.setFullName("Mai Xuan Hieu");
//		admin.setEmail("hieuxuan034@gmail.com");
//		admin.setPassword(passwordEncoder.encode("123456"));
//		admin.getListRoles().add(adminRole);
//		userRepository.save(admin);
//
//		User customer = new User();
//		customer.setFullName("Guest");
//		customer.setEmail("customer@gmail.com");
//		customer.setPassword(passwordEncoder.encode("123456"));
//		customer.getListRoles().add(customerRole);
//		userRepository.save(customer);
//
//		User seller = new User();
//		seller.setFullName("Hieu Xuan");
//		seller.setEmail("seller@gmail.com");
//		seller.setPassword(passwordEncoder.encode("123456"));
//		seller.getListRoles().add(sellerRole);
//		userRepository.save(seller);
//
//		// --- 3. TẠO DỮ LIỆU MẪU CHO CATEGORIES ---
//		Category cat1 = new Category();
//		cat1.setName("Khoa học viễn tưởng");
//		Category cat2 = new Category();
//		cat2.setName("Công nghệ thông tin");
//		Category cat3 = new Category();
//		cat3.setName("Kinh doanh & Khởi nghiệp");
//		categoryRepository.saveAll(List.of(cat1, cat2, cat3));
//
//		// --- 4. TẠO DỮ LIỆU MẪU CHO BOOKS ---
//		Book b1 = new Book();
//		b1.setTitle("Lược sử tương lai");
//		b1.setDescription("Những tiên đoán về công nghệ và xã hội tương lai.");
//		b1.setPrice(199.000);
//		b1.setCategory(cat1);
//		b1.setImgUrl("https://307a0e78.vws.vegacdn.vn/view/v2/image/img.fm_audio_book/0/0/0/2360.jpg?v=3&w=480&h=700");
//		b1.setSeller(seller);
//
//		Book b2 = new Book();
//		b2.setTitle("Spring Boot từ cơ bản đến nâng cao");
//		b2.setDescription("Hướng dẫn xây dựng ứng dụng enterprise với Spring Boot.");
//		b2.setPrice(249.000);
//		b2.setCategory(cat2);
//		b2.setImgUrl("https://www.oreilly.com/api/v2/epubs/9781484287927/files/images/978-1-4842-8792-7_CoverFigure.jpg");
//		b2.setSeller(seller);
//
//		Book b3 = new Book();
//		b3.setTitle("Khởi nghiệp tinh gọn");
//		b3.setDescription("Phương pháp Lean Startup dành cho doanh nhân.");
//		b3.setPrice(179.000);
//		b3.setCategory(cat3);
//		b3.setImgUrl("https://salt.tikicdn.com/ts/product/99/df/29/8ef1fb67e07d24037c10a128c9fe647c.jpg");
//		b3.setSeller(seller);
//
//		bookRepository.saveAll(List.of(b1, b2, b3));
//	}
//}

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KhoahocApplication {

	public static void main(String[] args) {
		SpringApplication.run(KhoahocApplication.class, args);
	}

}
