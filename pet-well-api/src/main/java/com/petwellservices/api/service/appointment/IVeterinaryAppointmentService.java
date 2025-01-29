package com.petwellservices.api.service.appointment;

import java.time.LocalDate;
import java.util.List;

import com.petwellservices.api.dto.AppointmentsDto;
import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.entities.VeterinaryAppointment;

public interface IVeterinaryAppointmentService {
    VeterinaryAppointment bookAppointment(Long userId, Long veterinaryId, Long slotId, LocalDate date, String note);
    List<AppointmentsDto> getUserAppointments(Long userId);

    List<SitterAppointmentDto> getVeterinaryAppointments(Long userId);
    VeterinaryAppointment getAppointmentDetails(Long appointmentId);
}
