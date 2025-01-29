
package com.petwellservices.api.service.veterinary;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.petwellservices.api.dto.SitterDto;
import com.petwellservices.api.dto.SlotDto;
import com.petwellservices.api.dto.VeterinaryDto;
import com.petwellservices.api.entities.Sitter;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.Veterinary;
import com.petwellservices.api.entities.VeterinaryAppointment;
import com.petwellservices.api.entities.VeterinaryAppointment.AppointmentStatus;
import com.petwellservices.api.enums.UserStatus;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.SlotRepository;
import com.petwellservices.api.repository.VeterinaryAppointmentRepository;
import com.petwellservices.api.repository.VeterinaryRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class VeterinaryService implements IVeterinaryService {

    private VeterinaryRepository veterinaryRepository;

    private SlotRepository slotRepository;

    private VeterinaryAppointmentRepository appointmentRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<VeterinaryAppointment> getAllAppointments(Long veterinaryId) {
        return appointmentRepository.findByVeterinaryVeterinaryId(veterinaryId);
    }

    @Override
    public List<Veterinary> getAllVeterinaries() {

        return veterinaryRepository.findAll();
    }

    @Override
    public List<Veterinary> getVeterinariesByCityId(Long cityId) {
        return veterinaryRepository.findByCityCityId(cityId);
    }

    @Override
    public VeterinaryDto getVeterinaryInfoWithSlots(Long veterinaryId) {
        Veterinary veterinary = veterinaryRepository.findById(veterinaryId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Sitter ID"));

        VeterinaryDto sitterDto = modelMapper.map(veterinary, VeterinaryDto.class);

        List<Slot> slots = slotRepository.findByUserUserId(veterinary.getUser().getUserId());

        // Check if each slot is booked in SitterAppointment
        List<SlotDto> slotDtos = slots.stream().map(slot -> {
            boolean isBooked = appointmentRepository.existsByVeterinaryVeterinaryIdAndSlotSlotId(veterinaryId, slot.getSlotId());
            SlotDto slotDto = new SlotDto();
            slotDto.setSlotId(slot.getSlotId());
            slotDto.setSlotTime(slot.getSlotTime());
            slotDto.setAvailable(!isBooked); // Slot is available if not booked
            return slotDto;
        }).collect(Collectors.toList());

        sitterDto.setSlots(slotDtos);

        return sitterDto;
    }

    @Override
    public void updateRequestStatus(Long veterinaryId, UserStatus status) {
        Optional<Veterinary> optionalVeterinary = veterinaryRepository.findById(veterinaryId);
        if (optionalVeterinary.isPresent()) {
            Veterinary veterinary = optionalVeterinary.get();
            veterinary.setStatus(status);
            veterinaryRepository.save(veterinary);
        } else {
            throw new ResourceNotFoundException("Veterinary not found with id: " + veterinaryId);
        }
    }

    @Override
    public void deleteVeterinary(Long veterinaryId) {
        veterinaryRepository.deleteById(veterinaryId);
    }

    @Override
    public Slot createSlot(Slot slot) {
        return slotRepository.save(slot);
    }

    @Override
    public List<Slot> getSlotsByVeterinary(Long userId) {
        return slotRepository.findByUserUserId(userId);
    }

    @Override
    public VeterinaryAppointment createAppointment(VeterinaryAppointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public void updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        Optional<VeterinaryAppointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            VeterinaryAppointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointmentRepository.save(appointment);
        } else {
            throw new ResourceNotFoundException("Appointment not found with id: " + appointmentId);
        }
    }

    @Override
    public List<VeterinaryDto> getVeterinariesByStatus(UserStatus status){
        List<Veterinary> veterinaries = veterinaryRepository.findByStatus(status);
        return veterinaries.stream()
                .map(veterinary -> modelMapper.map(veterinary, VeterinaryDto.class))
                .toList();
    }
}
