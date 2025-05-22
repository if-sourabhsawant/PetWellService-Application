package com.pet_well_services.transaction.service.appointment;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.pet_well_services.transaction.dto.AppointmentsDto;
import com.pet_well_services.transaction.dto.PetDto;
import com.pet_well_services.transaction.dto.SitterAppointmentDto;
import com.pet_well_services.transaction.dto.SlotDto;
import com.pet_well_services.transaction.entities.Pet;
import com.pet_well_services.transaction.entities.Slot;
import com.pet_well_services.transaction.entities.User;
import com.pet_well_services.transaction.entities.Veterinary;
import com.pet_well_services.transaction.entities.VeterinaryAppointment;
import com.pet_well_services.transaction.enums.AppointmentStatus;
import com.pet_well_services.transaction.exception.ResourceNotFoundException;
import com.pet_well_services.transaction.repository.PetRepository;
import com.pet_well_services.transaction.repository.SlotRepository;
import com.pet_well_services.transaction.repository.UserRepository;
import com.pet_well_services.transaction.repository.VeterinaryAppointmentRepository;
import com.pet_well_services.transaction.repository.VeterinaryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class VeterinaryAppointmentService implements IVeterinaryAppointmentService {

    private final VeterinaryAppointmentRepository veterinaryAppointmentRepository;

    private final UserRepository userRepository;

    private final VeterinaryRepository veterinaryRepository;

    private final SlotRepository slotRepository;
    private final PetRepository petRepository;

    @Override
    @Transactional
    public VeterinaryAppointment bookAppointment(Long userId, Long veterinaryId, Long slotId, LocalDate date,
            String note) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Veterinary veterinary = veterinaryRepository.findById(veterinaryId)
                .orElseThrow(() -> new IllegalArgumentException("Veterinary not found"));
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("Slot not found"));

        Optional<VeterinaryAppointment> existingAppointment = veterinaryAppointmentRepository
                .findByVeterinaryAndDateAndSlot(veterinary, date, slot);
        if (existingAppointment.isPresent()) {
            throw new IllegalStateException("Slot is already allocated for this date");
        }

        VeterinaryAppointment appointment = new VeterinaryAppointment();
        appointment.setUser(user);
        appointment.setVeterinary(veterinary);
        appointment.setSlot(slot);
        appointment.setDate(date);
        appointment.setNote(note);
        appointment.setStatus(AppointmentStatus.PENDING);

        return veterinaryAppointmentRepository.save(appointment);
    }

    @Override
    public List<AppointmentsDto> getUserAppointments(Long userId) {
        List<VeterinaryAppointment> appointments = veterinaryAppointmentRepository.findByUserUserId(userId);
        return appointments.stream().map(this::convertToDTO).toList();
    }

    private AppointmentsDto convertToDTO(VeterinaryAppointment appointment) {
        AppointmentsDto dto = new AppointmentsDto();
        dto.setAppointmentId(appointment.getId());
        dto.setAppointmentType("Veterinary");
        dto.setToWhomName(appointment.getVeterinary().getClinicName());
        dto.setDate(appointment.getDate());
        dto.setSlotTime(appointment.getSlot().getSlotTime());
        dto.setStatus(appointment.getStatus().name());
        dto.setNote(appointment.getNote());
        return dto;
    }

    @Override
    public List<SitterAppointmentDto> getVeterinaryAppointments(Long userId) {
        List<VeterinaryAppointment> veterinaryAppointment = veterinaryAppointmentRepository
                .findByVeterinaryVeterinaryId(userId);
        return veterinaryAppointment.stream().map(this::convertVeterinaryAppointmentToDTO).toList();
    }

    private SitterAppointmentDto convertVeterinaryAppointmentToDTO(VeterinaryAppointment appointment) {
        SitterAppointmentDto dto = new SitterAppointmentDto();

        SlotDto slotDto = new SlotDto();
        slotDto.setSlotId(appointment.getSlot().getSlotId());
        slotDto.setSlotTime(appointment.getSlot().getSlotTime());

        List<PetDto> petDtos = petRepository.findByUserUserId(appointment.getUser().getUserId()).stream().map(this::convertToDTO).toList();
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
    public VeterinaryAppointment getAppointmentDetails(Long appointmentId) {
        return veterinaryAppointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("appointment not found"));
    }

    PetDto convertToDTO(Pet pet) {
        PetDto petDto = new PetDto();
        petDto.setPetId(pet.getPetId());
        petDto.setPetName(pet.getPetName());
        petDto.setPetAge(pet.getPetAge());
        petDto.setUserName(pet.getUser().getFirstName() + " " + pet.getUser().getLastName());
        petDto.setCategory(pet.getCategory());
        return petDto;
    }
}
