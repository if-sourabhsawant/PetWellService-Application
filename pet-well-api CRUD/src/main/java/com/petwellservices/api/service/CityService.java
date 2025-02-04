
package com.petwellservices.api.service;

import java.util.List;


import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.City;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.CityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CityService implements ICityService {

    private final CityRepository cityRepository;

    @Override
    public City getCityById(Long cityId) {
        return cityRepository.findById(cityId).orElseThrow(() -> new ResourceNotFoundException("invalid id"));
    }

    @Override
    public List<City> getCities() {
        return cityRepository.findAll();
    }

    @Override
    public City createCity(String cityName) {
        throw new UnsupportedOperationException("Unimplemented method 'createCity'");
    }

    @Override
    public void deleteCity(Long cityId) {
        throw new UnsupportedOperationException("Unimplemented method 'deleteCity'");
    }

}
