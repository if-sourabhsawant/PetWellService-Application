package com.petwellservices.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.entities.Sitter;
import com.petwellservices.api.enums.UserStatus;

public interface SitterRepository extends JpaRepository<Sitter,Long>{

    List<Sitter> findByCityCityId(Long cityId);

    int countByUserUserId(Long userId);

    Sitter findByUserUserId(Long userId);

    List<Sitter> findByStatus(UserStatus status);
    
}
