package com.sportsvenue.venuemanagement.service.impl;

import com.sportsvenue.venuemanagement.model.Booking;
import com.sportsvenue.venuemanagement.model.BookingStatus;
import com.sportsvenue.venuemanagement.model.User;
import com.sportsvenue.venuemanagement.model.Venue;
import com.sportsvenue.venuemanagement.repository.BookingRepository;
import com.sportsvenue.venuemanagement.repository.UserRepository;
import com.sportsvenue.venuemanagement.repository.VenueRepository;
import com.sportsvenue.venuemanagement.service.BookingService;
import com.sportsvenue.venuemanagement.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final VenueRepository venueRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository,
                            UserRepository userRepository,
                            VenueRepository venueRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.venueRepository = venueRepository;
    }

    @Override
    public Booking createBooking(Long venueId, Long userId, LocalDate bookingDate,
                               LocalTime startTime, LocalTime endTime, Integer courtNumber,
                               Double totalAmount) {
        // Check if the court is available
        if (!isCourtAvailable(venueId, bookingDate, startTime, endTime, courtNumber)) {
            throw new IllegalStateException("The selected court is not available for the specified time slot");
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        Venue venue = venueRepository.findById(venueId)
            .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));

        Booking booking = new Booking();
        booking.setVenue(venue);
        booking.setUser(user);
        booking.setBookingDate(bookingDate);
        booking.setStartTime(startTime);
        booking.setEndTime(endTime);
        booking.setCourtNumber(courtNumber);
        booking.setTotalAmount(totalAmount);
        booking.setStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBookingStatus(Long bookingId, BookingStatus status) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new IllegalStateException("Cannot cancel a completed booking");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> getVenueBookings(Long venueId, LocalDate date) {
        return bookingRepository.findByVenueIdAndBookingDate(venueId, date);
    }

    @Override
    public boolean isCourtAvailable(Long venueId, LocalDate date, LocalTime startTime,
                                  LocalTime endTime, Integer courtNumber) {
        List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(venueId, date, courtNumber);
        
        return conflictingBookings.stream().noneMatch(booking ->
            (startTime.isBefore(booking.getEndTime()) && endTime.isAfter(booking.getStartTime()))
        );
    }

    @Override
    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));
    }

    @Override
    public void updatePaymentInfo(Long bookingId, String paymentId) {
        Booking booking = getBookingById(bookingId);
        booking.setPaymentId(paymentId);
        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }
} 