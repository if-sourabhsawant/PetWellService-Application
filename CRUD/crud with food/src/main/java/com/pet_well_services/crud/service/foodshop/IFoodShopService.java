package com.pet_well_services.crud.service.foodshop;

import java.util.List;

import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.FoodShop;
import com.pet_well_services.crud.request.CreateFoodShopRequest;

public interface IFoodShopService {
    FoodShop createFoodShop(CreateFoodShopRequest foodShop, City city, Area area);

    List<FoodShop> getAllFoodShops();

    FoodShop getFoodShopById(Long shopId);

    void deleteFoodShopById(Long shopId);

    List<FoodShop> getFoodShopsByCityId(Long cityId);

    List<FoodShop> getFoodShopsByAreaId(Long areaId);

    FoodShop updateFoodShop(Long shopId, CreateFoodShopRequest updateFoodShopRequest);
}
