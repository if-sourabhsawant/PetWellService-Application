package com.petwellservices.api.service.foodshop;

import java.util.List;

import com.petwellservices.api.entities.FoodShop;

public interface IFoodShopService {
    FoodShop createFoodShop(FoodShop foodShop);
    List<FoodShop> getAllFoodShops();
    FoodShop getFoodShopById(Long shopId);
    void deleteFoodShopById(Long shopId);
    List<FoodShop> getFoodShopsByCityId(Long cityId);
}
