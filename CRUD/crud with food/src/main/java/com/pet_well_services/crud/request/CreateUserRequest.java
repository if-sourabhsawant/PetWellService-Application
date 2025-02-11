package com.pet_well_services.crud.request;

import lombok.Data;

@Data
public class CreateUserRequest {

    private String firstName;

    private String lastName;

    private String phoneNo;

    private String password;

    private String email;

    private String aadharNo;

    private String address;

    private Long cityId;

    private Long areaId;

    private Long roleId;

    private CreateVeterinaryRequest veterinary;
    private CreateGroomerRequest groomer;
    private CreateSitterRequest sitter;
    private CreatePetRequest pet;
    private CreateFoodShopRequest foodShop;

}
