package com.sportsvenue.venuemanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private int totalCourts;
    private String facilities;
    private String description;
    private String imageUrl;
    private String sportType;
    private double pricePerHour;
    private String openingTime;
    private String closingTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private User manager;
}
