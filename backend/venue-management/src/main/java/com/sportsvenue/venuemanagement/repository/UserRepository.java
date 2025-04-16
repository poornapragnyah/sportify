package com.sportsvenue.venuemanagement.repository;

import com.sportsvenue.venuemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(String role);

    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    long countByRole(String role);
}
