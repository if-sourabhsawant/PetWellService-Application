package com.petwellservices.api.dto;

import java.util.List;

import com.petwellservices.api.entities.Area;
import com.petwellservices.api.entities.City;
import com.petwellservices.api.entities.Role;

import lombok.Data;

@Data
public class UserWithPetsDto {
    private Long userId;

    private String firstName;

    private String lastName;

    private String phoneNo;

    private String password;

    private String email;

    private String aadharNo;

    private String address;

    private City city;

    private Area area;

    private Role role;

    private List<PetDto> pets;
}
