package com.pet_well_services.crud.request;

import lombok.Data;

@Data
public class CreatePetRequest {

    private String petName;

    private Integer petAge;

    private Long breedId;
    private Long categoryId;

}
