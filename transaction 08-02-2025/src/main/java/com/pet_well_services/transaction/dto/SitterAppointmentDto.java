package com.pet_well_services.transaction.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.pet_well_services.transaction.entities.User;

import lombok.Data;

@Data
public class SitterAppointmentDto {
    private Long appointmentId;
    
    private SlotDto slot;
    
    private User user;
    
    private LocalDate date;
    
    private LocalTime slotTime;
    
    private String note;
    
    private String status;
    
    private List<PetDto> pet;
}
