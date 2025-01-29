package com.petwellservices.api.service.appointment;

import java.time.LocalDate;
import java.util.List;

import com.petwellservices.api.dto.AppointmentsDto;
import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.entities.GroomerAppointment;

public interface IGroomerAppointmentService {
    GroomerAppointment bookAppointment(Long userId, Long groomerId, Long slotId, LocalDate date, String note);
    List<AppointmentsDto> getUserAppointments(Long userId);

    List<SitterAppointmentDto> getGroomerAppointments(Long userId);
    GroomerAppointment getAppointmentDetails(Long appointmentId);
}
