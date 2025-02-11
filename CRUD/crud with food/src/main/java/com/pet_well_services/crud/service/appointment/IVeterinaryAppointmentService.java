package com.pet_well_services.crud.service.appointment;

import java.time.LocalDate;
import java.util.List;

import com.pet_well_services.crud.dto.AppointmentsDto;
import com.pet_well_services.crud.dto.SitterAppointmentDto;
import com.pet_well_services.crud.entities.VeterinaryAppointment;

public interface IVeterinaryAppointmentService {
    VeterinaryAppointment bookAppointment(Long userId, Long veterinaryId, Long slotId, LocalDate date, String note);
    List<AppointmentsDto> getUserAppointments(Long userId);

    List<SitterAppointmentDto> getVeterinaryAppointments(Long userId);
    VeterinaryAppointment getAppointmentDetails(Long appointmentId);
}
