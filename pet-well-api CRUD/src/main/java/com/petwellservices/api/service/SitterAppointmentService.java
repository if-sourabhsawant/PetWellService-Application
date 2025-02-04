package com.petwellservices.api.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.petwellservices.api.dto.AppointmentsDto;
import com.petwellservices.api.dto.PetDto;
import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.dto.SlotDto;
import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.entities.Sitter;
import com.petwellservices.api.entities.SitterAppointment;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.enums.AppointmentStatus;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.PetRepository;
import com.petwellservices.api.repository.SitterAppointmentRepository;
import com.petwellservices.api.repository.SitterRepository;
import com.petwellservices.api.repository.SlotRepository;
import com.petwellservices.api.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SitterAppointmentService implements ISitterAppointmentService {

    private final SitterAppointmentRepository sitterAppointmentRepository;

    private final UserRepository userRepository;

    private final SitterRepository sitterRepository;

    private final SlotRepository slotRepository;
    private final PetRepository petRepository;

    @Override
    @Transactional
    public SitterAppointment bookAppointment(Long userId, Long sitterId, Long slotId, LocalDate date, String note) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Sitter sitter = sitterRepository.findById(sitterId)
                .orElseThrow(() -> new IllegalArgumentException("Sitter not found"));
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("Slot not found"));

        Optional<SitterAppointment> existingAppointment = sitterAppointmentRepository
                .findBySitterAndDateAndSlot(sitter, date, slot);
        if (existingAppointment.isPresent()) {
            throw new IllegalStateException("Slot is already allocated for this date");
        }

        SitterAppointment appointment = new SitterAppointment();
        appointment.setUser(user);
        appointment.setSitter(sitter);
        appointment.setSlot(slot);
        appointment.setDate(date);
        appointment.setNote(note);
        appointment.setStatus(AppointmentStatus.PENDING);

        return sitterAppointmentRepository.save(appointment);
    }

    @Override
    public List<AppointmentsDto> getUserAppointments(Long userId) {
        List<SitterAppointment> appointments = sitterAppointmentRepository.findByUserUserId(userId);
        return appointments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private AppointmentsDto convertToDTO(SitterAppointment appointment) {
        AppointmentsDto dto = new AppointmentsDto();
        dto.setAppointmentId(appointment.getId());
        dto.setAppointmentType("Sitter");
        dto.setToWhomName(appointment.getSitter().getUser().getFirstName() +" " +appointment.getSitter().getUser().getLastName());
        dto.setDate(appointment.getDate());
        dto.setSlotTime(appointment.getSlot().getSlotTime());
        dto.setStatus(appointment.getStatus().name());
        dto.setNote(appointment.getNote());
        return dto;
    }

    @Override
    public List<SitterAppointmentDto> getSitterAppointments(Long sitterId) {
        List<SitterAppointment> sitterAppointment = sitterAppointmentRepository.findBySitterSitterId(sitterId);
        return sitterAppointment.stream().map(this::convertSitterAppointmentToDTO).toList();
    }

    private SitterAppointmentDto convertSitterAppointmentToDTO(SitterAppointment appointment) {
        SitterAppointmentDto dto = new SitterAppointmentDto();

         SlotDto slotDto = new SlotDto();
        slotDto.setSlotId(appointment.getSlot().getSlotId());
        slotDto.setSlotTime(appointment.getSlot().getSlotTime());
        dto.setAppointmentId(appointment.getId());

         List<PetDto> petDtos = petRepository.findByUserUserId(appointment.getUser().getUserId()).stream().map(this::convertToDto).toList();
         dto.setPet(petDtos);

        dto.setSlot(slotDto);
        dto.setUser(appointment.getUser());
        dto.setDate(appointment.getDate());
        dto.setSlotTime(appointment.getSlot().getSlotTime());
        dto.setStatus(appointment.getStatus().name());
        dto.setNote(appointment.getNote());

        return dto;
    }

    @Override
    public SitterAppointment getAppointmentDetails(Long appointmentId) {

        return sitterAppointmentRepository.findById(appointmentId)
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
