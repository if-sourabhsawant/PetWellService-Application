package com.pet_well_services.transaction.dto;

import java.time.LocalTime;

import lombok.Data;

@Data
public class SlotDto {
    private Long slotId;

    private LocalTime slotTime;
    
    private boolean available;
}
