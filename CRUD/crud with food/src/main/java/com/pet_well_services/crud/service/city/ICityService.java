
package com.pet_well_services.crud.service.city;

import java.util.List;

import com.pet_well_services.crud.entities.City;

public interface ICityService {
    
    City getCityById(Long cityId);

    List<City> getCities();

    City createCity(String cityName);

    void deleteCity(Long cityId);
}
