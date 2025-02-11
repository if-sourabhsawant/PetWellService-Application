package com.pet_well_services.crud.service.appointment;

import java.time.LocalDate;
import java.util.List;

import com.pet_well_services.crud.dto.AppointmentsDto;
import com.pet_well_services.crud.dto.SitterAppointmentDto;
import com.pet_well_services.crud.entities.SitterAppointment;

public interface ISitterAppointmentService {
    SitterAppointment bookAppointment(Long userId, Long sitterId, Long slotId, LocalDate date, String note);
    List<AppointmentsDto> getUserAppointments(Long userId);
    List<SitterAppointmentDto> getSitterAppointments(Long sitterId);
    SitterAppointment getAppointmentDetails(Long appointmentId);
}
