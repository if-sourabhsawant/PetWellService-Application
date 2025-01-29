package com.petwellservices.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.City;

public interface CityRepository extends JpaRepository<City,Long> {

    boolean existsByCityName(String cityName);
    
}
