package com.sportsvenue.venuemanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String method; // Cash, UPI
    private double amount;
    private String status; // SUCCESS, FAILED

    @OneToOne
    private Booking booking;
}
