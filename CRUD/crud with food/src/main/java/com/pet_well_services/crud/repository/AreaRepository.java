package com.pet_well_services.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.Area;

public interface AreaRepository extends JpaRepository<Area,Long> {
    
}
