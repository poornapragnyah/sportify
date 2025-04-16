package com.sportsvenue.venuemanagement.repository;

import com.sportsvenue.venuemanagement.model.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByUserId(Long userId);
    List<SupportTicket> findByStatus(String status);
    List<SupportTicket> findByPriority(String priority);
    List<SupportTicket> findByStatusAndPriority(String status, String priority);
} 