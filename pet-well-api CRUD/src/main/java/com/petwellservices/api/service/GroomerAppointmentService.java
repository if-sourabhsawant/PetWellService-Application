package com.petwellservices.api.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.petwellservices.api.dto.AppointmentsDto;
import com.petwellservices.api.dto.PetDto;
import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.dto.SlotDto;
import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.entities.GroomerAppointment;
import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.enums.AppointmentStatus;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.GroomerAppointmentRepository;
import com.petwellservices.api.repository.GroomerRepository;
import com.petwellservices.api.repository.PetRepository;
import com.petwellservices.api.repository.SlotRepository;
import com.petwellservices.api.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GroomerAppointmentService implements IGroomerAppointmentService {
    private final GroomerAppointmentRepository groomerAppointmentRepository;

    private final UserRepository userRepository;

    private final GroomerRepository groomerRepository;

    private final SlotRepository slotRepository;
    private final PetRepository petRepository;

    @Override
    @Transactional
    public GroomerAppointment bookAppointment(Long userId, Long groomerId, Long slotId, LocalDate date, String note) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Groomer groomer = groomerRepository.findById(groomerId)
                .orElseThrow(() -> new IllegalArgumentException("Groomer not found"));
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("Slot not found"));

        Optional<GroomerAppointment> existingAppointment = groomerAppointmentRepository
                .findByGroomerAndDateAndSlot(groomer, date, slot);
        if (existingAppointment.isPresent()) {
            throw new IllegalStateException("Slot is already allocated for this date");
        }

        GroomerAppointment appointment = new GroomerAppointment();
        appointment.setUser(user);
        appointment.setGroomer(groomer);
        appointment.setSlot(slot);
        appointment.setDate(date);
        appointment.setNote(note);
        appointment.setStatus(AppointmentStatus.PENDING);

        return groomerAppointmentRepository.save(appointment);
    }

    @Override
    public List<AppointmentsDto> getUserAppointments(Long userId) {
        List<GroomerAppointment> appointments = groomerAppointmentRepository.findByUserUserId(userId);
        return appointments.stream().map(this::convertToDTO).toList();
    }

    private AppointmentsDto convertToDTO(GroomerAppointment appointment) {
        AppointmentsDto dto = new AppointmentsDto();
        dto.setAppointmentId(appointment.getId());
        dto.setAppointmentType("Groomer");
        dto.setToWhomName(appointment.getGroomer().getShopName());
        dto.setDate(appointment.getDate());
        dto.setSlotTime(appointment.getSlot().getSlotTime());
        dto.setStatus(appointment.getStatus().name());
        dto.setNote(appointment.getNote());
        return dto;
    }

    @Override
    public List<SitterAppointmentDto> getGroomerAppointments(Long userId) {
        List<GroomerAppointment> sitterAppointment = groomerAppointmentRepository.findByGroomerGroomerId(userId);
        return sitterAppointment.stream().map(this::convertGroomerAppointmentToDTO).toList();
    }

    private SitterAppointmentDto convertGroomerAppointmentToDTO(GroomerAppointment appointment) {
        SitterAppointmentDto dto = new SitterAppointmentDto();
        SlotDto slotDto = new SlotDto();
        slotDto.setSlotId(appointment.getSlot().getSlotId());
        slotDto.setSlotTime(appointment.getSlot().getSlotTime());

        List<PetDto> petDtos = petRepository.findByUserUserId(appointment.getUser().getUserId()).stream()
                .map(this::convertToDto).toList();
        dto.setPet(petDtos);

        dto.setAppointmentId(appointment.getId());
        dto.setSlot(slotDto);
        dto.setUser(appointment.getUser());
        dto.setDate(appointment.getDate());
        dto.setSlotTime(appointment.getSlot().getSlotTime());
        dto.setStatus(appointment.getStatus().name());
        dto.setNote(appointment.getNote());
        return dto;
    }

    @Override
    public GroomerAppointment getAppointmentDetails(Long appointmentId) {
        return groomerAppointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("appointment not found"));

    }

    PetDto convertToDto(Pet pet) {
        PetDto petDto = new PetDto();
        petDto.setPetId(pet.getPetId());
        petDto.setPetName(pet.getPetName());
        petDto.setPetAge(pet.getPetAge());
        petDto.setUserName(pet.getUser().getFirstName() + " " + pet.getUser().getLastName());
        petDto.setBreed(pet.getBreed());
        petDto.setCategory(pet.getCategory());
        return petDto;
    }

}
