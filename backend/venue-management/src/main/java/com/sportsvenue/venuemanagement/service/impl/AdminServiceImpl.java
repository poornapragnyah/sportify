package com.sportsvenue.venuemanagement.service.impl;

import com.sportsvenue.venuemanagement.model.*;
import com.sportsvenue.venuemanagement.repository.*;
import com.sportsvenue.venuemanagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // User Management
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateUserRole(Long id, String role) {
        User user = getUserById(id);
        user.setRole(role);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User createAdminUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ADMIN");
        return userRepository.save(user);
    }

    // Analytics
    @Override
    public Map<String, Object> getUserAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", userRepository.count());
        analytics.put("activeUsers", userRepository.countByEnabled(true));
        analytics.put("userRoles", userRepository.findAll().stream()
                .collect(Collectors.groupingBy(User::getRole, Collectors.counting())));
        return analytics;
    }

    @Override
    public Map<String, Object> getVenueAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalVenues", venueRepository.count());
        analytics.put("totalBookings", bookingRepository.count());
        analytics.put("totalRevenue", paymentRepository.findAll().stream()
                .mapToDouble(Payment::getAmount)
                .sum());
        return analytics;
    }

    @Override
    public Map<String, Object> getBookingAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalBookings", bookingRepository.count());
        analytics.put("bookingStatus", bookingRepository.findAll().stream()
                .collect(Collectors.groupingBy(Booking::getStatus, Collectors.counting())));
        analytics.put("averageBookingDuration", calculateAverageBookingDuration());
        return analytics;
    }

    @Override
    public Map<String, Object> getFinancialAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalRevenue", paymentRepository.findAll().stream()
                .mapToDouble(Payment::getAmount)
                .sum());
        analytics.put("paymentMethods", paymentRepository.findAll().stream()
                .collect(Collectors.groupingBy(Payment::getPaymentMethod, Collectors.counting())));
        analytics.put("revenueByMonth", calculateRevenueByMonth());
        return analytics;
    }

    // Venue Management
    @Override
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    @Override
    public Venue getVenueById(Long id) {
        return venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue not found"));
    }

    @Override
    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    @Override
    public Venue updateVenue(Long id, Venue venue) {
        Venue existingVenue = getVenueById(id);
        venue.setId(id);
        return venueRepository.save(venue);
    }

    @Override
    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }

    // Booking Management
    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = getBookingById(id);
        booking.setStatus(BookingStatus.valueOf(status.toUpperCase()));
        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // Financial Management
    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public Map<String, Object> getRevenueReport(String startDate, String endDate) {
        // Implementation for date range revenue report
        return new HashMap<>();
    }

    @Override
    public Map<String, Object> getPaymentAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalPayments", paymentRepository.count());
        analytics.put("totalAmount", paymentRepository.findAll().stream()
                .mapToDouble(Payment::getAmount)
                .sum());
        analytics.put("paymentStatus", paymentRepository.findAll().stream()
                .collect(Collectors.groupingBy(Payment::getStatus, Collectors.counting())));
        return analytics;
    }

    // System Settings
    @Override
    public Map<String, Object> getSystemSettings() {
        // Implementation for system settings
        return new HashMap<>();
    }

    @Override
    public void updateSystemSettings(Map<String, String> settings) {
        // Implementation for updating system settings
    }

    // Support Management
    @Override
    public List<SupportTicket> getAllSupportTickets() {
        return supportTicketRepository.findAll();
    }

    @Override
    public SupportTicket getSupportTicketById(Long id) {
        return supportTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Support ticket not found"));
    }

    @Override
    public SupportTicket updateSupportTicketStatus(Long id, String status) {
        SupportTicket ticket = getSupportTicketById(id);
        ticket.setStatus(status);
        return supportTicketRepository.save(ticket);
    }

    @Override
    public void deleteSupportTicket(Long id) {
        supportTicketRepository.deleteById(id);
    }

    // Helper methods
    private double calculateAverageBookingDuration() {
        List<Booking> bookings = bookingRepository.findAll();
        if (bookings.isEmpty()) return 0;
        
        return bookings.stream()
                .mapToLong(booking -> 
                    java.time.Duration.between(booking.getStartTime(), booking.getEndTime()).toHours())
                .average()
                .orElse(0);
    }

    private Map<String, Double> calculateRevenueByMonth() {
        return paymentRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                    payment -> payment.getPaymentDate().getMonth().toString(),
                    Collectors.summingDouble(Payment::getAmount)
                ));
    }
} 