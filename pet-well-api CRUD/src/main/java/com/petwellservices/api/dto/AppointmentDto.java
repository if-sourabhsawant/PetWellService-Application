package com.petwellservices.api.dto;

import java.time.LocalDate;

import com.petwellservices.api.entities.GroomerAppointment;
import com.petwellservices.api.entities.SitterAppointment;
import com.petwellservices.api.entities.VeterinaryAppointment;

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
