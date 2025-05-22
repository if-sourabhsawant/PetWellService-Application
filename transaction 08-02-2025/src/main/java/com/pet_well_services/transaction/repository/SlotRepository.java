package com.pet_well_services.transaction.repository;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.transaction.entities.Slot;
import com.pet_well_services.transaction.enums.UserType;

public interface SlotRepository extends JpaRepository<Slot,Long>{

    List<Slot> findByUserUserId(Long userId);

    boolean existsByUserUserIdAndSlotTimeAndUserType(Long userId, LocalTime slotTime, UserType userType);

    boolean existsByUserUserIdAndSlotTimeAndUserTypeAndSlotIdNot(Long userId, LocalTime slotTime, UserType userType,
            Long excludeSlotId);

    int countByUserUserId(Long userId);


    
}
