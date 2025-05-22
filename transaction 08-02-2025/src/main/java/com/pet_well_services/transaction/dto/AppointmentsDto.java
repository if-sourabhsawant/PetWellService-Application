package com.pet_well_services.transaction.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class AppointmentsDto {

    private Long appointmentId;

    private String appointmentType;

    private String toWhomName;

    private LocalDate date;

    private LocalTime slotTime;

    private String status;

    private String note;
}
