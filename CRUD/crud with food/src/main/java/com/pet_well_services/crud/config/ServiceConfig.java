package com.pet_well_services.crud.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class ServiceConfig {
    @Bean
    ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
