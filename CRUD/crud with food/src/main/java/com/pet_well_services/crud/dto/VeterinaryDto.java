package com.pet_well_services.crud.dto;

import java.util.List;

import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.enums.UserStatus;

import lombok.Data;

@Data
public class VeterinaryDto {

    private Long veterinaryId;

    private User user;

    private String specialization;

    private Float experience;

    private String licenseNo;

    private City city;

    private Area area;

    private String clinicName;

    private String clinicPhoneNo;

    private String clinicAddress;

    private Integer noOfSlots;

    private UserStatus status;

    private List<SlotDto> slots;
}
