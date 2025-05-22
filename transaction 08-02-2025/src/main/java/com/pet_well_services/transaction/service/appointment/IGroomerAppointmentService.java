package com.pet_well_services.transaction.service.appointment;

import java.time.LocalDate;
import java.util.List;

import com.pet_well_services.transaction.dto.AppointmentsDto;
import com.pet_well_services.transaction.dto.SitterAppointmentDto;
import com.pet_well_services.transaction.entities.GroomerAppointment;

public interface IGroomerAppointmentService {
    GroomerAppointment bookAppointment(Long userId, Long groomerId, Long slotId, LocalDate date, String note);
    List<AppointmentsDto> getUserAppointments(Long userId);

    List<SitterAppointmentDto> getGroomerAppointments(Long userId);
    GroomerAppointment getAppointmentDetails(Long appointmentId);
}
