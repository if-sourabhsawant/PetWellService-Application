package com.pet_well_services.transaction.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.transaction.entities.Veterinary;
import com.pet_well_services.transaction.enums.UserStatus;

public interface VeterinaryRepository extends JpaRepository<Veterinary,Long> {

    List<Veterinary> findByCityCityId(Long cityId);

    Optional<Veterinary> findByUserUserId(Long userId);

    List<Veterinary> findByStatus(UserStatus status);

    List<Veterinary> findByAreaAreaId(Long areaId);

    List<Veterinary> findAllByStatus(UserStatus approved);

    List<Veterinary> findByCityCityIdAndStatus(Long cityId, UserStatus approved);

    List<Veterinary> findByAreaAreaIdAndStatus(Long areaId, UserStatus approved);
    
}
