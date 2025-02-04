package com.petwellservices.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Pet;

public interface PetRepository extends JpaRepository<Pet,Long>  {

    List<Pet> findByUserUserId(Long userId);

    void deleteByUserUserId(Long userId);
    
}
