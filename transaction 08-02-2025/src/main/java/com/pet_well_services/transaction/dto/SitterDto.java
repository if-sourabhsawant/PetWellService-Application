package com.pet_well_services.transaction.dto;

import java.util.List;

import com.pet_well_services.transaction.entities.Area;
import com.pet_well_services.transaction.entities.City;
import com.pet_well_services.transaction.entities.User;
import com.pet_well_services.transaction.enums.UserStatus;

import lombok.Data;

@Data
public class SitterDto {

    private Long sitterId;

    private User user;

    private Integer rating;

    private City city;

    private Area area;

    private String centerPhoneNo;

    private String centerAddress;

    private Integer noOfSlots;

    private UserStatus status;

    private List<SlotDto> slots;
}
