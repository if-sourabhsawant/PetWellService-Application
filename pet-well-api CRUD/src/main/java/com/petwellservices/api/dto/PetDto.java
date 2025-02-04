package com.petwellservices.api.dto;

import com.petwellservices.api.entities.Breed;
import com.petwellservices.api.entities.Category;

import lombok.Data;

@Data
public class PetDto {
    private Long petId;

    private String petName;

    private Integer petAge;

    private String userName;

    private Category category;

    private Breed breed;
}
