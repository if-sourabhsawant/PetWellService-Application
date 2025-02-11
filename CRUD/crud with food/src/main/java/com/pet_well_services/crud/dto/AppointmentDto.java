package com.pet_well_services.crud.dto;

import java.time.LocalDate;

import com.pet_well_services.crud.entities.GroomerAppointment;
import com.pet_well_services.crud.entities.SitterAppointment;
import com.pet_well_services.crud.entities.VeterinaryAppointment;

import lombok.Data;

@Data
public class AppointmentDto {

    private Long appointmentId;

    private String appointmentType;

    private LocalDate date;

    private String note;

    private String status;

    public static AppointmentDto fromVeterinaryAppointment(VeterinaryAppointment appointment) {
        AppointmentDto dto = new AppointmentDto();
        dto.setAppointmentId(appointment.getId());
        dto.setAppointmentType("Veterinary");
        dto.setDate(appointment.getDate());
        dto.setNote(appointment.getNote());
        dto.setStatus(appointment.getStatus().name());
        return dto;
    }

    public static AppointmentDto fromSitterAppointment(SitterAppointment appointment) {
        AppointmentDto dto = new AppointmentDto();
        dto.setAppointmentId(appointment.getId());
        dto.setAppointmentType("Sitter");
        dto.setDate(appointment.getDate());
        dto.setNote(appointment.getNote());
        dto.setStatus(appointment.getStatus().name());
        return dto;
    }

    public static AppointmentDto fromGroomerAppointment(GroomerAppointment appointment) {
        AppointmentDto dto = new AppointmentDto();
        dto.setAppointmentId(appointment.getId());
        dto.setAppointmentType("Groomer");
        dto.setDate(appointment.getDate());
        dto.setNote(appointment.getNote());
        dto.setStatus(appointment.getStatus().name());
        return dto;
    }
}
