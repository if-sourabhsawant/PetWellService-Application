package com.petwellservices.api.service.appointment;

import java.time.LocalDate;
import java.util.List;

import com.petwellservices.api.dto.AppointmentsDto;
import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.entities.SitterAppointment;

public interface ISitterAppointmentService {
    SitterAppointment bookAppointment(Long userId, Long sitterId, Long slotId, LocalDate date, String note);
    List<AppointmentsDto> getUserAppointments(Long userId);
    List<SitterAppointmentDto> getSitterAppointments(Long userId);
    SitterAppointment getAppointmentDetails(Long appointmentId);
}
