package com.pet_well_services.crud.exception;

public class InvalidResourceException extends RuntimeException {
    public InvalidResourceException(String message){
        super(message);
    }
}

