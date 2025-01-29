package com.petwellservices.api.dto;

import java.util.List;

import com.petwellservices.api.entities.Area;
import com.petwellservices.api.entities.City;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.enums.UserStatus;

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
