package com.sportsvenue.venuemanagement.service;

import com.sportsvenue.venuemanagement.model.Booking;
import com.sportsvenue.venuemanagement.model.BookingStatus;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingService {
    Booking createBooking(Long venueId, Long userId, LocalDate bookingDate, 
                         LocalTime startTime, LocalTime endTime, Integer courtNumber,
                         Double totalAmount);
    
    Booking updateBookingStatus(Long bookingId, BookingStatus status);
    
    void cancelBooking(Long bookingId);
    
    List<Booking> getUserBookings(Long userId);
    
    List<Booking> getVenueBookings(Long venueId, LocalDate date);
    
    boolean isCourtAvailable(Long venueId, LocalDate date, LocalTime startTime,
                           LocalTime endTime, Integer courtNumber);
    
    Booking getBookingById(Long bookingId);
    
    void updatePaymentInfo(Long bookingId, String paymentId);
} 