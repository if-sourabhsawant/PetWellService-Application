package com.pet_well_services.crud.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.Slot;
import com.pet_well_services.crud.entities.Veterinary;
import com.pet_well_services.crud.entities.VeterinaryAppointment;

public interface VeterinaryAppointmentRepository extends JpaRepository<VeterinaryAppointment,Long> {

    List<VeterinaryAppointment> findByUserUserId(Long userId);

    List<VeterinaryAppointment> findByVeterinaryVeterinaryId(Long veterinaryId);

    Optional<VeterinaryAppointment> findByVeterinaryAndDateAndSlot(Veterinary veterinary, LocalDate date, Slot slot);

    boolean existsByVeterinaryVeterinaryIdAndSlotSlotId(Long veterinaryId, Long slotId);

    void deleteByVeterinaryVeterinaryId(Long veterinaryId);

    boolean existsByVeterinaryVeterinaryIdAndDateAndSlotSlotId(Long veterinaryId, LocalDate today, Long slotId);
    
}
