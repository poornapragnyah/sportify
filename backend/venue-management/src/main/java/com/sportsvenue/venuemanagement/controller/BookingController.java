package com.sportsvenue.venuemanagement.controller;

import com.sportsvenue.venuemanagement.model.Booking;
import com.sportsvenue.venuemanagement.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController extends BaseController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return success(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @bookingService.isBookingOwner(#id, authentication.name)")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return success(bookingService.getBookingById(id));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return success(bookingService.createBooking(booking));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @bookingService.isBookingOwner(#id, authentication.name)")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        return success(bookingService.updateBooking(id, booking));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @bookingService.isBookingOwner(#id, authentication.name)")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return success(null);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.name")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable String userId) {
        return success(bookingService.getBookingsByUserId(userId));
    }

    @GetMapping("/venue/{venueId}")
    public ResponseEntity<List<Booking>> getBookingsByVenueId(@PathVariable Long venueId) {
        return success(bookingService.getBookingsByVenueId(venueId));
    }
}
