package com.pet_well_services.transaction.dto;

import java.util.List;

import com.pet_well_services.transaction.entities.Area;
import com.pet_well_services.transaction.entities.City;
import com.pet_well_services.transaction.entities.Role;

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
