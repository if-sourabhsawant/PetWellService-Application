package com.pet_well_services.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.City;

public interface CityRepository extends JpaRepository<City,Long> {

    boolean existsByCityName(String cityName);
    
}
