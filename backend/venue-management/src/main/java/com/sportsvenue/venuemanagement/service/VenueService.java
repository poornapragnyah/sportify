package com.sportsvenue.venuemanagement.service;

import com.sportsvenue.venuemanagement.model.Venue;
import com.sportsvenue.venuemanagement.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<Venue> searchVenues(String name, String location, String sportType) {
        List<Venue> venues = venueRepository.findAll();
        
        return venues.stream()
            .filter(venue -> name == null || venue.getName().toLowerCase().contains(name.toLowerCase()))
            .filter(venue -> location == null || venue.getLocation().toLowerCase().contains(location.toLowerCase()))
            .filter(venue -> sportType == null || venue.getFacilities().toLowerCase().contains(sportType.toLowerCase()))
            .collect(Collectors.toList());
    }
}
