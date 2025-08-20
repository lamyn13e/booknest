package com.phanlop.khoahoc.Controller;

import com.phanlop.khoahoc.Entity.Order;
import com.phanlop.khoahoc.Entity.OrderItem;
import com.phanlop.khoahoc.Entity.User;
import com.phanlop.khoahoc.Repository.BookRepository;
import com.phanlop.khoahoc.Repository.OrderRepository;
import com.phanlop.khoahoc.Repository.SellerOrderResponseDto;
import com.phanlop.khoahoc.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/orders")
@CrossOrigin(origins = "http://localhost:8082")
public class SellerOrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @GetMapping
    public ResponseEntity<?> getSellerOrders(Principal principal) {
        // Lấy seller hiện tại
        User seller = userRepository.findByEmail(principal.getName());

        // Lấy tất cả đơn hàng chứa sách của người bán này
        List<Order> allOrders = orderRepository.findAll();

        List<SellerOrderResponseDto> sellerOrders = new ArrayList<>();

        for (Order order : allOrders) {
            List<OrderItem> relevantItems = order.getOrderItems().stream()
                    .filter(item -> item.getBook().getSeller().getUserId().equals(seller.getUserId()))
                    .toList();

            if (!relevantItems.isEmpty()) {
                SellerOrderResponseDto dto = new SellerOrderResponseDto();
                dto.setOrderId(order.getOrderId());
                dto.setCustomerName(order.getCustomer().getFullName());
                dto.setOrderDate(order.getOrderDate());
                dto.setStatus(order.getStatus());
                dto.setTotalAmount(order.getTotalAmount());
                dto.setBookTitles(relevantItems.stream()
                        .map(item -> item.getBook().getTitle())
                        .toList());

                sellerOrders.add(dto);
            }
        }

        return ResponseEntity.ok(sellerOrders);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        order.setStatus(status);
        orderRepository.save(order);

        return ResponseEntity.ok("Trạng thái đơn hàng đã được cập nhật");
    }
}

