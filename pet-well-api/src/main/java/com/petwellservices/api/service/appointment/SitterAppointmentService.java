package com.petwellservices.api.service.appointment;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.petwellservices.api.dto.AppointmentsDto;
import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.entities.Sitter;
import com.petwellservices.api.entities.SitterAppointment;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.exception.ResourceNotFoundException;
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
        appointment.setStatus(SitterAppointment.AppointmentStatus.PENDING);

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
        dto.setToWhomName(appointment.getSitter().getCenterPhoneNo());
        dto.setDate(appointment.getDate());
        dto.setSlotTime(appointment.getSlot().getSlotTime());
        dto.setStatus(appointment.getStatus().name());
        dto.setNote(appointment.getNote());
        return dto;
    }

    @Override
    public List<SitterAppointmentDto> getSitterAppointments(Long userId) {
        List<SitterAppointment> sitterAppointment = sitterAppointmentRepository.findBySitterSitterId(userId);
        return sitterAppointment.stream().map(this::convertSitterAppointmentToDTO).toList();
    }

    private SitterAppointmentDto convertSitterAppointmentToDTO(SitterAppointment appointment) {
        SitterAppointmentDto dto = new SitterAppointmentDto();
        dto.setAppointmentId(appointment.getId());
        dto.setSlot(appointment.getSlot());
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
}
