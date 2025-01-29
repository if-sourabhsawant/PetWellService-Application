package com.petwellservices.api.request;

import lombok.Data;


@Data
public class CreatePetRequest {

    private String petName;

    private Integer petAge;

    private Long breedId;
    private Long categoryId;


}
