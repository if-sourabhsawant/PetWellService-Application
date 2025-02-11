package com.pet_well_services.crud.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
