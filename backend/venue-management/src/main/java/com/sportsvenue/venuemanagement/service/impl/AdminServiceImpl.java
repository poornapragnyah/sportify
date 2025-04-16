package com.sportsvenue.venuemanagement.service.impl;

import com.sportsvenue.venuemanagement.model.User;
import com.sportsvenue.venuemanagement.model.Payment;
import com.sportsvenue.venuemanagement.repository.UserRepository;
import com.sportsvenue.venuemanagement.repository.VenueRepository;
import com.sportsvenue.venuemanagement.repository.BookingRepository;
import com.sportsvenue.venuemanagement.repository.PaymentRepository;
import com.sportsvenue.venuemanagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @Transactional
    public User updateUserRole(Long id, String role) {
        User user = getUserById(id);
        user.setRole(role);
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Map<String, Object> getUserAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        // Get total users
        long totalUsers = userRepository.count();
        analytics.put("totalUsers", totalUsers);
        
        // Get users by role
        Map<String, Long> usersByRole = new HashMap<>();
        for (User.Role role : User.Role.values()) {
            usersByRole.put(role.getValue(), userRepository.countByRole(role.getValue()));
        }
        analytics.put("usersByRole", usersByRole);
        
        return analytics;
    }

    @Override
    public Map<String, Object> getVenueAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        try {
            System.out.println("Starting venue analytics calculation...");
            
            // Get total venues
            long totalVenues = venueRepository.count();
            System.out.println("Total venues found: " + totalVenues);
            analytics.put("totalVenues", totalVenues);
            
            // Get total bookings
            long totalBookings = bookingRepository.count();
            System.out.println("Total bookings found: " + totalBookings);
            analytics.put("totalBookings", totalBookings);
            
            // Calculate total revenue from payments
            System.out.println("Fetching all payments...");
            List<Payment> payments = paymentRepository.findAll();
            System.out.println("Number of payments found: " + payments.size());
            
            double totalRevenue = payments.stream()
                    .mapToDouble(Payment::getAmount)
                    .sum();
            System.out.println("Total revenue calculated: " + totalRevenue);
            analytics.put("totalRevenue", totalRevenue);
            
            System.out.println("Analytics calculation completed successfully");
        } catch (Exception e) {
            System.err.println("Error in getVenueAnalytics: " + e.getMessage());
            e.printStackTrace();
            
            // Initialize with default values in case of error
            analytics.put("totalVenues", 0L);
            analytics.put("totalBookings", 0L);
            analytics.put("totalRevenue", 0.0);
            throw new RuntimeException("Error calculating venue analytics: " + e.getMessage(), e);
        }
        
        return analytics;
    }
} 