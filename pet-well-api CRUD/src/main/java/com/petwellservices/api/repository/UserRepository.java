package com.petwellservices.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.User;

public interface UserRepository extends JpaRepository<User,Long>{

    Optional<User> findByEmailAndPassword(String email, String password);

    List<User> findByRoleRoleId(long l);

    boolean existsByEmail(String email);

    void deleteByUserId(Long userId);
    
}
