package com.pet_well_services.crud.dto;

import java.util.List;

import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.enums.UserStatus;

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
