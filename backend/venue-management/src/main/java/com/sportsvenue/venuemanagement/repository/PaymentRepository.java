package com.sportsvenue.venuemanagement.repository;

import com.sportsvenue.venuemanagement.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
