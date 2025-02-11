package com.pet_well_services.crud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.Pet;

public interface PetRepository extends JpaRepository<Pet,Long>  {

    List<Pet> findByUserUserId(Long userId);

    void deleteByUserUserId(Long userId);
    
}
