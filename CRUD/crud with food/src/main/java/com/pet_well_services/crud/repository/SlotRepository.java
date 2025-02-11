package com.pet_well_services.crud.repository;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.Slot;
import com.pet_well_services.crud.enums.UserType;

public interface SlotRepository extends JpaRepository<Slot,Long>{

    List<Slot> findByUserUserId(Long userId);

    boolean existsByUserUserIdAndSlotTimeAndUserType(Long userId, LocalTime slotTime, UserType userType);

    boolean existsByUserUserIdAndSlotTimeAndUserTypeAndSlotIdNot(Long userId, LocalTime slotTime, UserType userType,
            Long excludeSlotId);

    int countByUserUserId(Long userId);


    
}
