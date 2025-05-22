package com.pet_well_services.transaction.dto;

import com.pet_well_services.transaction.entities.Category;

import lombok.Data;

@Data
public class PetDto {
    private Long petId;

    private String petName;

    private Integer petAge;

    private String userName;

    private Category category;
}
