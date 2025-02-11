package com.pet_well_services.crud.request;

import java.time.LocalTime;

import com.pet_well_services.crud.enums.UserType;

import lombok.Data;

@Data
public class CreateSlotRequest {
    private LocalTime slotTime;

    private UserType userType;

    private Long user;
}
