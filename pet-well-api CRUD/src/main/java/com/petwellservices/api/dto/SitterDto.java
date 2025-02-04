package com.petwellservices.api.dto;

import java.util.List;

import com.petwellservices.api.entities.Area;
import com.petwellservices.api.entities.City;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.enums.UserStatus;

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
