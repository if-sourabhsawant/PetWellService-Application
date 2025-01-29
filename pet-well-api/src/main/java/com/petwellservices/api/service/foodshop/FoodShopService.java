package com.petwellservices.api.service.foodshop;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.FoodShop;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.FoodShopRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FoodShopService implements IFoodShopService {
    private FoodShopRepository foodShopRepository;


    @Override
    public FoodShop createFoodShop(FoodShop foodShop) {
       
        return foodShopRepository.save(foodShop);
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
}
