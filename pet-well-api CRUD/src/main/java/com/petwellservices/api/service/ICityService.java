
package com.petwellservices.api.service;

import java.util.List;

import com.petwellservices.api.entities.City;

public interface ICityService {
    
    City getCityById(Long cityId);

    List<City> getCities();

    City createCity(String cityName);

    void deleteCity(Long cityId);
}
