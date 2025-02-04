package com.petwellservices.api.service;

import java.util.List;

import com.petwellservices.api.entities.Area;
import com.petwellservices.api.entities.City;
import com.petwellservices.api.entities.FoodShop;
import com.petwellservices.api.request.CreateFoodShopRequest;

public interface IFoodShopService {
    FoodShop createFoodShop(CreateFoodShopRequest foodShop, City city, Area area);

    List<FoodShop> getAllFoodShops();

    FoodShop getFoodShopById(Long shopId);

    void deleteFoodShopById(Long shopId);

    List<FoodShop> getFoodShopsByCityId(Long cityId);

    List<FoodShop> getFoodShopsByAreaId(Long areaId);

    FoodShop updateFoodShop(Long shopId, CreateFoodShopRequest updateFoodShopRequest);
}
