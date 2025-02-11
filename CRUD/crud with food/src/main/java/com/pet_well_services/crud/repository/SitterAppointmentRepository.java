package com.pet_well_services.crud.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.Sitter;
import com.pet_well_services.crud.entities.SitterAppointment;
import com.pet_well_services.crud.entities.Slot;

public interface SitterAppointmentRepository extends JpaRepository<SitterAppointment,Long> {

    List<SitterAppointment> findByUserUserId(Long userId);

    List<SitterAppointment> findBySitterSitterId(Long sitterId);

    Optional<SitterAppointment> findBySitterAndDateAndSlot(Sitter sitter, LocalDate date, Slot slot);

    boolean existsBySitterSitterIdAndSlotSlotId(Long sitterId, Long slotId);
    boolean existsBySitterSitterIdAndDateAndSlotSlotId(Long sitterId, LocalDate date, Long slotId);

    void deleteBySitterSitterId(Long sitterId);
    
}
