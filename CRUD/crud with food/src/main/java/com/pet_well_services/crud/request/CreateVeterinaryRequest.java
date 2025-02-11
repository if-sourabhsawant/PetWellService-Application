package com.pet_well_services.crud.request;

import lombok.Data;

@Data
public class CreateVeterinaryRequest {

    private String specialization;

    private Float experience;

    private String licenseNo;

    private Long cityId;

    private Long areaId;

    private String clinicName;

    private String clinicPhoneNo;

    private String clinicAddress;

    private Integer noOfSlots;

}
