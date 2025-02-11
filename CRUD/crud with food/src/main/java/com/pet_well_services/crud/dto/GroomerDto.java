package com.pet_well_services.crud.dto;

import java.util.List;

import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.enums.UserStatus;

import lombok.Data;

@Data
public class GroomerDto {
    private Long groomerId;

    private User user;

    private String shopName;

    private Integer rating;

    private City city;
   
    private Area area;
   
    private String shopPhoneNo;
   
    private String shopAddress;
   
    private Integer noOfSlots;
   
    private UserStatus status;
   
    private List<SlotDto> slots;
}
