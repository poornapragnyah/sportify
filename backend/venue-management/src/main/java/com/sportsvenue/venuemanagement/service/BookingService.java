package com.sportsvenue.venuemanagement.service;

import com.sportsvenue.venuemanagement.model.Booking;
import com.sportsvenue.venuemanagement.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setBookingDate(updatedBooking.getBookingDate());
            booking.setStatus(updatedBooking.getStatus());
            booking.setVenue(updatedBooking.getVenue());
            booking.setUser(updatedBooking.getUser());
            return bookingRepository.save(booking);
        }).orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public void cancelBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
