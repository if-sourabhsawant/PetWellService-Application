package com.petwellservices.api.dto;

import java.util.List;

import com.petwellservices.api.entities.Area;
import com.petwellservices.api.entities.City;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.enums.UserStatus;

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
