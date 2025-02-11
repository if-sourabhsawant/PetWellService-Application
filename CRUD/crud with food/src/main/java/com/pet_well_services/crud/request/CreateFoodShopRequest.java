package com.pet_well_services.crud.request;

import lombok.Data;

@Data
public class CreateFoodShopRequest {

    private String shopName;

    private String shopRegistrationId;

    private Integer rating;

    private Long cityId;

    private Long areaId;

    private String shopPhoneNo;

    private String shopAddress;

    private String status;
}
