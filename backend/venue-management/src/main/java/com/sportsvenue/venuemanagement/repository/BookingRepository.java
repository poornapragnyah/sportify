package com.sportsvenue.venuemanagement.repository;

import com.sportsvenue.venuemanagement.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
