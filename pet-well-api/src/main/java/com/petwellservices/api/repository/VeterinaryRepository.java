package com.petwellservices.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.entities.Veterinary;
import com.petwellservices.api.enums.UserStatus;

public interface VeterinaryRepository extends JpaRepository<Veterinary,Long> {

    List<Veterinary> findByCityCityId(Long cityId);

    Veterinary findByUserUserId(Long userId);

    List<Veterinary> findByStatus(UserStatus status);
    
}
