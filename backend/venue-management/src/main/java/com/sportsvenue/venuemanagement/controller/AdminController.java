package com.sportsvenue.venuemanagement.controller;

import com.sportsvenue.venuemanagement.model.User;
import com.sportsvenue.venuemanagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController extends BaseController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return success(adminService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return success(adminService.getUserById(id));
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<User> updateUserRole(
            @PathVariable Long id,
            @RequestParam String role) {
        return success(adminService.updateUserRole(id, role));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return success(null);
    }

    @GetMapping("/analytics/users")
    public ResponseEntity<Object> getUserAnalytics() {
        return success(adminService.getUserAnalytics());
    }

    @GetMapping("/analytics/venues")
    public ResponseEntity<Object> getVenueAnalytics() {
        return success(adminService.getVenueAnalytics());
    }
} 