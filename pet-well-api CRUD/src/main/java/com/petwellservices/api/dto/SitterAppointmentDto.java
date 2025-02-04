package com.petwellservices.api.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.petwellservices.api.entities.User;

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
