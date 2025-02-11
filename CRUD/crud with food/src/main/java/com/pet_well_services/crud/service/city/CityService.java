
package com.pet_well_services.crud.service.city;

import java.util.List;


import org.springframework.stereotype.Service;

import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.exception.ResourceNotFoundException;
import com.pet_well_services.crud.repository.CityRepository;

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
