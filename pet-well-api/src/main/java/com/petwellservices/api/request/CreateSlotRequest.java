package com.petwellservices.api.request;

import java.time.LocalTime;

import com.petwellservices.api.enums.UserType;

import lombok.Data;

@Data
public class CreateSlotRequest {
     private LocalTime slotTime;

    private UserType userType;

    private Long user;
}
