package com.pet_well_services.crud.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.Groomer;
import com.pet_well_services.crud.enums.UserStatus;

public interface GroomerRepository extends JpaRepository <Groomer,Long>{

    List<Groomer> findByCityCityId(Long cityId);

    int countByUserUserId(Long userId);

    Optional<Groomer> findByUserUserId(Long userId);

    List<Groomer> findByStatus(UserStatus status);

    List<Groomer> findByAreaAreaId(Long areaId);

    List<Groomer> findAllByStatus(UserStatus approved);

    List<Groomer> findByCityCityIdAndStatus(Long cityId, UserStatus approved);

    List<Groomer> findByAreaAreaIdAndStatus(Long areaId, UserStatus approved);
    
}
