package com.pet_well_services.transaction.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.transaction.entities.Sitter;
import com.pet_well_services.transaction.enums.UserStatus;

public interface SitterRepository extends JpaRepository<Sitter,Long>{

    List<Sitter> findByCityCityId(Long cityId);

    int countByUserUserId(Long userId);

    List<Sitter> findAllByUserUserId(Long userId);

    List<Sitter> findByStatus(UserStatus status);

    List<Sitter> findByAreaAreaId(Long areaId);

    List<Sitter> findAllByStatus(UserStatus approved);

    List<Sitter> findByCityCityIdAndStatus(Long cityId, UserStatus approved);

    List<Sitter> findByAreaAreaIdAndStatus(Long areaId, UserStatus approved);

    Optional<Sitter> findByUserUserId(Long userId);
    
}
