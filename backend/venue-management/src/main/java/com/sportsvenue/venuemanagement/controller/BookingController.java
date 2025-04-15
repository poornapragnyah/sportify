package com.sportsvenue.venuemanagement.controller;

import com.sportsvenue.venuemanagement.model.Booking;
import com.sportsvenue.venuemanagement.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public Booking book(@RequestBody Booking booking) {
        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }
}
