
package com.petwellservices.api.service.city;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.City;
import com.petwellservices.api.repository.CityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CityService implements ICityService {

    private final CityRepository cityRepository;
    
    @Override
    public City getCityById(Long cityId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCityById'");
    }

    @Override
    public List<City> getCities() {
        return cityRepository.findAll();    
    }

    @Override
    public City createCity(String cityName) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createCity'");
    }

    @Override
    public void deleteCity(Long cityId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteCity'");
    }
    // Implement methods for City here



    
}
