package com.petwellservices.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Breed;

public interface BreedRepository extends JpaRepository<Breed,Long> {

    boolean existsByBreedName(String breedName);
    
}
