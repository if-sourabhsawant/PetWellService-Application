package com.petwellservices.api.request;

import lombok.Data;

@Data
public class CreateGroomerRequest {

    private String shopName;

    private Long cityId;

    private Long areaId;

    private String shopPhoneNo;

    private String shopAddress;

    private Integer noOfSlots;

}
