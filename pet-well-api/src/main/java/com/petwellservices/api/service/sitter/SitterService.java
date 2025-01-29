
package com.petwellservices.api.service.sitter;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.petwellservices.api.dto.SitterDto;
import com.petwellservices.api.dto.SlotDto;
import com.petwellservices.api.dto.VeterinaryDto;
import com.petwellservices.api.entities.Sitter;
import com.petwellservices.api.entities.SitterAppointment;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.entities.Veterinary;
import com.petwellservices.api.enums.UserStatus;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.SitterAppointmentRepository;
import com.petwellservices.api.repository.SitterRepository;
import com.petwellservices.api.repository.SlotRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SitterService implements ISitterService {

    private final SitterRepository sitterRepository;

    private final SlotRepository slotRepository;

    private final SitterAppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<SitterAppointment> getAllAppointmentsBySitter(Long sitterId) {
        return appointmentRepository.findBySitterSitterId(sitterId);
    }

    @Override
    public List<Sitter> getAllSitters() {
        return sitterRepository.findAll();
    }

    @Override
    public List<Sitter> getSittersByCityId(Long cityId) {
        return sitterRepository.findByCityCityId(cityId);
    }

    @Override
    public SitterDto getSitterInfoWithSlots(Long sitterId) {
        Sitter sitter = sitterRepository.findById(sitterId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Sitter ID"));

        SitterDto sitterDto = modelMapper.map(sitter, SitterDto.class);

        List<Slot> slots = slotRepository.findByUserUserId(sitter.getUser().getUserId());

        // Check if each slot is booked in SitterAppointment
        List<SlotDto> slotDtos = slots.stream().map(slot -> {
            boolean isBooked = appointmentRepository.existsBySitterSitterIdAndSlotSlotId(sitterId, slot.getSlotId());
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
    public void updateRequestStatus(Long sitterId, UserStatus status) {
        Optional<Sitter> optionalSitter = sitterRepository.findById(sitterId);
        if (optionalSitter.isPresent()) {
            Sitter sitter = optionalSitter.get();
            sitter.setStatus(status);
            sitterRepository.save(sitter);
        } else {
            throw new ResourceNotFoundException("Sitter not found with id: " + sitterId);
        }
    }

    @Override
    public void deleteSitter(Long sitterId) {
        sitterRepository.deleteById(sitterId);
    }

    @Override
    public Slot createSlot(Slot slot) {
        return slotRepository.save(slot);
    }

    @Override
    public List<Slot> getSlotsBySitter(Long sitterId) {
        return slotRepository.findByUserUserId(sitterId);
    }

    @Override
    public SitterAppointment createAppointment(SitterAppointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public void updateAppointmentStatus(Long appointmentId, SitterAppointment.AppointmentStatus status) {
        Optional<SitterAppointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            SitterAppointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointmentRepository.save(appointment);
        } else {
            throw new ResourceNotFoundException("Appointment not found with id: " + appointmentId);
        }
    }

    @Override
    public SitterAppointment bookAppointment(SitterAppointment appointment, User user) {
        // Ensure that the user is not null
        if (user == null) {
            throw new RuntimeException("User must be logged in to book an appointment.");
        }

        // Set the user for the appointment
        appointment.setUser(user);

        // Check if the sitter exists
        if (!sitterRepository.existsById(appointment.getSitter().getSitterId())) {
            throw new RuntimeException("Sitter does not exist.");
        }

        // Check if the slot is available
        Slot slot = appointment.getSlot();
        if (slot == null || slotRepository.findById(slot.getSlotId()).isEmpty()) {
            throw new RuntimeException("Selected slot is not available.");
        }

        // Save and return the appointment
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<SitterDto> getSitterByStatus(UserStatus status) {
        List<Sitter> sitters = sitterRepository.findByStatus(status);
        return sitters.stream()
                .map(veterinary -> modelMapper.map(veterinary, SitterDto.class))
                .toList();
    }


}
