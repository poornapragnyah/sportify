package com.sportsvenue.venuemanagement.service;

import com.sportsvenue.venuemanagement.model.Venue;
import com.sportsvenue.venuemanagement.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue getVenueById(Long id) {
        return venueRepository.findById(id).orElseThrow(() -> new RuntimeException("Venue not found"));
    }

    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    public Venue updateVenue(Long id, Venue updatedVenue) {
        return venueRepository.findById(id).map(venue -> {
            venue.setName(updatedVenue.getName());
            venue.setLocation(updatedVenue.getLocation());
            venue.setFacilities(updatedVenue.getFacilities());
            venue.setTotalCourts(updatedVenue.getTotalCourts());
            return venueRepository.save(venue);
        }).orElseThrow(() -> new RuntimeException("Venue not found"));
    }

    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }
}
