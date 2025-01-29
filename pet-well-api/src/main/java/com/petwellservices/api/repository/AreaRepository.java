package com.petwellservices.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Area;

public interface AreaRepository extends JpaRepository<Area,Long> {
    
}
