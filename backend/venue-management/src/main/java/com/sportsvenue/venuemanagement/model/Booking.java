package com.sportsvenue.venuemanagement.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime bookingDate;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status; // PENDING, APPROVED, CANCELLED

    @ManyToOne
    private User user;

    @ManyToOne
    private Venue venue;
}
