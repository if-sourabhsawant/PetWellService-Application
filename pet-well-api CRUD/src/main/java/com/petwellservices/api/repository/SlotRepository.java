package com.petwellservices.api.repository;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.enums.UserType;

public interface SlotRepository extends JpaRepository<Slot,Long>{

    List<Slot> findByUserUserId(Long userId);

    boolean existsByUserUserIdAndSlotTimeAndUserType(Long userId, LocalTime slotTime, UserType userType);

    boolean existsByUserUserIdAndSlotTimeAndUserTypeAndSlotIdNot(Long userId, LocalTime slotTime, UserType userType,
            Long excludeSlotId);

    int countByUserUserId(Long userId);


    
}
