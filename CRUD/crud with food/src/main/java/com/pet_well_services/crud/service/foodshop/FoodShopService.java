package com.pet_well_services.crud.service.foodshop;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.FoodShop;
import com.pet_well_services.crud.entities.FoodShop.Status;
import com.pet_well_services.crud.exception.ResourceNotFoundException;
import com.pet_well_services.crud.repository.AreaRepository;
import com.pet_well_services.crud.repository.CityRepository;
import com.pet_well_services.crud.repository.FoodShopRepository;
import com.pet_well_services.crud.request.CreateFoodShopRequest;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FoodShopService implements IFoodShopService {
    private final FoodShopRepository foodShopRepository;
    private final CityRepository cityRepository;
    private final AreaRepository areaRepository;

    @Override
    public FoodShop createFoodShop(CreateFoodShopRequest foodShop, City city, Area area) {
        FoodShop newFoodShop = new FoodShop();
      
        newFoodShop.setShopName(foodShop.getShopName());
        newFoodShop.setShopRegistrationId(foodShop.getShopRegistrationId());
        newFoodShop.setRating(foodShop.getRating());

        newFoodShop.setCity(city);
        newFoodShop.setArea(area);
        newFoodShop.setShopPhoneNo(foodShop.getShopPhoneNo());
        newFoodShop.setShopAddress(foodShop.getShopAddress());
        newFoodShop.setStatus(Status.valueOf(foodShop.getStatus()));
        return foodShopRepository.save(newFoodShop);
    }

    @Override
    public List<FoodShop> getAllFoodShops() {
        return foodShopRepository.findAll();
    }

    @Override
    public FoodShop getFoodShopById(Long shopId) {
        return foodShopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Food shop not found with id: " + shopId));
    }

    @Override
    public void deleteFoodShopById(Long shopId) {
        if (!foodShopRepository.existsById(shopId)) {
            throw new ResourceNotFoundException("Food shop not found with id: " + shopId);
        }
        foodShopRepository.deleteById(shopId);
    }

    @Override
    public List<FoodShop> getFoodShopsByCityId(Long cityId) {
        return foodShopRepository.findByCityCityId(cityId);
    }

    @Override
    public List<FoodShop> getFoodShopsByAreaId(Long areaId) {
        return foodShopRepository.findByAreaAreaId(areaId);
    }

    public FoodShop updateFoodShop(Long shopId, CreateFoodShopRequest updateFoodShopRequest) {

        FoodShop foodShop = foodShopRepository.findById(shopId)
                .orElseThrow(() -> new EntityNotFoundException("Food shop not found with id: " + shopId));

        foodShop.setShopName(updateFoodShopRequest.getShopName());
        foodShop.setShopRegistrationId(updateFoodShopRequest.getShopRegistrationId());
        foodShop.setRating(updateFoodShopRequest.getRating());
        foodShop.setShopPhoneNo(updateFoodShopRequest.getShopPhoneNo());
        foodShop.setShopAddress(updateFoodShopRequest.getShopAddress());
        foodShop.setStatus(Status.valueOf(updateFoodShopRequest.getStatus()));

        City city = cityRepository.findById(updateFoodShopRequest.getCityId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "City not found with id: " + updateFoodShopRequest.getCityId()));
        foodShop.setCity(city);

        Area area = areaRepository.findById(updateFoodShopRequest.getAreaId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Area not found with id: " + updateFoodShopRequest.getAreaId()));
        foodShop.setArea(area);

        return foodShopRepository.save(foodShop);
    }
}
