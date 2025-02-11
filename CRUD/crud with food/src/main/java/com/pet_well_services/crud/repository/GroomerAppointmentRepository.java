package com.pet_well_services.crud.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.Groomer;
import com.pet_well_services.crud.entities.GroomerAppointment;
import com.pet_well_services.crud.entities.Slot;

public interface GroomerAppointmentRepository  extends JpaRepository<GroomerAppointment,Long>{

    List<GroomerAppointment> findByUserUserId(Long userId);

    List<GroomerAppointment> findByGroomerGroomerId(Long groomerId);

    Optional<GroomerAppointment> findByGroomerAndDateAndSlot(Groomer groomer, LocalDate date, Slot slot);

    boolean existsByGroomerGroomerIdAndSlotSlotId(Long groomerId, Long slotId);

    void deleteByGroomerGroomerId(Long groomerId);

    boolean existsByGroomerGroomerIdAndDateAndSlotSlotId(Long groomerId, LocalDate today, Long slotId);
    
}
