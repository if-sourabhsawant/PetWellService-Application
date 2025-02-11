package com.pet_well_services.crud.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {
    private String status;
    private String message;
    private Object data;

    public ApiResponse(String status, Object data) {
        this.status = status;
        this.data = data;
    }

    public ApiResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

}
