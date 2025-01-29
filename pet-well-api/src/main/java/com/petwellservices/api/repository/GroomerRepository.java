package com.petwellservices.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.enums.UserStatus;

public interface GroomerRepository extends JpaRepository <Groomer,Long>{

    List<Groomer> findByCityCityId(Long cityId);

    int countByUserUserId(Long userId);

    Groomer findByUserUserId(Long userId);

    List<Groomer> findByStatus(UserStatus status);
    
}
