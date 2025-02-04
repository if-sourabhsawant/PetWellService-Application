package com.petwellservices.api.request;

import lombok.Data;

@Data
public class CreateSitterRequest {

    private String centerPhoneNo;

    private String centerAddress;

    private Long cityId;

    private Long areaId;

    private Integer noOfSlots;

}
