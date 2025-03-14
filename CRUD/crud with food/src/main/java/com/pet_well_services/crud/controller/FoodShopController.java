package com.pet_well_services.crud.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pet_well_services.crud.entities.FoodShop;
import com.pet_well_services.crud.response.ApiResponse;
import com.pet_well_services.crud.service.foodshop.IFoodShopService;
import com.pet_well_services.crud.util.Constants;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/food-shops")
public class FoodShopController {

    final IFoodShopService foodShopService;

    @GetMapping
    public ResponseEntity<ApiResponse> getFoodShops() {
        try {
            List<FoodShop> foodShops = foodShopService.getAllFoodShops();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, foodShops));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/{foodShopId}")
    public ResponseEntity<ApiResponse> getFoodShops(@PathVariable Long foodShopId) {
        try {
            FoodShop foodShops = foodShopService.getFoodShopById(foodShopId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, foodShops));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
