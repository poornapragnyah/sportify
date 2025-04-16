package com.sportsvenue.venuemanagement.service;

import com.sportsvenue.venuemanagement.model.User;
import java.util.List;
import java.util.Map;

public interface AdminService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User updateUserRole(Long id, String role);
    void deleteUser(Long id);
    Map<String, Object> getUserAnalytics();
    Map<String, Object> getVenueAnalytics();
} 