package com.pet_well_services.transaction.service.appointment;

import java.time.LocalDate;
import java.util.List;

import com.pet_well_services.transaction.dto.AppointmentsDto;
import com.pet_well_services.transaction.dto.SitterAppointmentDto;
import com.pet_well_services.transaction.entities.SitterAppointment;

public interface ISitterAppointmentService {
    SitterAppointment bookAppointment(Long userId, Long sitterId, Long slotId, LocalDate date, String note);
    List<AppointmentsDto> getUserAppointments(Long userId);
    List<SitterAppointmentDto> getSitterAppointments(Long sitterId);
    SitterAppointment getAppointmentDetails(Long appointmentId);
}
